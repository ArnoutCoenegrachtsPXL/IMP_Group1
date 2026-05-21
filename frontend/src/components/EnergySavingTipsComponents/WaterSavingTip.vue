<script setup>
import TipPageLayout from './TipPageLayout.vue'
const emit = defineEmits(['back'])
</script>

<template>
  <TipPageLayout
    title="Water Conservation Tips"
    subtitle="Optimize your household water usage with these practical, high-impact strategies designed to reduce waste and lower your utility bills."
    badge="Water Sustainability"
    heroImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDpBtkfmSaARmg-sBOTD6qVlu6062LiHHzRFi1bpC_C4kLgUbjyl_fY1IjjR-VI8L79hKdfWFcg8n4zgnmFALkE6nJXj0nbBNnOC_wB_QSz0IfBdUruDd1QlIUN0uZ9qkFjFN3evEO496ihHDViazgVHLK-9UD_frPKAJOcNJ7QzXsYZ-XRmNPgqdt6083DXeiDjIaZfQ65X7AGvp7t3Ht5rejIgwsLeVmymnwi4Bu5S9s0d5Vti5If5RVVh_FpFkftPoXkVncUYbjp"
    heroImageAlt="Abstract close-up of water droplets on a blue surface"
    sectionTitle="Expert Water Saving Tips"
    sectionSubtitle="Expert-verified ways to lower your carbon footprint and costs."
    @back="emit('back')"
  >
    <!-- Tip 1 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
        <span class="material-symbols-outlined">shower</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Low-Flow Showerheads</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Replace standard showerheads with high-efficiency models to reduce flow rates from 2.5 gpm to 1.5 gpm or less without losing pressure.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$45/yr saved</span>
      </div>
    </div>

    <!-- Tip 2 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-cyan-100 transition-colors">
        <span class="material-symbols-outlined">plumbing</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Fix Leaks</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">A single leaky faucet dripping one drop per second can waste over 3,000 gallons per year. Check toilets, faucets, and pipe joints regularly.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$60/yr saved</span>
      </div>
    </div>

    <!-- Tip 3 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors">
        <span class="material-symbols-outlined">laundry</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Full Load Optimization</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Wait until you have a full load before running the dishwasher or washing machine. Modern appliances use the same water for partial loads.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$30/yr saved</span>
      </div>
    </div>

    <!-- Tip 4 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
        <span class="material-symbols-outlined">yard</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Smart Irrigation</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Water your lawn in the early morning or late evening to prevent evaporation. Install soil moisture sensors to skip unnecessary watering.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$120/yr saved</span>
      </div>
    </div>

    <!-- Tip 5 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition-colors">
        <span class="material-symbols-outlined">water_voc</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Dual-Flush Toilets</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Upgrade to dual-flush toilets or install a displacement bag in your existing tank to reduce the volume of water used per flush.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$85/yr saved</span>
      </div>
    </div>

    <!-- Tip 6 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-teal-100 transition-colors">
        <span class="material-symbols-outlined">kitchen</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Faucet Aerators</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Install low-cost aerators on kitchen and bathroom faucets to mix air into the stream, reducing water flow while maintaining pressure.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$25/yr saved</span>
      </div>
    </div>

    <!-- Tip 7 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-sky-100 transition-colors">
        <span class="material-symbols-outlined">water_drop</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Collect Rainwater</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Collecting rainwater for gardening and outdoor cleaning can reduce your municipal water demand by up to 40%. Start with a basic rain barrel system.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$85/yr saved</span>
      </div>
    </div>

    <!-- Tip 8 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
        <span class="material-symbols-outlined">timer</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">5-Minute Showers</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Taking shorter showers can significantly reduce your water usage and lower your utility bills.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$85/yr saved</span>
      </div>
    </div>
  </TipPageLayout>
</template>