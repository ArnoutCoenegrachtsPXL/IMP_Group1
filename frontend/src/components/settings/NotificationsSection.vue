<script setup>
import { computed } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

defineEmits(['saved'])
const prefs = useUserPrefsStore()

// Sub-email toggles are disabled when master email switch is off
const emailDisabled = computed(() => !prefs.notif.emailMaster)

// Granular email notification items (per GDPR / CAN-SPAM / CASL standards)
const emailItems = [
  { key: 'emailAlerts',    icon: 'security',        titleKey: 'emailAlerts',    descKey: 'emailAlertsDesc',    canDisable: false }, // security emails can't be disabled (legal requirement)
  { key: 'weeklyDigest',   icon: 'summarize',       titleKey: 'weeklyDigest',   descKey: 'weeklyDigestDesc',   canDisable: true  },
  { key: 'monthlyReport',  icon: 'bar_chart',       titleKey: 'monthlyReport',  descKey: 'monthlyReportDesc',  canDisable: true  },
  { key: 'communityEmail', icon: 'group',           titleKey: 'communityEmail', descKey: 'communityEmailDesc', canDisable: true  },
  { key: 'productUpdates', icon: 'new_releases',    titleKey: 'productUpdates', descKey: 'productUpdatesDesc', canDisable: true  },
  { key: 'marketingEmail', icon: 'local_offer',     titleKey: 'marketingEmail', descKey: 'marketingEmailDesc', canDisable: true  },
]

// Other notification channels
const pushItems = [
  { key: 'push',            icon: 'notifications',  titleKey: 'pushNotifs',      descKey: 'pushNotifsDesc'      },
  { key: 'priceAlerts',     icon: 'price_change',   titleKey: 'priceAlerts',     descKey: 'priceAlertsDesc'     },
  { key: 'maintenanceTips', icon: 'lightbulb',      titleKey: 'maintenanceTips', descKey: 'maintenanceTipsDesc' },
]

function unsubscribeAll() {
  prefs.notif.emailMaster    = false
  prefs.notif.weeklyDigest   = false
  prefs.notif.monthlyReport  = false
  prefs.notif.communityEmail = false
  prefs.notif.productUpdates = false
  prefs.notif.marketingEmail = false
}
</script>

<template>
  <section class="card">
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-2 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">notifications</span>
      {{ prefs.t.notifications }}
    </h2>
    <p class="text-xs sm:text-sm text-on-surface-variant mb-6">{{ prefs.t.notifTitle }}</p>

    <!-- ── Email notifications block ──────────────────────────────────────── -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-1">
        <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">
          {{ prefs.t.emailNotifs }}
        </p>
        <!-- Master email toggle -->
        <ToggleSwitch
          v-model="prefs.notif.emailMaster"
          :aria-label="prefs.t.emailNotifs"
        />
      </div>
      <p class="text-xs text-on-surface-variant/70 mb-4">{{ prefs.t.emailNotifsDesc }}</p>

      <!-- Individual email preferences (indented) -->
      <div
        class="space-y-1.5 border-l-2 pl-4 ml-2 transition-opacity"
        :class="emailDisabled ? 'border-outline-variant/20 opacity-50' : 'border-primary/20'"
      >
        <div
          v-for="item in emailItems"
          :key="item.key"
          class="toggle-row"
          :class="emailDisabled ? 'pointer-events-none' : ''"
        >
          <div class="flex items-center gap-3 min-w-0">
            <span class="material-symbols-outlined text-[18px] shrink-0"
                  :class="emailDisabled ? 'text-on-surface-variant/40' : 'text-primary'">
              {{ item.icon }}
            </span>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="text-sm font-semibold text-on-surface truncate">
                  {{ prefs.t[item.titleKey] }}
                </p>
                <!-- Legal badge: critical alerts cannot be disabled -->
                <span
                  v-if="!item.canDisable"
                  class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full
                         bg-primary/10 text-primary shrink-0"
                >Required</span>
              </div>
              <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t[item.descKey] }}</p>
            </div>
          </div>
          <ToggleSwitch
            :model-value="item.canDisable ? prefs.notif[item.key] : true"
            :disabled="!item.canDisable || emailDisabled"
            :aria-label="prefs.t[item.titleKey]"
            @update:model-value="v => item.canDisable && (prefs.notif[item.key] = v)"
          />
        </div>
      </div>

      <!-- Unsubscribe all (CAN-SPAM / GDPR compliant) -->
      <div class="mt-4 pt-4 border-t border-outline-variant/15">
        <button
          class="text-xs font-semibold text-on-surface-variant/70 hover:text-error
                 underline underline-offset-2 transition-colors"
          @click="unsubscribeAll"
        >
          {{ prefs.t.unsubAll }}
        </button>
        <p class="text-[10px] text-on-surface-variant/50 mt-1">
          You will still receive critical security and account alerts — these are required by law.
        </p>
      </div>
    </div>

    <!-- ── Push / in-app notifications ────────────────────────────────────── -->
    <div>
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
        {{ prefs.t.pushNotifs }}
      </p>
      <div class="space-y-1.5">
        <div v-for="item in pushItems" :key="item.key" class="toggle-row">
          <div class="flex items-center gap-3 min-w-0">
            <span class="material-symbols-outlined text-primary text-[18px] shrink-0">{{ item.icon }}</span>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-on-surface truncate">{{ prefs.t[item.titleKey] }}</p>
              <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t[item.descKey] }}</p>
            </div>
          </div>
          <ToggleSwitch
            v-model="prefs.notif[item.key]"
            :aria-label="prefs.t[item.titleKey]"
          />
        </div>
      </div>
    </div>
  </section>
</template>
