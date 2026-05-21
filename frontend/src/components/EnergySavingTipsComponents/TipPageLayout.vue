<script setup>
const emit = defineEmits(['back'])

defineProps({
  title:          String,
  subtitle:       String,
  badge:          String,
  heroImage:      String,
  heroImageAlt:   String,
  sectionTitle:   String,
  sectionSubtitle: String,
})
</script>

<template>
  <div>

    <!-- Back button — uses theme tokens so it works in dark mode -->
    <button
      @click="emit('back')"
      class="mb-6 flex items-center gap-2 text-sm font-bold transition-colors group"
      style="color: var(--color-on-surface-variant);"
      @mouseover="$event.currentTarget.style.color = 'var(--color-primary)'"
      @mouseleave="$event.currentTarget.style.color = 'var(--color-on-surface-variant)'"
    >
      <span class="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
      Back to All Tips
    </button>

    <!-- Hero — side-by-side layout matching old project -->
    <div
      class="mb-10 relative overflow-hidden rounded-xl p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8"
      style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dim) 100%);"
    >
      <!-- Text side -->
      <div class="flex-1 z-10">
        <span
          class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block"
          style="background: rgba(255,255,255,0.2); color: #fff;"
        >{{ badge }}</span>
        <h2 class="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight" style="color: #fff;">{{ title }}</h2>
        <p class="text-lg max-w-xl" style="color: rgba(255,255,255,0.85);">{{ subtitle }}</p>
      </div>
      <!-- Image side -->
      <div class="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden shadow-2xl z-10 border-4 border-white/10 shrink-0">
        <img class="w-full h-full object-cover" :src="heroImage" :alt="heroImageAlt" />
      </div>
      <!-- Decorative blobs -->
      <div class="absolute -right-20 -top-20 w-64 h-64 rounded-full mix-blend-multiply opacity-40 filter blur-3xl pointer-events-none"
           style="background: var(--color-primary-dim);"></div>
      <div class="absolute -left-20 -bottom-20 w-64 h-64 rounded-full mix-blend-multiply opacity-40 filter blur-3xl pointer-events-none"
           style="background: var(--color-primary);"></div>
    </div>

    <!-- Section header with filter/sort buttons — matching old project -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h3 class="text-2xl font-bold tracking-tight" style="color: var(--color-on-surface);">{{ sectionTitle }}</h3>
        <p class="mt-1 text-sm" style="color: var(--color-on-surface-variant);">{{ sectionSubtitle }}</p>
      </div>
      <div class="flex gap-2">
        <button
          class="p-2 rounded transition-colors"
          style="border: 1px solid var(--color-outline-variant); background: var(--color-surface-container-lowest); color: var(--color-on-surface-variant);"
          @mouseover="$event.currentTarget.style.background = 'var(--color-surface-container)'"
          @mouseleave="$event.currentTarget.style.background = 'var(--color-surface-container-lowest)'"
        >
          <span class="material-symbols-outlined">filter_list</span>
        </button>
        <button
          class="p-2 rounded transition-colors"
          style="border: 1px solid var(--color-outline-variant); background: var(--color-surface-container-lowest); color: var(--color-on-surface-variant);"
          @mouseover="$event.currentTarget.style.background = 'var(--color-surface-container)'"
          @mouseleave="$event.currentTarget.style.background = 'var(--color-surface-container-lowest)'"
        >
          <span class="material-symbols-outlined">sort</span>
        </button>
      </div>
    </div>

    <!-- Tips grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <slot></slot>
    </div>

    <!-- CTA footer — dark card matching old project style -->
    <div
      class="mt-12 rounded-xl p-10 text-center relative overflow-hidden"
      style="background: var(--color-inverse-surface);"
    >
      <h3 class="text-2xl font-bold mb-4 relative z-10" style="color: var(--color-surface);">
        Ready for a full home energy audit?
      </h3>
      <p class="mb-8 max-w-2xl mx-auto relative z-10" style="color: color-mix(in srgb, var(--color-surface) 60%, transparent);">
        Connect your smart meter for real-time analysis and a comprehensive breakdown of your home's energy performance.
      </p>
      <div class="flex flex-wrap justify-center gap-4 relative z-10">
        <button
          class="font-bold py-3 px-8 rounded-md transition-colors flex items-center gap-2"
          style="background: var(--color-primary); color: var(--color-on-primary);"
        >
          <span class="material-symbols-outlined">bolt</span>
          Connect My Meter
        </button>
        <button
          class="font-bold py-3 px-8 rounded-md transition-colors"
          style="background: transparent; border: 1px solid color-mix(in srgb, var(--color-surface) 30%, transparent); color: var(--color-surface);"
        >
          Learn More
        </button>
      </div>
    </div>

  </div>
</template>