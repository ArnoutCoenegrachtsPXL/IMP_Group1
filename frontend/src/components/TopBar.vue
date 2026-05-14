<script setup>
/**
 * TopBar.vue
 * ─────────────────────────────────────────────────────────────
 * CHANGES FROM ORIGINAL:
 * • Dead search <input> replaced with <GlobalSearch /> component.
 * • Notification bell wired up (from previous update).
 * • All other behaviour unchanged.
 * MARKER: TOPBAR-START
 */
import Logo         from './Logo.vue'
import GlobalSearch from './GlobalSearch.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { useNotificationStore } from '@/stores/notifications'
import { useRouter } from 'vue-router'

const prefs  = useUserPrefsStore()
const notifs = useNotificationStore()
const router = useRouter()
defineEmits(['toggle-sidebar'])

// ── Notification dropdown ─────────────────────────────────────────────────────
const dropdownOpen = ref(false)
function toggleDropdown() { dropdownOpen.value = !dropdownOpen.value }
function handleOutsideClick(e) {
  if (!e.target.closest('#notif-dropdown-root')) dropdownOpen.value = false
}
onMounted(()   => document.addEventListener('click', handleOutsideClick, true))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick, true))

const emailSummaryItems = computed(() => [
  { key: 'emailAlerts',    icon: 'security',     label: 'Critical alerts' },
  { key: 'weeklyDigest',   icon: 'summarize',    label: 'Weekly digest'   },
  { key: 'monthlyReport',  icon: 'bar_chart',    label: 'Monthly report'  },
  { key: 'communityEmail', icon: 'group',        label: 'Community'       },
  { key: 'productUpdates', icon: 'new_releases', label: 'Product updates' },
  { key: 'marketingEmail', icon: 'local_offer',  label: 'Promotions'      },
].map(i => ({ ...i, enabled: prefs.notif.emailMaster && prefs.notif[i.key] })))

const pushSummaryItems = computed(() => [
  { key: 'priceAlerts',     icon: 'price_change', label: 'Price alerts'     },
  { key: 'maintenanceTips', icon: 'build',        label: 'Maintenance tips' },
].map(i => ({ ...i, enabled: prefs.notif.push && prefs.notif[i.key] })))

const activeCount = computed(() =>
  emailSummaryItems.value.filter(i => i.enabled).length +
  pushSummaryItems.value.filter(i => i.enabled).length
)
const showBadge = computed(() => activeCount.value > 0)

function goToNotifications() {
  dropdownOpen.value = false
  router.push({ name: 'settings', hash: '#sec-notifications' }).then(() => {
    document.getElementById('sec-notifications')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
// MARKER: TOPBAR-END
</script>

<template>
  <!-- MARKER: TOPBAR-TEMPLATE-START -->
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

    <!-- ★ Centre: GlobalSearch replaces the dead input -->
    <GlobalSearch />

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

      <!-- Notification bell + dropdown -->
      <div id="notif-dropdown-root" class="relative">
        <button
          class="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high
                 transition-colors btn-icon"
          :aria-label="prefs.t.notifications"
          :aria-expanded="dropdownOpen"
          aria-haspopup="true"
          @click.stop="toggleDropdown"
        >
          <span class="material-symbols-outlined text-[22px]">notifications</span>
          <span
            v-if="showBadge"
            class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-surface"
            aria-hidden="true"
          />
        </button>

        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-1"
        >
          <div
            v-if="dropdownOpen"
            class="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl shadow-xl
                   border border-outline-variant/20 overflow-hidden z-[200]"
            style="background: var(--color-surface-container-lowest);"
            role="dialog"
            aria-label="Notification preferences"
          >
            <div class="flex items-center justify-between px-4 py-3 border-b border-outline-variant/15">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-[18px]">notifications</span>
                <span class="text-sm font-semibold text-on-surface">Notifications</span>
              </div>
              <span class="text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                {{ activeCount }} active
              </span>
            </div>
            <div class="px-4 pt-3 pb-2">
              <div class="flex items-center justify-between mb-2">
                <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">Email</p>
                <button
                  class="w-8 h-4 rounded-full transition-colors relative shrink-0"
                  :class="prefs.notif.emailMaster ? 'bg-primary' : 'bg-outline-variant/40'"
                  @click="prefs.notif.emailMaster = !prefs.notif.emailMaster"
                >
                  <span class="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all"
                        :class="prefs.notif.emailMaster ? 'left-4' : 'left-0.5'" />
                </button>
              </div>
              <div class="space-y-0.5">
                <div v-for="item in emailSummaryItems" :key="item.key"
                  class="flex items-center justify-between py-1.5 px-2 rounded-lg"
                  :class="item.enabled ? 'bg-primary/4' : 'opacity-50'">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[14px]"
                          :class="item.enabled ? 'text-primary' : 'text-on-surface-variant/50'">{{ item.icon }}</span>
                    <span class="text-xs text-on-surface">{{ item.label }}</span>
                  </div>
                  <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                        :class="item.enabled ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface-variant/50'">
                    {{ item.enabled ? 'ON' : 'OFF' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="h-px bg-outline-variant/15 mx-4" />
            <div class="px-4 pt-2 pb-3">
              <div class="flex items-center justify-between mb-2">
                <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">Push</p>
                <button
                  class="w-8 h-4 rounded-full transition-colors relative shrink-0"
                  :class="prefs.notif.push ? 'bg-primary' : 'bg-outline-variant/40'"
                  @click="prefs.notif.push = !prefs.notif.push"
                >
                  <span class="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all"
                        :class="prefs.notif.push ? 'left-4' : 'left-0.5'" />
                </button>
              </div>
              <div class="space-y-0.5">
                <div v-for="item in pushSummaryItems" :key="item.key"
                  class="flex items-center justify-between py-1.5 px-2 rounded-lg"
                  :class="item.enabled ? 'bg-primary/4' : 'opacity-50'">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[14px]"
                          :class="item.enabled ? 'text-primary' : 'text-on-surface-variant/50'">{{ item.icon }}</span>
                    <span class="text-xs text-on-surface">{{ item.label }}</span>
                  </div>
                  <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                        :class="item.enabled ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface-variant/50'">
                    {{ item.enabled ? 'ON' : 'OFF' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="border-t border-outline-variant/15 px-4 py-3">
              <button
                class="w-full flex items-center justify-center gap-2 py-2.5 px-4
                       rounded-xl bg-primary/8 text-primary text-sm font-semibold
                       hover:bg-primary/15 transition-colors"
                @click="goToNotifications"
              >
                <span class="material-symbols-outlined text-[16px]">settings</span>
                Manage notifications
                <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Avatar / settings -->
      <router-link
        to="/settings"
        class="flex items-center gap-2 rounded-xl p-1 hover:bg-surface-container-high
               transition-colors focus-visible:ring-2 focus-visible:ring-primary
               focus-visible:outline-none ml-1"
        :aria-label="prefs.t.settings"
      >
        <div class="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/25 shrink-0">
          <img :src="prefs.avatarUrl" :alt="prefs.profile.displayName" class="w-full h-full object-cover" />
        </div>
        <span class="hidden lg:block text-sm font-medium text-on-surface truncate max-w-[120px]">
          {{ prefs.profile.displayName }}
        </span>
      </router-link>
    </div>
  </header>
  <!-- MARKER: TOPBAR-TEMPLATE-END -->
</template>
