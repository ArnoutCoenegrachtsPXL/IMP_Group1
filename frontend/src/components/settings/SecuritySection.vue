<script setup>
import { ref, computed, watch } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

defineEmits(['saved'])
const prefs = useUserPrefsStore()

const currentPw = ref('')
const newPw     = ref('')
const confirmPw = ref('')
const showCurrent = ref(false)
const showNew     = ref(false)
const showConfirm = ref(false)

// Password strength scoring
const strength = computed(() => {
  const p = newPw.value
  if (!p) return 0
  let score = 0
  if (p.length >= 8)  score++
  if (p.length >= 12) score++
  if (/[A-Z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  return score
})

const strengthLabel = computed(() => ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][strength.value])
const strengthColor = computed(() => {
  const map = ['', 'bg-error', 'bg-amber-500', 'bg-yellow-400', 'bg-emerald-500', 'bg-emerald-600']
  return map[strength.value]
})

const pwMatch = computed(() => {
  if (!newPw.value && !confirmPw.value) return null
  return newPw.value === confirmPw.value && newPw.value.length > 0
})

const canUpdate = computed(() =>
  pwMatch.value === true && currentPw.value.length > 0 && strength.value >= 2
)
</script>

<template>
  <section class="card">
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-5 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">lock</span>
      {{ prefs.t.security }}
    </h2>

    <!-- Change password -->
    <div class="mb-7 pb-7 border-b border-outline-variant/15">
      <p class="text-sm font-bold text-on-surface mb-4">{{ prefs.t.changePassword }}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <!-- Current password -->
        <div class="sm:col-span-2 space-y-1.5">
          <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block"
                 for="cur-pw">{{ prefs.t.currentPassword }}</label>
          <div class="relative">
            <input :type="showCurrent ? 'text' : 'password'" id="cur-pw" v-model="currentPw"
              placeholder="••••••••" autocomplete="current-password"
              class="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-2.5
                     pr-12 text-sm text-on-surface placeholder:text-on-surface-variant/40
                     focus:ring-2 focus:ring-primary/40 min-h-[44px]" />
            <button type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1"
              @click="showCurrent = !showCurrent" :aria-label="showCurrent ? 'Hide' : 'Show'">
              <span class="material-symbols-outlined text-[18px]">{{ showCurrent ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
        </div>

        <!-- New password -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block"
                 for="new-pw">{{ prefs.t.newPassword }}</label>
          <div class="relative">
            <input :type="showNew ? 'text' : 'password'" id="new-pw" v-model="newPw"
              placeholder="••••••••" autocomplete="new-password"
              class="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-2.5
                     pr-12 text-sm text-on-surface placeholder:text-on-surface-variant/40
                     focus:ring-2 focus:ring-primary/40 min-h-[44px]" />
            <button type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1"
              @click="showNew = !showNew">
              <span class="material-symbols-outlined text-[18px]">{{ showNew ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
          <!-- Strength bar -->
          <div v-if="newPw" class="space-y-1">
            <div class="flex gap-1">
              <div v-for="i in 5" :key="i"
                class="h-1 flex-1 rounded-full transition-all"
                :class="i <= strength ? strengthColor : 'bg-outline-variant/30'" />
            </div>
            <p class="text-[10px] font-semibold" :class="{
              'text-error': strength === 1,
              'text-amber-500': strength === 2,
              'text-yellow-500': strength === 3,
              'text-emerald-500': strength >= 4,
            }">{{ strengthLabel }}</p>
          </div>
        </div>

        <!-- Confirm password -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block"
                 for="con-pw">{{ prefs.t.confirmPassword }}</label>
          <div class="relative">
            <input :type="showConfirm ? 'text' : 'password'" id="con-pw" v-model="confirmPw"
              placeholder="••••••••" autocomplete="new-password"
              class="w-full bg-surface-container rounded-xl px-4 py-2.5 pr-12 text-sm
                     text-on-surface placeholder:text-on-surface-variant/40
                     focus:ring-2 min-h-[44px] border transition-colors"
              :class="pwMatch === false ? 'border-error focus:ring-error/40'
                    : pwMatch === true  ? 'border-emerald-500/60 focus:ring-emerald-500/40'
                    : 'border-outline-variant/30 focus:ring-primary/40'" />
            <button type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1"
              @click="showConfirm = !showConfirm">
              <span class="material-symbols-outlined text-[18px]">{{ showConfirm ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
          <p v-if="pwMatch === false" class="text-xs text-error" role="alert">{{ prefs.t.passwordMismatch }}</p>
          <p v-if="pwMatch === true"  class="text-xs text-emerald-600 dark:text-emerald-400">{{ prefs.t.passwordMatch }}</p>
        </div>
      </div>

      <div class="mt-4 flex justify-end">
        <button
          :disabled="!canUpdate"
          class="px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold
                 hover:opacity-90 transition-opacity disabled:opacity-40 min-h-[44px]"
        >{{ prefs.t.updatePassword }}</button>
      </div>
    </div>

    <!-- Two-factor authentication -->
    <div class="mb-6 pb-6 border-b border-outline-variant/15">
      <div class="toggle-row">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-primary text-[18px]">phonelink_lock</span>
          </div>
          <div>
            <p class="font-semibold text-on-surface text-sm">{{ prefs.t.twoFactor }}</p>
            <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.twoFactorDesc }}</p>
          </div>
        </div>
        <ToggleSwitch v-model="prefs.twoFactor" :aria-label="prefs.t.twoFactor" />
      </div>
    </div>

    <!-- Active sessions -->
    <div>
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
        {{ prefs.t.activeSessions }}
      </p>
      <div class="space-y-2">
        <!-- Mock sessions -->
        <div v-for="(sess, i) in [
          { device: 'Chrome — MacOS', location: 'Johannesburg, ZA', time: 'Active now', icon: 'computer', current: true },
          { device: 'Mobile App — Android', location: 'Johannesburg, ZA', time: '2 hours ago', icon: 'smartphone', current: false },
        ]" :key="i"
          class="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-container">
          <div class="flex items-center gap-3 min-w-0">
            <span class="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0">{{ sess.icon }}</span>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <p class="text-sm font-semibold text-on-surface truncate">{{ sess.device }}</p>
                <span v-if="sess.current"
                  class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  This device
                </span>
              </div>
              <p class="text-xs text-on-surface-variant">{{ sess.location }} · {{ sess.time }}</p>
            </div>
          </div>
          <button v-if="!sess.current"
            class="text-xs font-semibold text-error hover:bg-error/10 px-3 py-1.5 rounded-lg transition-colors shrink-0">
            Revoke
          </button>
        </div>
      </div>
      <button class="mt-3 text-xs font-semibold text-on-surface-variant/70 hover:text-error
                     underline underline-offset-2 transition-colors">
        {{ prefs.t.logoutAllDevices }}
      </button>
    </div>
  </section>
</template>
