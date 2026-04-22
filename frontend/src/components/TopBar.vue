<script setup>
import TopBarButton from './TopBarButton.vue'
import Logo from './Logo.vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

const prefs = useUserPrefsStore()
defineEmits(['toggle-sidebar'])

const buttons = [
  { symbol: 'add',           description: 'Upload meter',  link: '/upload' },
  { symbol: 'notifications', description: 'Notifications', link: '#'       },
]
</script>

<template>
  <header
    class="fixed top-0 w-full z-50 backdrop-blur-md flex justify-between items-center
           px-3 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-outline-variant/20
           min-h-[56px] sm:min-h-[64px]"
    style="background-color: color-mix(in srgb, var(--color-background) 88%, transparent);"
    role="banner"
  >
    <!-- Left: hamburger (mobile) + logo -->
    <div class="flex items-center gap-2 sm:gap-3 min-w-0">
      <button
        class="md:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high
               transition-colors focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Open navigation menu"
        @click="$emit('toggle-sidebar')"
      >
        <span class="material-symbols-outlined text-[22px]">menu</span>
      </button>
      <Logo />
    </div>

    <!-- Right: search + actions -->
    <div class="flex items-center gap-1 sm:gap-2">
      <!-- Search — visible on sm+ -->
      <div class="relative hidden sm:block">
        <span class="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">search</span>
        <input
          class="bg-surface-container-low rounded-lg py-2 pl-8 pr-3 text-sm
                 focus:ring-2 focus:ring-primary/30 text-on-surface
                 placeholder:text-on-surface-variant/60
                 w-32 lg:w-52 transition-all focus:w-44 lg:focus:w-64
                 border border-outline-variant/20 focus:border-primary/40"
          :placeholder="prefs.t.search"
          type="search"
          aria-label="Search"
        />
      </div>

      <!-- Dark / light mode toggle -->
      <button
        class="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high
               transition-colors focus-visible:ring-2 focus-visible:ring-primary"
        :aria-label="prefs.isDark ? prefs.t.light : prefs.t.dark"
        :title="prefs.isDark ? prefs.t.light : prefs.t.dark"
        @click="prefs.toggleTheme()"
      >
        <span class="material-symbols-outlined text-[22px]">
          {{ prefs.isDark ? 'light_mode' : 'dark_mode' }}
        </span>
      </button>

      <TopBarButton
        v-for="b in buttons"
        :key="b.symbol"
        :symbol="b.symbol"
        :description="b.description"
        :link="b.link"
      />

      <!-- Avatar -->
      <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-primary/30 shrink-0 ml-1">
        <img
          class="w-full h-full object-cover"
          alt="User profile"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2NwZTRTcj3EG7iTu3J7ZZ6mmC5u6AI7_6FA41Ll75H0DIlVTyaZCULCFriCewwZmIJS0jWpOEh9dvy3yZUeut3E0NaKXxSpWPqK0hZTtg_x_G8FSzN6lcQnjShWFmVVmw72PHTp_tiHiWdfAVWNVsUr46v6ixCUyc7lClV8smH3sDlm4-Cb63SinRiPPPVTwIEYWhLV1Th5m-KxCHvR4XSGOR-cnGDTNJnyWWwkdzvO2lk7hUu_Dfv-w5sNUiiQdtIV7DIK71N3I"
        />
      </div>
    </div>
  </header>
</template>
