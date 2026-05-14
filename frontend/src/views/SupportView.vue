<script setup>
import { ref, computed } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

const prefs = useUserPrefsStore()

// ── Help categories ───────────────────────────────────────────────────────────
const categories = [
  {
    id: 'getting-started', icon: 'rocket_launch', title: 'Getting Started',
    desc: 'Set up your account, upload your first meter reading, and understand your dashboard.',
    articles: [
      'How to create your account and complete your profile',
      'Uploading your first electricity meter reading',
      'Understanding your energy dashboard and charts',
      'Setting up your region and tariff preferences',
    ],
  },
  {
    id: 'meter-readings', icon: 'electric_meter', title: 'Meter Readings',
    desc: 'Everything about submitting, correcting, and tracking your meter readings.',
    articles: [
      'How to photograph and upload a meter reading',
      'What to do if your reading was rejected',
      'Editing or correcting a previous reading',
      'Understanding your reading history',
    ],
  },
  {
    id: 'billing', icon: 'receipt_long', title: 'Tariffs & Billing',
    desc: 'Understand energy tariffs, pricing tiers, and how costs are calculated.',
    articles: [
      'How Eskom tariff tiers work',
      'Understanding off-peak vs peak pricing',
      'Why your bill changed this month',
      'Setting up cost alerts and thresholds',
    ],
  },
  {
    id: 'app-features', icon: 'apps', title: 'App Features',
    desc: 'Explore all available features: leaderboard, energy tips, community, and more.',
    articles: [
      'Using the community leaderboard',
      'Customising your notification preferences',
      'Enabling and disabling app features in Settings',
      'Using the AI Energy Assistant chatbot',
    ],
  },
  {
    id: 'account', icon: 'manage_accounts', title: 'Account & Security',
    desc: 'Manage your profile, password, privacy settings, and account data.',
    articles: [
      'Changing your password',
      'Enabling two-factor authentication',
      'Downloading your personal data',
      'Deleting your account',
    ],
  },
  {
    id: 'technical', icon: 'build_circle', title: 'Technical Issues',
    desc: 'Troubleshooting errors, connection problems, and browser compatibility.',
    articles: [
      'App not loading or showing blank page',
      'Notifications not appearing on mobile',
      'Data not syncing correctly',
      'Browser and device compatibility',
    ],
  },
]

// ── Contact form ──────────────────────────────────────────────────────────────
const form = ref({
  name:     prefs.profile.displayName || '',
  email:    prefs.profile.email       || '',
  subject:  '',
  category: '',
  priority: 'normal',
  message:  '',
})
const sending   = ref(false)
const sent      = ref(false)
const sendError = ref('')

const subjectOptions = [
  'Technical issue / bug report',
  'Meter reading problem',
  'Billing or tariff question',
  'Account access / login',
  'Feature request',
  'Data privacy inquiry',
  'Other',
]
const priorityOptions = [
  { value: 'low',    label: 'Low – general question', icon: 'help' },
  { value: 'normal', label: 'Normal – needs attention', icon: 'info' },
  { value: 'high',   label: 'High – affecting my usage', icon: 'warning' },
  { value: 'urgent', label: 'Urgent – service outage', icon: 'error' },
]

const formValid = computed(() =>
  form.value.name.trim().length > 1 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) &&
  form.value.subject &&
  form.value.message.trim().length >= 20
)

async function submitForm() {
  if (!formValid.value) return
  sending.value = true
  sendError.value = ''
  // Simulate email send (mailto or backend call in production)
  await new Promise(r => setTimeout(r, 1500))
  sending.value = false
  sent.value = true
  // Reset
  form.value.message = ''
  form.value.subject = ''
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'How often should I upload meter readings?', a: 'We recommend uploading your meter reading once a month, preferably on the same date each month. This gives you the most accurate monthly usage and cost comparisons.' },
  { q: 'Why is my estimated bill different from my actual bill?', a: 'Our estimates are based on your tariff tier and usage patterns. Actual bills may differ due to municipality surcharges, VAT, and meter reading accuracy. Always use your official utility bill for payment.' },
  { q: 'Can I connect multiple meters or properties?', a: 'Multi-property support is on our roadmap. Currently the app supports one meter per account. We will notify you when multi-meter accounts become available.' },
  { q: 'Is my energy data shared with anyone?', a: 'Your data is private by default. You control sharing via Settings → Privacy & Data. Community leaderboard uses anonymous aggregates unless you opt into public display.' },
  { q: 'How do I reset my app preferences to default?', a: 'Go to Settings → Danger Zone → Reset Settings. This restores all appearance, notification, and feature preferences without deleting your account or meter history.' },
]
const openFaq = ref(null)
function toggleFaq(i) { openFaq.value = openFaq.value === i ? null : i }

