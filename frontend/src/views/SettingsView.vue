<script setup>
import { ref, watch, computed } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

const prefs = useUserPrefsStore()

// ── Local mirrors — live-preview pattern ───────────────────────────────────────
// Every watcher calls the store setter immediately, so changes apply globally.
const themeMode    = ref(prefs.themeMode)
const accentKey    = ref(prefs.accentKey)
const fontSize     = ref(prefs.fontSize)
const highContrast = ref(prefs.highContrast)
const reduceMotion = ref(prefs.reduceMotion)
const language     = ref(prefs.language)
const timezone     = ref(prefs.timezone)
const currency     = ref(prefs.currency)
const unitSystem   = ref(prefs.unitSystem)

watch(themeMode,    v => prefs.setThemeMode(v))
watch(accentKey,    v => prefs.setAccent(v))
watch(fontSize,     v => prefs.setFontSize(v))
watch(highContrast, v => prefs.setHighContrast(v))
watch(reduceMotion, v => prefs.setReduceMotion(v))
watch(language,     v => prefs.setLanguage(v))

// ── Accent colour options ─────────────────────────────────────────────────────
const accentOptions = [
  { key: 'blue',   label: 'Ocean Blue', hex: '#1978e5' },
  { key: 'teal',   label: 'Teal',       hex: '#0f9b84' },
  { key: 'violet', label: 'Violet',     hex: '#7c3aed' },
  { key: 'amber',  label: 'Amber',      hex: '#c2410c' },
  { key: 'rose',   label: 'Rose',       hex: '#e11d48' },
]

const fontSizeOptions = [
  { labelKey: 'small',  value: 14 },
  { labelKey: 'medium', value: 16 },
  { labelKey: 'large',  value: 18 },
  { labelKey: 'xlarge', value: 20 },
]

// ── Language list ─────────────────────────────────────────────────────────────
const languages = [
  { value: 'en', label: 'English',    flag: '🇬🇧' },
  { value: 'af', label: 'Afrikaans',  flag: '🇿🇦' },
  { value: 'zu', label: 'isiZulu',    flag: '🇿🇦' },
  { value: 'xh', label: 'isiXhosa',  flag: '🇿🇦' },
  { value: 'fr', label: 'Français',  flag: '🇫🇷' },
  { value: 'de', label: 'Deutsch',   flag: '🇩🇪' },
  { value: 'es', label: 'Español',   flag: '🇪🇸' },
  { value: 'pt', label: 'Português', flag: '🇧🇷' },
  { value: 'ar', label: 'العربية',   flag: '🇸🇦' },
]

const timezones = [
  { value: 'Africa/Johannesburg', label: 'SAST (UTC+2) — Johannesburg' },
  { value: 'Africa/Cairo',        label: 'EET (UTC+2) — Cairo' },
  { value: 'Africa/Lagos',        label: 'WAT (UTC+1) — Lagos' },
  { value: 'Europe/London',       label: 'GMT — London' },
  { value: 'America/New_York',    label: 'EST (UTC−5) — New York' },
  { value: 'America/Los_Angeles', label: 'PST (UTC−8) — Los Angeles' },
  { value: 'Asia/Tokyo',          label: 'JST (UTC+9) — Tokyo' },
  { value: 'Australia/Sydney',    label: 'AEST (UTC+10) — Sydney' },
]

// ── Notification toggles ──────────────────────────────────────────────────────
function loadBool(key, def = false) {
  const v = localStorage.getItem(key)
  return v === null ? def : v === 'true'
}

const notif = ref({
  emailAlerts:     loadBool('ep-notif-email',     true),
  pushAlerts:      loadBool('ep-notif-push',      true),
  weeklyReport:    loadBool('ep-notif-weekly',    true),
  communityPosts:  loadBool('ep-notif-community', false),
  priceAlerts:     loadBool('ep-notif-price',     true),
  maintenanceTips: loadBool('ep-notif-tips',      false),
})

// Persist every toggle change
watch(notif, v => {
  localStorage.setItem('ep-notif-email',     String(v.emailAlerts))
  localStorage.setItem('ep-notif-push',      String(v.pushAlerts))
  localStorage.setItem('ep-notif-weekly',    String(v.weeklyReport))
  localStorage.setItem('ep-notif-community', String(v.communityPosts))
  localStorage.setItem('ep-notif-price',     String(v.priceAlerts))
  localStorage.setItem('ep-notif-tips',      String(v.maintenanceTips))
}, { deep: true })

