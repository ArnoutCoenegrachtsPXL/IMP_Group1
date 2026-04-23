<template>
  <div class="bg-background text-on-background min-h-screen flex flex-col">
    <!-- Top Header -->
    <header class="fixed top-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm z-50">
      <div class="flex justify-between items-center px-4 h-16 w-full">
        <div class="text-xl font-bold text-blue-800 dark:text-blue-300 font-['Inter']">BrightBlock</div>
      </div>
    </header>

    <main class="flex-grow flex items-center justify-center px-4 pt-20 pb-12">
      <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden min-h-[600px]">

        <!-- Left Visual Side -->
        <div class="hidden md:block relative overflow-hidden bg-primary">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv2fGePQKb7XPD-fAshw3XP_yfnQFEie5jzbV71bzaiBTSn2Ju7dyNL_Tx9WgwSA0vGLKhkiHj2Qhnxy9SV2t126ZTz4dz8-sZiteJ0TtYGaAAQcV7qtUTNL_wBgcEEmgDa6mrme7zqjmAdOpImR21mea6epK-TMlpPDVkq6Pk2c24ewKdAphjgd6V7Xm6USAFVUy0xG6fvjp8k2xqACLb1m1g6mungqpQeFYhwZw9kC7P2YOotX3FFKJtsba350LgVeZLCq3LSo6G"
            alt="Sustainable architecture"
            class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-primary/60 to-primary-container/40 p-12 flex flex-col justify-end text-white">
            <h2 class="text-4xl font-extrabold mb-4 leading-tight">Set a strong new password.</h2>
            <p class="text-lg opacity-90 max-w-md">Choose something memorable but hard to guess. You'll be back in no time.</p>
          </div>
        </div>

        <!-- Reset Password Form -->
        <div class="p-8 md:p-16 flex flex-col justify-center">

          <!-- Step 1: New Password Form -->
          <template v-if="!resetSuccess">
            <div class="mb-10">
              <h1 class="text-3xl font-extrabold text-on-surface mb-2">Reset Password</h1>
              <p class="text-on-surface-variant">Enter your new password below. Make sure it's at least 6 characters.</p>
            </div>

            <form @submit.prevent="handleReset" class="space-y-6">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-on-surface-variant" for="password">New Password</label>
                <div class="relative">
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    placeholder="Enter new password"
                    class="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  >
                    <span class="material-symbols-outlined text-xl">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                  </button>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-on-surface-variant" for="confirm_password">Confirm New Password</label>
                <div class="relative">
                  <input
                    v-model="form.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    id="confirm_password"
                    placeholder="Re-enter new password"
                    class="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  >
                    <span class="material-symbols-outlined text-xl">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
                  </button>
                </div>
              </div>

              <p v-if="error" class="text-error text-sm">{{ error }}</p>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full py-4 bg-primary text-on-primary font-bold rounded-lg shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all duration-200 uppercase tracking-wide disabled:opacity-70"
              >
                {{ isLoading ? 'Resetting...' : 'Reset Password' }}
              </button>
            </form>
          </template>

          <!-- Step 2: Success State -->
          <template v-else>
            <div class="flex flex-col items-center text-center gap-6">
              <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-5xl text-primary">check_circle</span>
              </div>
              <div>
                <h1 class="text-3xl font-extrabold text-on-surface mb-2">Password Reset!</h1>
                <p class="text-on-surface-variant max-w-xs mx-auto">
                  Your password has been updated successfully. You can now sign in with your new password.
                </p>
              </div>
              <router-link
                to="/login"
                class="w-full py-4 bg-primary text-on-primary font-bold rounded-lg shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all duration-200 uppercase tracking-wide text-center"
              >
                Back to Sign In
              </router-link>
            </div>
          </template>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// The reset token will come from the URL query param, e.g. /reset-password?token=abc123
const token = route.query.token

const form = ref({ password: '', confirmPassword: '' })
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const error = ref('')
const resetSuccess = ref(false)

const handleReset = async () => {
  error.value = ''

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match.'
    return
  }

  if (form.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters.'
    return
  }

  isLoading.value = true

  // Simulate API call
  await new Promise(r => setTimeout(r, 1200))

  // TODO: Replace with real API call, passing token + new password
  // e.g. await api.post('/auth/reset-password', { token, password: form.value.password })

  isLoading.value = false
  resetSuccess.value = true
}
</script>