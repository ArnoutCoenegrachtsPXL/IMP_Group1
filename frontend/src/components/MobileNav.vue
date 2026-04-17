<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const items = [
  { label: 'Home',       symbol: 'home',        link: '/dashboard' },
  { label: 'Rank',       symbol: 'leaderboard', link: '/leaderboard' },
  { label: null,         symbol: 'add',         link: '/upload',   fab: true },
  { label: 'Community',  symbol: 'group',       link: '#' },
  { label: 'Profile',    symbol: 'person',      link: '/settings' },
]

function isActive(link) {
  if (link === '#') return false
  return route.path.startsWith(link)
}
</script>

<template>
  <!-- Mobile-only bottom nav bar (hidden md+) -->
  <nav
    role="navigation"
    aria-label="Mobile navigation"
    class="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around pb-safe"
    :style="{
      background: 'rgba(246,250,254,0.95)',
      backdropFilter: 'blur(14px)',
      borderTop: '1px solid var(--border)',
      paddingTop: '8px',
      paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
    }"
  >
    <template v-for="item in items" :key="item.link">
      <!-- FAB (Upload) -->
      <div v-if="item.fab" class="flex flex-col items-center" style="margin-top:-24px;">
        <router-link
          :to="item.link"
          class="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
          :style="{ background: 'linear-gradient(135deg,var(--pri) 0%,var(--pri-mid) 100%)', boxShadow: '0 4px 16px rgba(25,120,229,0.4)' }"
          aria-label="Upload meter reading"
        >
          <span class="material-symbols-outlined text-[26px]" style="color:white;">add</span>
        </router-link>
      </div>

      <!-- Regular nav item -->
      <router-link
        v-else
        :to="item.link === '#' ? '/' : item.link"
        class="flex flex-col items-center gap-1 flex-1 py-1 transition-colors"
        :aria-label="item.label"
        :aria-current="isActive(item.link) ? 'page' : undefined"
        :class="{ 'pointer-events-none opacity-40': item.link === '#' }"
      >
        <span
          class="material-symbols-outlined text-[22px] transition-all"
          :style="isActive(item.link)
            ? 'color:var(--pri); font-variation-settings:\'FILL\' 1,\'wght\' 500;'
            : 'color:var(--text-muted);'"
        >{{ item.symbol }}</span>
        <span
          class="text-[10px] font-medium"
          :style="isActive(item.link) ? 'color:var(--pri);font-weight:600;' : 'color:var(--text-muted);'"
        >{{ item.label }}</span>
      </router-link>
    </template>
  </nav>
</template>
