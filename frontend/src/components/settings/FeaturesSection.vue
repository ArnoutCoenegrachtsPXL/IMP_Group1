<script setup>
import { useUserPrefsStore } from '@/stores/userPrefs'

defineEmits(['saved'])
const prefs = useUserPrefsStore()

const featureItems = [
  { key: 'chatbot',     icon: 'smart_toy',   titleKey: 'chatbotFeature',     descKey: 'chatbotFeatureDesc'     },
  { key: 'leaderboard', icon: 'leaderboard', titleKey: 'leaderboardFeature', descKey: 'leaderboardFeatureDesc' },
  { key: 'energyTips',  icon: 'lightbulb',   titleKey: 'energyTipsFeature',  descKey: 'energyTipsFeatureDesc'  },
  { key: 'community',   icon: 'group',       titleKey: 'communityFeature',   descKey: 'communityFeatureDesc'   },
  { key: 'streak',      icon: 'local_fire_department', titleKey: 'streakFeature', descKey: 'streakFeatureDesc'  },
]
</script>

<template>
  <section class="card">
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-2 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">tune</span>
      {{ prefs.t.featuresTitle }}
    </h2>
    <p class="text-xs sm:text-sm text-on-surface-variant mb-5">{{ prefs.t.featuresDesc }}</p>

    <div class="space-y-2">
      <div v-for="item in featureItems" :key="item.key" class="toggle-row">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-opacity"
               :class="prefs.features[item.key] ? 'opacity-100' : 'opacity-40'">
            <span class="material-symbols-outlined text-primary text-[18px]">{{ item.icon }}</span>
          </div>
          <div class="min-w-0">
            <p class="text-sm font-semibold text-on-surface truncate">{{ prefs.t[item.titleKey] }}</p>
            <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t[item.descKey] }}</p>
          </div>
        </div>
        <ToggleSwitch
          v-model="prefs.features[item.key]"
          :aria-label="prefs.t[item.titleKey]"
        />
      </div>
    </div>

    <!-- Contextual note -->
    <div class="mt-4 flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
      <span class="material-symbols-outlined text-primary text-[16px] mt-0.5 shrink-0">info</span>
      <p class="text-xs text-on-surface-variant">
        Disabling a feature removes it from the sidebar and hides its content throughout the app. Your data is preserved and the feature can be re-enabled at any time.
      </p>
    </div>
  </section>
</template>
