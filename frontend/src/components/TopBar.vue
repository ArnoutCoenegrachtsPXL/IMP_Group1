<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Logo from './Logo.vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { useNotificationStore } from '@/stores/notifications'
import axios from 'axios'

const notifs = useNotificationStore()
const prefs  = useUserPrefsStore()
defineEmits(['toggle-sidebar'])

async function GetNotifs() {
  const userID = localStorage.getItem('userId')
  try {
    await axios({
      method: "get",
      url: 'https://localhost:7126/api/Notification/of/'+userID
    })
    .then(function (response) {
      notifs.items = response.data
    })
    .catch(function (error) {
      console.log(error)
    })
  } catch (error) {
    console.log(error)
  }
}

GetNotifs().then(() => console.log("notifs fetched")).then(() => console.log(notifs.items))

const notifOpen   = ref(false)
const notifBtn    = ref(null)
const notifPanel  = ref(null)
const searchQuery = ref('')

function toggleNotif() { notifOpen.value = !notifOpen.value }
function handleOutside(e) {
  if (notifOpen.value && notifPanel.value && !notifPanel.value.contains(e.target) && !notifBtn.value?.contains(e.target))
    notifOpen.value = false
}


const emailSummaryItems = computed(() => [
  { key: 'emailAlerts',    icon: 'security',     label: 'Critical alerts' },
  { key: 'weeklyDigest',   icon: 'summarize',    label: 'Weekly digest'   },
  { key: 'monthlyReport',  icon: 'bar_chart',    label: 'Monthly report'  },
  { key: 'communityEmail', icon: 'group',        label: 'Community'       },
  { key: 'productUpdates', icon: 'new_releases', label: 'Product updates' },
  { key: 'marketingEmail', icon: 'local_offer',  label: 'Promotions'      },
].map(i => ({ ...i, enabled: prefs.notif.emailMaster && prefs.notif[i.key] })))

const notifIconMap = {
  price: 'price_change', maintenance: 'build', system: 'notifications',
  info: 'info', success: 'check_circle', warning: 'warning', alert: 'error',
}
const notifColorMap = {
  price: 'text-amber-500', maintenance: 'text-blue-500', system: 'text-primary',
  info: 'text-primary', success: 'text-emerald-500', warning: 'text-amber-500', alert: 'text-red-500',
}
const notifBgMap = {
  price: 'bg-amber-500/10', maintenance: 'bg-blue-500/10', system: 'bg-primary/10',
  info: 'bg-primary/10', success: 'bg-emerald-500/10', warning: 'bg-amber-500/10', alert: 'bg-red-500/10',
}

function timeAgo(ms) {
    console.log(ms)
    if (!(ms instanceof Date)) {
      ms = new Date(ms)
      console.log(ms)
    }
    const s = Math.floor((Date.now() - ms) / 1000)
    if (s < 60) return 'Just now'
    if (s < 3600) return `${Math.floor(s/60)}m ago`
    if (s < 86400) return `${Math.floor(s/3600)}h ago`
    return `${Math.floor(s/86400)}d ago`
  }



onMounted(() => document.addEventListener('mousedown', handleOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleOutside))

</script>

