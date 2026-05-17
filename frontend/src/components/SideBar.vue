<script setup>
/**
 * SideBar.vue
 * ─────────────────────────────────────────────────────────────
 * CHANGES:
 * • Community link updated from dead href="#" / "Coming Soon"
 *   to <router-link to="/community"> — fully live.
 * • Support and Logout already use router-link / router.push
 *   from the previous update — kept intact.
 * • navItems community entry updated: link: '/community', always: false,
 *   feat: 'community' — gated behind the feature flag as before.
 */
import { computed } from 'vue'
import SideBarItem from './SideBarItem.vue'
import Logo from './Logo.vue'
import ImpactReport from './ImpactReport.vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({ mobileOpen: { type: Boolean, default: false } })
defineEmits(['close'])

const prefs  = useUserPrefsStore()
const router = useRouter()
const reportModal = ref(null)

const isRtl = computed(() => ['ar', 'he', 'fa', 'ur'].includes(prefs.language))

const navItems = computed(() => [
  { key: 'dashboard',   icon: 'grid_view',              link: '/dashboard',   always: true        },
  { key: 'leaderboard', icon: 'leaderboard',             link: '/leaderboard', feat: 'leaderboard' },
  { key: 'uploadMeter', icon: 'upload_file',             link: '/upload',      always: true        },
  { key: 'energyTips',  icon: 'lightbulb',               link: '/energy-tips', feat: 'energyTips'  },
  // ★ Community now routes to /community instead of "#"
  { key: 'community',   icon: 'solar_power',             link: '/community',   feat: 'community'   },
  { key: 'settings',    icon: 'settings',                link: '/settings',    always: true        },
].filter(item => item.always || prefs.features[item.feat]))

const sidebarTranslate = computed(() => {
  if (props.mobileOpen) return 'translate-x-0'
  return isRtl.value ? 'translate-x-full md:translate-x-0' : '-translate-x-full md:translate-x-0'
})

const sidebarPosition = computed(() =>
  isRtl.value ? 'right-0 left-auto border-l' : 'left-0 right-auto border-r'
)

function logout() {
  router.push('/login')
}
</script>

<template>
  <aside
    style="background-color: color-mix(in srgb, var(--color-surface-container-low) 97%, transparent); border-right: 1px solid var(--color-outline-variant);"
    :class="[
      'fixed top-0 h-screen w-[17rem] z-40 flex flex-col',
      'sidebar transition-transform duration-300 ease-in-out',
      sidebarPosition, sidebarTranslate,
    ]"
    :aria-label="prefs.t.navMenu"
    role="navigation"
  >
    <!-- Logo -->
    <div class="px-5 pt-6 pb-4 hidden md:block border-b border-outline-variant/10">
      <Logo />
    </div>

    <!-- Mobile header -->
    <div class="md:hidden flex justify-between items-center px-5 pt-5 pb-4 border-b border-outline-variant/10">
      <Logo />
      <button
        class="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors"
        :aria-label="prefs.t.close"
        @click="$emit('close')"
      >
        <span class="material-symbols-outlined text-[22px]">close</span>
      </button>
    </div>

    <!-- User card -->
    <div class="flex items-center gap-3 mx-4 mt-5 mb-3 p-3 rounded-2xl bg-surface-container">
      <div class="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20 shrink-0">
        <img :src="prefs.avatarUrl" :alt="prefs.profile.displayName" class="w-full h-full object-cover" />
      </div>
      <div class="min-w-0 flex-1">
        <p class="font-semibold text-sm text-on-surface truncate leading-tight">
          {{ prefs.profile.displayName }}
        </p>
        <p v-if="prefs.features.streak" class="text-xs text-primary font-medium leading-tight">
          7 Day Streak 🔥
        </p>
      </div>
    </div>

    <!-- Nav items -->
    <nav class="flex-1 px-2 space-y-0.5 overflow-y-auto">
      <SideBarItem
        v-for="item in navItems"
        :key="item.key"
        :text="prefs.t[item.key]"
        :symbol="item.icon"
        :link="item.link"
        @click="$emit('close')"
      />
    </nav>

    <!-- Bottom actions -->
    <div class="px-4 pb-6 pt-3 mt-auto border-t border-outline-variant/10 space-y-1">
      <button
        class="solar-glow w-full py-2.5 px-4 rounded-xl font-semibold text-sm
               shadow-sm active:scale-95 transition-transform flex items-center
               justify-center gap-2"
        @click="reportModal?.openReport()"
      >
        <span class="material-symbols-outlined text-[17px]">description</span>
        {{ prefs.t.viewImpactReport }}
      </button>
      <!-- Impact Report Modal -->
      <ImpactReport ref="reportModal" />
      <router-link
        to="/support"
        class="flex items-center gap-2.5 py-2.5 px-3 text-sm font-medium
               text-on-surface-variant/70 hover:text-primary hover:bg-surface-container
               rounded-xl transition-colors"
        active-class="text-primary bg-primary/8"
        @click="$emit('close')"
      >
        <span class="material-symbols-outlined text-[18px]">help</span>
        {{ prefs.t.support }}
      </router-link>
      <button
        class="w-full flex items-center gap-2.5 py-2.5 px-3 text-sm font-medium
               text-on-surface-variant/70 hover:text-primary hover:bg-surface-container
               rounded-xl transition-colors text-left"
        @click="logout"
      >
        <span class="material-symbols-outlined text-[18px]">logout</span>
        {{ prefs.t.logout }}
      </button>
    </div>
  </aside>
</template>
