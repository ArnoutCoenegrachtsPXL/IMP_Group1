<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// Get a free key at https://aistudio.google.com/apikey
// Add to frontend/.env.local:  VITE_GEMINI_KEY=your_key_here
// ─────────────────────────────────────────────────────────────────────────────
const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY || ''
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const prefs = useUserPrefsStore()

// ── Online / offline ──────────────────────────────────────────────────────────
const isOnline      = ref(navigator.onLine)
const hasApiKey     = computed(() => Boolean(GEMINI_KEY))
const offlineMode   = computed(() => !isOnline.value || !hasApiKey.value)
const statusLabel   = computed(() => {
  if (!isOnline.value)    return 'Offline · local knowledge active'
  if (!hasApiKey.value)   return 'No key · local knowledge active'
  return 'Online · full AI active'
})
const statusDot = computed(() =>
  (!isOnline.value) ? '#f87171' : !hasApiKey.value ? '#fbbf24' : '#4ade80'
)

const onlineHandler  = () => { isOnline.value = true  }
const offlineHandler = () => { isOnline.value = false }
onMounted(() => {
  window.addEventListener('online',  onlineHandler)
  window.addEventListener('offline', offlineHandler)
})
onUnmounted(() => {
  window.removeEventListener('online',  onlineHandler)
  window.removeEventListener('offline', offlineHandler)
  window.speechSynthesis?.cancel()
})

// ── Speech ────────────────────────────────────────────────────────────────────
const hasSpeechInput  = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
const hasSpeechOutput = 'speechSynthesis' in window

// ── UI ────────────────────────────────────────────────────────────────────────
const open      = ref(false)
const loading   = ref(false)
const listening = ref(false)
const ttsOn     = ref(false)
const isSpeaking = ref(false)
const input     = ref('')
const msgEl     = ref(null)

