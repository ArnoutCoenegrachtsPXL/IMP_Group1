<script setup>
import { useUserPrefsStore } from '@/stores/userPrefs'
defineEmits(['saved'])
const prefs = useUserPrefsStore()

const privacyItems = [
  { key: 'shareMetrics', titleKey: 'shareMetrics', descKey: 'shareMetricsDesc' },
  { key: 'publicLeader', titleKey: 'publicLeaderboard', descKey: 'publicLeaderboardDesc' },
  { key: 'analytics',    titleKey: 'analyticsOptIn', descKey: 'analyticsOptInDesc' },
]
</script>

<template>
  <section class="card">
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-2 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">shield</span>
      {{ prefs.t.privacyData }}
    </h2>
    <p class="text-xs sm:text-sm text-on-surface-variant mb-5">{{ prefs.t.privacyControl }}</p>

    <div class="space-y-2 mb-5">
      <div v-for="item in privacyItems" :key="item.key" class="toggle-row">
        <div>
          <p class="text-sm font-semibold text-on-surface">{{ prefs.t[item.titleKey] }}</p>
          <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t[item.descKey] }}</p>
        </div>
        <ToggleSwitch v-model="prefs.privacy[item.key]" :aria-label="prefs.t[item.titleKey]" />
      </div>
    </div>

    <div class="flex flex-wrap gap-2 pt-4 border-t border-outline-variant/15">
      <button class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-outline-variant/30
                     text-on-surface hover:bg-surface-container-high transition-colors min-h-[44px]">
        {{ prefs.t.downloadMyData }}
      </button>
      <a href="#" class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-outline-variant/30
                         text-on-surface hover:bg-surface-container-high transition-colors min-h-[44px] flex items-center">
        {{ prefs.t.privacyPolicy }}
      </a>
    </div>
  </section>
</template>
