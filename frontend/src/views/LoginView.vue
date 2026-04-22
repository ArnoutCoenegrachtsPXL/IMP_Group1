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
            <h2 class="text-4xl font-extrabold mb-4 leading-tight">Saving the planet, one watt at a time.</h2>
            <p class="text-lg opacity-90 max-w-md">Join over 2 million users optimizing their energy footprint and reducing environmental impact.</p>
          </div>
        </div>

        <!-- Login Form -->
        <div class="p-8 md:p-16 flex flex-col justify-center">
          <div class="mb-10">
            <h1 class="text-3xl font-extrabold text-on-surface mb-2">Welcome Back</h1>
            <p class="text-on-surface-variant">Enter your credentials to access your dashboard</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-on-surface-variant" for="email">Email Address</label>
              <input
                v-model="form.email"
                id="email"
                type="email"
                placeholder="name@example.com"
                class="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="block text-sm font-semibold text-on-surface-variant" for="password">Password</label>
                <a href="#" class="text-sm font-medium text-primary hover:underline">Forgot Password?</a>
              </div>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  placeholder="Enter your password"
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

            <p v-if="error" class="text-error text-sm">{{ error }}</p>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-4 bg-primary text-on-primary font-bold rounded-lg shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all duration-200 uppercase tracking-wide disabled:opacity-70"
            >
              {{ isLoading ? 'Signing In...' : 'Sign In' }}
            </button>
          </form>

          <div class="relative my-8">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t border-outline-variant"></span>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-surface-container-lowest px-4 text-on-surface-variant font-medium">Or sign in with</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button class="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">
              Google
            </button>
            <button class="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">
              Apple
            </button>
          </div>

          <div class="mt-10 text-center">
            <p class="text-on-surface-variant">
              Don't have an account? 
              <router-link to="/register" class="text-primary font-bold hover:underline">Sign Up</router-link>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({ email: '', password: '' })
const showPassword = ref(false)
const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1000))
  alert('Logged in successfully! (Demo)')
  router.push('/dashboard')
  isLoading.value = false
}
</script>