// ── Status indicator ──────────────────────────────────────────────────────────
const systemStatus = { status: 'operational', label: 'All Systems Operational', color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
</script>

<template>
  <div class="min-h-screen max-w-5xl mx-auto space-y-8">

    <!-- Hero -->
    <header class="text-center py-8 sm:py-12">
      <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <span class="material-symbols-outlined text-primary text-[32px]">support_agent</span>
      </div>
      <h1 class="font-display text-3xl sm:text-4xl font-bold text-on-surface mb-3">Help & Support</h1>
      <p class="text-on-surface-variant max-w-lg mx-auto text-sm sm:text-base">
        Find answers, browse guides, or reach our support team. We're here to help you make the most of EcoSave.
      </p>

      <!-- System status -->
      <div class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full" :class="systemStatus.bg">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-sm font-semibold" :class="systemStatus.color">{{ systemStatus.label }}</span>
      </div>
    </header>

    <!-- Search (decorative) -->
    <div class="relative max-w-xl mx-auto">
      <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">search</span>
      <input
        class="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all shadow-sm"
        placeholder="Search help articles, FAQs, guides…"
        type="search"
      />
    </div>

    <!-- Help categories grid -->
    <section>
      <h2 class="font-display text-xl font-bold text-on-surface mb-4">Browse by Topic</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="cat in categories" :key="cat.id"
          class="card group cursor-pointer hover:border-primary/30 hover:shadow-md transition-all">
          <div class="flex items-start gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
              <span class="material-symbols-outlined text-primary text-[20px]">{{ cat.icon }}</span>
            </div>
            <div>
              <h3 class="font-bold text-sm text-on-surface">{{ cat.title }}</h3>
              <p class="text-xs text-on-surface-variant mt-0.5">{{ cat.desc }}</p>
            </div>
          </div>
          <ul class="space-y-1.5 border-t border-outline-variant/15 pt-3">
            <li v-for="article in cat.articles" :key="article"
              class="flex items-center gap-2 text-xs text-on-surface-variant hover:text-primary cursor-pointer transition-colors group/item">
              <span class="material-symbols-outlined text-[14px] text-on-surface-variant/40 group-hover/item:text-primary transition-colors">article</span>
              {{ article }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section>
      <h2 class="font-display text-xl font-bold text-on-surface mb-4">Frequently Asked Questions</h2>
      <div class="space-y-2">
        <div v-for="(faq, i) in faqs" :key="i"
          class="card cursor-pointer transition-all hover:border-primary/20"
          :class="openFaq === i ? 'border-primary/30' : ''"
          @click="toggleFaq(i)">
          <div class="flex items-center justify-between gap-4">
            <p class="font-semibold text-sm text-on-surface">{{ faq.q }}</p>
            <span class="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0 transition-transform"
              :class="openFaq === i ? 'rotate-180 text-primary' : ''">expand_more</span>
          </div>
          <Transition name="faq">
            <p v-if="openFaq === i" class="text-sm text-on-surface-variant mt-3 pt-3 border-t border-outline-variant/15">
              {{ faq.a }}
            </p>
          </Transition>
        </div>
      </div>
    </section>

    <!-- Contact form -->
    <section class="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
      <!-- Form -->
      <div class="lg:col-span-3 card">
        <h2 class="font-display text-xl font-bold text-on-surface mb-1 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[22px]">mail</span>
          Contact Support
        </h2>
        <p class="text-sm text-on-surface-variant mb-6">Our team responds within 24 hours on business days.</p>

        <!-- Success state -->
        <div v-if="sent" class="flex flex-col items-center justify-center py-12 gap-3 text-center">
          <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
            <span class="material-symbols-outlined text-emerald-500 text-[32px]">check_circle</span>
          </div>
          <h3 class="font-bold text-lg text-on-surface">Message Sent!</h3>
          <p class="text-sm text-on-surface-variant max-w-xs">
            Thanks for reaching out. We'll respond to <strong>{{ form.email }}</strong> within 24 hours.
          </p>
          <button class="mt-2 text-sm font-semibold text-primary hover:opacity-70 transition-opacity"
            @click="sent = false">Send another message</button>
        </div>

        <!-- Form fields -->
        <div v-else class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-on-surface-variant mb-1.5 block">Your Name *</label>
              <input v-model="form.name" type="text" placeholder="Display name"
                class="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all" />
            </div>
            <div>
              <label class="text-xs font-semibold text-on-surface-variant mb-1.5 block">Email Address *</label>
              <input v-model="form.email" type="email" placeholder="your@email.com"
                class="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all" />
            </div>
          </div>

          <div>
            <label class="text-xs font-semibold text-on-surface-variant mb-1.5 block">Subject *</label>
            <select v-model="form.subject"
              class="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all">
              <option value="" disabled>Select a subject…</option>
              <option v-for="opt in subjectOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>

          <div>
            <label class="text-xs font-semibold text-on-surface-variant mb-1.5 block">Priority</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button v-for="p in priorityOptions" :key="p.value" type="button"
                class="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border-2 text-xs font-medium transition-all"
                :class="form.priority === p.value
                  ? 'border-primary bg-primary/8 text-primary'
                  : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/30'"
                @click="form.priority = p.value">
                <span class="material-symbols-outlined text-[16px]">{{ p.icon }}</span>
                {{ p.label.split('–')[0].trim() }}
              </button>
            </div>
          </div>

          <div>
            <label class="text-xs font-semibold text-on-surface-variant mb-1.5 block">
              Message * <span class="font-normal text-on-surface-variant/60">(min. 20 characters)</span>
            </label>
            <textarea v-model="form.message" rows="5" placeholder="Describe your issue or question in detail…"
              class="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all resize-none"></textarea>
            <p class="text-[10px] text-on-surface-variant/50 mt-1 text-right">{{ form.message.length }} characters</p>
          </div>

          <p v-if="sendError" class="text-sm text-red-500">{{ sendError }}</p>

          <button
            class="w-full py-3 rounded-2xl font-semibold text-sm transition-all"
            :class="formValid ? 'solar-glow shadow-md hover:scale-[1.02] active:scale-95' : 'bg-surface-container text-on-surface-variant/50 cursor-not-allowed'"
            :disabled="!formValid || sending"
            @click="submitForm">
            <span v-if="sending" class="flex items-center justify-center gap-2">
              <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="40" stroke-dashoffset="15" />
              </svg>
              Sending…
            </span>
            <span v-else>Send Message</span>
          </button>
        </div>
      </div>

      <!-- Contact info sidebar -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Response time -->
        <div class="card">
          <h3 class="font-bold text-sm text-on-surface mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[18px]">schedule</span>
            Response Times
          </h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-on-surface-variant">Email support</span>
              <span class="font-semibold text-on-surface">Within 24h</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-on-surface-variant">Urgent issues</span>
              <span class="font-semibold text-emerald-500">Within 4h</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-on-surface-variant">Business hours</span>
              <span class="font-semibold text-on-surface">Mon–Fri 8–17 SAST</span>
            </div>
          </div>
        </div>

        <!-- Contact channels -->
        <div class="card">
          <h3 class="font-bold text-sm text-on-surface mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[18px]">contact_support</span>
            Other Channels
          </h3>
          <div class="space-y-3">
            <a href="mailto:support@ecosave.app"
              class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container transition-colors group">
              <span class="material-symbols-outlined text-primary text-[20px]">mail</span>
              <div>
                <p class="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">support@ecosave.app</p>
                <p class="text-xs text-on-surface-variant">General support email</p>
              </div>
            </a>
            <a href="mailto:privacy@ecosave.app"
              class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container transition-colors group">
              <span class="material-symbols-outlined text-primary text-[20px]">shield</span>
              <div>
                <p class="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">privacy@ecosave.app</p>
                <p class="text-xs text-on-surface-variant">Data & privacy requests</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Tips -->
        <div class="card bg-primary/5 border-primary/15">
          <h3 class="font-bold text-sm text-on-surface mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[18px]">tips_and_updates</span>
            Tips for Faster Help
          </h3>
          <ul class="space-y-2 text-xs text-on-surface-variant">
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-primary text-[13px] mt-0.5">check</span>
              Include your account email address in your message
            </li>
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-primary text-[13px] mt-0.5">check</span>
              Describe the exact steps that caused the issue
            </li>
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-primary text-[13px] mt-0.5">check</span>
              Attach a screenshot if you see an error message
            </li>
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-primary text-[13px] mt-0.5">check</span>
              Mention your browser and device type
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.faq-enter-active, .faq-leave-active { transition: all 0.2s ease; }
.faq-enter-from, .faq-leave-to { opacity: 0; max-height: 0; }
.faq-enter-to, .faq-leave-from { opacity: 1; max-height: 200px; }
</style>
