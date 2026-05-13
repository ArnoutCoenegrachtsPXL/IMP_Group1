<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// Get a free Gemini key at https://aistudio.google.com/apikey
// Add to frontend/.env.local:  VITE_GEMINI_KEY=your_key_here
// ─────────────────────────────────────────────────────────────────────────────
const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY || ''
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const prefs = useUserPrefsStore()

// ── Online / offline ──────────────────────────────────────────────────────────
const isOnline      = ref(navigator.onLine)
const hasApiKey     = computed(() => Boolean(GEMINI_KEY))
const isOfflineMode = computed(() => !isOnline.value || !hasApiKey.value)

onMounted(() => {
  window.addEventListener('online',  () => { isOnline.value = true  })
  window.addEventListener('offline', () => { isOnline.value = false })
})
onUnmounted(() => {
  window.removeEventListener('online',  () => { isOnline.value = true  })
  window.removeEventListener('offline', () => { isOnline.value = false })
  window.speechSynthesis?.cancel()
})

// ── Speech ────────────────────────────────────────────────────────────────────
const hasSpeechInput  = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
const hasSpeechOutput = 'speechSynthesis' in window

// ── UI state ──────────────────────────────────────────────────────────────────
const open           = ref(false)
const loading        = ref(false)
const listening      = ref(false)
const ttsEnabled     = ref(false)
const isSpeaking     = ref(false)
const input          = ref('')
const msgEl          = ref(null)
const activeCategory = ref('general')

// ── Live app context — reads directly from userPrefs store ───────────────────
const ctx = computed(() => ({
  name:        prefs.profile.displayName || 'there',
  location:    prefs.profile.location    || 'South Africa',
  currency:    prefs.currency            || 'ZAR',
  unit:        prefs.energyUnit          || 'kWh',
  offPeak:     (prefs.peakStart || '22:00') + '–' + (prefs.peakEnd || '06:00'),
  hasEV:       prefs.energy?.ev          || false,
  smartSched:  prefs.energy?.smart       || false,
  autoOffset:  prefs.energy?.autoOffset  || false,
  communityShare: prefs.energy?.community || false,
  priceAlerts: prefs.notif?.priceAlerts  || false,
  pushEnabled: prefs.notif?.push         || false,
  maintenanceTips: prefs.notif?.maintenanceTips || false,
  leaderboard: prefs.features?.leaderboard !== false,
  energyTips:  prefs.features?.energyTips  !== false,
  streak:      prefs.features?.streak      !== false,
  theme:       prefs.themeMode           || 'system',
  twoFactor:   prefs.twoFactor           || false,
}))

