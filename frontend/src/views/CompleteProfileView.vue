<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-dim">
    <main class="flex flex-col md:flex-row w-full max-w-6xl min-h-[600px] bg-surface-container-lowest shadow-2xl overflow-hidden rounded-xl">

      <!-- Left Panel: Visual -->
      <div class="hidden md:flex md:w-1/2 relative overflow-hidden bg-primary">
        <div class="absolute inset-0 z-10 bg-gradient-to-tr from-primary/90 to-secondary/40 mix-blend-multiply"></div>
        <img
          alt="Renewable Energy Future"
          class="absolute inset-0 w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuApX5b9aiIA_wCHd4wg6bEOrMgtlbRVXT_KNRkmviI-ubUqpcqJIdTJwtCrmPhC4XGBGQREeVT20r-16qPVcmXT-iJMGshunCEaMbrBJuHKLwI6uX_FegahYAi5NhyW1DmQ7lfBqlABYsO2Ka0yIbrp6UtWjYliLml5Xbf4FSieoSP0WprWudma8fGf8pAsPGJ2GdQpPY3dQkj2ILnYsoq1KQvAg9WrGjUcnKGshmlh5nE3gJYYsUx1sTh6WnFrRPLVIvjjZAjcWnfM"
        />
        <div class="relative z-20 flex flex-col justify-end p-16 text-on-primary-container h-full">
          <div class="max-w-md">
            <h1 class="text-4xl font-black tracking-tight mb-4">Empowering your local grid.</h1>
            <p class="text-lg opacity-90 leading-relaxed">Join thousands of households contributing to a cleaner, more efficient energy future through smart community sharing.</p>
          </div>
        </div>
      </div>

      <!-- Right Panel: Form -->
      <div class="w-full md:w-1/2 flex items-center justify-center bg-surface-container-lowest p-8 md:p-16">
        <div class="w-full max-w-md">

          <div class="mb-10">
            <h2 class="text-3xl font-extrabold text-on-surface mb-2">Complete Your Profile</h2>
            <p class="text-on-surface-variant">Help us tailor your energy savings based on your location and household needs.</p>
          </div>

          <!-- Progress Bar -->
          <div class="flex gap-1 mb-8">
            <div class="h-1.5 w-full bg-primary rounded-full"></div>
            <div class="h-1.5 w-full bg-primary rounded-full"></div>
            <div class="h-1.5 w-full bg-surface-container-highest rounded-full"></div>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">

            <!-- Postal Code -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-on-surface-variant ml-1" for="postal_code">Postal Code / Area</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">location_on</span>
                <input
                  v-model="form.postalCode"
                  id="postal_code"
                  type="number"
                  placeholder="e.g. 2000"
                  class="w-full pl-10 pr-4 py-3.5 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface"
                  required
                />
              </div>
            </div>

            <!-- Household Size -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-on-surface-variant ml-1" for="household_size">Household Size</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">group</span>
                <select
                  v-model="form.householdSize"
                  id="household_size"
                  class="w-full pl-10 pr-10 py-3.5 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none text-on-surface"
                  required
                >
                  <option disabled value="">Select number of people</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5 People</option>
                  <option value="6">6+ People</option>
                </select>
                <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
              </div>
            </div>

            <p v-if="error" class="text-error text-sm">{{ error }}</p>
            <p v-if="success" class="text-green-600 text-sm font-medium">{{ success }}</p>

            <div class="pt-4 space-y-3">
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-primary text-on-primary py-4 rounded-lg font-bold text-lg hover:bg-primary-container transition-colors shadow-lg active:scale-[0.98] duration-200 disabled:opacity-70"
              >
                {{ isLoading ? 'Saving...' : 'Continue' }}
              </button>
              <button
                type="button"
                @click="handleSkip"
                class="w-full text-outline font-medium py-2 hover:text-primary transition-colors text-sm"
              >
                Skip for now
              </button>
            </div>
          </form>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const form = ref({
  postalCode: '',
  householdSize: ''
})

const isLoading = ref(false)
const error = ref('')
const success = ref('')

const handleSubmit = async () => {
  error.value = ''
  success.value = ''
  isLoading.value = true

  try {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')

    await axios.post(
      'https://localhost:7126/api/auth/update-profile',
      {
        userId: userId,
        postalCode: parseInt(form.value.postalCode),
        houseHoldSize: parseInt(form.value.householdSize)
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    success.value = 'Profile saved! Redirecting to dashboard...'
    setTimeout(() => router.push('/dashboard'), 1000)

  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save profile. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const handleSkip = () => {
  router.push('/dashboard')
}
</script>