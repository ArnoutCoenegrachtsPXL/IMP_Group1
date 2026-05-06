<script setup>
import TipPageLayout from './TipPageLayout.vue'
</script>

<template>
   <!--Connect pageLayout to the page, doesnt work yet-->
  <TipPageLayout
    title="Heating Efficiency Tips"
    subtitle="Maximize your comfort while minimizing your environmental footprint and utility costs this season."
    badge="Winter Efficiency Guide"
    heroImage="https://lh3.googleusercontent.com/aida-public/AB6AXuB2snNiiKqA0Tu8hQZlHUbRMWbKthlJhoAr4Rz8L7L..."
    heroImageAlt="Abstract warm orange and blue heat wave gradients"
    sectionTitle="Expert Heating Tips"
    sectionSubtitle="Curated ways to keep your home warm and your bills low."
    @back="$emit('back')"
  >
    <!-- Tip 1 -->
    <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-700 focus:ring-blue-700 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-blue-50 text-blue-700 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">nest_thermostat_gen_3</span>
      </div>
      <h4 class="font-bold text-slate-900 mb-2">Smart Thermostat</h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Automate your home's temperature based on your schedule to avoid heating an empty house.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$180/yr saved</span>
      </div>
    </div>

    <!-- Tip 2 -->
    <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-700 focus:ring-blue-700 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-green-50 text-green-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">air</span>
      </div>
      <h4 class="font-bold text-slate-900 mb-2">Seal Air Leaks</h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Seal leaks around windows and doors with weatherstripping to keep warm air from escaping.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$110/yr saved</span>
      </div>
    </div>

    <!-- Tip 3 -->
    <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-700 focus:ring-blue-700 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">wb_sunny</span>
      </div>
      <h4 class="font-bold text-slate-900 mb-2">Harness Sunlight</h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Open south-facing curtains during the day to let the sun naturally heat your living spaces.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$45/yr saved</span>
      </div>
    </div>

    <!-- Tip 4 -->
    <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-700 focus:ring-blue-700 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">build</span>
      </div>
      <h4 class="font-bold text-slate-900 mb-2">Filter Maintenance</h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Replace furnace filters monthly. Clean systems run more efficiently and consume less fuel.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$60/yr saved</span>
      </div>
    </div>

    <!-- Tip 5 -->
    <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-700 focus:ring-blue-700 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">checkroom</span>
      </div>
      <h4 class="font-bold text-slate-900 mb-2">Layer Up</h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Lower the thermostat by 2 degrees and wear a sweater. It significantly reduces heating load.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$95/yr saved</span>
      </div>
    </div>

    <!-- Tip 6 -->
    <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-700 focus:ring-blue-700 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">settings_suggest</span>
      </div>
      <h4 class="font-bold text-slate-900 mb-2">Water Heater Temp</h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Lower your water heater setting to 120°F (49°C) to prevent standby heat loss.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$30/yr saved</span>
      </div>
    </div>

    <!-- Tip 7 -->
    <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-700 focus:ring-blue-700 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-cyan-50 text-cyan-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">mode_fan</span>
      </div>
      <h4 class="font-bold text-slate-900 mb-2">Reverse Fans</h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Run ceiling fans in reverse (clockwise) at low speed to push warm air back down.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$15/yr saved</span>
      </div>
    </div>

    <!-- Tip 8 -->
    <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-700 focus:ring-blue-700 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">blanket</span>
      </div>
      <h4 class="font-bold text-slate-900 mb-2">Insulate Attic</h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Adding proper insulation to your attic can prevent massive heat loss through the roof.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$220/yr saved</span>
      </div>
    </div>

  </TipPageLayout>
</template>