// ── Live app context from store ───────────────────────────────────────────────
// Reads the actual live values so answers are always accurate
const ctx = computed(() => {
  const pr = prefs.profile     || {}
  const en = prefs.energy      || {}
  const no = prefs.notif       || {}
  const fe = prefs.features    || {}
  return {
    name:          pr.displayName    || 'there',
    location:      pr.location       || 'South Africa',
    currency:      prefs.currency    || 'ZAR',
    unit:          prefs.energyUnit  || 'kWh',
    offPeak:       `${prefs.peakStart || '22:00'}–${prefs.peakEnd || '06:00'}`,
    hasEV:         !!en.ev,
    smart:         !!en.smart,
    autoOffset:    !!en.autoOffset,
    comShare:      !!en.community,
    priceAlerts:   !!no.priceAlerts,
    push:          !!no.push,
    maintTips:     !!no.maintenanceTips,
    leaderboard:   fe.leaderboard !== false,
    energyTips:    fe.energyTips  !== false,
    streak:        fe.streak      !== false,
    theme:         prefs.themeMode   || 'system',
    twoFa:         !!prefs.twoFactor,
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// OFFLINE KNOWLEDGE BASE
// 22 entries across app navigation, energy tips, and settings.
// Every reply() receives ctx so it reads live settings data.
// ─────────────────────────────────────────────────────────────────────────────
const KB = [
  // ── App navigation ──────────────────────────────────────────────────────────
  { k: ['dashboard','home','overview'],
    r: c => `Your Dashboard is BrightBox's live energy command centre, ${c.name}. It shows real-time production vs consumption, battery status, your green energy mix, and a 24-hour usage chart — all updating automatically.` },

  { k: ['upload','meter','reading','submit','log reading'],
    r: () => `To upload a meter reading, tap the ⚡ icon in the sidebar or the meter icon in the top bar. Type the value manually or photograph your meter. Readings sync to your account and update your usage charts. Works offline — syncs when you reconnect.` },

  { k: ['leaderboard','rank','ranking'],
    r: c => c.leaderboard
      ? `The Leaderboard ranks your community by renewable energy percentage. Your position improves when your green usage rises. ${c.comShare ? 'Your metrics are currently shared with neighbours.' : 'Turn on Community Sharing in Settings → Energy to contribute your data.'}`
      : `The Leaderboard is currently hidden. Go to Settings → App Features and enable it to see your community ranking.` },

  { k: ['energy tips','tips page','advice page'],
    r: c => c.energyTips
      ? `The Energy Tips page has personalised recommendations for your usage patterns, ${c.name}. Find it in the sidebar under "Energy Tips".`
      : `Energy Tips is currently disabled. Go to Settings → App Features → Energy Tips and toggle it on.` },

  { k: ['support','help','contact','problem','bug'],
    r: () => `For help, visit the Support page via the sidebar bottom-left link. It has searchable articles, FAQ, and a contact form. We respond within 24 hours on business days (4 hours urgent). Email: support@brightbox.app.` },

  { k: ['navigation','menu','sidebar','find','where is','how do i get'],
    r: () => `BrightBox navigation:\n• 🏠 Dashboard — live overview\n• 🏆 Leaderboard — community rankings\n• ⚡ Upload Meter — log readings\n• 💡 Energy Tips — saving advice\n• ⚙️ Settings — all preferences\n• ❓ Support — help & contact\n\nOn mobile, tap ☰ in the top-left to open the sidebar.` },

  // ── Energy tips ─────────────────────────────────────────────────────────────
  { k: ['save energy','reduce','lower bill','cut cost','save electricity'],
    r: c => `Top 5 ways to save, ${c.name}:\n\n1. 🌙 Shift heavy loads (geyser, dishwasher) to off-peak: ${c.offPeak}\n2. 💡 Replace incandescent bulbs with LEDs — saves up to 80%\n3. 🔌 Unplug standby devices — they account for ~10% of bills\n4. 🌡️ Set your geyser to 55°C\n5. ☀️ Run appliances at solar peak: 10:00–14:00` },

  { k: ['peak','tariff','rate','eskom','off-peak','tou','time of use','pricing'],
    r: c => `Eskom Time-of-Use pricing:\n\n🔴 Peak (most expensive): 07:00–10:00 and 17:00–20:00 weekdays\n🟢 Off-Peak (cheapest): ${c.offPeak} and all weekends\n\n${c.priceAlerts ? '✅ You have price alerts on — you\'ll get a 30-min heads-up before peak windows.' : '💡 Enable Price Alerts in Settings → Notifications for automatic heads-up.'}` },

  { k: ['geyser','water heater','hot water','boiler'],
    r: c => `Your geyser uses 30–40% of your total electricity. Key actions:\n• Set thermostat to 55°C\n• Timer to heat only during off-peak: ${c.offPeak}\n• Insulate the geyser and first 1m of hot pipes\n• Fix dripping taps — they waste 15 L/day of heated water` },

  { k: ['solar','panel','pv','generation','output','photovoltaic'],
    r: c => `Maximising solar output:\n• Clean panels every 6–8 weeks (dust cuts output by 20%)\n• South-facing panels at 25–30° tilt are optimal in ${c.location}\n• Run heavy appliances at midday solar peak (10:00–14:00)\n${c.autoOffset ? '✅ Auto-Offset is on — surplus is fed back to the grid.' : '💡 Enable Auto-Offset in Settings → Energy to monetise surplus.'}` },

  { k: ['battery','storage','backup','load shedding','loadshedding'],
    r: () => `Battery best practices:\n• Charge during off-peak or from solar midday\n• Keep charge between 20–90% for longevity\n• During load-shedding prioritise: fridge, lights, router\n• Check Dashboard → Battery card for live charge level and runtime` },

  { k: ['appliance','fridge','washing','dishwasher','dryer','oven','kettle'],
    r: c => `Appliances by energy draw:\n1. 🔥 Geyser: 2–4 kW → schedule for ${c.offPeak}\n2. 🧺 Tumble dryer: 2–2.5 kW → line-dry when possible\n3. 🍳 Oven: 1.5–2.5 kW → use air fryer for small meals\n4. 🧽 Dishwasher: 1.2–1.8 kW → eco mode overnight\n5. 💡 Switch to LED bulbs immediately` },

  { k: ['ev','electric vehicle','car charg'],
    r: c => `EV charging strategy:\n• Always charge during off-peak (${c.offPeak}) — lowest rates\n• A 7.4 kW home charger adds ~40 km/hour\n• Keep charge between 20–80% for battery health\n${c.hasEV ? '✅ EV Off-Peak Charging is enabled in your settings.' : '💡 Enable EV Off-Peak Charging in Settings → Energy.'}` },

  { k: ['maintenance','maintain','clean panel','service','inspect'],
    r: c => `Maintenance schedule:\n📅 Monthly: Clean panels, check inverter codes\n📅 Every 6 months: Test battery runtime, inspect geyser element\n📅 Annually: Professional solar + electrical inspection\n\n${c.maintTips ? '✅ Maintenance Tips are on — BrightBox sends automatic reminders.' : '💡 Enable Maintenance Tips in Settings → Notifications.'}` },

  { k: ['inverter','fault','error','trip','breaker','no power'],
    r: () => `Common inverter fixes:\n• Red/amber light: note the fault code, check your manual\n• No output: check AC isolator AND DC breaker — both must be ON\n• Overheating: ensure 30cm clearance on all sides, out of direct sun\n• Grid fault: inverters wait ~5 min for grid stability before reconnecting\n• Monitoring offline: restart the Wi-Fi adapter\n\nAlways call a qualified electrician for internal faults.` },

  // ── Settings ─────────────────────────────────────────────────────────────────
  { k: ['theme','dark mode','light mode','colour','color','accent','appearance'],
    r: c => `BrightBox has Light, Dark, and System modes (${c.theme === 'dark' ? '🌙 currently Dark' : c.theme === 'light' ? '☀️ currently Light' : '⚙️ currently System'}), plus 8 accent colour palettes. Go to Settings → Appearance — changes apply instantly with no page reload.` },

  { k: ['notification','alert','push','digest'],
    r: c => `Your notification status:\n${c.push ? '✅' : '❌'} Push notifications\n${c.priceAlerts ? '✅' : '❌'} Price alerts\n${c.maintTips ? '✅' : '❌'} Maintenance tips\n\nManage all preferences in Settings → Notifications. You can send test alerts from there.` },

  { k: ['profile','avatar','photo','display name','update profile'],
    r: c => `Go to Settings → Profile to update your name, photo, email, bio, location, and pronouns, ${c.name}. Your profile photo syncs instantly to the sidebar and top bar when saved.` },

  { k: ['privacy','data','gdpr','popia','delete','download data'],
    r: c => `BrightBox is POPIA and GDPR compliant:\n📥 Download your data as JSON from Settings → Privacy & Data\n🗑️ Request deletion (processed within 21 business days)\n🔒 Community sharing: ${c.comShare ? 'ON' : 'OFF'}\n\nRead the full Privacy Policy via Settings → Privacy & Data.` },

  { k: ['security','2fa','two factor','password','authenticator'],
    r: c => `${c.twoFa ? '🔐 2FA is ENABLED on your account. ✅' : '⚠️ 2FA is NOT enabled — we strongly recommend turning it on.'}\n\nTo set up 2FA, go to Settings → Security. You'll scan a QR code with Google Authenticator or Authy, verify a code, and save 8 backup codes. Takes 2 minutes.` },

  { k: ['features','enable','disable','hide','show page'],
    r: c => `Your app features:\n${c.leaderboard ? '✅' : '❌'} Leaderboard\n${c.energyTips ? '✅' : '❌'} Energy Tips\n${c.streak ? '✅' : '❌'} Streak tracker\n✅ Dashboard & Upload Meter (always on)\n\nToggle features in Settings → App Features. Changes apply to navigation immediately.` },

  { k: ['smart scheduling','automation','automate','schedule appliance'],
    r: c => `${c.smart ? '✅ Smart Scheduling is enabled — you\'ll see optimisation suggestions on the Dashboard.' : '💡 Enable Smart Scheduling in Settings → Energy.'}\n\nThe golden rule: shift any non-urgent high-draw task to your off-peak window: ${c.offPeak}.` },
]

// ── Answer engine ─────────────────────────────────────────────────────────────
function offlineAnswer(text) {
  const t = text.toLowerCase()
  const c = ctx.value

  // Direct match
  const hit = KB.find(e => e.k.some(k => t.includes(k)))
  if (hit) return hit.r(c)

  // Partial word match
  const partial = KB.find(e =>
    e.k.some(k => k.split(' ').some(w => w.length > 3 && t.includes(w)))
  )
  if (partial) return partial.r(c)

  // Friendly fallbacks
  if (/\b(hi|hello|hey|howzit|hiya)\b/.test(t))
    return `Hi ${c.name}! 👋 I'm SolarBuddy. Ask me about energy saving tips, your BrightBox settings, or anything about the app.`
  if (/thank/.test(t))
    return `You're welcome, ${c.name}! 😊 Let me know if you have more questions.`
  if (/who are you|what are you|your name/.test(t))
    return `I'm SolarBuddy 🌱 — BrightBox's built-in energy assistant. I know your live app settings and can help with energy saving, app navigation, and features — fully offline too.`

  return `I don't have a specific offline answer for that, ${c.name}. Try asking about:\n• Energy saving (peak hours, geyser, solar, battery)\n• App navigation (dashboard, upload, leaderboard)\n• Your settings (notifications, theme, features, security)\n\nConnect to the internet for full AI answers on any topic.`
}

// ── Context-aware suggestions — 3 at a time, updated after each message ──────
// These feel purposeful because they react to user's actual settings state
const suggestionPool = computed(() => {
  const c = ctx.value
  const all = [
    { label: 'Save energy tips',      text: 'Give me quick energy saving tips' },
    { label: 'My peak hours',         text: 'When are peak hours and how do I avoid them?' },
    { label: `Off-peak: ${c.offPeak}`,text: 'What is my configured off-peak window?' },
    { label: 'Geyser efficiency',     text: 'How do I save energy on my geyser?' },
    { label: 'Solar tips',            text: 'How do I maximise my solar output?' },
    { label: 'Appliance rankings',    text: 'Which appliances use the most electricity?' },
    { label: 'Battery tips',          text: 'How do I manage my battery storage?' },
    { label: 'Upload a reading',      text: 'How do I upload a meter reading?' },
    { label: 'App navigation',        text: 'Where do I find each section in the app?' },
    { label: c.leaderboard ? 'My leaderboard rank' : 'Enable leaderboard',
      text: c.leaderboard ? 'How does the leaderboard work?' : 'How do I enable the leaderboard?' },
    { label: c.push ? 'My notifications' : 'Enable push alerts',
      text: c.push ? 'What are my current notification settings?' : 'How do I enable push notifications?' },
    { label: c.twoFa ? '2FA is on ✅' : 'Enable 2FA',
      text: c.twoFa ? 'My account has 2FA enabled — how does it work?' : 'How do I set up two-factor authentication?' },
    { label: 'Privacy & my data',     text: 'What data does BrightBox store about me?' },
    { label: 'Change theme',          text: 'How do I switch to dark mode?' },
    { label: 'Maintenance schedule',  text: 'What maintenance should I do and when?' },
    { label: 'Inverter fault help',   text: 'My inverter has a fault — what do I do?' },
    { label: 'EV charging tips',      text: 'How should I charge my EV most efficiently?' },
    { label: 'Support',               text: 'How do I contact BrightBox support?' },
  ]
  return all
})

// Show 3 rotating suggestions — changes after each conversation turn
const suggestionOffset = ref(0)
const suggestions = computed(() => {
  const pool = suggestionPool.value
  const start = suggestionOffset.value % pool.length
  // Wrap around safely
  const result = []
  for (let i = 0; i < 3; i++) result.push(pool[(start + i) % pool.length])
  return result
})

function rotateSuggestions() {
  suggestionOffset.value = (suggestionOffset.value + 3) % suggestionPool.value.length
}

// ── Greeting ──────────────────────────────────────────────────────────────────
function greeting() {
  const c    = ctx.value
  const hour = new Date().getHours()
  const tod  = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
  const base = `Good ${tod}, ${c.name}! I'm SolarBuddy ⚡`
  if (offlineMode.value && !isOnline.value)
    return `${base}\n\nI'm running in offline mode — I have your BrightBox settings and a full energy knowledge base. Tap a suggestion or ask me anything.`
  if (offlineMode.value)
    return `${base}\n\nNo API key set yet, so I'm using built-in knowledge. I can still answer energy questions and anything about your settings. Tap a suggestion to start!`
  return `${base}\n\nI'm your full AI energy assistant. Ask me about energy savings, your usage, or anything about BrightBox!`
}

const messages = ref([{ role: 'assistant', content: greeting(), time: nowStr() }])

// ── Send ──────────────────────────────────────────────────────────────────────
async function send(text) {
  const msg = (text || input.value).trim()
  if (!msg || loading.value) return
  input.value = ''
  messages.value.push({ role: 'user', content: msg, time: nowStr() })
  loading.value = true
  await nextTick(); scrollDown()

  if (offlineMode.value) {
    await sleep(260)
    pushBot(offlineAnswer(msg))
  } else {
    try {
      const c = ctx.value
      const sys = `You are SolarBuddy, a friendly expert energy assistant for BrightBox. User: ${c.name}, ${c.location}. Currency: ${c.currency}. Off-peak: ${c.offPeak}. EV: ${c.hasEV}. Smart scheduling: ${c.smart}. Price alerts: ${c.priceAlerts}. 2FA: ${c.twoFa}. Features enabled: leaderboard=${c.leaderboard}, energyTips=${c.energyTips}. Personalise your answer using this context. Keep responses to 2–4 sentences. Include one actionable tip. Only discuss energy, sustainability, or BrightBox.`

      const history = messages.value.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }))

      const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: sys }] },
          contents: history,
          generationConfig: { maxOutputTokens: 350, temperature: 0.7 },
        }),
      })
      if (!res.ok) throw new Error(`${res.status}`)
      const data  = await res.json()
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
      if (!reply) throw new Error('empty')
      pushBot(reply)
    } catch {
      pushBot(`⚠️ AI unavailable — here's what I know:\n\n${offlineAnswer(msg)}`)
    }
  }

  loading.value = false
  rotateSuggestions()
  await nextTick(); scrollDown()
}