// ─────────────────────────────────────────────────────────────────────────────
// OFFLINE KNOWLEDGE BASE
// 20 topic entries covering energy, app navigation, and settings.
// Each reply() is a function receiving ctx so it can personalise the answer.
// ─────────────────────────────────────────────────────────────────────────────
const KNOWLEDGE = [
  // APP NAVIGATION
  { keys:['dashboard','home','overview','hub'], cat:'app', label:'Dashboard overview',
    reply: c=>`Your Dashboard is BrightBox's live energy command centre, ${c.name}. It shows real-time production vs consumption, battery storage status, your green energy mix percentage, and a 24-hour usage chart. Everything updates automatically — no refresh needed.` },
  { keys:['upload','meter','reading','submit','log'], cat:'app', label:'Upload a meter reading',
    reply: ()=>`To upload a reading, tap the ⚡ icon in the sidebar or the meter icon in the top bar. You can type the reading manually or photograph your meter display. Readings sync to your account and update your monthly usage charts. You can log offline — it syncs when you reconnect.` },
  { keys:['leaderboard','rank','ranking','position'], cat:'app', label:'My leaderboard rank',
    reply: c=>c.leaderboard
      ? `The Leaderboard ranks your community by renewable energy percentage. Your position improves when your green usage rises. You can toggle public display of your name in Settings → Privacy & Data. ${c.communityShare ? 'Your metrics are currently shared with the community.' : 'Enable Community Sharing in Settings → Energy to contribute your data.'}`
      : `The Leaderboard is currently hidden. Go to Settings → App Features and toggle "Leaderboard" on to see your community ranking.` },
  { keys:['energy tips','tips page','efficiency page','advice'], cat:'app', label:'Energy Tips page',
    reply: c=>c.energyTips
      ? `The Energy Tips page has personalised recommendations based on your usage patterns, ${c.name}. Covers appliance efficiency, solar optimisation, off-peak scheduling, and seasonal tips. Find it in the sidebar under "Energy Tips".`
      : `Energy Tips is currently disabled. Go to Settings → App Features → Energy Tips and toggle it on.` },
  { keys:['support','help','contact','bug','problem'], cat:'app', label:'Get support',
    reply: ()=>`For help, visit the Support page via the sidebar bottom-left link. You'll find searchable articles, FAQ, and a contact form. We respond within 24 hours on business days (4 hours for urgent issues). Email: support@brightbox.app.` },
  { keys:['navigation','sidebar','menu','find','where'], cat:'app', label:'App navigation',
    reply: ()=>`BrightBox navigation:\n• 🏠 Dashboard — live overview\n• 🏆 Leaderboard — community rankings\n• ⚡ Upload Meter — log readings\n• 💡 Energy Tips — saving advice\n• ⚙️ Settings — all preferences\n• ❓ Support — help & contact\n\nOn mobile, tap the ☰ menu icon in the top-left to open the sidebar.` },

  // ENERGY TIPS
  { keys:['save','reduce','lower bill','cut cost','electricity cost','save energy'], cat:'tips', label:'How to save energy',
    reply: c=>`Top 5 energy savers for you, ${c.name}:\n\n1. 🌙 Shift heavy loads to your off-peak window (${c.offPeak})\n2. 💡 Replace incandescent bulbs with LEDs — up to 80% less energy\n3. 🔌 Unplug standby devices — they account for ~10% of bills\n4. 🌡️ Set your geyser to 55°C — safe and efficient\n5. ☀️ Run high-draw appliances at solar peak (10:00–14:00)\n\nYour off-peak window is ${c.offPeak} — that is the cheapest time to run any major appliance.` },
  { keys:['peak','tariff','rate','eskom','off-peak','tou','time of use','pricing'], cat:'tips', label:'Peak hours & tariffs',
    reply: c=>`Eskom Time-of-Use pricing:\n\n🔴 Peak (most expensive): 07:00–10:00 and 17:00–20:00 weekdays\n🟡 Standard: remaining weekday hours\n🟢 Off-Peak (cheapest): ${c.offPeak} and all weekends\n\nYour configured off-peak window is ${c.offPeak}. ${c.priceAlerts ? '✅ Price alerts are ON — you get a 30-min heads-up before peak windows.' : '💡 Enable Price Alerts in Settings → Notifications for automatic heads-up before expensive periods.'}` },
  { keys:['geyser','water heater','hot water','boiler','element'], cat:'tips', label:'Geyser efficiency',
    reply: c=>`Your geyser typically uses 30–40% of your total electricity. Key steps:\n\n• Set thermostat to 55°C (kills bacteria, not wasteful)\n• Install a timer to heat only during off-peak (${c.offPeak})\n• Insulate the geyser and first 1m of hot water pipes\n• Fix dripping taps — they waste 15 L/day of heated water\n• A solar geyser system can cut water heating costs by up to 60%` },
  { keys:['solar','panel','pv','photovoltaic','generation','produce','output'], cat:'tips', label:'Solar tips',
    reply: c=>`Maximising solar output:\n\n☀️ Clean panels every 6–8 weeks (dust cuts output up to 20%)\n🧭 South-facing panels at 25–30° tilt are optimal in ${c.location}\n⚡ Run high-draw appliances at midday (10:00–14:00) when production peaks\n🌡️ Panels lose ~0.4% efficiency per °C above 25°C — ensure airflow underneath\n\n${c.autoOffset ? '✅ Auto-Offset is enabled — surplus solar is automatically fed to the grid.' : '💡 Enable Auto-Offset in Settings → Energy to monetise surplus generation.'}` },
  { keys:['battery','storage','backup','load shedding','loadshedding','stage'], cat:'tips', label:'Battery & backup',
    reply: ()=>`Battery management best practices:\n\n• Charge during off-peak hours or from solar midday\n• Keep state-of-charge between 20–90% for longevity\n• During load-shedding, prioritise: fridge, lights, Wi-Fi router\n• A 10 kWh battery supports ~4–6 hours of average home load\n• Check your Dashboard → Battery card for live charge level and runtime estimate` },
  { keys:['appliance','fridge','washing machine','dishwasher','dryer','oven','microwave','kettle'], cat:'tips', label:'Appliance rankings',
    reply: c=>`Appliances by energy draw (highest first):\n\n1. 🔥 Geyser: 2–4 kW → schedule for ${c.offPeak}\n2. 🧺 Tumble dryer: 2–2.5 kW → use cold wash + line dry\n3. 🍳 Oven/stove: 1.5–2.5 kW → use air fryer for small meals\n4. 🧽 Dishwasher: 1.2–1.8 kW → run eco mode overnight\n5. 💡 LED bulbs: 7–10 W (vs 60 W incandescent) — switch immediately` },
  { keys:['ev','electric vehicle','car charge','electric car'], cat:'tips', label:'EV charging tips',
    reply: c=>`EV charging strategy:\n\n🟢 Always charge during off-peak (${c.offPeak}) — lowest rates\n⚡ A 7.4 kW home charger adds ~40 km of range per hour\n🔋 Keep charge between 20–80% for battery health\n🌞 With solar, schedule charging for midday surplus\n\n${c.hasEV ? '✅ EV Off-Peak Charging is enabled — your charger defers automatically to off-peak windows.' : '💡 Enable EV Off-Peak Charging in Settings → Energy to automate this.'}` },
  { keys:['maintain','maintenance','clean','service','inspect'], cat:'tips', label:'Maintenance schedule',
    reply: c=>`Recommended maintenance schedule:\n\n📅 Monthly: Clean solar panels, check inverter for error codes\n📅 Every 6 months: Test battery backup runtime, check geyser element, inspect electrical connections\n📅 Annually: Professional solar inspection, full geyser service, electrical certificate\n\n${c.maintenanceTips ? '✅ Maintenance Tips are enabled — BrightBox will send automatic reminders.' : '💡 Enable Maintenance Tips in Settings → Notifications for automatic reminders.'}` },
  { keys:['inverter','error','fault','trip','breaker','no power'], cat:'tips', label:'Inverter troubleshooting',
    reply: ()=>`Common inverter issues:\n\n⚠️ Red/amber light: Note the fault code and check your manual\n🔌 No output: Check AC isolator and DC breaker — both must be ON\n🌡️ Overheating: Ensure 30cm clearance on all sides, not in direct sun\n📶 Monitoring offline: Restart the Wi-Fi adapter, re-pair via inverter app\n⚡ Grid fault: Inverters wait ~5 min for grid stability before reconnecting automatically\n\nAlways call a qualified electrician for internal faults.` },

  // SETTINGS
  { keys:['theme','dark mode','light mode','colour','color','accent','appearance'], cat:'settings', label:'Change theme & colours',
    reply: c=>`BrightBox has three colour modes: Light, Dark, and System. ${c.theme === 'dark' ? '🌙 You\'re in Dark mode.' : c.theme === 'light' ? '☀️ You\'re in Light mode.' : '⚙️ You\'re using System mode (follows device).'} You can also choose from 8 accent palettes: Ocean Blue, Solar Green, Royal Violet, Ruby Rose, Warm Amber, Midnight Slate, Coral Sunset, and Pacific Teal. Go to Settings → Appearance — changes apply instantly.` },
  { keys:['notification','alert','push','email notification','digest'], cat:'settings', label:'Notification settings',
    reply: c=>`Your notification summary:\n\n${c.pushEnabled ? '✅ Push notifications: ON' : '❌ Push notifications: OFF'}\n${c.priceAlerts ? '✅ Price alerts: ON' : '❌ Price alerts: OFF'}\n${c.maintenanceTips ? '✅ Maintenance tips: ON' : '❌ Maintenance tips: OFF'}\n\nManage everything in Settings → Notifications. You can send test alerts from there to confirm they work.` },
  { keys:['profile','avatar','name','photo','update profile'], cat:'settings', label:'Update my profile',
    reply: c=>`Hi ${c.name}! Your profile includes your display name, email, phone, bio, location, pronouns, and profile photo. Photo changes sync instantly to the sidebar and top bar — no page reload needed. Go to Settings → Profile to update anything.` },
  { keys:['privacy','data','gdpr','popia','delete data','download data'], cat:'settings', label:'Privacy & data',
    reply: c=>`BrightBox is POPIA and GDPR compliant. Your rights:\n\n📥 Download all your data as JSON from Settings → Privacy & Data\n🗑️ Request account deletion (processed within 21 business days)\n🔒 Community sharing: ${c.communityShare ? 'currently ON' : 'currently OFF'}\n\nWe never sell your data. Read the full Privacy Policy via Settings → Privacy & Data.` },
  { keys:['security','two factor','2fa','password','authenticator'], cat:'settings', label:'Security settings',
    reply: c=>`Your security status:\n\n${c.twoFactor ? '🔐 Two-factor authentication: ENABLED ✅' : '⚠️ 2FA is NOT enabled — strongly recommended'}\n\nTo enable 2FA, go to Settings → Security. You'll scan a QR code with Google Authenticator or Authy, verify a 6-digit code, then save 8 backup codes. Takes about 2 minutes and significantly improves account security.` },
  { keys:['features','enable','disable','hide page','show page'], cat:'settings', label:'Enable/disable features',
    reply: c=>`Your current feature status:\n\n${c.leaderboard ? '✅' : '❌'} Leaderboard page\n${c.energyTips ? '✅' : '❌'} Energy Tips page\n${c.streak ? '✅' : '❌'} Streak tracker\n✅ Dashboard (always on)\n✅ Upload Meter (always on)\n\nToggle any feature in Settings → App Features. Disabled features hide from navigation instantly and can be re-enabled at any time.` },
]

