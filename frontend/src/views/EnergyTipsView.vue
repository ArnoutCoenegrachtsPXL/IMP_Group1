<script setup>
import { ref, computed, watch } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { useNotificationStore } from '@/stores/notifications'

import ElectricitySavingTip from '@/components/EnergySavingTipsComponents/ElectricitySavingTip.vue'
import HeatingSavingTip     from '@/components/EnergySavingTipsComponents/HeatingSavingTip.vue'
import KitchenSavingTip     from '@/components/EnergySavingTipsComponents/KitchenSavingTip.vue'
import LaundrySavingTip     from '@/components/EnergySavingTipsComponents/LaundrySavingTip.vue'
import ScheduledTip         from '@/components/EnergySavingTipsComponents/ScheduledTip.vue'
import SolarSavingTip       from '@/components/EnergySavingTipsComponents/SolarSavingTip.vue'
import WaterSavingTip       from '@/components/EnergySavingTipsComponents/WaterSavingTip.vue'

const prefs  = useUserPrefsStore()
const notifs = useNotificationStore()

const currentView = ref('main')

// ─────────────────────────────────────────────────────────────────────────────
// SCHEDULE STATE — persisted to localStorage
// ─────────────────────────────────────────────────────────────────────────────
const scheduleFrom    = ref(localStorage.getItem('et-sched-from') || '07:00')
const scheduleTo      = ref(localStorage.getItem('et-sched-to')   || '18:00')
const scheduleFilter  = ref(localStorage.getItem('et-sched-filter') === 'true')
const scheduleApplied = ref(false)
const savingSchedule  = ref(false)

watch(scheduleFrom,   v => localStorage.setItem('et-sched-from', v))
watch(scheduleTo,     v => localStorage.setItem('et-sched-to', v))
watch(scheduleFilter, v => localStorage.setItem('et-sched-filter', String(v)))

function applySchedule() {
  savingSchedule.value = true
  setTimeout(() => {
    savingSchedule.value  = false
    scheduleApplied.value = true
    notifs.add({
      type: 'success',
      title: 'Schedule Saved',
      body: `Showing tips personalised for your active hours: ${scheduleFrom.value}–${scheduleTo.value}.`,
    })
    setTimeout(() => { scheduleApplied.value = false }, 3000)
  }, 600)
}

// ─────────────────────────────────────────────────────────────────────────────
// SAVINGS ALGORITHM
// Estimates monthly savings based on:
// - Schedule window width (longer active = more shift opportunities)
// - User's configured features (EV, smart scheduling, auto-offset)
// - Active category filters
// - Completed tips count
// ─────────────────────────────────────────────────────────────────────────────
const completedTips = ref(JSON.parse(localStorage.getItem('et-completed') || '[]'))

function toggleTip(id) {
  const idx = completedTips.value.indexOf(id)
  if (idx === -1) completedTips.value.push(id)
  else            completedTips.value.splice(idx, 1)
  localStorage.setItem('et-completed', JSON.stringify(completedTips.value))
}