// Notification metadata — uses translation keys for titles/descs
const notifMeta = [
  { key: 'emailAlerts',     icon: 'email',         titleKey: 'emailAlerts',     descKey: 'emailAlertsDesc'     },
  { key: 'pushAlerts',      icon: 'notifications', titleKey: 'pushAlerts',      descKey: 'pushAlertsDesc'      },
  { key: 'weeklyReport',    icon: 'summarize',      titleKey: 'weeklyReport',    descKey: 'weeklyReportDesc'    },
  { key: 'communityPosts',  icon: 'group',          titleKey: 'communityPosts',  descKey: 'communityPostsDesc'  },
  { key: 'priceAlerts',     icon: 'price_change',   titleKey: 'priceAlerts',     descKey: 'priceAlertsDesc'     },
  { key: 'maintenanceTips', icon: 'lightbulb',      titleKey: 'maintenanceTips', descKey: 'maintenanceTipsDesc' },
]

// ── Privacy toggles ───────────────────────────────────────────────────────────
const privacy = ref({
  shareMetrics:      loadBool('ep-priv-metrics',   true),
  publicLeaderboard: loadBool('ep-priv-leader',    true),
  analyticsOptIn:    loadBool('ep-priv-analytics', false),
})
watch(privacy, v => {
  localStorage.setItem('ep-priv-metrics',   String(v.shareMetrics))
  localStorage.setItem('ep-priv-leader',    String(v.publicLeaderboard))
  localStorage.setItem('ep-priv-analytics', String(v.analyticsOptIn))
}, { deep: true })

const privacyMeta = [
  { key: 'shareMetrics',      titleKey: 'shareMetrics',      descKey: 'shareMetricsDesc'      },
  { key: 'publicLeaderboard', titleKey: 'publicLeaderboard', descKey: 'publicLeaderboardDesc' },
  { key: 'analyticsOptIn',    titleKey: 'usageAnalytics',    descKey: 'usageAnalyticsDesc'    },
]

// ── Energy toggles ────────────────────────────────────────────────────────────
const energy = ref({
  autoOffsetSurplus: loadBool('ep-en-offset',    true),
  communitySharing:  loadBool('ep-en-community', false),
  smartScheduling:   loadBool('ep-en-smart',     true),
  evCharging:        loadBool('ep-en-ev',        false),
})
watch(energy, v => {
  localStorage.setItem('ep-en-offset',    String(v.autoOffsetSurplus))
  localStorage.setItem('ep-en-community', String(v.communitySharing))
  localStorage.setItem('ep-en-smart',     String(v.smartScheduling))
  localStorage.setItem('ep-en-ev',        String(v.evCharging))
}, { deep: true })

const energyMeta = [
  { key: 'autoOffsetSurplus', titleKey: 'autoOffsetSurplus', descKey: 'autoOffsetSurplusDesc' },
  { key: 'communitySharing',  titleKey: 'communitySharing',  descKey: 'communitySharingDesc'  },
  { key: 'smartScheduling',   titleKey: 'smartScheduling',   descKey: 'smartSchedulingDesc'   },
  { key: 'evCharging',        titleKey: 'evCharging',        descKey: 'evChargingDesc'        },
]

const peakStart = ref(localStorage.getItem('ep-peak-start') || '22:00')
const peakEnd   = ref(localStorage.getItem('ep-peak-end')   || '06:00')
watch(peakStart, v => localStorage.setItem('ep-peak-start', v))
watch(peakEnd,   v => localStorage.setItem('ep-peak-end', v))

// ── Security ──────────────────────────────────────────────────────────────────
const currentPw = ref('')
const newPw     = ref('')
const confirmPw = ref('')
const twoFactor = ref(loadBool('ep-2fa', true))
const pwMatch   = ref(null) // null=untouched, true=match, false=mismatch

watch([newPw, confirmPw], ([n, c]) => {
  if (!n && !c) { pwMatch.value = null; return }
  pwMatch.value = n.length > 0 && n === c
})
watch(twoFactor, v => localStorage.setItem('ep-2fa', String(v)))