// ── Categories & bubbles ──────────────────────────────────────────────────────
const CATEGORIES = [
  { id:'general',  label:'General',  icon:'chat'      },
  { id:'tips',     label:'Tips',     icon:'lightbulb' },
  { id:'app',      label:'App Help', icon:'apps'      },
  { id:'settings', label:'Settings', icon:'settings'  },
]

const OFFLINE_BUBBLES = [
  { label:'How to save energy',      text:'Give me quick energy saving tips',              cat:'tips'     },
  { label:'Peak hours & tariffs',    text:'When are peak hours and how do I avoid them?',  cat:'tips'     },
  { label:'My off-peak window',      text:'What is my configured off-peak window?',        cat:'settings' },
  { label:'Geyser efficiency',       text:'How do I save energy on my geyser?',            cat:'tips'     },
  { label:'Solar panel tips',        text:'How do I maximise my solar output?',            cat:'tips'     },
  { label:'Battery management',      text:'How do I manage my battery storage?',           cat:'tips'     },
  { label:'EV charging tips',        text:'How should I charge my EV efficiently?',        cat:'tips'     },
  { label:'Appliance rankings',      text:'Which appliances use the most electricity?',    cat:'tips'     },
  { label:'Maintenance schedule',    text:'What maintenance should I do and when?',        cat:'tips'     },
  { label:'Inverter troubleshooting',text:'My inverter has a fault — what do I do?',       cat:'tips'     },
  { label:'Upload a reading',        text:'How do I upload a meter reading?',              cat:'app'      },
  { label:'App navigation',          text:'Where do I find each section in the app?',      cat:'app'      },
  { label:'My features status',      text:'Which app features do I have enabled?',         cat:'settings' },
  { label:'Notification settings',   text:'What are my current notification settings?',    cat:'settings' },
  { label:'Change theme & colours',  text:'How do I change to dark mode or a colour theme?',cat:'settings'},
  { label:'Privacy & my data',       text:'What data does BrightBox store about me?',      cat:'settings' },
  { label:'Security & 2FA',          text:'How do I set up two-factor authentication?',    cat:'settings' },
  { label:'Get support',             text:'How do I contact BrightBox support?',           cat:'app'      },
]