const estimatedSavings = computed(() => {
  // Base saving from schedule width (off-peak shifting opportunity)
  const [fh, fm] = scheduleFrom.value.split(':').map(Number)
  const [th, tm] = scheduleTo.value.split(':').map(Number)
  const windowHrs = Math.max(0, (th * 60 + tm - fh * 60 - fm) / 60)

  let base = 18 // ZAR baseline per month
  base += Math.min(windowHrs * 1.8, 22) // up to +22 from schedule width

  // Boost from enabled smart features
  if (prefs.energy?.smart)       base += 8
  if (prefs.energy?.autoOffset)  base += 12
  if (prefs.energy?.ev)          base += 6
  if (prefs.energy?.community)   base += 3

  // Boost from completed tips (R4 per tip)
  base += completedTips.value.length * 4

  // Currency scaling (rough purchasing parity)
  const curr = prefs.currency || 'ZAR'
  const scale = { ZAR: 1, USD: 0.054, EUR: 0.050, GBP: 0.043, NGN: 43, KES: 7.2, AED: 0.2, INR: 4.5, BRL: 0.28 }
  const amount = Math.round(base * (scale[curr] || 1))

  return {
    amount,
    currency: curr,
    symbol: { ZAR: 'R', USD: '$', EUR: '€', GBP: '£', NGN: '₦', KES: 'KSh', AED: 'د.إ', INR: '₹', BRL: 'R$' }[curr] || curr,
    percentage: Math.min(95, 20 + completedTips.value.length * 5 + (prefs.energy?.smart ? 15 : 0)),
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// TIP DATA with schedule metadata, category, and impact
// ─────────────────────────────────────────────────────────────────────────────
const ALL_TIPS = [
  {
    id: 'peak-cooling',
    category: 'cooling',
    label: 'Cooling',
    impact: 'high',
    timeWindow: '16:00–18:00',
    windowStart: 16, windowEnd: 18,
    title: 'Optimise Peak Hour Cooling',
    desc: 'Lower your AC by 2°C between 4–6 PM to avoid peak tariff pricing and reduce grid strain.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDav2CwnH7_sK8zJshe51W_8peePokZF0VTHkhWK4i9wTp6MyPQHEPLQwlT7VIgerogydLfGW2KApRyJz3yJ12ag0hVp0Qu30a9fJWKMeYzJV3IRKeiV2oWa87-F4U-Ax6lGsdMOI6ZvnRpLpgSJmFcXoENTx8zTeXXCl5391lz6ncX43yLvfGfmYlKhKYHzBZM8gpSeZXbXmeBMfDlCX4dU8vlqKVRW8ecGpaeqHHR_uXAbSiG9eFv59K8AMOMPzzBhUthr6eSoNHA',
    action: null,
  },
  {
    id: 'eco-wash',
    category: 'laundry',
    label: 'Laundry',
    impact: 'medium',
    timeWindow: null,
    windowStart: null, windowEnd: null,
    title: 'The Eco-Wash Delay',
    desc: 'Use the Delay Start feature on your washing machine to run during solar surplus or off-peak hours.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjhLHZbdX_il1lydLfYaztp3hmg5jMfaaX_Qbb0HnNyPKm55i2ALDK72ZzzqmTv0r0ssunoJZTFgEZXHFRyOnXj5R5C05W1vgWIO2EeJht9vBFcDZRhwpkrZ6MsPhKrqkU2q9xxXgEZQMUED9Xk1nJj9rT0GrWUHq3oTLMwM-G9pdnEqhpUgT7oaLgasOOJumjkuE5RTLVbksns_UXtH3RDmA-j15oK4-1Jp3InIVLIfs5OBvOK2U7kQgqFGeqJDg3PpFglzRuSWeu',
    action: 'laundry',
  },
  {
    id: 'smart-cooking',
    category: 'kitchen',
    label: 'Kitchen',
    impact: 'low',
    timeWindow: '16:00–18:00',
    windowStart: 16, windowEnd: 18,
    title: 'Smart Cooking Habits',
    desc: 'Cover pots while boiling and use a microwave for small tasks — reduces consumption by up to 20%.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMy0PhlxobZcJ_4g4Mf9SeMLlF-_DkNtY2SyB6FAWUZHT69Udt45Qsbzuz0ny5-lhDO8unmQcOl3R5vlohm9-yrUTfbhqqfJZyGmYcb45mgqtckZLcMiFAquIe9meoXQbicAKqGdmfXbvUR-oxLoBlywqw2E9uMyMWXpjVv7N6sB6TPmeYssnSGvnVFtzIUabwt393gKzyxnEfJEONPvz-Rpq9bNX9ZvceMD4KN8Q56KHtxXqLKHNXXKHlvDXGzhHKi0MFlg0w59vY',
    action: 'kitchen',
  },
  {
    id: 'shower-5min',
    category: 'water',
    label: 'Water',
    impact: 'high',
    timeWindow: null,
    windowStart: null, windowEnd: null,
    title: 'The 5-Minute Challenge',
    desc: 'Reducing shower time saves up to 57 L of water and significant energy used for heating.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzmlNYVJl7YfKlpEYRkrcL9kQCQOvMn3CQF4v86Dh5_ybH6eGL5sAEybZJq1lf-n8SqfB_09QtWYaiRw9PT8Dxy2TL98K0iTYGwq-XA1MTc2iAgD3fYl-f5x4NEe8eCvkXSDtTUq3IWXNhwD-bNvzWCAzePLMnID6duNaqbceSQDFgWQGG0L9MkvuDniJc2DWltOPLkbfFUZ-qlnu7-CHPsxTztEHtQS8c9nrFWCYK32iAAW2TB_83yz7ua9xEnrHr0WWzuwWfgnSd',
    action: 'water',
  },
  {
    id: 'solar-self',
    category: 'solar',
    label: 'Solar',
    impact: 'medium',
    timeWindow: '11:00–15:00',
    windowStart: 11, windowEnd: 15,
    title: 'Max Solar Self-Consumption',
    desc: 'Run high-wattage appliances during peak sun hours (11 AM–3 PM) to use your own solar instead of the grid.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_t0LazH9tTWFhJf0OamJnaPhTE20HMRvoYyiHW4ovkvW8Obf7iqYb2FG2me5J0v5HsFi7e97ChynQX2wQZ0PRYHm_Cdwo-nbV8zNdwy2GEnYe6BmyBC1DPzLbTB98VyChVIHGAak7WY_NRtz4VLl6gPqE1aOkHw64-jAmN217gekRN2mk3jtK77cK9RJWsTEOK523_JQvwlJ_ScxAwONO1DwTtQANhS07eHuu4Ftl9AlZcyp4bL87ckS5TttmR-bJm0zMhaemM_Jh',
    action: 'solar',
  },
  {
    id: 'standby-off',
    category: 'electricity',
    label: 'Electricity',
    impact: 'medium',
    timeWindow: null,
    windowStart: null, windowEnd: null,
    title: 'Kill Standby Drain',
    desc: 'Unplug TVs, gaming consoles, and chargers when not in use — standby devices account for up to 10% of bills.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80',
    action: 'electricity',
  },
  {
    id: 'geyser-timer',
    category: 'heating',
    label: 'Heating',
    impact: 'high',
    timeWindow: '22:00–06:00',
    windowStart: 22, windowEnd: 6,
    title: 'Geyser Timer Setup',
    desc: 'Set a timer to heat your geyser only during off-peak hours. A 150L geyser heated off-peak saves up to R280/month.',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=640&q=80',
    action: 'heating',
  },
  {
    id: 'led-switch',
    category: 'electricity',
    label: 'Electricity',
    impact: 'medium',
    timeWindow: null,
    windowStart: null, windowEnd: null,
    title: 'Full LED Switchover',
    desc: 'Replacing all incandescent bulbs with LEDs saves up to 80% on lighting. Payback period is under 3 months.',
    img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=640&q=80',
    action: 'electricity',
  },
]

// ─── Filter state ─────────────────────────────────────────────────────────────
const activeFilter = ref('all')
const FILTERS = [
  { id: 'all',         label: 'All Tips'    },
  { id: 'electricity', label: 'Electricity' },
  { id: 'water',       label: 'Water'       },
  { id: 'heating',     label: 'Heating'     },
  { id: 'solar',       label: 'Solar'       },
  { id: 'kitchen',     label: 'Kitchen'     },
  { id: 'laundry',     label: 'Laundry'     },
  { id: 'cooling',     label: 'Cooling'     },
]

function setFilter(id) {
  // If it's a sub-view category, show the detailed page
  const SUB_VIEWS = ['electricity', 'water', 'heating', 'solar', 'kitchen', 'laundry']
  if (SUB_VIEWS.includes(id) && id !== activeFilter.value) {
    activeFilter.value = id
  } else if (SUB_VIEWS.includes(id) && id === activeFilter.value) {
    currentView.value = id
  } else {
    activeFilter.value = id
  }
}

// Schedule filter: only show tips whose time window overlaps with the user's schedule
function overlaps(tip) {
  if (!scheduleFilter.value || tip.windowStart === null) return true
  const [fh] = scheduleFrom.value.split(':').map(Number)
  const [th] = scheduleTo.value.split(':').map(Number)
  // Simple overlap check (handles overnight ranges)
  const s = tip.windowStart, e = tip.windowEnd
  if (s < e) return fh < e && th > s
  return true // overnight tips always match if schedule filter is on
}

const filteredTips = computed(() =>
  ALL_TIPS.filter(t =>
    (activeFilter.value === 'all' || t.category === activeFilter.value) &&
    overlaps(t)
  )
)

const IMPACT_CONFIG = {
  high:   { label: 'High Impact',   bg: 'bg-red-100',    text: 'text-red-700'    },
  medium: { label: 'Medium Impact', bg: 'bg-amber-100',  text: 'text-amber-700'  },
  low:    { label: 'Low Impact',    bg: 'bg-emerald-100', text: 'text-emerald-700'},
}

// ─────────────────────────────────────────────────────────────────────────────
// REQUEST CUSTOM ADVICE — modal with form
// Submits via mailto or Formspree (same approach as SupportView)
// ─────────────────────────────────────────────────────────────────────────────
const FORMSPREE = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''
const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || 'support@brightbox.app'

const showAdviceModal = ref(false)
const adviceForm = ref({
  name:        prefs.profile?.displayName || '',
  email:       prefs.profile?.email       || '',
  homeType:    '',
  occupants:   '',
  primaryCost: '',
  budget:      '',
  goals:       [],
  extra:       '',
})
const adviceSending = ref(false)
const adviceSent    = ref(false)
const adviceError   = ref('')

const HOME_TYPES   = ['Apartment / Flat', 'Townhouse', 'Freestanding house', 'Small-holding / Farm', 'Commercial']
const COST_AREAS   = ['Electricity', 'Water & heating', 'Cooling / Air conditioning', 'Appliances', 'Not sure']
const BUDGET_OPTS  = ['Under R500/month', 'R500–R2 000/month', 'R2 000–R5 000/month', 'R5 000+/month', 'Prefer not to say']
const GOAL_OPTS    = ['Lower monthly bill', 'Reduce carbon footprint', 'Solar independence', 'Load-shedding resilience', 'Water saving', 'EV optimisation']

const adviceValid = computed(() =>
  adviceForm.value.name.trim().length > 1 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adviceForm.value.email) &&
  adviceForm.value.homeType &&
  adviceForm.value.occupants
)

function toggleGoal(g) {
  const idx = adviceForm.value.goals.indexOf(g)
  if (idx === -1) adviceForm.value.goals.push(g)
  else            adviceForm.value.goals.splice(idx, 1)
}

async function submitAdvice() {
  if (!adviceValid.value || adviceSending.value) return
  adviceSending.value = true
  adviceError.value   = ''

  const f = adviceForm.value
  const body = `Custom Energy Audit Request

Name: ${f.name}
Email: ${f.email}
Home type: ${f.homeType}
Occupants: ${f.occupants}
Primary cost area: ${f.primaryCost}
Budget: ${f.budget}
Goals: ${f.goals.join(', ') || 'Not specified'}
Additional info: ${f.extra || 'None'}

Sent from BrightBox Energy Tips`

  // Try Formspree first
  if (FORMSPREE) {
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: f.name, email: f.email,
          subject: `[BrightBox Custom Audit] ${f.name} – ${f.homeType}`,
          message: body,
        }),
      })
      if (res.ok) { onAdviceSent(); return }
    } catch { /* fall through */ }
  }

  // mailto fallback
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`[BrightBox Custom Audit] ${f.name} – ${f.homeType}`)}&body=${encodeURIComponent(body)}`
  window.open(mailto, '_blank')
  onAdviceSent()
}

function onAdviceSent() {
  adviceSending.value = false
  adviceSent.value    = true
  notifs.add({
    type: 'success',
    title: 'Advice Request Sent',
    body: `We received your custom audit request, ${adviceForm.value.name}. Expect a response within 2 business days.`,
  })
}

function closeAdviceModal() {
  showAdviceModal.value = false
  setTimeout(() => { adviceSent.value = false; adviceError.value = '' }, 400)
}
</script>

<template>
  <!-- IMPORTANT: No outer container with its own max-width here.
       App.vue's <main> already provides responsive padding.
       This div is purely a semantic wrapper with NO layout overrides. -->
  <div>

    <!-- ── Sub-category detail views ──────────────────────────────────────── -->
    <ElectricitySavingTip v-if="currentView === 'electricity'" @back="currentView = 'main'" />
    <WaterSavingTip       v-if="currentView === 'water'"       @back="currentView = 'main'" />
    <HeatingSavingTip     v-if="currentView === 'heating'"     @back="currentView = 'main'" />
    <SolarSavingTip       v-if="currentView === 'solar'"       @back="currentView = 'main'" />
    <KitchenSavingTip     v-if="currentView === 'kitchen'"     @back="currentView = 'main'" />
    <LaundrySavingTip     v-if="currentView === 'laundry'"     @back="currentView = 'main'" />
    <ScheduledTip         v-if="currentView === 'schedule'"    :timeFrom="scheduleFrom" :timeTo="scheduleTo" @back="currentView = 'main'" />

    <!-- ── Main view ──────────────────────────────────────────────────────── -->
    <div v-if="currentView === 'main'" class="space-y-8">

      <!-- Page header -->
      <header>
        <h1 class="font-display text-3xl sm:text-4xl text-on-surface mb-2">Your Personal Energy Advisor</h1>
        <p class="text-on-surface-variant max-w-2xl text-sm sm:text-base leading-relaxed">
          We analyse your energy patterns to provide tailored tips that fit your lifestyle and save on your next bill.
        </p>
      </header>

      <!-- ── Bento: Schedule + Impact ─────────────────────────────────────── -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <!-- Set Your Schedule card -->
        <div class="lg:col-span-2 card card-elevated flex flex-col justify-between gap-6">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="material-symbols-outlined text-primary text-[22px]" style="font-variation-settings:'FILL' 1">timer</span>
              <h2 class="text-lg font-bold text-on-surface">Set Your Schedule</h2>
            </div>
            <p class="text-sm text-on-surface-variant mb-5">
              Tell us when you are most active at home so we can surface time-sensitive saving opportunities.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="time-from">
                  Active from
                </label>
                <input
                  id="time-from"
                  v-model="scheduleFrom"
                  type="time"
                  class="form-input"
                  aria-label="Active hours start time"
                />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="time-to">
                  Active until
                </label>
                <input
                  id="time-to"
                  v-model="scheduleTo"
                  type="time"
                  class="form-input"
                  aria-label="Active hours end time"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-outline-variant/20">
            <!-- Schedule filter toggle -->
            <label class="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <ToggleSwitch
                v-model="scheduleFilter"
                aria-label="Show only tips matching my schedule"
              />
              <span class="text-sm font-semibold text-on-surface">Show tips for my active hours only</span>
            </label>

            <!-- Apply button — navigates to ScheduledTip view, then saves schedule -->
            <button
              class="solar-glow px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 min-h-[44px] shrink-0 transition-all"
              :class="scheduleApplied ? 'bg-emerald-500' : ''"
              :style="scheduleApplied ? 'background: #10b981;' : ''"
              @click="applySchedule(); currentView = 'schedule'"
              :disabled="savingSchedule"
            >
              <svg v-if="savingSchedule" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="40" stroke-dashoffset="15"/>
              </svg>
              <span class="material-symbols-outlined text-[16px]" v-else-if="scheduleApplied" style="font-variation-settings:'FILL' 1">check</span>
              <span class="material-symbols-outlined text-[16px]" v-else>arrow_forward</span>
              {{ savingSchedule ? 'Saving…' : scheduleApplied ? 'Saved!' : 'Get Tailored Tips' }}
            </button>
          </div>
        </div>

        <!-- Impact Overview card -->
        <div
          class="rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between"
          style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dim) 100%);"
        >
          <div class="relative z-10">
            <h2 class="text-lg font-bold mb-1">Impact Overview</h2>
            <p class="text-white/70 text-xs mb-5 leading-relaxed">
              Following your personalised tips could save you up to:
            </p>

            <!-- Savings amount — computed from algorithm -->
            <div class="text-5xl font-black mb-1 tracking-tight">
              {{ estimatedSavings.symbol }}{{ estimatedSavings.amount }}
              <span class="text-xl font-normal opacity-80">/mo</span>
            </div>
            <p class="text-white/60 text-xs mb-5">in {{ prefs.currency || 'ZAR' }}</p>

            <!-- Progress bar -->
            <div class="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                class="bg-white h-full rounded-full transition-all duration-700"
                :style="{ width: estimatedSavings.percentage + '%' }"
              ></div>
            </div>
            <div class="flex items-center justify-between mt-2">
              <p class="text-[11px] text-white/60">{{ estimatedSavings.percentage }}% of potential savings achieved</p>
              <p class="text-[11px] font-bold text-white/80">{{ completedTips.length }} tips done</p>
            </div>

            <!-- Feature status pills -->
            <div class="flex flex-wrap gap-1.5 mt-4">
              <span v-if="prefs.energy?.smart"
                class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15">
                ⚡ Smart scheduling
              </span>
              <span v-if="prefs.energy?.autoOffset"
                class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15">
                ☀️ Auto-offset on
              </span>
              <span v-if="prefs.energy?.ev"
                class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15">
                🚗 EV off-peak
              </span>
            </div>
          </div>

          <!-- Decorative icon -->
          <span
            class="material-symbols-outlined absolute -bottom-6 -right-6 opacity-20 text-[120px] pointer-events-none"
            style="font-variation-settings:'FILL' 1; color:white;"
          >insights</span>
        </div>
      </div>

      <!-- ── Filter bar ──────────────────────────────────────────────────── -->
      <div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        <div class="flex gap-2 min-w-max sm:flex-wrap sm:min-w-0">
          <button
            v-for="f in FILTERS"
            :key="f.id"
            class="px-4 py-2 rounded-full text-sm font-semibold transition-all min-h-[40px] shrink-0
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary border"
            :class="activeFilter === f.id
              ? 'border-transparent text-on-primary'
              : 'bg-surface-container-lowest border-outline-variant/40 text-on-surface-variant hover:border-primary/30'"
            :style="activeFilter === f.id
              ? 'background: var(--color-primary);'
              : ''"
            :aria-pressed="activeFilter === f.id"
            @click="setFilter(f.id)"
          >
            {{ f.label }}
          </button>
        </div>
      </div>

      <!-- Schedule filter active notice -->
      <div v-if="scheduleFilter"
        class="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
        style="background: color-mix(in srgb, var(--color-primary) 8%, transparent); color: var(--color-primary); border: 1px solid color-mix(in srgb, var(--color-primary) 15%, transparent);">
        <span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">filter_alt</span>
        Showing tips for your active hours: {{ scheduleFrom }}–{{ scheduleTo }}
        <button class="ml-auto text-xs underline hover:no-underline" @click="scheduleFilter = false">Clear filter</button>
      </div>

      <!-- ── Tips grid ───────────────────────────────────────────────────── -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        <!-- Tip cards -->
        <div
          v-for="tip in filteredTips"
          :key="tip.id"
          class="bg-surface-container-lowest border border-outline-variant/40 rounded-[16px]
                 overflow-hidden shadow-sm hover:shadow-md transition-all group"
          :class="completedTips.includes(tip.id) ? 'ring-2 ring-emerald-500/30' : ''"
        >
          <!-- Image -->
          <div class="h-36 relative overflow-hidden">
            <img
              :src="tip.img"
              :alt="tip.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <!-- Overlay gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <!-- Badges -->
            <div class="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
              <span
                class="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full tracking-wider"
                :class="[IMPACT_CONFIG[tip.impact].bg, IMPACT_CONFIG[tip.impact].text]"
              >{{ IMPACT_CONFIG[tip.impact].label }}</span>
              <span v-if="tip.timeWindow"
                class="px-2 py-0.5 bg-primary/90 text-on-primary text-[10px] font-bold uppercase rounded-full tracking-wider">
                {{ tip.timeWindow }}
              </span>
            </div>
            <!-- Completed tick -->
            <div v-if="completedTips.includes(tip.id)"
              class="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-[14px]" style="font-variation-settings:'FILL' 1">check</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-4">
            <span class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 mb-1 block">{{ tip.label }}</span>
            <h4 class="text-sm font-bold text-on-surface mb-1.5 group-hover:text-primary transition-colors leading-snug">
              {{ tip.title }}
            </h4>
            <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-2 mb-3">{{ tip.desc }}</p>

            <!-- Actions -->
            <div class="flex items-center justify-between pt-3 border-t border-outline-variant/15 gap-2">
              <!-- Mark done toggle -->
              <button
                class="flex items-center gap-1.5 text-xs font-bold transition-colors"
                :class="completedTips.includes(tip.id) ? 'text-emerald-500' : 'text-on-surface-variant hover:text-emerald-500'"
                @click="toggleTip(tip.id)"
                :aria-pressed="completedTips.includes(tip.id)"
              >
                <span class="material-symbols-outlined text-[14px]"
                  :style="completedTips.includes(tip.id) ? 'font-variation-settings:\'FILL\' 1' : ''">
                  {{ completedTips.includes(tip.id) ? 'check_circle' : 'radio_button_unchecked' }}
                </span>
                {{ completedTips.includes(tip.id) ? 'Done' : 'Mark done' }}
              </button>

              <!-- Details button -->
              <button v-if="tip.action"
                class="text-primary text-xs font-bold flex items-center gap-1 hover:opacity-70 transition-opacity"
                @click="currentView = tip.action"
                aria-label="View full details"
              >
                <span>Details</span>
                <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty state when schedule filter hides everything -->
        <div v-if="filteredTips.length === 0"
          class="sm:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col items-center justify-center
                 py-14 gap-3 text-center card border-dashed">
          <span class="material-symbols-outlined text-[44px] text-on-surface-variant/30">search_off</span>
          <p class="font-bold text-on-surface">No tips match your current filter</p>
          <p class="text-sm text-on-surface-variant max-w-xs">
            Try expanding your active hours window or clearing the schedule filter to see all tips.
          </p>
          <button
            class="mt-1 text-sm font-bold text-primary hover:opacity-70 transition-opacity"
            @click="scheduleFilter = false; activeFilter = 'all'"
          >Show all tips</button>
        </div>

        <!-- Request Custom Advice CTA card -->
        <div
          class="border-2 border-dashed border-outline-variant/50 rounded-[16px] flex flex-col
                 items-center justify-center p-6 text-center group cursor-pointer
                 hover:border-primary/40 hover:bg-primary/[0.03] transition-all"
          @click="showAdviceModal = true"
          role="button"
          tabindex="0"
          @keydown.enter="showAdviceModal = true"
          aria-label="Request a custom energy audit"
        >
          <div class="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center mb-3
                      group-hover:bg-primary/10 transition-colors">
            <span class="material-symbols-outlined text-on-surface-variant text-[26px] group-hover:text-primary transition-colors"
              style="font-variation-settings:'FILL' 1">support_agent</span>
          </div>
          <h4 class="font-bold text-sm text-on-surface mb-1.5 group-hover:text-primary transition-colors">Request Custom Advice</h4>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            Can't find what you need? Request a personalised energy audit tailored to your home.
          </p>
          <span class="mt-3 text-xs font-bold text-primary flex items-center gap-1">
            Free consultation <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
          </span>
        </div>
      </div>

    </div><!-- end main view -->

    <!-- ─────────────────────────────────────────────────────────────────────
         REQUEST CUSTOM ADVICE MODAL
    ──────────────────────────────────────────────────────────────────────── -->
    <Transition name="modal-fade">
      <div v-if="showAdviceModal"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Request custom energy advice"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="closeAdviceModal"
        ></div>

        <!-- Modal panel -->
        <div
          class="relative w-full sm:max-w-lg rounded-t-[24px] sm:rounded-[24px] overflow-hidden overflow-y-auto"
          style="background: var(--color-surface-container-lowest); max-height: 92dvh;"
        >
          <!-- Header -->
          <div class="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-outline-variant/20"
            style="background: var(--color-surface-container-lowest);">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-primary text-[18px]" style="font-variation-settings:'FILL' 1">support_agent</span>
              </div>
              <div>
                <h2 class="font-bold text-base text-on-surface leading-tight">Custom Energy Audit</h2>
                <p class="text-[11px] text-on-surface-variant">Free · Response within 2 business days</p>
              </div>
            </div>
            <button
              class="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors"
              @click="closeAdviceModal"
              aria-label="Close"
            >
              <span class="material-symbols-outlined text-on-surface-variant text-[18px]">close</span>
            </button>
          </div>

          <!-- Success state -->
          <div v-if="adviceSent" class="flex flex-col items-center justify-center py-14 px-6 gap-4 text-center">
            <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-emerald-500 text-[32px]" style="font-variation-settings:'FILL' 1">check_circle</span>
            </div>
            <h3 class="font-bold text-lg text-on-surface">Request Submitted!</h3>
            <p class="text-sm text-on-surface-variant max-w-xs leading-relaxed">
              Thanks, {{ adviceForm.name }}! Our energy advisors will review your profile and respond to
              <strong>{{ adviceForm.email }}</strong> within 2 business days.
            </p>
            <button class="solar-glow px-6 py-2.5 rounded-xl text-sm font-bold mt-2" @click="closeAdviceModal">
              Done
            </button>
          </div>

          <!-- Form -->
          <form v-if="!adviceSent" class="px-5 py-5 space-y-5" @submit.prevent="submitAdvice">

            <!-- Name + email -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-name">
                  Your Name *
                </label>
                <input id="adv-name" v-model="adviceForm.name" type="text" placeholder="Full name"
                  autocomplete="name" class="form-input" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-email">
                  Email Address *
                </label>
                <input id="adv-email" v-model="adviceForm.email" type="email" placeholder="your@email.com"
                  autocomplete="email" class="form-input" />
              </div>
            </div>

            <!-- Home type -->
            <div class="space-y-2">
              <p class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Home Type *</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="h in HOME_TYPES" :key="h" type="button"
                  class="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all min-h-[36px]"
                  :class="adviceForm.homeType === h
                    ? 'border-primary bg-primary/8 text-primary'
                    : 'border-outline-variant/40 text-on-surface-variant hover:border-primary/30'"
                  @click="adviceForm.homeType = h"
                >{{ h }}</button>
              </div>
            </div>

            <!-- Occupants + primary cost -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-occ">
                  Number of Occupants *
                </label>
                <select id="adv-occ" v-model="adviceForm.occupants" class="form-input">
                  <option value="" disabled>Select…</option>
                  <option>1</option><option>2</option><option>3–4</option>
                  <option>5–6</option><option>7+</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-cost">
                  Biggest Cost Area
                </label>
                <select id="adv-cost" v-model="adviceForm.primaryCost" class="form-input">
                  <option value="" disabled>Select…</option>
                  <option v-for="c in COST_AREAS" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
            </div>

            <!-- Monthly budget -->
            <div class="space-y-2">
              <p class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Monthly Energy Budget</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="b in BUDGET_OPTS" :key="b" type="button"
                  class="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all min-h-[36px]"
                  :class="adviceForm.budget === b
                    ? 'border-primary bg-primary/8 text-primary'
                    : 'border-outline-variant/40 text-on-surface-variant hover:border-primary/30'"
                  @click="adviceForm.budget = b"
                >{{ b }}</button>
              </div>
            </div>

            <!-- Goals (multi-select) -->
            <div class="space-y-2">
              <p class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Your Goals (select all that apply)</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="g in GOAL_OPTS" :key="g" type="button"
                  class="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all min-h-[36px] flex items-center gap-1.5"
                  :class="adviceForm.goals.includes(g)
                    ? 'border-primary bg-primary/8 text-primary'
                    : 'border-outline-variant/40 text-on-surface-variant hover:border-primary/30'"
                  :aria-pressed="adviceForm.goals.includes(g)"
                  @click="toggleGoal(g)"
                >
                  <span class="material-symbols-outlined text-[13px]"
                    :style="adviceForm.goals.includes(g) ? 'font-variation-settings:\'FILL\' 1' : ''">
                    {{ adviceForm.goals.includes(g) ? 'check_circle' : 'circle' }}
                  </span>
                  {{ g }}
                </button>
              </div>
            </div>

            <!-- Extra notes -->
            <div class="space-y-1.5">
              <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-extra">
                Anything else we should know?
              </label>
              <textarea id="adv-extra" v-model="adviceForm.extra" rows="3"
                placeholder="Appliances you want to optimise, existing solar setup, specific concerns…"
                class="form-input resize-none"></textarea>
            </div>

            <p v-if="adviceError" class="text-sm text-red-500">{{ adviceError }}</p>

            <!-- Submit -->
            <button
              type="submit"
              class="w-full py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[48px]"
              :class="adviceValid
                ? 'solar-glow shadow-md hover:scale-[1.01] active:scale-[0.99]'
                : 'bg-surface-container text-on-surface-variant/40 cursor-not-allowed'"
              :disabled="!adviceValid || adviceSending"
            >
              <svg v-if="adviceSending" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="40" stroke-dashoffset="15"/>
              </svg>
              <span class="material-symbols-outlined text-[18px]" v-else style="font-variation-settings:'FILL' 1">send</span>
              {{ adviceSending ? 'Sending…' : 'Submit Audit Request' }}
            </button>

            <p class="text-[10px] text-on-surface-variant/60 text-center">
              Free service · Your data is handled per our Privacy Policy · Response within 2 business days
            </p>
          </form>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.modal-fade-enter-active { transition: opacity 0.22s ease; }
.modal-fade-leave-active { transition: opacity 0.18s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

.modal-fade-enter-active .relative,
.modal-fade-leave-active .relative {
  transition: transform 0.22s cubic-bezier(0.34, 1.3, 0.64, 1);
}
.modal-fade-enter-from .relative { transform: translateY(20px); }
.modal-fade-leave-to .relative   { transform: translateY(10px); }
</style>