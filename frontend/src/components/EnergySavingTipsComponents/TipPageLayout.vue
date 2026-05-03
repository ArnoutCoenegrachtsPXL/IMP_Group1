
<script setup>
const emit = defineEmits(['back'])

defineProps({
  title: String,
  subtitle: String,
  badge: String,
  heroImage: String,
  heroImageAlt: String,
  sectionTitle: String,
  sectionSubtitle: String,
})
</script>

<template>
  <div>
    <!-- Back button -->
    <button
      @click="emit('back')"
      class="mb-6 flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-700"
    >
      ← Back to All Tips
    </button>

    <div class="max-w-6xl mx-auto">
      <!-- Hero Section -->
      <div class="mb-10 relative overflow-hidden rounded-xl bg-blue-700 p-8 lg:p-12 text-white flex flex-col md:flex-row items-center gap-8">
        <div class="flex-1 z-10">
          <span class="bg-blue-500/30 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block">
            {{ badge }}
          </span>
          <h2 class="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">{{ title }}</h2>
          <p class="text-blue-100 text-lg max-w-xl">{{ subtitle }}</p>
        </div>

        <div class="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden shadow-2xl z-10 border-4 border-white/10">
          <img 
            class="w-full h-full object-cover" 
            :src="heroImage" 
            :alt="heroImageAlt" 
          />
        </div>

        <!-- fillters -->
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply opacity-50 filter blur-3xl"></div>
        <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-800 rounded-full mix-blend-multiply opacity-50 filter blur-3xl"></div>
      </div>

      <!-- Section Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h3 class="text-2xl font-bold text-slate-900 tracking-tight">{{ sectionTitle }}</h3>
          <p class="text-slate-500">{{ sectionSubtitle }}</p>
        </div>
        <div class="flex gap-2">
          <button class="p-2 border border-slate-200 rounded hover:bg-slate-50 transition-colors">
            <span class="material-symbols-outlined text-slate-600">filter_list</span>
          </button>
          <button class="p-2 border border-slate-200 rounded hover:bg-slate-50 transition-colors">
            <span class="material-symbols-outlined text-slate-600">sort</span>
          </button>
        </div>
      </div>

      <!-- Tips Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <slot></slot>
      </div>

      <!-- CTA Footer -->
      <div class="mt-12 bg-slate-900 rounded-xl p-10 text-center relative overflow-hidden">
        <h3 class="text-2xl font-bold text-white mb-4 relative z-10">Ready for a full home energy audit?</h3>
        <p class="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10">
          Connect your smart meter for real-time analysis and a comprehensive breakdown of your home's energy performance.
        </p>
        <div class="flex flex-wrap justify-center gap-4 relative z-10">
          <button class="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-500 transition-colors flex items-center gap-2">
            <span class="material-symbols-outlined">bolt</span>
            Connect My Meter
          </button>
          <button class="bg-transparent border border-slate-700 text-white font-bold py-3 px-8 rounded-md hover:bg-slate-800 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>