function pushBot(text) {
  messages.value.push({ role: 'assistant', content: text, time: nowStr() })
  if (ttsOn.value && hasSpeechOutput) nextTick(() => setTimeout(() => speak(text), 80))
}
function scrollDown() {
  if (msgEl.value) msgEl.value.scrollTop = msgEl.value.scrollHeight
}
function nowStr() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function clearChat() {
  messages.value = [{ role: 'assistant', content: greeting(), time: nowStr() }]
  suggestionOffset.value = 0
}

// ── TTS ───────────────────────────────────────────────────────────────────────
function speak(text) {
  if (!hasSpeechOutput || !text?.trim()) return
  const clean = text.replace(/[^\x00-\x7F]/g, '').replace(/\n+/g, '. ')
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(clean)
  utt.rate = 0.92; utt.pitch = 1.0; utt.lang = 'en-US'
  const voices = window.speechSynthesis.getVoices()
  const best   = voices.find(v =>
    v.name.toLowerCase().includes('google') ||
    (v.lang === 'en-US' && !v.name.toLowerCase().includes('espeak'))
  )
  if (best) utt.voice = best
  utt.onstart = () => { isSpeaking.value = true  }
  utt.onend   = () => { isSpeaking.value = false }
  utt.onerror = () => { isSpeaking.value = false }
  window.speechSynthesis.speak(utt)
}
function toggleTts() {
  ttsOn.value = !ttsOn.value
  if (!ttsOn.value) { window.speechSynthesis?.cancel(); isSpeaking.value = false }
}
if (hasSpeechOutput) window.speechSynthesis.onvoiceschanged = () => {}

