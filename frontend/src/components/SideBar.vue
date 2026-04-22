<script setup>
import SideBarItem from './SideBarItem.vue'
import Logo from './Logo.vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

defineProps({ mobileOpen: { type: Boolean, default: false } })
defineEmits(['close'])

const store = useUserPrefsStore()

const navItems = [
  { key: 'dashboard',   icon: 'grid_view',   link: '/dashboard'   },
  { key: 'leaderboard', icon: 'leaderboard', link: '/leaderboard' },
  { key: 'uploadMeter', icon: 'add',         link: '/upload'      },
  { key: 'energyLab',   icon: 'science',     link: '#'            },
  { key: 'community',   icon: 'group',       link: '#'            },
  { key: 'settings',    icon: 'settings',    link: '/settings'    },
]

// RTL languages flip sidebar to right side
const isRtl = () => ['ar', 'he', 'fa', 'ur'].includes(store.language)
</script>

<template>
  <aside
    :class="[
      'fixed top-0 h-screen w-64 sm:w-72 z-40 flex flex-col py-6 sm:py-8',
      'bg-surface border-outline-variant/20 transition-transform duration-300 ease-in-out',
      // LTR: left side. RTL: right side.
      isRtl()
        ? 'right-0 left-auto border-l ' + (mobileOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0')
        : 'left-0 right-auto border-r ' + (mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'),
    ]"
    aria-label="Main navigation"
  >
    <!-- Logo (hidden on mobile — shown in topbar) -->
    <div class="hidden md:block px-4 mb-2"><Logo /></div>

    <!-- Mobile header row: section label + close button -->
    <div class="md:hidden flex justify-between items-center px-5 mb-4">
      <span class="text-base font-bold text-on-surface">{{ store.t.settings }}</span>
      <button
        class="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
        :aria-label="store.t.settings"
        @click="$emit('close')"
      >
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>

    <!-- User card -->
    <div class="flex flex-col items-center mb-5 px-5">
      <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-surface-container-high mb-3 overflow-hidden ring-2 ring-primary/20">
        <img
          class="w-full h-full object-cover"
          alt="User Avatar"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfmVuxN7riZahEcZ3uEoyYaRu9JXhalFTwXgadhcFsO8Xxou2dNcoqLOfZaIVbt8EnWTxlg3zRPYQ3Ta0F3ZGippGnsp1oxqgxsXlQAVirvN2at_uPKdde96ZedgOfNsdhJsvdG-OHe9C1A783qYo3cywkcasmg1YO50I7lV5oPQ7SctvfOUX2o0b0Bib32LcFYdZAHsglAza7pXs2Huj9NN_-orB0EAl-8zNBzrU9L8qcYNqy1pmq3ak2Y026EolUm5Z-VCZoJaU"
        />
      </div>
      <p class="font-bold text-on-surface text-sm sm:text-base">Energy Hero</p>
      <p class="text-xs text-primary font-medium mt-0.5">7 Day Streak 🔥</p>
    </div>

    <!-- Navigation items -->
    <nav class="flex-1 space-y-0.5 px-2 overflow-y-auto" role="navigation" :aria-label="store.t.dashboard">
      <SideBarItem
        v-for="item in navItems"
        :key="item.key"
        :text="store.t[item.key]"
        :symbol="item.icon"
        :link="item.link"
        @click="$emit('close')"
      />
    </nav>

    <!-- Bottom actions -->
    <div class="px-4 mt-auto flex flex-col gap-3 pt-4 border-t border-outline-variant/10">
      <button
        class="solar-glow text-white py-2.5 px-4 rounded-xl font-semibold text-sm
               shadow-md active:scale-95 transition-transform w-full text-center"
      >
        {{ store.t.viewImpactReport }}
      </button>
      <div class="flex flex-col gap-0.5">
        <a
          href="#"
          class="flex items-center gap-3 py-2 px-2 text-on-surface-variant/70 text-sm font-medium
                 hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
        >
          <span class="material-symbols-outlined text-[18px]">help</span>
          {{ store.t.support }}
        </a>
        <a
          href="#"
          class="flex items-center gap-3 py-2 px-2 text-on-surface-variant/70 text-sm font-medium
                 hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
        >
          <span class="material-symbols-outlined text-[18px]">logout</span>
          {{ store.t.logout }}
        </a>
      </div>
    </div>
  </aside>
</template>
