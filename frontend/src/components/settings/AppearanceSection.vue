<script setup>
import { ref, watch } from 'vue'
import { useUserPrefsStore, ACCENT_PALETTES } from '@/stores/userPrefs'

defineEmits(['saved'])
const prefs = useUserPrefsStore()

// Local mirrors — watchers apply immediately (live preview)
const themeMode    = ref(prefs.themeMode)
const accentKey    = ref(prefs.accentKey)
const fontSize     = ref(prefs.fontSize)
const highContrast = ref(prefs.highContrast)
const reduceMotion = ref(prefs.reduceMotion)
const compactMode  = ref(prefs.compactMode)

watch(themeMode,    v => prefs.setThemeMode(v))
watch(accentKey,    v => prefs.setAccent(v))
watch(fontSize,     v => prefs.setFontSize(v))
watch(highContrast, v => prefs.setHighContrast(v))
watch(reduceMotion, v => prefs.setReduceMotion(v))
watch(compactMode,  v => prefs.setCompactMode(v))

const fontSizeOptions = [
  { labelKey: 'small',  value: 13 },
  { labelKey: 'medium', value: 15 },
  { labelKey: 'large',  value: 17 },
  { labelKey: 'xlarge', value: 19 },
]

const modeOptions = [
  { id: 'light',  icon: 'light_mode',      labelKey: 'light'  },
  { id: 'dark',   icon: 'dark_mode',       labelKey: 'dark'   },
  { id: 'system', icon: 'brightness_auto', labelKey: 'system' },
]
</script>

<template>
  <section class="card">
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">palette</span>
      {{ prefs.t.appearance }}
    </h2>

    <!-- Color mode -->
    <div class="mb-7">
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
        {{ prefs.t.colorMode }}
      </p>
      <div class="grid grid-cols-3 gap-2 sm:gap-3">
        <button
          v-for="m in modeOptions" :key="m.id"
          class="flex flex-col items-center gap-2 py-3 sm:py-4 rounded-2xl border-2 transition-all
                 min-h-[72px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          :class="themeMode === m.id
            ? 'border-primary bg-primary/8 text-primary'
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
    <div class="mb-7">
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
        {{ prefs.t.accentColor }}
      </p>
      <div class="flex flex-wrap gap-3 items-center">
        <button
          v-for="(palette, key) in ACCENT_PALETTES" :key="key"
          class="w-10 h-10 rounded-full transition-all hover:scale-110 min-h-[44px] min-w-[44px]
                 focus-visible:outline-none"
          :style="{
            backgroundColor: palette.hex,
            boxShadow: accentKey === key
              ? `0 0 0 3px var(--color-surface), 0 0 0 5px ${palette.hex}`
              : 'none',
          }"
          :title="palette.label"
          :aria-label="palette.label"
          :aria-pressed="String(accentKey === key)"
          @click="accentKey = key"
        />
        <span class="text-xs text-on-surface-variant ml-1 capitalize">
          {{ ACCENT_PALETTES[accentKey]?.label }}
        </span>
      </div>
    </div>

    <!-- Font size -->
    <div class="mb-7">
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
        {{ prefs.t.textSize }}
      </p>
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="opt in fontSizeOptions" :key="opt.value"
          class="px-4 py-2 rounded-xl border-2 text-xs sm:text-sm transition-all min-h-[44px]
                 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          :class="fontSize === opt.value
            ? 'border-primary bg-primary/8 text-primary font-semibold'
            : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/40'"
          @click="fontSize = opt.value"
        >{{ prefs.t[opt.labelKey] }}</button>
      </div>
    </div>

    <!-- Accessibility toggles -->
    <div class="space-y-2">
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-2">
        {{ prefs.t.accessibility }}
      </p>

      <div class="toggle-row">
        <div>
          <p class="text-sm font-semibold text-on-surface">{{ prefs.t.highContrast }}</p>
          <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.highContrastDesc }}</p>
        </div>
        <ToggleSwitch v-model="highContrast" :aria-label="prefs.t.highContrast" />
      </div>

      <div class="toggle-row">
        <div>
          <p class="text-sm font-semibold text-on-surface">{{ prefs.t.reduceMotion }}</p>
          <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.reduceMotionDesc }}</p>
        </div>
        <ToggleSwitch v-model="reduceMotion" :aria-label="prefs.t.reduceMotion" />
      </div>

      <div class="toggle-row">
        <div>
          <p class="text-sm font-semibold text-on-surface">{{ prefs.t.compactMode }}</p>
          <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.compactModeDesc }}</p>
        </div>
        <ToggleSwitch v-model="compactMode" :aria-label="prefs.t.compactMode" />
      </div>
    </div>
  </section>
</template>