// ── Voice input ───────────────────────────────────────────────────────────────
let recognition = null
function toggleVoice() {
  if (!hasSpeechInput) {
    pushBot("Voice input isn't supported in this browser. Try Chrome or Edge.")
    return
  }
  if (listening.value) { recognition?.stop(); listening.value = false; return }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  recognition = new SR()
  recognition.lang = 'en-US'; recognition.continuous = false
  recognition.interimResults = false; recognition.maxAlternatives = 1
  recognition.onstart  = () => { listening.value = true  }
  recognition.onend    = () => { listening.value = false }
  recognition.onerror  = e => {
    listening.value = false
    if (e.error === 'not-allowed')
      pushBot('Microphone access denied. Allow it in browser settings and try again.')
  }
  recognition.onresult = e => {
    listening.value = false
    input.value = e.results[0][0].transcript
    setTimeout(() => send(), 250)
  }
  try { recognition.start() } catch { listening.value = false }
}
</script>

<template>
  <!--
    Position: fixed to bottom-right.
    On mobile the nav bar is ~56–64px, so bottom-[4.5rem] clears it.
    On md+ (desktop sidebar layout) bottom-6 is fine.
  -->
  <div class="fixed bottom-[4.5rem] md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-3">

    <!-- ── Chat window ──────────────────────────────────────────────────────── -->
    <Transition name="chat-slide">
      <div
        v-if="open"
        class="flex flex-col rounded-[18px] overflow-hidden"
        style="
          width: min(88vw, 360px);
          background: var(--surf-card);
          border: 1px solid var(--border);
          box-shadow: 0 8px 36px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08);
        "
        role="dialog"
        aria-label="SolarBuddy chat assistant"
        aria-modal="true"
      >

        <!-- ── Header: avatar, name/status, tts, clear, close ─────────────── -->
        <div
          class="flex items-center gap-2 px-3.5 py-2.5 flex-shrink-0"
          style="background: linear-gradient(135deg, var(--pri) 0%, var(--pri-mid) 100%);"
        >
          <!-- Avatar -->
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style="background: rgba(255,255,255,0.18);"
          >
            <span
              class="material-symbols-outlined"
              style="font-size:18px; color:white; font-variation-settings:'FILL' 1,'wght' 400;"
            >energy_savings_leaf</span>
          </div>

          <!-- Name + status dot -->
          <div class="flex-1 min-w-0">
            <p class="text-white font-bold text-[13.5px] leading-none tracking-tight">SolarBuddy</p>
            <div class="flex items-center gap-1.5 mt-1">
              <span
                class="w-1.5 h-1.5 rounded-full flex-shrink-0"
                :style="{ background: statusDot }"
              ></span>
              <span class="text-[10.5px] truncate" style="color: rgba(255,255,255,0.80);">
                {{ statusLabel }}
              </span>
            </div>
          </div>

          <!-- TTS toggle -->
          <button
            v-if="hasSpeechOutput"
            class="w-7 h-7 rounded-lg flex items-center justify-center transition-all flex-shrink-0"
            :style="ttsOn
              ? 'background:rgba(255,255,255,0.30);'
              : 'background:rgba(255,255,255,0.12);'"
            @click="toggleTts"
            :aria-pressed="ttsOn"
            :title="ttsOn ? 'Read aloud ON' : 'Read aloud OFF'"
          >
            <span
              class="material-symbols-outlined"
              style="font-size:14px; color:white;"
              :style="ttsOn ? 'font-variation-settings:\'FILL\' 1' : ''"
            >{{ ttsOn ? 'volume_up' : 'volume_off' }}</span>
          </button>

          <!-- Clear -->
          <button
            class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style="background: rgba(255,255,255,0.12);"
            @click="clearChat"
            aria-label="Clear conversation"
            title="Clear chat"
          >
            <span class="material-symbols-outlined" style="font-size:13px; color:white;">refresh</span>
          </button>

          <!-- Close -->
          <button
            class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style="background: rgba(255,255,255,0.12);"
            @click="open = false"
            aria-label="Close SolarBuddy"
          >
            <span class="material-symbols-outlined" style="font-size:13px; color:white;">close</span>
          </button>
        </div>

        <!--
          ── Messages ─────────────────────────────────────────────────────────
          Height: flexible between 200px (smallest phone) and 260px.
          Does NOT exceed half the viewport height via max-height: 45dvh.
          This keeps the input and suggestions always visible.
        -->
        <div
          ref="msgEl"
          class="flex flex-col gap-2.5 px-3.5 py-3 overflow-y-auto flex-1"
          style="min-height: 180px; max-height: min(260px, 45dvh);"
          aria-live="polite"
          role="log"
          aria-label="Chat messages"
        >
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="flex flex-col chat-msg"
            :class="msg.role === 'user' ? 'items-end' : 'items-start'"
          >
            <!-- Bot bubble with tiny leaf avatar -->
            <div v-if="msg.role === 'assistant'" class="flex items-end gap-1.5 max-w-[92%]">
              <div
                class="w-5 h-5 rounded-full flex-shrink-0 mb-0.5 flex items-center justify-center"
                style="background: var(--pri-mid);"
              >
                <span
                  class="material-symbols-outlined"
                  style="font-size:11px; color:white; font-variation-settings:'FILL' 1;"
                >energy_savings_leaf</span>
              </div>
              <div
                class="px-3 py-2 rounded-[13px] rounded-tl-[4px] text-[12.5px] leading-relaxed whitespace-pre-wrap"
                style="background: var(--surf-2); color: var(--text); border: 1px solid var(--border);"
              >{{ msg.content }}</div>
            </div>

            <!-- User bubble -->
            <div
              v-else
              class="px-3 py-2 rounded-[13px] rounded-tr-[4px] text-[12.5px] leading-relaxed max-w-[86%] whitespace-pre-wrap"
              style="background: var(--pri-mid); color: #fff;"
            >{{ msg.content }}</div>

            <!-- Timestamp -->
            <span class="text-[9.5px] mt-0.5 px-1" style="color: var(--text-muted);">
              {{ msg.role === 'user' ? 'You' : 'SolarBuddy' }} · {{ msg.time }}
            </span>
          </div>

          <!-- Typing indicator -->
          <div v-if="loading" class="flex items-end gap-1.5 chat-msg">
            <div
              class="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
              style="background: var(--pri-mid);"
            >
              <span
                class="material-symbols-outlined"
                style="font-size:11px; color:white; font-variation-settings:'FILL' 1;"
              >energy_savings_leaf</span>
            </div>
            <div
              class="px-3.5 py-2.5 rounded-[13px] rounded-tl-[4px]"
              style="background: var(--surf-2); border: 1px solid var(--border);"
              role="status"
              aria-label="SolarBuddy is typing"
            >
              <div class="flex gap-1 items-center h-3">
                <span
                  v-for="n in 3" :key="n"
                  class="w-1.5 h-1.5 rounded-full"
                  :style="{
                    background: 'var(--text-muted)',
                    animation: `bounce-dot 1.2s ease-in-out ${(n-1)*0.2}s infinite`
                  }"
                ></span>
              </div>
            </div>
          </div>
        </div>

        <!--
          ── Suggestions ──────────────────────────────────────────────────────
          3 chips that rotate after every message exchange.
          Horizontal scroll on narrow screens — no wrapping, no overflow.
          Kept to one row so it never pushes the input off screen.
        -->
        <div
          class="flex gap-1.5 overflow-x-auto px-3.5 py-2 flex-shrink-0"
          style="scrollbar-width: none; -webkit-overflow-scrolling: touch; border-top: 1px solid var(--border);"
          role="group"
          aria-label="Quick suggestions"
        >
          <button
            v-for="s in suggestions"
            :key="s.label"
            class="flex-shrink-0 text-[11px] font-semibold px-2.5 py-1.5 rounded-full transition-all active:scale-95 whitespace-nowrap"
            :style="{
              background: 'var(--surf-2)',
              border: '1px solid var(--border)',
              color: 'var(--pri)',
              minHeight: '30px',
            }"
            @click="send(s.text)"
          >{{ s.label }}</button>

          <!-- More: rotate to show different suggestions -->
          <button
            class="flex-shrink-0 flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-full transition-all active:scale-95 whitespace-nowrap"
            :style="{
              background: 'var(--surf-2)',
              border: '1px dashed var(--border)',
              color: 'var(--text-muted)',
              minHeight: '30px',
            }"
            @click="rotateSuggestions"
            aria-label="Show more suggestions"
            title="More suggestions"
          >
            <span class="material-symbols-outlined" style="font-size: 13px;">refresh</span>
            More
          </button>
        </div>

        <!--
          ── Input row ─────────────────────────────────────────────────────────
          Compact height — mic, text input, send.
          Listening state replaces the text input with an animated pill.
        -->
        <div
          class="flex items-center gap-2 px-3 py-2.5 flex-shrink-0"
          style="border-top: 1px solid var(--border);"
        >
          <!-- Mic -->
          <button
            class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
            :style="listening
              ? 'background: var(--pri-mid);'
              : hasSpeechInput
                ? 'background: var(--surf-2); border: 1px solid var(--border);'
                : 'background: var(--surf-2); border: 1px solid var(--border); opacity: 0.35; cursor: not-allowed;'"
            @click="toggleVoice"
            :disabled="!hasSpeechInput"
            :aria-label="listening ? 'Stop recording' : 'Voice input'"
            :aria-pressed="listening"
          >
            <span
              class="material-symbols-outlined"
              style="font-size: 17px;"
              :style="listening
                ? 'color:white; font-variation-settings:\'FILL\' 1'
                : 'color: var(--text-muted);'"
            >{{ listening ? 'mic' : 'mic_none' }}</span>
          </button>

          <!-- Listening pill -->
          <div
            v-if="listening"
            class="flex-1 flex items-center gap-2 px-3.5 py-1.5 rounded-full"
            style="background: var(--pri-light); color: var(--pri);"
            aria-live="assertive"
          >
            <span
              class="w-1.5 h-1.5 rounded-full"
              style="background: var(--pri-mid); animation: bounce-dot 0.8s ease-in-out infinite;"
            ></span>
            <span class="text-[12px] font-semibold">Listening…</span>
          </div>

          <!-- Text input -->
          <input
            v-else
            v-model="input"
            type="text"
            :placeholder="offlineMode ? 'Ask anything (offline)…' : 'Ask SolarBuddy anything…'"
            class="flex-1 rounded-full px-3.5 py-1.5 text-[12.5px] outline-none border transition-all"
            style="
              min-height: 36px;
              background: var(--surf-2);
              border-color: var(--border);
              color: var(--text);
            "
            aria-label="Message SolarBuddy"
            @keydown.enter="send()"
          />

          <!-- Send -->
          <button
            class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all active:scale-95"
            :style="{
              background: 'var(--pri-mid)',
              opacity: (input.trim() && !loading && !listening) ? '1' : '0.3',
            }"
            :disabled="loading || !input.trim() || listening"
            @click="send()"
            aria-label="Send message"
          >
            <span class="material-symbols-outlined" style="font-size:16px; color:white;">send</span>
          </button>
        </div>

      </div>
    </Transition>

    <!-- ── FAB ─────────────────────────────────────────────────────────────── -->
    <div class="relative flex-shrink-0">
      <!-- Offline dot on FAB -->
      <span
        v-if="!isOnline"
        class="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 z-10"
        style="background: #f87171; border-color: var(--surf);"
        aria-hidden="true"
        title="Offline"
      ></span>

      <button
        class="w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95"
        style="
          width: 52px; height: 52px;
          background: linear-gradient(135deg, var(--pri) 0%, var(--pri-mid) 100%);
          box-shadow: 0 4px 18px rgba(25,120,229,0.38);
        "
        @click="open = !open"
        :aria-expanded="open"
        :aria-label="open ? 'Close SolarBuddy' : 'Open SolarBuddy energy assistant'"
      >
        <Transition name="fab-icon" mode="out-in">
          <span
            :key="open ? 'c' : 'o'"
            class="material-symbols-outlined"
            style="font-size: 22px; color: white; font-variation-settings:'FILL' 1,'wght' 400;"
          >{{ open ? 'close' : 'energy_savings_leaf' }}</span>
        </Transition>
      </button>
    </div>

  </div>