const ONLINE_BUBBLES = [
  { label:'My leaderboard rank',   text:'What is my leaderboard rank?',       cat:'general' },
  { label:'My weekly stats',       text:'Show me my weekly energy stats',     cat:'general' },
  { label:'Peak hours today',      text:'When are peak hours today?',         cat:'tips'    },
  { label:'Solar tips',            text:'How do I maximise solar output?',    cat:'tips'    },
  { label:'Compare to neighbours', text:'How do I compare to neighbours?',    cat:'general' },
]

const filteredBubbles = computed(() => {
  const all = isOfflineMode.value ? OFFLINE_BUBBLES : ONLINE_BUBBLES
  if (activeCategory.value === 'general') return all.filter(b => b.cat === 'general' || isOfflineMode.value).slice(0, 6)
  return all.filter(b => b.cat === activeCategory.value)
})

// ── Offline answer engine ─────────────────────────────────────────────────────
function findOfflineAnswer(text) {
  const t = text.toLowerCase()
  const c = ctx.value

  // Direct keyword match
  const match = KNOWLEDGE.find(e => e.keys.some(k => t.includes(k)))
  if (match) return match.reply(c)

  // Partial match
  const partial = KNOWLEDGE.find(e =>
    e.keys.some(k => k.split(' ').some(w => w.length > 3 && t.includes(w)))
  )
  if (partial) return partial.reply(c)

  // Friendly fallbacks
  if (/\b(hi|hello|hey|howzit)\b/.test(t)) return `Hi ${c.name}! 👋 I'm SolarBuddy. Ask me about energy saving, your app settings, or any BrightBox feature. I work offline too!`
  if (/thank/.test(t)) return `You're very welcome, ${c.name}! 😊 Let me know if you have more questions.`
  if (/who are you|what are you|your name/.test(t)) return `I'm SolarBuddy 🌱 — BrightBox's built-in energy assistant. I know your app settings, can give energy-saving advice, and help you use every feature. I work fully offline too!`

  return `I don't have a specific answer for that in offline mode, ${c.name}. Try asking about:\n• Energy saving tips or peak hours\n• Geyser, solar, battery, or EV tips\n• App navigation and features\n• Your settings (notifications, theme, privacy, security)\n\nOr reconnect to the internet for full AI responses on any topic.`
}

