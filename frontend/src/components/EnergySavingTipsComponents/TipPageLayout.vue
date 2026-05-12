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
    <!-- Back button: text-slate-600 hover:text-blue-700 → text-on-surface-variant hover:text-primary -->
    <button
      @click="emit('back')"
      class="mb-6 flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
    >
      ← Back to All Tips
    </button>

    <div class="max-w-6xl mx-auto">

      <!-- Hero — was bg-blue-700 text-white; now bg-primary text-on-primary so it adapts to any accent -->
      <div class="mb-10 relative overflow-hidden rounded-xl bg-primary p-8 lg:p-12 text-on-primary flex flex-col md:flex-row items-center gap-8">
        <div class="flex-1 z-10">
          <!-- badge: was bg-blue-500/30 → bg-on-primary/20 -->
          <span class="bg-on-primary/20 text-on-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block">
            {{ badge }}
          </span>
          <h2 class="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">{{ title }}</h2>
          <!-- subtitle: was text-blue-100 → text-on-primary/80 -->
          <p class="text-on-primary/80 text-lg max-w-xl">{{ subtitle }}</p>
        </div>

        <div class="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden shadow-2xl z-10 border-4 border-on-primary/10">
          <img
            class="w-full h-full object-cover"
            :src="heroImage"
            :alt="heroImageAlt"
          />
        </div>

        <!-- Decorative blobs: were bg-blue-600/bg-blue-800 → primary-dim/primary-container tints -->
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-primary-dim rounded-full mix-blend-multiply opacity-40 filter blur-3xl pointer-events-none"></div>
        <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-primary-container rounded-full mix-blend-multiply opacity-40 filter blur-3xl pointer-events-none"></div>
      </div>

      <!-- Section Header — was text-slate-900 / text-slate-500 / border-slate-200 -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h3 class="text-2xl font-bold text-on-surface tracking-tight">{{ sectionTitle }}</h3>
          <p class="text-on-surface-variant">{{ sectionSubtitle }}</p>
        </div>
        <div class="flex gap-2">
          <!-- buttons: were border-slate-200 hover:bg-slate-50 text-slate-600 -->
          <button class="p-2 border border-outline-variant rounded hover:bg-surface-container transition-colors min-h-[40px]">
            <span class="material-symbols-outlined text-on-surface-variant">filter_list</span>
          </button>
          <button class="p-2 border border-outline-variant rounded hover:bg-surface-container transition-colors min-h-[40px]">
            <span class="material-symbols-outlined text-on-surface-variant">sort</span>
          </button>
        </div>
      </div>

      <!-- Tips Grid (slot) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <slot></slot>
      </div>

      <!--
        CTA Footer — was bg-slate-900 text-white / text-slate-400 / border-slate-700
        Now uses bg-inverse-surface (dark in light mode, light-ish in dark mode)
        which is set by userPrefs.applyAll() from DARK_SURFACES/LIGHT_SURFACES.
        This way it always looks like a "dark" call-to-action block regardless of theme.
      -->
      <div class="mt-12 bg-inverse-surface rounded-xl p-10 text-center relative overflow-hidden">
        <h3 class="text-2xl font-bold text-surface mb-4 relative z-10">Ready for a full home energy audit?</h3>
        <p class="text-surface/60 mb-8 max-w-2xl mx-auto relative z-10">
          Connect your smart meter for real-time analysis and a comprehensive breakdown of your home's energy performance.
        </p>
        <div class="flex flex-wrap justify-center gap-4 relative z-10">
          <!-- primary CTA: was bg-blue-600 hover:bg-blue-500 -->
          <button class="bg-primary text-on-primary font-bold py-3 px-8 rounded-md hover:opacity-90 transition-opacity flex items-center gap-2">
            <span class="material-symbols-outlined">bolt</span>
            Connect My Meter
          </button>
          <!-- secondary CTA: was border-slate-700 hover:bg-slate-800 -->
          <button class="bg-transparent border border-surface/30 text-surface font-bold py-3 px-8 rounded-md hover:bg-surface/10 transition-colors">
            Learn More
          </button>
        </div>
      </div>

    </div>
  </div>
</template>