// ── Section navigation ────────────────────────────────────────────────────────
const activeSection = ref('appearance')
const sectionDefs = [
  { id: 'appearance',    icon: 'palette',       labelKey: 'appearance'     },
  { id: 'notifications', icon: 'notifications', labelKey: 'notifications'  },
  { id: 'privacy',       icon: 'shield',        labelKey: 'privacyData'    },
  { id: 'energy',        icon: 'bolt',          labelKey: 'energyPrefs'    },
  { id: 'region',        icon: 'language',      labelKey: 'languageRegion' },
  { id: 'security',      icon: 'lock',          labelKey: 'security'       },
  { id: 'danger',        icon: 'warning',       labelKey: 'dangerZone'     },
]

function scrollTo(id) {
  activeSection.value = id
  document.getElementById('section-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── Save toast ────────────────────────────────────────────────────────────────
const saved = ref(false)
function saveSettings() {
  prefs.setTimezone(timezone.value)
  prefs.setCurrency(currency.value)
  prefs.setUnitSystem(unitSystem.value)
  saved.value = true
  setTimeout(() => { saved.value = false }, 2500)
}

function resetAllSettings() {
  const keys = [
    'ep-accent','ep-dark','ep-theme-mode','ep-font-size','ep-hc','ep-motion',
    'ep-lang','ep-unit','ep-timezone','ep-currency','ep-unit-system',
    'ep-notif-email','ep-notif-push','ep-notif-weekly','ep-notif-community',
    'ep-notif-price','ep-notif-tips',
    'ep-priv-metrics','ep-priv-leader','ep-priv-analytics',
    'ep-en-offset','ep-en-community','ep-en-smart','ep-en-ev',
    'ep-2fa','ep-peak-start','ep-peak-end',
  ]
  keys.forEach(k => localStorage.removeItem(k))
  window.location.reload()
}

// ── Helpers ───────────────────────────────────────────────────────────────────
// Shared card section wrapper classes
const card = 'bg-surface-container-lowest rounded-2xl p-5 sm:p-6 border border-outline-variant/20 shadow-sm'
const sectionTitle = 'text-base sm:text-lg font-bold text-on-surface mb-5 sm:mb-6 flex items-center gap-2'
const toggleRow = 'flex items-center justify-between gap-4 py-3 px-3 sm:px-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors'
const labelSmall = 'text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-on-surface-variant mb-2 sm:mb-3'
</script>

<template>
  <div class="min-h-screen">
    <!-- Page header -->
    <header class="mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface mb-1">
        {{ prefs.t.settingsTitle }}
      </h1>
      <p class="text-on-surface-variant text-sm sm:text-base max-w-2xl">
        {{ prefs.t.settingsSubtitle }}
      </p>
    </header>

    <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

      <!-- ── Section nav sidebar ───────────────────────────────────────────── -->
      <nav
        class="w-full lg:w-52 xl:w-56 shrink-0 lg:sticky lg:top-24
               bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden shadow-sm"
        aria-label="Settings sections"
      >
        <!-- Horizontal scroll on mobile, vertical on lg+ -->
        <div class="flex lg:flex-col overflow-x-auto lg:overflow-visible scrollbar-hide">
          <button
            v-for="s in sectionDefs"
            :key="s.id"
            class="flex items-center gap-2.5 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium
                   whitespace-nowrap transition-all w-auto lg:w-full text-left shrink-0
                   hover:bg-surface-container-high min-h-[44px] focus-visible:ring-inset
                   focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            :class="activeSection === s.id
              ? 'bg-primary/10 text-primary font-semibold lg:border-l-4 lg:border-primary border-b-2 border-primary lg:border-b-0'
              : 'text-on-surface-variant'"
            @click="scrollTo(s.id)"
          >
            <span class="material-symbols-outlined text-[16px] sm:text-[18px]">{{ s.icon }}</span>
            <span class="hidden sm:inline">{{ prefs.t[s.labelKey] }}</span>
          </button>
        </div>
      </nav>

      <!-- ── Sections ──────────────────────────────────────────────────────── -->
      <div class="flex-1 space-y-6 sm:space-y-8 min-w-0 w-full">

        <!-- ════════════════════════════════════
             1. APPEARANCE
             ════════════════════════════════════ -->
        <section :id="'section-appearance'" :class="card">
          <h2 :class="sectionTitle">
            <span class="material-symbols-outlined text-primary text-[20px]">palette</span>
            {{ prefs.t.appearance }}
          </h2>

          <!-- Color mode picker -->
          <div class="mb-6 sm:mb-7">
            <p :class="labelSmall">{{ prefs.t.colorMode }}</p>
            <div class="grid grid-cols-3 gap-2 sm:gap-3">
              <button
                v-for="m in [
                  { id:'light',  icon:'light_mode',      labelKey:'light'  },
                  { id:'dark',   icon:'dark_mode',       labelKey:'dark'   },
                  { id:'system', icon:'brightness_auto', labelKey:'system' },
                ]"
                :key="m.id"
                class="flex flex-col items-center gap-1.5 sm:gap-2 py-3 sm:py-4 rounded-xl border-2 transition-all
                       min-h-[72px] sm:min-h-[80px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                :class="themeMode === m.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:bg-surface-container'"
                :aria-pressed="String(themeMode === m.id)"
                @click="themeMode = m.id"
              >
                <span class="material-symbols-outlined text-xl sm:text-2xl">{{ m.icon }}</span>
                <span class="text-[11px] sm:text-xs font-semibold">{{ prefs.t[m.labelKey] }}</span>
              </button>
            </div>
          </div>

          <!-- Accent colour -->
          <div class="mb-6 sm:mb-7">
            <p :class="labelSmall">{{ prefs.t.accentColor }}</p>
            <div class="flex flex-wrap gap-3 items-center">
              <button
                v-for="c in accentOptions"
                :key="c.key"
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all hover:scale-110
                       focus-visible:outline-none min-h-[44px] min-w-[44px]"
                :style="{
                  backgroundColor: c.hex,
                  boxShadow: accentKey === c.key
                    ? `0 0 0 3px var(--color-surface), 0 0 0 5px ${c.hex}`
                    : 'none'
                }"
                :title="c.label"
                :aria-label="c.label"
                :aria-pressed="String(accentKey === c.key)"
                @click="accentKey = c.key"
              />
              <span class="text-xs text-on-surface-variant capitalize ms-1">
                {{ accentOptions.find(a => a.key === accentKey)?.label }}
              </span>
            </div>
          </div>

          <!-- Text size -->
          <div class="mb-6 sm:mb-7">
            <p :class="labelSmall">{{ prefs.t.textSize }}</p>
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="opt in fontSizeOptions"
                :key="opt.value"
                class="px-3 sm:px-4 py-2 rounded-xl border-2 text-xs sm:text-sm transition-all min-h-[44px]
                       focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                :class="fontSize === opt.value
                  ? 'border-primary bg-primary/10 text-primary font-semibold'
                  : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/40'"
                @click="fontSize = opt.value"
              >
                {{ prefs.t[opt.labelKey] }}
              </button>
            </div>
          </div>

          <!-- Accessibility toggles -->
          <div class="space-y-2 sm:space-y-3">
            <p :class="labelSmall">{{ prefs.t.accessibility }}</p>

            <div :class="toggleRow">
              <div>
                <p class="text-sm font-semibold text-on-surface">{{ prefs.t.highContrast }}</p>
                <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.highContrastDesc }}</p>
              </div>
              <ToggleSwitch v-model="highContrast" :aria-label="prefs.t.highContrast" />
            </div>

            <div :class="toggleRow">
              <div>
                <p class="text-sm font-semibold text-on-surface">{{ prefs.t.reduceMotion }}</p>
                <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.reduceMotionDesc }}</p>
              </div>
              <ToggleSwitch v-model="reduceMotion" :aria-label="prefs.t.reduceMotion" />
            </div>
          </div>
        </section>

        <!-- ════════════════════════════════════
             2. NOTIFICATIONS
             ════════════════════════════════════ -->
        <section :id="'section-notifications'" :class="card">
          <h2 :class="sectionTitle">
            <span class="material-symbols-outlined text-primary text-[20px]">notifications</span>
            {{ prefs.t.notifications }}
          </h2>
          <div class="space-y-2 sm:space-y-3">
            <div
              v-for="meta in notifMeta"
              :key="meta.key"
              :class="toggleRow"
            >
              <div class="flex items-center gap-3 min-w-0">
                <span class="material-symbols-outlined text-primary text-[20px] shrink-0">{{ meta.icon }}</span>
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-on-surface truncate">{{ prefs.t[meta.titleKey] }}</p>
                  <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t[meta.descKey] }}</p>
                </div>
              </div>
              <ToggleSwitch v-model="notif[meta.key]" :aria-label="prefs.t[meta.titleKey]" />
            </div>
          </div>
        </section>

        <!-- ════════════════════════════════════
             3. PRIVACY & DATA
             ════════════════════════════════════ -->
        <section :id="'section-privacy'" :class="card">
          <h2 :class="sectionTitle">
            <span class="material-symbols-outlined text-primary text-[20px]">shield</span>
            {{ prefs.t.privacyData }}
          </h2>
          <p class="text-xs sm:text-sm text-on-surface-variant mb-5 sm:mb-6">
            {{ prefs.t.privacyControl }}
          </p>

          <div class="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
            <div
              v-for="meta in privacyMeta"
              :key="meta.key"
              :class="toggleRow"
            >
              <div>
                <p class="text-sm font-semibold text-on-surface">{{ prefs.t[meta.titleKey] }}</p>
                <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t[meta.descKey] }}</p>
              </div>
              <ToggleSwitch v-model="privacy[meta.key]" :aria-label="prefs.t[meta.titleKey]" />
            </div>
          </div>

          <div class="flex flex-wrap gap-2 sm:gap-3 pt-4 border-t border-outline-variant/15">
            <button
              class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-outline-variant/30
                     text-on-surface hover:bg-surface-container-high transition-colors min-h-[44px]"
            >
              {{ prefs.t.downloadMyData }}
            </button>
            <button
              class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-outline-variant/30
                     text-on-surface hover:bg-surface-container-high transition-colors min-h-[44px]"
            >
              {{ prefs.t.privacyPolicy }}
            </button>
          </div>
        </section>

        <!-- ════════════════════════════════════
             4. ENERGY PREFERENCES
             ════════════════════════════════════ -->
        <section :id="'section-energy'" :class="card">
          <h2 :class="sectionTitle">
            <span class="material-symbols-outlined text-primary text-[20px]">bolt</span>
            {{ prefs.t.energyPrefs }}
          </h2>

          <div class="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
            <div
              v-for="meta in energyMeta"
              :key="meta.key"
              :class="toggleRow"
            >
              <div>
                <p class="text-sm font-semibold text-on-surface">{{ prefs.t[meta.titleKey] }}</p>
                <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t[meta.descKey] }}</p>
              </div>
              <ToggleSwitch v-model="energy[meta.key]" :aria-label="prefs.t[meta.titleKey]" />
            </div>
          </div>

          <!-- Off-peak window time inputs -->
          <div>
            <p :class="labelSmall">{{ prefs.t.offPeakWindow }}</p>
            <div class="flex items-end gap-3 flex-wrap">
              <div class="flex flex-col gap-1">
                <label
                  class="text-xs text-on-surface-variant font-medium"
                  for="peak-start"
                >{{ prefs.t.start }}</label>
                <input
                  id="peak-start"
                  type="time"
                  v-model="peakStart"
                  class="bg-surface-container border border-outline-variant/30 rounded-xl px-3 py-2
                         text-sm text-on-surface focus:ring-2 focus:ring-primary/40 focus:border-primary/60
                         min-h-[44px]"
                />
              </div>
              <span class="text-on-surface-variant pb-3">→</span>
              <div class="flex flex-col gap-1">
                <label
                  class="text-xs text-on-surface-variant font-medium"
                  for="peak-end"
                >{{ prefs.t.end }}</label>
                <input
                  id="peak-end"
                  type="time"
                  v-model="peakEnd"
                  class="bg-surface-container border border-outline-variant/30 rounded-xl px-3 py-2
                         text-sm text-on-surface focus:ring-2 focus:ring-primary/40 focus:border-primary/60
                         min-h-[44px]"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- ════════════════════════════════════
             5. LANGUAGE & REGION
             ════════════════════════════════════ -->
        <section :id="'section-region'" :class="card">
          <h2 :class="sectionTitle">
            <span class="material-symbols-outlined text-primary text-[20px]">language</span>
            {{ prefs.t.languageRegion }}
          </h2>
          <p class="text-xs sm:text-sm text-on-surface-variant mb-5 sm:mb-6">
            {{ prefs.t.regionNote }}
          </p>

          <!-- Language picker grid -->
          <div class="mb-5 sm:mb-6">
            <p :class="labelSmall">{{ prefs.t.language }}</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                v-for="l in languages"
                :key="l.value"
                class="flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs sm:text-sm
                       transition-all text-left min-h-[44px]
                       focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                :class="language === l.value
                  ? 'border-primary bg-primary/10 text-primary font-semibold'
                  : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/40'"
                :aria-pressed="String(language === l.value)"
                @click="language = l.value"
              >
                <span class="text-sm leading-none shrink-0">{{ l.flag }}</span>
                <span class="truncate">{{ l.label }}</span>
                <span
                  v-if="language === l.value"
                  class="material-symbols-outlined text-[13px] ms-auto shrink-0"
                >check</span>
              </button>
            </div>

            <!-- Live language preview banner -->
            <div class="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-primary bg-primary/8 px-3 py-2.5 rounded-xl">
              <span class="material-symbols-outlined text-[14px]">translate</span>
              <span>{{ prefs.t.languageLive }}</span>
              <strong>{{ languages.find(l => l.value === language)?.label }}</strong>
              <span
                v-if="['ar','he','fa','ur'].includes(language)"
                class="opacity-70"
              >{{ prefs.t.rtlActive }}</span>
            </div>
          </div>

          <!-- Region dropdowns + unit system -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div class="space-y-1.5">
              <label for="tz" :class="labelSmall + ' block'">{{ prefs.t.timeZone }}</label>
              <select
                id="tz"
                v-model="timezone"
                class="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3
                       text-sm text-on-surface focus:ring-2 focus:ring-primary/40 focus:border-primary/60 min-h-[44px]"
              >
                <option v-for="tz in timezones" :key="tz.value" :value="tz.value">{{ tz.label }}</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label for="curr" :class="labelSmall + ' block'">{{ prefs.t.currency }}</label>
              <select
                id="curr"
                v-model="currency"
                class="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3
                       text-sm text-on-surface focus:ring-2 focus:ring-primary/40 focus:border-primary/60 min-h-[44px]"
              >
                <option value="ZAR">ZAR — South African Rand</option>
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
                <option value="GBP">GBP — British Pound</option>
                <option value="NGN">NGN — Nigerian Naira</option>
                <option value="KES">KES — Kenyan Shilling</option>
              </select>
            </div>

            <div class="sm:col-span-2 space-y-1.5">
              <p :class="labelSmall">{{ prefs.t.unitSystem }}</p>
              <div class="flex gap-2 sm:gap-3 flex-wrap">
                <label
                  v-for="u in [
                    { v:'metric',   l: prefs.t.metric   },
                    { v:'imperial', l: prefs.t.imperial  },
                  ]"
                  :key="u.v"
                  class="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl border-2 cursor-pointer
                         transition-all text-xs sm:text-sm min-h-[44px]"
                  :class="unitSystem === u.v
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/40'"
                >
                  <input type="radio" :value="u.v" v-model="unitSystem" class="sr-only" />
                  {{ u.l }}
                </label>
              </div>
            </div>
          </div>
        </section>

        <!-- ════════════════════════════════════
             6. SECURITY
             ════════════════════════════════════ -->
        <section :id="'section-security'" :class="card">
          <h2 :class="sectionTitle">
            <span class="material-symbols-outlined text-primary text-[20px]">lock</span>
            {{ prefs.t.security }}
          </h2>

          <!-- Change password -->
          <div class="mb-6 sm:mb-8">
            <p class="text-sm font-bold text-on-surface mb-4">{{ prefs.t.changePassword }}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div class="sm:col-span-2 space-y-1.5">
                <label
                  class="text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-on-surface-variant"
                  for="current-pw"
                >{{ prefs.t.currentPassword }}</label>
                <input
                  id="current-pw"
                  type="password"
                  v-model="currentPw"
                  placeholder="••••••••"
                  autocomplete="current-password"
                  class="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3
                         text-sm text-on-surface placeholder:text-on-surface-variant/40
                         focus:ring-2 focus:ring-primary/40 focus:border-primary/60 min-h-[44px]"
                />
              </div>

              <div class="space-y-1.5">
                <label
                  class="text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-on-surface-variant"
                  for="new-pw"
                >{{ prefs.t.newPassword }}</label>
                <input
                  id="new-pw"
                  type="password"
                  v-model="newPw"
                  placeholder="••••••••"
                  autocomplete="new-password"
                  class="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3
                         text-sm text-on-surface placeholder:text-on-surface-variant/40
                         focus:ring-2 focus:ring-primary/40 focus:border-primary/60 min-h-[44px]"
                />
              </div>

              <div class="space-y-1.5">
                <label
                  class="text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-on-surface-variant"
                  for="confirm-pw"
                >{{ prefs.t.confirmPassword }}</label>
                <input
                  id="confirm-pw"
                  type="password"
                  v-model="confirmPw"
                  placeholder="••••••••"
                  autocomplete="new-password"
                  :class="[
                    'w-full bg-surface-container rounded-xl px-4 py-3 text-sm text-on-surface',
                    'placeholder:text-on-surface-variant/40 focus:ring-2 min-h-[44px] border',
                    pwMatch === false ? 'border-error focus:ring-error/40'
                    : pwMatch === true  ? 'border-primary/60 focus:ring-primary/40'
                    : 'border-outline-variant/30 focus:ring-primary/40',
                  ]"
                />
                <p v-if="pwMatch === false" class="text-xs text-error mt-1" role="alert">
                  {{ prefs.t.passwordMismatch }}
                </p>
                <p v-if="pwMatch === true" class="text-xs text-primary mt-1" role="status">
                  {{ prefs.t.passwordMatch }}
                </p>
              </div>
            </div>

            <div class="mt-4 flex justify-end">
              <button
                :disabled="pwMatch !== true || !currentPw"
                class="px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-bold
                       hover:opacity-90 transition-opacity disabled:opacity-40 min-h-[44px]"
              >
                {{ prefs.t.updatePassword }}
              </button>
            </div>
          </div>

          <!-- 2FA -->
          <div :class="toggleRow">
            <div class="flex items-center gap-3 sm:gap-4">
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-primary text-[18px]">phonelink_lock</span>
              </div>
              <div>
                <p class="font-semibold text-on-surface text-sm">{{ prefs.t.twoFactor }}</p>
                <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.twoFactorDesc }}</p>
              </div>
            </div>
            <ToggleSwitch v-model="twoFactor" :aria-label="prefs.t.twoFactor" />
          </div>
        </section>

        <!-- ════════════════════════════════════
             7. DANGER ZONE
             ════════════════════════════════════ -->
        <section
          :id="'section-danger'"
          class="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 border border-error/30 shadow-sm"
        >
          <h2 class="text-base sm:text-lg font-bold text-error mb-2 flex items-center gap-2">
            <span class="material-symbols-outlined text-[20px]">warning</span>
            {{ prefs.t.dangerZone }}
          </h2>
          <p class="text-xs sm:text-sm text-on-surface-variant mb-5 sm:mb-6">
            These actions are permanent and cannot be undone.
          </p>

          <div class="space-y-3 sm:space-y-4">
            <!-- Reset all settings -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-error/20 bg-error/5">
              <div>
                <p class="font-semibold text-on-surface text-sm">{{ prefs.t.resetSettings }}</p>
                <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.resetSettingsDesc }}</p>
              </div>
              <button
                class="px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl border border-error/40 text-error
                       hover:bg-error/10 transition-colors shrink-0 min-h-[44px]"
                @click="resetAllSettings"
              >
                {{ prefs.t.resetSettings }}
              </button>
            </div>

            <!-- Delete account -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-error/20 bg-error/5">
              <div>
                <p class="font-semibold text-on-surface text-sm">{{ prefs.t.deleteAccount }}</p>
                <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.deleteAccountDesc }}</p>
              </div>
              <button
                class="px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-error text-on-error
                       hover:opacity-90 transition-opacity shrink-0 min-h-[44px]"
              >
                {{ prefs.t.deleteAccount }}
              </button>
            </div>
          </div>
        </section>

        <!-- Save bar -->
        <div class="flex justify-end pt-1 pb-8">
          <button
            class="px-6 sm:px-8 py-3 solar-glow rounded-2xl font-bold text-sm shadow-md
                   hover:scale-105 active:scale-95 transition-transform min-h-[44px]"
            @click="saveSettings"
          >
            {{ prefs.t.saveAllChanges }}
          </button>
        </div>
      </div><!-- /sections -->
    </div><!-- /flex layout -->

    <!-- ── Toast notification ──────────────────────────────────────────────── -->
    <transition name="toast">
      <div
        v-if="saved"
        class="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-primary text-on-primary
               px-4 sm:px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2 font-semibold text-sm z-[200]"
        role="status"
        aria-live="polite"
      >
        <span class="material-symbols-outlined text-base">check_circle</span>
        {{ prefs.t.settingsSaved }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Toast animation */
.toast-enter-active, .toast-leave-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-enter-from, .toast-leave-to       { opacity: 0; transform: translateY(1rem) scale(0.95); }

/* Hide scrollbar on the nav row on mobile while keeping scroll */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