// ── Greeting ──────────────────────────────────────────────────────────────────
function getGreeting() {
  const c    = ctx.value
  const hour = new Date().getHours()
  const tod  = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
  if (isOfflineMode.value) {
    return `Good ${tod}, ${c.name}! ⚡\n\nI'm SolarBuddy — your offline energy assistant. I have full access to your BrightBox settings and a built-in knowledge base covering energy savings, app features, and all your preferences.\n\nTap a category below or type anything!`
  }
  return `Good ${tod}, ${c.name}! 😊 I'm SolarBuddy — your BrightBox AI assistant. Ask me about energy savings, your settings, or anything about the app!`
}

// ── Messages ──────────────────────────────────────────────────────────────────
const messages = ref([{ role:'assistant', content: getGreeting(), time: nowStr() }])

// ── Main send ─────────────────────────────────────────────────────────────────
async function send(text) {
  const msg = (text || input.value).trim()
  if (!msg || loading.value) return
  input.value = ''
  messages.value.push({ role:'user', content:msg, time:nowStr() })
  loading.value = true
  await nextTick(); scrollDown()

  if (isOfflineMode.value) {
    await sleep(280)
    pushBot(findOfflineAnswer(msg))
    loading.value = false
    await nextTick(); scrollDown()
    return
  }

  // Online + API key
  try {
    const c = ctx.value
    const systemPrompt = `You are SolarBuddy, a friendly expert energy assistant for BrightBox. User context:\nName: ${c.name} | Location: ${c.location} | Currency: ${c.currency} | Unit: ${c.unit}\nOff-peak: ${c.offPeak} | EV: ${c.hasEV} | Smart scheduling: ${c.smartSched} | Auto-offset: ${c.autoOffset}\nPrice alerts: ${c.priceAlerts} | Push: ${c.pushEnabled} | Features: leaderboard=${c.leaderboard}, energyTips=${c.energyTips}, streak=${c.streak}\nUse this context to personalise answers. Keep to 3–5 sentences. Include one actionable tip. Only discuss energy, sustainability, or BrightBox.`

    const history = messages.value.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }))

    const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ systemInstruction:{parts:[{text:systemPrompt}]}, contents:history, generationConfig:{maxOutputTokens:400, temperature:0.7} })
    })
    if (!res.ok) throw new Error(`API ${res.status}`)
    const data = await res.json()
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!reply) throw new Error('empty')
    pushBot(reply)
  } catch {
    pushBot(`⚠️ AI unavailable right now.\n\n${findOfflineAnswer(msg)}`)
  }

  loading.value = false
  await nextTick(); scrollDown()
}

function pushBot(text) {
  messages.value.push({ role:'assistant', content:text, time:nowStr() })
  if (ttsEnabled.value && hasSpeechOutput) nextTick(() => setTimeout(() => speak(text), 80))
}

function scrollDown() {
  nextTick(() => { if (msgEl.value) msgEl.value.scrollTop = msgEl.value.scrollHeight })
}

function nowStr() { return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) }
function sleep(ms) { return new Promise(r=>setTimeout(r,ms)) }

function clearChat() {
  messages.value = [{ role:'assistant', content:getGreeting(), time:nowStr() }]
  activeCategory.value = 'general'
}

// ── TTS ───────────────────────────────────────────────────────────────────────
function speak(text) {
  if (!hasSpeechOutput || !text?.trim()) return
  const clean = text.replace(/[^\x00-\x7F]/g,'').replace(/\n+/g,'. ')
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(clean)
  utt.rate=0.92; utt.pitch=1.0; utt.lang='en-US'
  const voices = window.speechSynthesis.getVoices()
  const best = voices.find(v=>v.name.toLowerCase().includes('google')||(v.lang==='en-US'&&!v.name.toLowerCase().includes('espeak')))
  if (best) utt.voice = best
  utt.onstart=()=>{isSpeaking.value=true}; utt.onend=()=>{isSpeaking.value=false}; utt.onerror=()=>{isSpeaking.value=false}
  window.speechSynthesis.speak(utt)
}
function toggleTts() { ttsEnabled.value=!ttsEnabled.value; if(!ttsEnabled.value){window.speechSynthesis?.cancel();isSpeaking.value=false} }
if (hasSpeechOutput) window.speechSynthesis.onvoiceschanged = () => {}

