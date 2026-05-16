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
      class="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-700 transition-colors group"
    >
      <span class="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
      Back to All Tips
    </button>

    <!-- Hero -->
    <div class="relative rounded-xl overflow-hidden mb-10 h-56 md:h-72">
      <img class="w-full h-full object-cover" :src="heroImage" :alt="heroImageAlt" />
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-transparent"></div>
      <div class="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
        <span class="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit">
          {{ badge }}
        </span>
        <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">{{ title }}</h1>
        <p class="text-blue-100 text-sm md:text-base max-w-xl leading-relaxed">{{ subtitle }}</p>
      </div>
    </div>

    <!-- Section header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-on-background tracking-tight">{{ sectionTitle }}</h2>
      <p class="text-on-surface-variant text-sm mt-1">{{ sectionSubtitle }}</p>
    </div>

    <!-- Tips grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <slot></slot>
    </div>

  </div>
</template>