<template>
  <header
    class="topbar sticky top-0 z-50 flex items-center gap-3 px-4 sm:px-6 h-16 min-h-[64px] shrink-0"
    role="banner"
  >
    <!-- Hamburger (mobile) -->
    <button
      class="md:hidden btn-icon flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      :aria-label="prefs.t.navMenu"
      @click="$emit('toggle-sidebar')"
    >
      <span class="material-symbols-outlined text-[22px]">menu</span>
    </button>

    <!-- Logo (mobile only — desktop shown in sidebar) -->
    <div class="md:hidden flex-shrink-0">
      <Logo />
    </div>

    <!-- Search bar — styled with .search-field from CSS -->
    <div class="flex-1 max-w-md mx-auto hidden sm:block">
      <div class="search-field">
        <span class="search-icon material-symbols-outlined">search</span>
        <input
          v-model="searchQuery"
          type="search"
          :placeholder="prefs.t.search"
          :aria-label="prefs.t.search"
          autocomplete="off"
        />
      </div>
    </div>

    <!-- Right actions -->
    <div class="flex items-center gap-1 sm:gap-1.5 ml-auto">
      <!-- Theme toggle -->
      <button
        class="btn-icon flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        :aria-label="prefs.isDark ? prefs.t.light : prefs.t.dark"
        :title="prefs.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="prefs.toggleTheme()"
      >
        <span class="material-symbols-outlined text-[22px]">
          {{ prefs.isDark ? 'light_mode' : 'dark_mode' }}
        </span>
      </button>

      <!-- Upload shortcut -->
      <router-link
        to="/upload"
        class="btn-icon flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        :aria-label="prefs.t.uploadMeter"
        :title="prefs.t.uploadMeter"
      >
        <span class="material-symbols-outlined text-[22px]">electric_meter</span>
      </router-link>

      <!-- Notifications -->
      <div class="relative">
        <button
          ref="notifBtn"
          class="btn-icon relative flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          :aria-label="prefs.t.notifications"
          :aria-expanded="String(notifOpen)"
          aria-haspopup="true"
          @click="toggleNotif"
        >
          <span class="material-symbols-outlined text-[22px]">notifications</span>
          <Transition name="badge-pop">
            <span
              v-if="unreadCount > 0"
              key="badge"
              class="absolute top-1.5 right-1.5 min-w-[17px] h-[17px] bg-primary text-on-primary
                     rounded-full text-[10px] font-black flex items-center justify-center px-1
                     ring-2 ring-surface leading-none"
              aria-hidden="true"
            >{{ unreadCount > 9 ? '9+' : unreadCount }}</span>
          </Transition>
        </button>

        <!-- Dropdown panel -->
        <Transition name="notif-panel">
          <div
            v-if="notifOpen"
            ref="notifPanel"
            class="notif-panel absolute right-0 top-[calc(100%+8px)] w-80 sm:w-96 rounded-2xl overflow-hidden z-[200]"
            role="dialog"
            aria-label="Notifications"
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-4 py-3 border-b border-outline-variant/20">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-[18px]">notifications</span>
                <span class="font-bold text-sm text-on-surface">{{ prefs.t.notifications }}</span>
                <span v-if="unreadCount > 0"
                  class="text-[10px] font-black bg-primary text-on-primary rounded-full px-1.5 py-0.5 leading-none">
                  {{ unreadCount }}
                </span>
              </div>
              <button v-if="unreadCount > 0"
                class="text-[11px] font-bold text-primary hover:opacity-70 transition-opacity"
                @click="notifs.markAllRead()">
                Mark all read
              </button>
            </div>

            <!-- List -->
            <div class="max-h-[340px] overflow-y-auto">
              <div v-if="notifs.items.length === 0"
                class="flex flex-col items-center justify-center py-12 gap-2">
                <span class="material-symbols-outlined text-on-surface-variant/30 text-[44px]">notifications_off</span>
                <p class="text-sm text-on-surface-variant/50 font-medium">No notifications</p>
              </div>

              <div v-for="n in notifs.items" :key="n.id"
                class="group flex items-start gap-3 px-4 py-3.5 border-b border-outline-variant/10
                       hover:bg-surface-container cursor-pointer transition-colors"
                :class="!n.read ? 'bg-primary/[0.025]' : ''"
                @click="notifs.markRead(n.id)"
              >
                <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                     :class="notifBgMap[n.type] || 'bg-primary/10'">
                  <span class="material-symbols-outlined text-[15px]"
                        :class="notifColorMap[n.type] || 'text-primary'">
                    {{ notifIconMap[n.type] || 'notifications' }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <p class="text-[13px] font-bold text-on-surface leading-snug">{{ n.title }}</p>
                    <div class="flex items-center gap-1 shrink-0">
                      <span v-if="!n.read" class="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                      <button
                        class="opacity-0 group-hover:opacity-100 p-0.5 rounded-lg text-on-surface-variant/50 hover:text-on-surface hover:bg-surface-container-high transition-all"
                        @click.stop="notifs.remove(n.id)"
                        aria-label="Dismiss"
                      >
                        <span class="material-symbols-outlined text-[13px]">close</span>
                      </button>
                    </div>
                  </div>
                  <p class="text-xs text-on-surface-variant mt-0.5 line-clamp-2 leading-relaxed">{{ n.body }}</p>
                  <p class="text-[10px] text-on-surface-variant/50 mt-1 font-medium">{{ timeAgo(n.date) }}</p>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-4 py-2.5 border-t border-outline-variant/15">
              <router-link
                to="/settings"
                class="text-[11px] font-bold text-primary hover:opacity-70 transition-opacity"
                @click="notifOpen = false"
              >
                Manage notification preferences →
              </router-link>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Avatar — reads from prefs.avatarUrl (reactive computed) -->
      <router-link
        to="/settings"
        class="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-surface-container-high transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ml-0.5"
        :aria-label="prefs.t.settings"
      >
        <div class="w-8 h-8 rounded-full overflow-hidden shrink-0"
             style="box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 30%, transparent)">
          <img
            :src="avatar"
            :alt="prefs.profile.displayName"
            class="w-full h-full object-cover"
          />
        </div>
        <span class="hidden lg:block text-[13px] font-bold text-on-surface truncate max-w-[120px]">
          {{ prefs.profile.displayName }}
        </span>
        <span class="hidden lg:block material-symbols-outlined text-[14px] text-on-surface-variant/60">expand_more</span>
      </router-link>
    </div>
  </header>
</template>

<style scoped>
.notif-panel-enter-active { transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1); }
.notif-panel-leave-active { transition: all 0.15s ease-in; }
.notif-panel-enter-from, .notif-panel-leave-to { opacity: 0; transform: translateY(-10px) scale(0.96); }

.badge-pop-enter-active { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.badge-pop-leave-active { transition: all 0.15s ease; }
.badge-pop-enter-from, .badge-pop-leave-to { opacity: 0; transform: scale(0.5); }
</style>
