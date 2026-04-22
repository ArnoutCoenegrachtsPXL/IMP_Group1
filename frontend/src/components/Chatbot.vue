<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'

// ─────────────────────────────────────────────────────────────
// CONFIGURATION
// Get a free Gemini API key at: https://aistudio.google.com/apikey
// Then add this line to frontend/.env.local:
//   VITE_GEMINI_KEY=your_key_here
// ─────────────────────────────────────────────────────────────
const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY || ''
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const SYSTEM_PROMPT =
  'You are SolarBuddy, a friendly energy assistant for BrightBox — a community energy monitoring app. ' +
  'Help users understand energy usage, compare with neighbours, give saving tips, ' +
  'explain leaderboard and gamification features, and guide them through the app. ' +
  'Keep responses to 2–4 sentences. Always include one actionable tip. ' +
  'Only discuss topics related to energy, sustainability, or the BrightBox app.'

// ─── Online detection ─────────────────────────────────────────
const isOnline = ref(navigator.onLine)
const updateOnline  = () => { isOnline.value = true  }
const updateOffline = () => { isOnline.value = false }
onMounted(() => {
  window.addEventListener('online',  updateOnline)
  window.addEventListener('offline', updateOffline)
})
onUnmounted(() => {
  window.removeEventListener('online',  updateOnline)
  window.removeEventListener('offline', updateOffline)
  window.speechSynthesis?.cancel()
})

// ─── Speech support ───────────────────────────────────────────
const hasSpeechInput  = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
const hasSpeechOutput = 'speechSynthesis' in window

// ─── UI state ─────────────────────────────────────────────────
const open       = ref(false)
const loading    = ref(false)
const listening  = ref(false)
const ttsEnabled = ref(false)
const isSpeaking = ref(false)
const input      = ref('')
const msgEl      = ref(null)

// ─── Message store ────────────────────────────────────────────
const messages = ref([
  {
    role: 'assistant',
    content: 'Greetings! I\'m SolarBuddy 😁. Ask me anything - your energy usage, saving tips, or the leaderboard.',
    time: nowStr()
  }
])

// ─── Suggestions change based on connectivity ─────────────────
const suggestions = computed(() =>
  isOnline.value
    ? ['My leaderboard rank', 'How can I save energy?', 'Peak hours today', 'My weekly stats']
    : ['Quick saving tips', 'About streaks', 'Peak hour advice', 'Upload a reading']
)

// ─── Local offline answers (no internet needed) ──────────────
const localMap = [
  { keys: ['compare','neighbour'],      reply: 'Community comparisons need an internet connection. Reconnect to see how you rank against your neighbours.' },
  { keys: ['report','weekly','stats'],  reply: 'Your weekly report pulls live data from the server. It\'ll load as soon as you\'re back online.' },
  { keys: ['peak','hour'],              reply: 'Peak hours are typically 5–8 PM on weekdays. Shift dishwashers, washing machines, and EV charging to after 9 PM to save on your bill.' },
  { keys: ['save','tip','reduce','energy'], reply: 'Quick offline tips: turn off standby devices, use cold washes, and close blinds in summer to cut cooling costs.' },
  { keys: ['streak'],                   reply: 'Keep your daily usage below the community average to maintain your streak and climb the leaderboard!' },
  { keys: ['upload','meter','reading'], reply: 'You can still navigate to Upload Meter in the sidebar to log a reading — it\'ll sync when you reconnect.' },
  { keys: ['leaderboard','rank'],       reply: 'Sorry, Currently offline, I\'ll let you know once I reconnect.' },
]

function localReply(text) {
  const t = text.toLowerCase()
  const match = localMap.find(e => e.keys.some(k => t.includes(k)))
  return match?.reply
    ?? 'I\'m in offline mode right now. I can answer basic energy questions, but live data needs an internet connection.'
}

// ─── Text to speach availability ─────────────────────────────────────────────
function speak(text) {
  if (!hasSpeechOutput || !text?.trim()) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.rate  = 0.93
  utt.pitch = 1.0
  utt.lang  = 'en-US'
  // Pick best available voice
  const voices = window.speechSynthesis.getVoices()
  const best = voices.find(v =>
    v.name.toLowerCase().includes('google') ||
    v.name.toLowerCase().includes('samantha') ||
    (v.lang === 'en-US' && !v.name.toLowerCase().includes('espeak'))
  )
  if (best) utt.voice = best
  utt.onstart = () => { isSpeaking.value = true  }
  utt.onend   = () => { isSpeaking.value = false }
  utt.onerror = () => { isSpeaking.value = false }
  window.speechSynthesis.speak(utt)
}

