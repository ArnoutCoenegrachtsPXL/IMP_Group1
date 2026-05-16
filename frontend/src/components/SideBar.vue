<script setup>
import { computed } from 'vue'
import SideBarItem from './SideBarItem.vue'
import Logo from './Logo.vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

const props = defineProps({ mobileOpen: { type: Boolean, default: false } })
defineEmits(['close'])

const prefs = useUserPrefsStore()

// avatarUrl is a store computed — reacts to setAvatar() calls from ProfileSection
const avatar      = computed(() => prefs.avatarUrl)
const displayName = computed(() => prefs.profile.displayName)
const email       = computed(() => prefs.profile.email)

const navItems = computed(() => [
  { key: 'dashboard',   icon: 'grid_view',   link: '/dashboard',   always: true        },
  { key: 'leaderboard', icon: 'leaderboard', link: '/leaderboard', feat: 'leaderboard' },
  { key: 'uploadMeter', icon: 'solar_power', link: '/upload',   always: true        },
  { key: 'energyTips',  icon: 'lightbulb',   link: '/energy-tips', feat: 'energyTips'  },
  { key: 'community',   icon: 'groups',       link: '/community',   feat: 'community'   },
  { key: 'settings',    icon: 'settings',    link: '/settings',    always: true        },
].filter(item => item.always || prefs.features[item.feat]))

const isRtl = computed(() => ['ar', 'he', 'fa', 'ur'].includes(prefs.language))

const sidebarTranslate = computed(() => {
  if (props.mobileOpen) return 'translate-x-0'
  return isRtl.value ? 'translate-x-full md:translate-x-0' : '-translate-x-full md:translate-x-0'
})

const sidebarPosition = computed(() =>
  isRtl.value
    ? 'right-0 left-auto border-l border-r-0'
    : 'left-0 right-auto border-r border-l-0'
)
</script>

<template>
  <!-- Mobile overlay -->
  <Transition name="backdrop">
    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
      @click="$emit('close')"
      aria-hidden="true"
    />
  </Transition>

  <aside
    :class="[
      'sidebar fixed top-0 h-screen w-[17rem] z-40 flex flex-col',
      'transition-transform duration-300 ease-in-out',
      sidebarPosition,
      sidebarTranslate,
    ]"
    :aria-label="prefs.t.navMenu"
    role="navigation"
  >
    <!-- Logo (desktop) -->
    <div class="hidden md:flex items-center px-5 h-16 border-b border-outline-variant/20 shrink-0">
      <Logo />
    </div>

    <!-- Mobile header -->
    <div class="md:hidden flex items-center justify-between px-4 py-4 border-b border-outline-variant/20 shrink-0">
      <Logo />
      <button
        class="btn-icon flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors"
        :aria-label="prefs.t.close"
        @click="$emit('close')"
      >
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>

    <!-- User card — avatar reads from computed so updates instantly when profile saved -->
    <div class="mx-3 mt-4 mb-3 shrink-0">
      <router-link
        to="/settings"
        class="flex items-center gap-3 p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors group"
        @click="$emit('close')"
      >
        <div class="relative shrink-0">
          <div class="w-10 h-10 rounded-full overflow-hidden"
               style="box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 35%, transparent)">
            <img
              :src="avatar"
              :alt="displayName"
              class="w-full h-full object-cover"
            />
          </div>
          <!-- Online indicator -->
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-surface-container"></span>
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-bold text-sm text-on-surface truncate leading-tight group-hover:text-primary transition-colors">
            {{ displayName }}
          </p>
          <p class="text-[11px] text-on-surface-variant/70 truncate leading-tight">
            {{ email }}
          </p>
        </div>
        <span class="material-symbols-outlined text-[14px] text-on-surface-variant/40 group-hover:text-primary transition-colors shrink-0">
          chevron_right
        </span>
      </router-link>
    </div>

    <!-- Streak badge (feature-gated) -->
    <div v-if="prefs.features.streak" class="mx-3 mb-2 shrink-0">
      <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/8 border border-amber-500/15">
        <span class="text-base leading-none">🔥</span>
        <div>
          <p class="text-[11px] font-black text-amber-600 dark:text-amber-400 leading-tight">7-Day Streak</p>
          <p class="text-[10px] text-on-surface-variant/70">Keep it up!</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-2 space-y-0.5 overflow-y-auto py-1" role="list">
      <p class="text-[9px] uppercase tracking-[0.12em] font-black text-on-surface-variant/40 px-3 pt-2 pb-1">
        Navigation
      </p>
      <SideBarItem
        v-for="item in navItems"
        :key="item.key"
        :text="prefs.t[item.key]"
        :symbol="item.icon"
        :link="item.link"
        @click="$emit('close')"
      />
    </nav>

    <!-- Bottom section -->
    <div class="px-3 pb-5 pt-3 border-t border-outline-variant/15 space-y-1 shrink-0">
      <button class="solar-glow w-full py-2.5 px-4 rounded-xl font-bold text-sm shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-transform">
        ⚡ {{ prefs.t.viewImpactReport }}
      </button>

      <router-link
        to="/support"
        class="flex items-center gap-3 py-2.5 px-3 text-sm font-semibold text-on-surface-variant/70
               hover:text-primary hover:bg-surface-container rounded-xl transition-colors min-h-[44px]"
        @click="$emit('close')"
      >
        <span class="material-symbols-outlined text-[18px]">help</span>
        {{ prefs.t.support }}
      </router-link>

      <a href="/login"
        class="flex items-center gap-3 py-2.5 px-3 text-sm font-semibold text-on-surface-variant/70
               hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-colors min-h-[44px]"
      >
        <span class="material-symbols-outlined text-[18px]">logout</span>
        {{ prefs.t.logout }}
      </a>
    </div>
  </aside>
</template>

<style scoped>
.backdrop-enter-active, .backdrop-leave-active { transition: opacity 0.25s ease; }
.backdrop-enter-from, .backdrop-leave-to { opacity: 0; }
</style>