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
    <div class="bg-white rounded-lg border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-cyan-100 transition-colors">
        <span class="material-symbols-outlined">ac_unit</span>
      </div>
      <h4 class="font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Wash in Cold Water</h4>
      <p class="text-on-surface-variant text-sm mb-4 flex-1 leading-relaxed">About 90% of energy used by washers goes to heating water. Use cold water for most loads to significantly cut energy use.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$40/yr saved</span>
      </div>
    </div>

    <!-- Tip 2 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-orange-100 transition-colors">
        <span class="material-symbols-outlined">filter_alt</span>
      </div>
      <h4 class="font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Clean Lint Filter</h4>
      <p class="text-on-surface-variant text-sm mb-4 flex-1 leading-relaxed">A clogged filter restricts airflow and forces your dryer to work harder. Clean it after every single load for efficiency.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$25/yr saved</span>
      </div>
    </div>

    <!-- Tip 3 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-yellow-100 transition-colors">
        <span class="material-symbols-outlined">sports_baseball</span>
      </div>
      <h4 class="font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Use Dryer Balls</h4>
      <p class="text-on-surface-variant text-sm mb-4 flex-1 leading-relaxed">Wool or rubber dryer balls separate clothes, allowing hot air to circulate better and reducing drying time by up to 25%.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$30/yr saved</span>
      </div>
    </div>

    <!-- Tip 4 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition-colors">
        <span class="material-symbols-outlined">inventory_2</span>
      </div>
      <h4 class="font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Run Full Loads Only</h4>
      <p class="text-on-surface-variant text-sm mb-4 flex-1 leading-relaxed">Washers and dryers use similar amounts of energy regardless of load size. Wait for a full drum to maximize efficiency.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$15/yr saved</span>
      </div>
    </div>

    <!-- Tip 5 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors">
        <span class="material-symbols-outlined">air</span>
      </div>
      <h4 class="font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Air Dry Clothes</h4>
      <p class="text-on-surface-variant text-sm mb-4 flex-1 leading-relaxed">The most energy-efficient dryer is the sun. Use a clothesline or drying rack whenever possible to eliminate dryer costs entirely.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$80/yr saved</span>
      </div>
    </div>

    <!-- Tip 6 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-purple-100 transition-colors">
        <span class="material-symbols-outlined">sensors</span>
      </div>
      <h4 class="font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Use Sensor Drying</h4>
      <p class="text-on-surface-variant text-sm mb-4 flex-1 leading-relaxed">Use the "auto-dry" setting instead of timed drying. Sensors detect moisture and stop the cycle as soon as clothes are dry.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$20/yr saved</span>
      </div>
    </div>
  </TipPageLayout>
</template>