function toggleTts() {
  ttsEnabled.value = !ttsEnabled.value
  if (!ttsEnabled.value) {
    window.speechSynthesis?.cancel()
    isSpeaking.value = false
  }
}

// ─── Watch voices load (async in some browsers) ──────────────
// Voices may not be ready immediately — this ensures speak() gets them
if (hasSpeechOutput) {
  window.speechSynthesis.onvoiceschanged = () => {} // trigger load
}

// ─── Main send function ───────────────────────────────────────
async function send(text) {
  const msg = (text || input.value).trim()
  if (!msg || loading.value) return
  input.value = ''

  messages.value.push({ role: 'user', content: msg, time: nowStr() })
  loading.value = true
  await nextTick()
  scrollDown()

  // ── Offline: answer locally ──────────────────────────────────
  if (!isOnline.value) {
    await sleep(350)
    const reply = localReply(msg)
    pushBot(reply)
    loading.value = false
    await nextTick()
    scrollDown()
    return
  }

  // ── No API key configured ─────────────────────────────────────
  if (!GEMINI_KEY) {
    pushBot('⚙️ SolarBuddy isn\'t configured yet.')
    loading.value = false
    await nextTick()
    scrollDown()
    return
  }

  // ── Online: call Gemini API ───────────────────────────────────
  try {
    // Build conversation for Gemini: system prompt injected as first user turn
    const history = messages.value.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }))

    const body = {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: history,
      generationConfig: { maxOutputTokens: 300, temperature: 0.7 }
    }

    const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      const errMsg = err?.error?.message || `API error ${res.status}`
      throw new Error(errMsg)
    }

    const data  = await res.json()
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!reply) throw new Error('Empty response from Gemini')

    pushBot(reply)

  } catch (err) {
    // If API fails while online, give a local answer + show the error
    const fallback = localReply(msg)
    pushBot(`⚠️ AI service unavailable. \n\n${fallback}`)
  }

  loading.value = false
  await nextTick()
  scrollDown()
}

function pushBot(text) {
  messages.value.push({ role: 'assistant', content: text, time: nowStr() })
  // Auto-speak if TTS toggle is on — wait one tick for voice list to be ready
  if (ttsEnabled.value && hasSpeechOutput) {
    nextTick(() => setTimeout(() => speak(text), 100))
  }
}

function scrollDown() {
  if (msgEl.value) msgEl.value.scrollTop = msgEl.value.scrollHeight
}

function nowStr() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ─── Voice input ──────────────────────────────────────────────
let recognition = null

function toggleVoice() {
  if (!hasSpeechInput) {
    pushBot('Voice input isn\'t supported in this browser. Please consider using Chrome or Edge.')
    return
  }
  if (listening.value) {
    recognition?.stop()
    listening.value = false
    return
  }

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  recognition = new SR()
  recognition.lang            = 'en-US'
  recognition.continuous      = false
  recognition.interimResults  = false
  recognition.maxAlternatives = 1

  recognition.onstart  = () => { listening.value = true }
  recognition.onend    = () => { listening.value = false }
  recognition.onerror  = (e) => {
    listening.value = false
    if (e.error === 'not-allowed') {
      pushBot('Microphone access was denied. Please allow it in your browser settings and try again.')
    }
  }
  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript
    listening.value  = false
    input.value      = transcript
    setTimeout(() => send(), 250)
  }

  try { recognition.start() }
  catch { listening.value = false }
}
</script>

