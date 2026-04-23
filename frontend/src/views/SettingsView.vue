<script setup>
import { ref, watch, computed } from 'vue'
import { useUserPrefsStore, ACCENT_PALETTES } from '@/stores/userPrefs'
import ProfileSection      from '@/components/settings/ProfileSection.vue'
import AppearanceSection   from '@/components/settings/AppearanceSection.vue'
import NotificationsSection from '@/components/settings/NotificationsSection.vue'
import FeaturesSection     from '@/components/settings/FeaturesSection.vue'
import EnergySection       from '@/components/settings/EnergySection.vue'
import PrivacySection      from '@/components/settings/PrivacySection.vue'
import RegionSection       from '@/components/settings/RegionSection.vue'
import SecuritySection     from '@/components/settings/SecuritySection.vue'
import DangerSection       from '@/components/settings/DangerSection.vue'

const prefs = useUserPrefsStore()

// ── Section navigation ────────────────────────────────────────────────────────
const active = ref('profile')
const sections = [
  { id: 'profile',       icon: 'person',        labelKey: 'profile'        },
  { id: 'appearance',    icon: 'palette',        labelKey: 'appearance'     },
  { id: 'notifications', icon: 'notifications',  labelKey: 'notifications'  },
  { id: 'features',      icon: 'tune',           labelKey: 'featuresTitle'  },
  { id: 'energy',        icon: 'bolt',           labelKey: 'energyPrefs'    },
  { id: 'privacy',       icon: 'shield',         labelKey: 'privacyData'    },
  { id: 'region',        icon: 'language',       labelKey: 'languageRegion' },
  { id: 'security',      icon: 'lock',           labelKey: 'security'       },
  { id: 'danger',        icon: 'warning',        labelKey: 'dangerZone'     },
]

function goTo(id) {
  active.value = id
  const el = document.getElementById(`sec-${id}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── Intersection observer to update active section on scroll ─────────────────
import { onMounted, onUnmounted } from 'vue'
let observer = null
onMounted(() => {
  observer = new IntersectionObserver(entries => {
    for (const e of entries)
      if (e.isIntersecting && e.intersectionRatio > 0.3)
        active.value = e.target.id.replace('sec-', '')
  }, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' })
  sections.forEach(s => {
    const el = document.getElementById(`sec-${s.id}`)
    if (el) observer.observe(el)
  })
})
onUnmounted(() => observer?.disconnect())

// ── Save toast ────────────────────────────────────────────────────────────────
const saved  = ref(false)
const toastMsg = ref('')
function showToast(msg) {
  toastMsg.value = msg || prefs.t.settingsSaved
  saved.value = true
  setTimeout(() => { saved.value = false }, 3000)
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Page header -->
    <header class="mb-6 sm:mb-8">
      <h1 class="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface mb-1 tracking-tight">
        {{ prefs.t.settingsTitle }}
      </h1>
      <p class="text-on-surface-variant text-sm sm:text-base max-w-2xl">
        {{ prefs.t.settingsSubtitle }}
      </p>
    </header>

    <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

      <!-- ── Sticky section nav ──────────────────────────────────────────────── -->
      <nav
        class="w-full lg:w-52 xl:w-56 shrink-0 lg:sticky lg:top-6
               bg-surface-container-lowest rounded-2xl border border-outline-variant/20
               overflow-hidden shadow-sm"
        aria-label="Settings navigation"
      >
        <!-- Horizontal scroll on mobile, vertical list on desktop -->
        <ul class="flex lg:flex-col overflow-x-auto scrollbar-hide lg:overflow-visible py-1 lg:py-2">
          <li v-for="s in sections" :key="s.id">
            <button
              class="flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium
                     whitespace-nowrap w-auto lg:w-full text-left shrink-0 transition-all min-h-[44px]
                     hover:bg-surface-container-high lg:rounded-none
                     focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary
                     focus-visible:outline-none"
              :class="active === s.id
                ? 'text-primary bg-primary/8 lg:border-l-4 lg:border-primary font-semibold border-b-2 lg:border-b-0 border-primary'
                : 'text-on-surface-variant'"
              @click="goTo(s.id)"
            >
              <span class="material-symbols-outlined text-[16px] sm:text-[18px] shrink-0">{{ s.icon }}</span>
              <span class="hidden sm:inline">{{ prefs.t[s.labelKey] ?? s.id }}</span>
            </button>
          </li>
        </ul>
      </nav>

      <!-- ── Sections ──────────────────────────────────────────────────────── -->
      <div class="flex-1 min-w-0 space-y-5 sm:space-y-6 w-full">

        <ProfileSection      id="sec-profile"       @saved="showToast" />
        <AppearanceSection   id="sec-appearance"    @saved="showToast" />
        <NotificationsSection id="sec-notifications" @saved="showToast" />
        <FeaturesSection     id="sec-features"      @saved="showToast" />
        <EnergySection       id="sec-energy"        @saved="showToast" />
        <PrivacySection      id="sec-privacy"       @saved="showToast" />
        <RegionSection       id="sec-region"        @saved="showToast" />
        <SecuritySection     id="sec-security"      @saved="showToast" />
        <DangerSection       id="sec-danger"        />

        <!-- Save bar -->
        <div class="flex justify-end pb-8">
          <button
            class="solar-glow px-6 sm:px-8 py-3 rounded-2xl font-semibold text-sm
                   shadow-md hover:scale-105 active:scale-95 transition-transform min-h-[48px]"
            @click="showToast(prefs.t.settingsSaved)"
          >
            {{ prefs.t.saveAllChanges }}
          </button>
        </div>
      </div>
    </div>

    <!-- ── Toast ──────────────────────────────────────────────────────────────── -->
    <transition name="toast">
      <div
        v-if="saved"
        class="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[300]
               bg-primary text-on-primary px-4 sm:px-5 py-3 rounded-2xl shadow-xl
               flex items-center gap-2 font-semibold text-sm max-w-[90vw]"
        role="status"
        aria-live="polite"
      >
        <span class="material-symbols-outlined text-[18px]">check_circle</span>
        {{ toastMsg }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.toast-enter-from,  .toast-leave-to      { opacity: 0; transform: translateY(12px) scale(0.94); }
</style>
