<script setup>
import Logo from './Logo.vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { useRouter } from 'vue-router'

const prefs  = useUserPrefsStore()
const router = useRouter()
defineEmits(['toggle-sidebar'])
</script>

<template>
  <header
    class="sticky top-0 z-50 flex items-center justify-between
           px-4 sm:px-6 h-16 min-h-[64px] shrink-0
           border-b border-outline-variant/20"
    style="background-color: color-mix(in srgb, var(--color-background) 88%, transparent);
           backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);"
    role="banner"
  >
    <!-- Left: hamburger + logo (mobile) -->
    <div class="flex items-center gap-2">
      <button
        class="md:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high
               transition-colors btn-icon"
        :aria-label="prefs.t.navMenu"
        @click="$emit('toggle-sidebar')"
      >
        <span class="material-symbols-outlined text-[22px]">menu</span>
      </button>
      <div class="md:hidden"><Logo /></div>
    </div>

    <!-- Centre: search (sm+) -->
    <div class="flex-1 max-w-sm mx-4 hidden sm:block">
      <div class="relative">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2
                     text-on-surface-variant text-[18px] pointer-events-none">search</span>
        <input
          class="w-full bg-surface-container border border-outline-variant/30 rounded-xl
                 py-2 pl-9 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/50
                 focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
          :placeholder="prefs.t.search"
          type="search"
          :aria-label="prefs.t.search"
        />
      </div>
    </div>

    <!-- Right: actions -->
    <div class="flex items-center gap-1 sm:gap-2">
      <!-- Dark / light toggle -->
      <button
        class="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high
               transition-colors btn-icon"
        :aria-label="prefs.isDark ? prefs.t.light : prefs.t.dark"
        :title="prefs.isDark ? prefs.t.light : prefs.t.dark"
        @click="prefs.toggleTheme()"
      >
        <span class="material-symbols-outlined text-[22px]">
          {{ prefs.isDark ? 'light_mode' : 'dark_mode' }}
        </span>
      </button>

      <!-- Upload shortcut -->
      <router-link
        to="/upload"
        class="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high
               transition-colors btn-icon"
        :aria-label="prefs.t.uploadMeter"
        :title="prefs.t.uploadMeter"
      >
        <span class="material-symbols-outlined text-[22px]">upload</span>
      </router-link>

      <!-- Notifications -->
      <button
        class="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high
               transition-colors btn-icon"
        :aria-label="prefs.t.notifications"
      >
        <span class="material-symbols-outlined text-[22px]">notifications</span>
        <span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-surface" aria-hidden="true" />
      </button>

      <!-- Avatar / settings -->
      <router-link
        to="/settings"
        class="flex items-center gap-2 rounded-xl p-1 hover:bg-surface-container-high
               transition-colors focus-visible:ring-2 focus-visible:ring-primary
               focus-visible:outline-none ml-1"
        :aria-label="prefs.t.settings"
      >
        <div class="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/25 shrink-0">
          <img
            :src="prefs.avatarUrl"
            :alt="prefs.profile.displayName"
            class="w-full h-full object-cover"
          />
        </div>
        <span class="hidden lg:block text-sm font-medium text-on-surface truncate max-w-[120px]">
          {{ prefs.profile.displayName }}
        </span>
      </router-link>
    </div>
  </header>
</template>
