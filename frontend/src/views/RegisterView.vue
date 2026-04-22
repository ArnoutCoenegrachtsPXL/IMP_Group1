<template>
  <div class="bg-background text-on-background min-h-screen flex flex-col">
    <!-- Top Bar -->
    <header class="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div class="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div class="text-xl font-bold text-blue-900 dark:text-blue-100">BrightBlock</div>
        <nav class="hidden md:flex space-x-6 items-center">
          <router-link 
            to="/login" 
            class="text-blue-700 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Sign In
          </router-link>
        </nav>
      </div>
    </header>

    <main class="flex-grow flex flex-col md:flex-row pt-[72px]">
      <!-- Left Image Side (Desktop only) -->
      <section class="hidden md:flex md:w-1/2 relative overflow-hidden bg-primary">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtAtG84CNb-rG_3eGg3hR3L8_FFt9Zew-C-dunmb4b44o3RX8vgy9uVF1jDb6hQkgFr1i6SSa9-zv6K6kzZcFr3npkYkHfGSyKEX2FELClukOItRDWmUFPNPkMg0PsyrMkkBxCJyNmhkPDHeH8lN7NAcsjhNhkjOmP3asbOXdHg1YTfawrg6gjLV66QEVSCUiZhB9Y6xTljH6yP7XVZs_y5Ig152NH-sVauqJ2X3y-bDG870DZKFpuy-KTN5uK-cVCrQLg2M_K0AAI"
          alt="Renewable Energy Landscape"
          class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
        <div class="relative z-10 flex flex-col justify-center px-16 text-white max-w-2xl">
          <h1 class="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Powering a sustainable future for everyone.
          </h1>
          <p class="text-xl text-blue-50 font-medium">
            Join the movement towards cleaner, more efficient energy for our local communities.
          </p>
        </div>
      </section>

      <!-- Registration Form -->
      <section class="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
        <div class="w-full max-w-md space-y-8">
          <div class="text-center md:text-left">
            <h2 class="text-3xl font-bold text-on-surface tracking-tight mb-2">Create Account</h2>
            <p class="text-on-surface-variant">Start your journey with EcoSave today.</p>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-on-surface-variant ml-1" for="full_name">Full Name</label>
              <input
                v-model="form.fullName"
                id="full_name"
                type="text"
                placeholder="John Doe"
                class="w-full px-4 py-3 rounded-[0.25rem] border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-on-surface-variant ml-1" for="email">Email Address</label>
              <input
                v-model="form.email"
                id="email"
                type="email"
                placeholder="name@company.com"
                class="w-full px-4 py-3 rounded-[0.25rem] border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-on-surface-variant ml-1" for="password">Password</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 rounded-[0.25rem] border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-outline"
                >
                  <span class="material-symbols-outlined text-xl">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-on-surface-variant ml-1" for="confirm_password">Confirm Password</label>
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirm_password"
                placeholder="••••••••"
                class="w-full px-4 py-3 rounded-[0.25rem] border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            <p v-if="error" class="text-error text-sm">{{ error }}</p>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-3.5 bg-[#1978e5] text-white font-bold rounded-[4px] hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20 mt-4 disabled:opacity-70"
            >
              {{ isLoading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </form>

          <!-- Divider -->
          <div class="relative py-4">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-outline-variant"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-on-surface-variant font-medium">Or sign up with</span>
            </div>
          </div>

          <!-- Social Buttons -->
          <div class="grid grid-cols-2 gap-4">
            <button class="flex items-center justify-center gap-3 px-4 py-3 border border-outline-variant rounded-[4px] hover:bg-surface-container-low transition-colors text-on-surface font-medium">
              Google
            </button>
            <button class="flex items-center justify-center gap-3 px-4 py-3 border border-outline-variant rounded-[4px] hover:bg-surface-container-low transition-colors text-on-surface font-medium">
              Apple
            </button>
          </div>

          <div class="pt-6 text-center">
            <p class="text-on-surface-variant font-medium">
              Already have an account? 
              <router-link to="/login" class="text-[#1978e5] font-bold hover:underline transition-all">Sign In</router-link>
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const error = ref('')

const handleRegister = async () => {
  error.value = ''

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  if (form.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }

  isLoading.value = true

  // Simulate API call
  await new Promise(r => setTimeout(r, 1200))
  alert('Account created successfully! (Demo mode)')
  router.push('/login')

  isLoading.value = false
}
</script>