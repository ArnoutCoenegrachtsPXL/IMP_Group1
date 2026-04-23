<script setup>
import { ref } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

const prefs = useUserPrefsStore()
const confirmReset  = ref(false)
const confirmDelete = ref(false)

function resetAllSettings() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('ep-'))
  keys.forEach(k => localStorage.removeItem(k))
  window.location.reload()
}
</script>

<template>
  <section class="card border-error/25">
    <h2 class="text-base sm:text-lg font-bold text-error mb-2 flex items-center gap-2">
      <span class="material-symbols-outlined text-[20px]">warning</span>
      {{ prefs.t.dangerZone }}
    </h2>
    <p class="text-xs sm:text-sm text-on-surface-variant mb-5">
      These actions are irreversible. Please proceed with caution.
    </p>

    <div class="space-y-3">
      <!-- Reset settings -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-error/20 bg-error/4">
        <div>
          <p class="font-semibold text-on-surface text-sm">{{ prefs.t.resetSettings }}</p>
          <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.resetSettingsDesc }}</p>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <transition name="fade">
            <div v-if="confirmReset" class="flex gap-2">
              <button
                class="px-3 py-2 text-xs font-bold rounded-xl bg-error text-on-error
                       hover:opacity-90 transition-opacity min-h-[40px]"
                @click="resetAllSettings"
              >Confirm</button>
              <button
                class="px-3 py-2 text-xs font-bold rounded-xl border border-outline-variant/30
                       text-on-surface hover:bg-surface-container min-h-[40px]"
                @click="confirmReset = false"
              >{{ prefs.t.cancel }}</button>
            </div>
          </transition>
          <button v-if="!confirmReset"
            class="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl border border-error/40
                   text-error hover:bg-error/8 transition-colors min-h-[44px]"
            @click="confirmReset = true"
          >{{ prefs.t.resetSettings }}</button>
        </div>
      </div>

      <!-- Delete account -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-error/20 bg-error/4">
        <div>
          <p class="font-semibold text-on-surface text-sm">{{ prefs.t.deleteAccount }}</p>
          <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.deleteAccountDesc }}</p>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <transition name="fade">
            <div v-if="confirmDelete" class="flex gap-2">
              <button
                class="px-3 py-2 text-xs font-bold rounded-xl bg-error text-on-error
                       hover:opacity-90 transition-opacity min-h-[40px]"
              >Delete forever</button>
              <button
                class="px-3 py-2 text-xs font-bold rounded-xl border border-outline-variant/30
                       text-on-surface hover:bg-surface-container min-h-[40px]"
                @click="confirmDelete = false"
              >{{ prefs.t.cancel }}</button>
            </div>
          </transition>
          <button v-if="!confirmDelete"
            class="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-error text-on-error
                   hover:opacity-90 transition-opacity min-h-[44px]"
            @click="confirmDelete = true"
          >{{ prefs.t.deleteAccount }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
