<script setup>
import TipPageLayout from './TipPageLayout.vue'
const emit = defineEmits(['back'])
</script>

<template>
  <TipPageLayout
    title="Laundry Saving Tips"
    subtitle="Optimize your laundry routine to save energy, reduce utility bills, and extend the life of your clothes."
    badge="Sustainable Laundry Guide"
    heroImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBjhLHZbdX_il1lydLfYaztp3hmg5jMfaaX_Qbb0HnNyPKm55i2ALDK72ZzzqmTv0r0ssunoJZTFgEZXHFRyOnXj5R5C05W1vgWIO2EeJht9vBFcDZRhwpkrZ6MsPhKrqkU2q9xxXgEZQMUED9Xk1nJj9rT0GrWUHq3oTLMwM-G9pdnEqhpUgT7oaLgasOOJumjkuE5RTLVbksns_UXtH3RDmA-j15oK4-1Jp3InIVLIfs5OBvOK2U7kQgqFGeqJDg3PpFglzRuSWeu"
    heroImageAlt="Modern washing machine in a bright clean laundry room"
    sectionTitle="Expert Laundry Tips"
    sectionSubtitle="Expert-verified ways to lower your carbon footprint and costs."
    @back="emit('back')"
  >
    <!-- Tip 1 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-cyan-100 transition-colors">
        <span class="material-symbols-outlined">ac_unit</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Wash in Cold Water</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">About 90% of energy used by washers goes to heating water. Use cold water for most loads to significantly cut energy use.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$40/yr saved</span>
      </div>
    </div>

    <!-- Tip 2 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-orange-100 transition-colors">
        <span class="material-symbols-outlined">filter_alt</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Clean Lint Filter</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">A clogged filter restricts airflow and forces your dryer to work harder. Clean it after every single load for efficiency.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$25/yr saved</span>
      </div>
    </div>

    <!-- Tip 3 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-yellow-100 transition-colors">
        <span class="material-symbols-outlined">sports_baseball</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Use Dryer Balls</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Wool or rubber dryer balls separate clothes, allowing hot air to circulate better and reducing drying time by up to 25%.</p>
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
      <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition-colors">
        <span class="material-symbols-outlined">inventory_2</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Run Full Loads Only</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Washers and dryers use similar amounts of energy regardless of load size. Wait for a full drum to maximize efficiency.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$15/yr saved</span>
      </div>
    </div>

    <!-- Tip 5 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors">
        <span class="material-symbols-outlined">air</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Air Dry Clothes</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">The most energy-efficient dryer is the sun. Use a clothesline or drying rack whenever possible to eliminate dryer costs entirely.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$80/yr saved</span>
      </div>
    </div>

    <!-- Tip 6 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-purple-100 transition-colors">
        <span class="material-symbols-outlined">sensors</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Use Sensor Drying</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Use the "auto-dry" setting instead of timed drying. Sensors detect moisture and stop the cycle as soon as clothes are dry.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$20/yr saved</span>
      </div>
    </div>
  </TipPageLayout>
</template>