// ── Voice input ───────────────────────────────────────────────────────────────
let recognition = null
function toggleVoice() {
  if (!hasSpeechInput) { pushBot('Voice input not supported in this browser. Try Chrome or Edge.'); return }
  if (listening.value) { recognition?.stop(); listening.value=false; return }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  recognition = new SR(); recognition.lang='en-US'; recognition.continuous=false; recognition.interimResults=false; recognition.maxAlternatives=1
  recognition.onstart  = ()=>{listening.value=true}
  recognition.onend    = ()=>{listening.value=false}
  recognition.onerror  = e=>{listening.value=false; if(e.error==='not-allowed') pushBot('Microphone access denied. Allow it in browser settings.')}
  recognition.onresult = e=>{listening.value=false; input.value=e.results[0][0].transcript; setTimeout(()=>send(),250)}
  try{recognition.start()}catch{listening.value=false}
}
</script>

<template>
  <div class="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-3">

    <!-- Chat window -->
    <Transition name="chat-slide">
      <div v-if="open"
        class="flex flex-col rounded-[20px] overflow-hidden"
        style="width:min(92vw,380px); background:var(--surf-card); border:1px solid var(--border); box-shadow:0 12px 48px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08);"
        role="dialog" aria-label="SolarBuddy chat" aria-modal="true">

        <!-- Header -->
        <div class="flex items-center gap-2.5 px-4 py-3 flex-shrink-0"
          style="background:linear-gradient(135deg, var(--pri) 0%, var(--pri-mid) 100%);">
          <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style="background:rgba(255,255,255,0.18); border:1.5px solid rgba(255,255,255,0.3);">
            <span class="material-symbols-outlined text-[20px]"
              style="color:white; font-variation-settings:'FILL' 1,'wght' 400;">energy_savings_leaf</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white font-bold text-[14px] leading-tight tracking-tight">SolarBuddy</p>
            <div class="flex items-center gap-1.5 mt-0.5">
              <span class="w-1.5 h-1.5 rounded-full flex-shrink-0"
                :style="isOnline?'background:#4ade80':'background:#fca5a5'"></span>
              <span class="text-[10.5px] truncate font-medium" style="color:rgba(255,255,255,0.82);">
                {{ !isOnline ? 'Offline — built-in knowledge active'
                   : !hasApiKey ? 'No API key — built-in knowledge active'
                   : 'Online · Full AI active' }}
              </span>
            </div>
          </div>
          <button v-if="hasSpeechOutput"
            class="w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0"
            :style="ttsEnabled?'background:rgba(255,255,255,0.28);box-shadow:0 0 0 1.5px rgba(255,255,255,0.5);':'background:rgba(255,255,255,0.12);'"
            @click="toggleTts" :aria-pressed="ttsEnabled" title="Toggle read aloud">
            <span class="material-symbols-outlined text-[16px]" style="color:white;"
              :style="ttsEnabled?'font-variation-settings:\'FILL\' 1':''">
              {{ ttsEnabled ? 'volume_up' : 'volume_off' }}
            </span>
          </button>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style="background:rgba(255,255,255,0.12);" @click="clearChat" title="Clear chat" aria-label="Clear chat">
            <span class="material-symbols-outlined text-[15px]" style="color:white;">refresh</span>
          </button>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style="background:rgba(255,255,255,0.12);" @click="open=false" aria-label="Close SolarBuddy">
            <span class="material-symbols-outlined text-[15px]" style="color:white;">close</span>
          </button>
        </div>

        <!-- Offline / no-key banner -->
        <div v-if="isOfflineMode"
          class="flex items-start gap-2 px-3 py-2.5 text-[11.5px] flex-shrink-0 font-medium"
          :style="isOnline
            ? 'background:rgba(234,179,8,0.10);color:#a16207;border-bottom:1px solid rgba(234,179,8,0.18);'
            : 'background:rgba(239,68,68,0.08);color:#b91c1c;border-bottom:1px solid rgba(239,68,68,0.15);'"
          role="status" aria-live="polite">
          <span class="material-symbols-outlined text-[15px] flex-shrink-0 mt-0.5">{{ isOnline ? 'key' : 'wifi_off' }}</span>
          <span>
            <strong>{{ isOnline ? 'No Gemini API key' : 'No internet connection' }}</strong> —
            Built-in knowledge mode active. All energy tips and settings data available.
            {{ isOnline ? ' Add VITE_GEMINI_KEY to .env.local for full AI.' : '' }}
          </span>
        </div>

        <!-- Messages -->
        <div ref="msgEl" class="flex flex-col gap-3 p-4 overflow-y-auto flex-1"
          style="max-height:280px; min-height:160px;" aria-live="polite" role="log" aria-label="Chat messages">

          <div v-for="(msg, i) in messages" :key="i"
            class="flex flex-col chat-animate"
            :class="msg.role==='user' ? 'items-end' : 'items-start'">

            <!-- Bot message with avatar -->
            <div v-if="msg.role==='assistant'" class="flex items-end gap-1.5 max-w-[93%]">
              <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
                style="background:linear-gradient(135deg, var(--pri) 0%, var(--pri-mid) 100%);">
                <span class="material-symbols-outlined" style="font-size:10px;color:white;font-variation-settings:'FILL' 1">energy_savings_leaf</span>
              </div>
              <div class="px-3.5 py-2.5 rounded-[15px] rounded-tl-[4px] text-[12.5px] leading-relaxed whitespace-pre-wrap"
                style="background:var(--surf-2); color:var(--text); border:1px solid var(--border);">
                {{ msg.content }}
              </div>
            </div>

            <!-- User message -->
            <div v-else class="px-3.5 py-2.5 rounded-[15px] rounded-tr-[4px] text-[12.5px] leading-relaxed max-w-[88%] whitespace-pre-wrap"
              style="background:linear-gradient(135deg, var(--pri) 0%, var(--pri-mid) 100%); color:#fff;">
              {{ msg.content }}
            </div>

            <span class="text-[10px] mt-1 px-1 font-medium" style="color:var(--text-muted);">
              {{ msg.role==='user' ? 'You' : 'SolarBuddy' }} · {{ msg.time }}
            </span>
          </div>

          <!-- Typing indicator -->
          <div v-if="loading" class="flex items-end gap-1.5 chat-animate">
            <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style="background:linear-gradient(135deg, var(--pri) 0%, var(--pri-mid) 100%);">
              <span class="material-symbols-outlined" style="font-size:10px;color:white;font-variation-settings:'FILL' 1">energy_savings_leaf</span>
            </div>
            <div class="px-4 py-3 rounded-[15px] rounded-tl-[4px]"
              style="background:var(--surf-2); border:1px solid var(--border);"
              aria-label="SolarBuddy is typing" role="status">
              <div class="flex gap-1.5 items-center h-3">
                <span v-for="n in 3" :key="n" class="w-1.5 h-1.5 rounded-full"
                  :style="{background:'var(--text-muted)', animation:`bounce-dot 1.2s ease-in-out ${(n-1)*0.2}s infinite`}">
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Category tabs -->
        <div class="flex gap-1.5 px-3 pt-2 pb-0.5 flex-shrink-0 overflow-x-auto scrollbar-hide" role="tablist">
          <button v-for="cat in CATEGORIES" :key="cat.id"
            class="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold whitespace-nowrap transition-all flex-shrink-0 border"
            :style="activeCategory===cat.id
              ? 'background:var(--pri-mid);color:#fff;border-color:var(--pri-mid);'
              : 'background:var(--surf-2);color:var(--text-muted);border-color:var(--border);'"
            role="tab" :aria-selected="activeCategory===cat.id"
            @click="activeCategory=cat.id">
            <span class="material-symbols-outlined text-[12px]"
              :style="activeCategory===cat.id?'font-variation-settings:\'FILL\' 1':''">{{ cat.icon }}</span>
            {{ cat.label }}
          </button>
        </div>

        <!-- Prompt bubbles -->
        <div class="flex gap-1.5 overflow-x-auto px-3 py-2 flex-shrink-0 scrollbar-hide"
          style="-webkit-overflow-scrolling:touch;" role="group" aria-label="Quick prompts">
          <button v-for="b in filteredBubbles" :key="b.label"
            class="flex-shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all active:scale-95 whitespace-nowrap"
            :style="'background:var(--surf-2); border:1px solid var(--border); color:var(--pri);'"
            @click="send(b.text)">{{ b.label }}</button>
        </div>

        <!-- Offline feature pills (first open only) -->
        <div v-if="isOfflineMode && messages.length<=1"
          class="flex flex-wrap gap-1.5 px-3 pb-3 flex-shrink-0">
          <div class="w-full text-[9.5px] font-black uppercase tracking-widest mb-1" style="color:var(--text-muted);">
            Available offline
          </div>
          <span v-for="f in ['Energy tips','App navigation','Settings help','Peak hours','Maintenance tips','Your preferences']" :key="f"
            class="text-[10.5px] font-semibold px-2.5 py-1 rounded-full"
            style="background:rgba(34,197,94,0.08);color:#15803d;border:1px solid rgba(34,197,94,0.2);">
            ✓ {{ f }}
          </span>
          <span class="text-[10.5px] font-semibold px-2.5 py-1 rounded-full"
            style="background:rgba(239,68,68,0.06);color:#b91c1c;border:1px solid rgba(239,68,68,0.15);">
            ✗ Live data
          </span>
          <span class="text-[10.5px] font-semibold px-2.5 py-1 rounded-full"
            style="background:rgba(239,68,68,0.06);color:#b91c1c;border:1px solid rgba(239,68,68,0.15);">
            ✗ Leaderboard
          </span>
        </div>

        <!-- Input row -->
        <div class="flex items-center gap-2 px-3 py-3 flex-shrink-0" style="border-top:1px solid var(--border);">
          <button
            class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all border"
            :style="listening
              ? 'background:var(--pri-mid);border-color:var(--pri-mid);'
              : hasSpeechInput
                ? 'background:var(--surf-2);border-color:var(--border);'
                : 'background:var(--surf-2);border-color:var(--border);opacity:0.4;cursor:not-allowed;'"
            @click="toggleVoice" :disabled="!hasSpeechInput"
            :aria-label="listening?'Stop recording':'Voice input'">
            <span class="material-symbols-outlined text-[17px]"
              :style="listening?'color:white;font-variation-settings:\'FILL\' 1':'color:var(--text-muted);'">
              {{ listening ? 'mic' : 'mic_none' }}
            </span>
          </button>

          <div v-if="listening" class="flex-1 flex items-center gap-2 px-4 py-2 rounded-full"
            style="background:var(--pri-light);color:var(--pri);" aria-live="assertive">
            <span class="w-1.5 h-1.5 rounded-full" style="background:var(--pri-mid);animation:bounce-dot 0.8s infinite;"></span>
            <span class="text-[12px] font-semibold">Listening…</span>
          </div>

          <input v-else v-model="input" type="text"
            :placeholder="isOfflineMode ? 'Ask anything (offline)…' : 'Ask SolarBuddy anything…'"
            class="flex-1 rounded-full px-4 py-2 text-[12.5px] outline-none border transition-all"
            :style="'background:var(--surf-2);border-color:var(--border);color:var(--text);'"
            aria-label="Message SolarBuddy"
            @keydown.enter="send()" />

          <button
            class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all active:scale-95"
            :style="{background:'linear-gradient(135deg, var(--pri) 0%, var(--pri-mid) 100%)', opacity:(input.trim()&&!loading&&!listening)?'1':'0.3'}"
            :disabled="loading||!input.trim()||listening" @click="send()" aria-label="Send">
            <span class="material-symbols-outlined text-[16px]" style="color:white;">send</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- FAB -->
    <div class="relative flex-shrink-0">
      <span v-if="!isOnline"
        class="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full border-2 z-10 flex items-center justify-center"
        style="background:#f97316;border-color:var(--surf);" title="Offline — local mode" aria-hidden="true">
        <span class="material-symbols-outlined text-white" style="font-size:9px;">wifi_off</span>
      </span>
      <span v-if="!isOnline && !open"
        class="absolute inset-0 rounded-full opacity-25"
        style="background:var(--pri-mid); animation:pulse-ring 2s cubic-bezier(0,0,0.2,1) infinite;"
        aria-hidden="true"></span>
      <button
        class="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95"
        :style="{background:'linear-gradient(135deg, var(--pri) 0%, var(--pri-mid) 100%)', boxShadow:open?'0 2px 12px rgba(25,120,229,0.3)':'0 6px 24px rgba(25,120,229,0.45)'}"
        @click="open=!open" :aria-expanded="open" :aria-label="open?'Close SolarBuddy':'Open SolarBuddy'">
        <span class="material-symbols-outlined text-[24px]"
          style="color:white; font-variation-settings:'FILL' 1,'wght' 400;">
          {{ open ? 'close' : 'energy_savings_leaf' }}
        </span>
      </button>
    </div>

  </div>
</template>

<style scoped>
.chat-slide-enter-active { transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1); }
.chat-slide-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.chat-slide-enter-from   { opacity:0; transform:translateY(16px) scale(0.95); }
.chat-slide-leave-to     { opacity:0; transform:translateY(8px) scale(0.97); }

.chat-animate { animation: chatIn 0.2s ease; }
@keyframes chatIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }

@keyframes bounce-dot {
  0%, 80%, 100% { transform:translateY(0); opacity:0.5; }
  40%           { transform:translateY(-5px); opacity:1; }
}
@keyframes pulse-ring {
  0%   { transform:scale(1);   opacity:0.35; }
  100% { transform:scale(1.65); opacity:0; }
}
</style>