</template>

<style scoped>
/* Slide-up entrance */
.chat-slide-enter-active { transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.34,1.4,0.64,1); }
.chat-slide-leave-active { transition: opacity 0.14s ease, transform 0.14s ease; }
.chat-slide-enter-from   { opacity: 0; transform: translateY(12px) scale(0.96); }
.chat-slide-leave-to     { opacity: 0; transform: translateY(6px)  scale(0.98); }

/* Message entrance */
.chat-msg { animation: msgIn 0.18s ease; }
@keyframes msgIn {
  from { opacity: 0; transform: translateY(5px); }
  to   { opacity: 1; transform: translateY(0);   }
}

/* Typing dots */
@keyframes bounce-dot {
  0%, 80%, 100% { transform: translateY(0);    opacity: 0.45; }
  40%           { transform: translateY(-4px); opacity: 1;    }
}

/* FAB icon swap */
.fab-icon-enter-active, .fab-icon-leave-active { transition: all 0.16s ease; }
.fab-icon-enter-from { opacity: 0; transform: scale(0.5) rotate(-25deg); }
.fab-icon-leave-to   { opacity: 0; transform: scale(0.5) rotate(25deg);  }

/* Hide suggestion scrollbar on WebKit */
div[aria-label="Quick suggestions"]::-webkit-scrollbar { display: none; }
</style>