<template>
  <div class="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-3">

    <!-- ── Chatbot chat window ── -->
    <Transition name="chat-slide">
      <div
        v-if="open"
        class="w-[340px] md:w-[390px] flex flex-col rounded-[18px] overflow-hidden"
        :style="{
          background: 'var(--surf-card)',
          border: '1px solid var(--border)',
          boxShadow: '0 8px 40px rgba(21,101,192,0.20)'
        }"
        role="dialog"
        aria-label="SolarBuddy chat assistant"
        aria-modal="true"
      >

        <!-- Header -->
        <div
          class="flex items-center gap-2.5 px-4 py-3 flex-shrink-0"
          style="background: linear-gradient(135deg, var(--pri) 0%, var(--pri-mid) 100%);"
        >
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style="background:rgba(255,255,255,0.2);"
          >
            <span class="material-symbols-outlined text-[20px]"
              style="color:white;font-variation-settings:'FILL' 1,'wght' 400;">smart_toy</span>
          </div>

          <div class="flex-1 min-w-0">
            <p class="text-white font-semibold text-[14px] leading-tight">SolarBuddy</p>
            <div class="flex items-center gap-1.5">
              <span
                class="w-2 h-2 rounded-full flex-shrink-0"
                :style="isOnline ? 'background:#4ADE80;' : 'background:#FCA5A5;'"
              ></span>
              <span class="text-[11px] truncate" style="color:rgba(255,255,255,0.8);">
                {{ isOnline
                  ? (GEMINI_KEY ? 'Online · Full AI features' : 'Online · Add API key to enable AI')
                  : 'Offline · Local answers only' }}
              </span>
            </div>
          </div>

          <!-- Text-to-speech toggle — shows active state clearly -->
          <button
            v-if="hasSpeechOutput"
            class="w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0"
            :style="ttsEnabled
              ? 'background:rgba(255,255,255,0.35); box-shadow:0 0 0 2px rgba(255,255,255,0.6);'
              : 'background:rgba(255,255,255,0.15);'"
            @click="toggleTts"
            :aria-pressed="ttsEnabled"
            :aria-label="ttsEnabled ? 'Read-aloud ON — tap to disable' : 'Read-aloud OFF — tap to enable'"
            :title="ttsEnabled ? 'Read-aloud ON' : 'Read-aloud OFF'"
          >
            <!-- Speaking animation when reading aloud -->
            <span
              class="material-symbols-outlined text-[16px]"
              style="color:white;"
              :style="ttsEnabled && isSpeaking
                ? 'font-variation-settings:\'FILL\' 1,\'wght\' 600;'
                : ttsEnabled
                  ? 'font-variation-settings:\'FILL\' 1;'
                  : ''"
            >{{ ttsEnabled ? 'volume_up' : 'volume_off' }}</span>
          </button>

          <button
            class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style="background:rgba(255,255,255,0.15);"
            @click="open = false"
            aria-label="Close SolarBuddy"
          >
            <span class="material-symbols-outlined text-[15px]" style="color:white;">close</span>
          </button>
        </div>

        <!-- No-key warning banner (shown when online but key missing) -->
        <div
          v-if="isOnline && !GEMINI_KEY"
          class="flex items-start gap-2 px-4 py-2.5 text-[12px] flex-shrink-0"
          style="background:var(--warning-bg); color:var(--warning);"
          role="status"
        >
          <span class="material-symbols-outlined text-[15px] flex-shrink-0 mt-0.5">key</span>
          <span>
            Add <strong>VITE_GEMINI_KEY=your_key</strong> to <code>frontend/.env.local</code> for full AI responses.
            Get a free key at <strong>aistudio.google.com/apikey</strong>
          </span>
        </div>

        <!-- Offline banner -->
        <div
          v-if="!isOnline"
          class="flex items-center gap-2 px-4 py-2 text-[12px] font-medium flex-shrink-0"
          style="background:var(--warning-bg); color:var(--warning);"
          role="status"
          aria-live="polite"
        >
          <span class="material-symbols-outlined text-[15px]">wifi_off</span>
          No internet — local answers only. Live data unavailable.
        </div>

        <!-- Messages -->
        <div
          ref="msgEl"
          class="flex flex-col gap-3 p-4 overflow-y-auto flex-1"
          style="max-height:300px; min-height:180px;"
          aria-live="polite"
          role="log"
          aria-label="Chat messages"
        >
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="flex flex-col chat-animate"
            :class="msg.role === 'user' ? 'items-end' : 'items-start'"
          >
            <div
              class="px-3.5 py-2.5 rounded-[14px] text-[13px] leading-relaxed max-w-[88%] whitespace-pre-wrap"
              :style="msg.role === 'user'
                ? 'background:var(--pri-mid); color:#fff; border-bottom-right-radius:4px;'
                : 'background:var(--surf-2); color:var(--text); border-bottom-left-radius:4px;'"
            >{{ msg.content }}</div>
            <span class="text-[10px] mt-1 px-1" style="color:var(--text-muted);">
              {{ msg.role === 'user' ? 'You' : 'SolarBuddy' }} · {{ msg.time }}
            </span>
          </div>

          <!-- Typing dots -->
          <div v-if="loading" class="flex items-start chat-animate">
            <div
              class="px-4 py-3 rounded-[14px] rounded-bl-[4px]"
              style="background:var(--surf-2);"
              aria-label="SolarBuddy is typing"
              role="status"
            >
              <div class="flex gap-1 items-center">
                <span
                  v-for="n in 3" :key="n"
                  class="w-1.5 h-1.5 rounded-full"
                  :style="{ background:'var(--text-muted)', animation:`bounce-dot 1.2s ease-in-out ${(n-1)*0.2}s infinite` }"
                ></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Suggestion chips -->
        <div
          class="flex gap-2 overflow-x-auto px-4 pb-2 flex-shrink-0"
          style="scrollbar-width:none; -webkit-overflow-scrolling:touch;"
          role="group"
          aria-label="Quick question suggestions"
        >
          <button
            v-for="s in suggestions" :key="s"
            class="flex-shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full transition-all active:scale-95"
            :style="{ background:'var(--surf-2)', border:'1px solid var(--border)', color:'var(--pri)' }"
            @click="send(s)"
          >{{ s }}</button>
        </div>

        <!-- Input row -->
        <div
          class="flex items-center gap-2 px-3 py-3 flex-shrink-0"
          style="border-top:1px solid var(--border);"
        >
          <!-- Mic button -->
          <button
            class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
            :class="{ 'voice-active': listening }"
            :style="listening
              ? 'background:var(--pri-mid);'
              : hasSpeechInput
                ? 'background:var(--surf-2); border:1px solid var(--border);'
                : 'background:var(--surf-3); border:1px solid var(--border); opacity:0.4; cursor:not-allowed;'"
            @click="toggleVoice"
            :disabled="!hasSpeechInput"
            :aria-label="listening ? 'Stop recording' : 'Start voice input'"
            :aria-pressed="listening"
          >
            <span
              class="material-symbols-outlined text-[18px]"
              :style="listening
                ? 'color:white; font-variation-settings:\'FILL\' 1'
                : 'color:var(--text-muted);'"
            >{{ listening ? 'mic' : 'mic_none' }}</span>
          </button>

          <!-- Listening indicator replaces text input -->
          <div
            v-if="listening"
            class="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full"
            :style="{ background:'var(--pri-light)', color:'var(--pri)' }"
            aria-live="assertive"
          >
            <span class="w-2 h-2 rounded-full voice-active" style="background:var(--pri-mid);"></span>
            <span class="text-[13px] font-medium">Listening…</span>
          </div>

          <!-- Text input -->
          <input
            v-else
            v-model="input"
            type="text"
            placeholder="Ask SolarBuddy anything…"
            class="flex-1 rounded-full px-4 py-2.5 text-[13px] outline-none"
            :style="{
              background: 'var(--surf-2)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: 'var(--font-body)'
            }"
            aria-label="Type a message to SolarBuddy"
            @keydown.enter="send()"
          />

          <!-- Send button -->
          <button
            class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-all active:scale-95"
            :style="{
              background: 'var(--pri-mid)',
              opacity: (input.trim() && !loading && !listening) ? '1' : '0.35'
            }"
            :disabled="loading || !input.trim() || listening"
            @click="send()"
            aria-label="Send message"
          >
            <span class="material-symbols-outlined text-[17px]" style="color:white;">send</span>
          </button>
        </div>

      </div>
    </Transition>

    <!-- ── FAB ── -->
    <div class="relative flex-shrink-0">
      <span
        v-if="!isOnline"
        class="absolute top-0 right-0 w-3.5 h-3.5 rounded-full border-2 z-10"
        style="background:#FCA5A5; border-color:var(--surf);"
        aria-hidden="true"
        title="No internet connection"
      ></span>
      <button
        class="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95"
        :style="{
          background: 'linear-gradient(135deg, var(--pri) 0%, var(--pri-mid) 100%)',
          boxShadow: '0 4px 20px rgba(25,120,229,0.4)'
        }"
        @click="open = !open"
        :aria-expanded="open"
        :aria-label="open ? 'Close SolarBuddy' : 'Open SolarBuddy assistant'"
      >
        <span
          class="material-symbols-outlined text-[24px]"
          style="color:white; font-variation-settings:'FILL' 1,'wght' 400;"
        >{{ open ? 'close' : 'smart_toy' }}</span>
      </button>
    </div>

  </div>
</template>

<style scoped>
.chat-slide-enter-active { transition: opacity 0.22s ease, transform 0.22s ease; }
.chat-slide-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.chat-slide-enter-from   { opacity:0; transform: translateY(14px) scale(0.96); }
.chat-slide-leave-to     { opacity:0; transform: translateY(8px)  scale(0.97); }

@keyframes bounce-dot {
  0%, 80%, 100% { transform: translateY(0); }
  40%           { transform: translateY(-5px); }
}
</style>