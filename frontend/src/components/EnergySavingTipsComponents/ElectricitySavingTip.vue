<script setup>
const emit= defineEmits(['back'])
</script>

<template>
    
    <TipPageLayout
        title="Electricity Saving Tips"
        subtitle="Small changes lead to significant savings. Follow our curated expert tips to reduce your monthly energy bill by up to 30%."
        badge="Featured Guide"
        heroImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDZFgLcl9H7PcbeTbQPsVOB9HKnAzIjjnnBH2ydXH6TlwOD5MtG5zzHvd93T0REdoJ3Rqvf9A6dS86nFIdjoJ..."
        heroImageAlt="Modern eco-friendly home exterior at twilight"
        sectionTitle="Expert Electricity Tips"
        sectionSubtitle="Expert-verified ways to lower your carbon footprint and costs."
        @back="emit('back')"
    >


    <!-- Tip 1 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-yellow-100 transition-colors">
        <span class="material-symbols-outlined">lightbulb</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">LED Lighting Upgrade</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Replace old incandescent bulbs with energy-efficient LED alternatives across your home.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$150/yr saved</span>
      </div>
    </div>

            <!-- Tip 2 -->
        <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
        <span class="material-symbols-outlined">thermostat</span>
        </div>
        <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Smart Thermostat Installation</h4>
        <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Automate your home temperature based on occupancy to slash heating and cooling costs.</p>
        <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$220/yr saved</span>
        </div>
        </div>
        <!-- Tip 3 -->
        <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-orange-100 transition-colors">
        <span class="material-symbols-outlined">power_off</span>
        </div>
        <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Unplug Phantom Electronics</h4>
        <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Devices like chargers and TVs draw power even when off. Use smart power strips to cut it.</p>
        <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$75/yr saved</span>
        </div>
        </div>
        <!-- Tip 4 -->
        <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-cyan-100 transition-colors">
        <span class="material-symbols-outlined">water_drop</span>
        </div>
        <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Use Cold Water for Laundry</h4>
        <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Heating water accounts for 90% of washing machine energy. Cold water is just as effective.</p>
        <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$60/yr saved</span>
        </div>
        </div>
        <!-- Tip 5 -->
        <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors">
        <span class="material-symbols-outlined">window</span>
        </div>
        <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Seal Air Leaks &amp; Insulation</h4>
        <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Keep the conditioned air inside by sealing gaps in windows and doors with weatherstripping.</p>
        <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$180/yr saved</span>
        </div>
        </div>
        <!-- Tip 6 -->
        <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition-colors">
        <span class="material-symbols-outlined">filter_alt</span>
        </div>
        <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Clean AC/Heater Filters</h4>
        <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Dirty filters restrict airflow, making your HVAC system work harder and use more energy.</p>
        <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$45/yr saved</span>
        </div>
        </div>
        <!-- Tip 7 -->
        <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-purple-100 transition-colors">
        <span class="material-symbols-outlined">schedule</span>
        </div>
        <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Off-Peak Appliance Use</h4>
        <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Run dishwashers and dryers during off-peak hours when electricity rates are lower.</p>
        <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$90/yr saved</span>
        </div>
        </div>
        <!-- Tip 8 -->
        <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-rose-100 transition-colors">
        <span class="material-symbols-outlined">wb_sunny</span>
        </div>
        <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Natural Light Optimization</h4>
        <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Open blinds during the day to heat your home naturally and reduce the need for lights.</p>
        <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$30/yr saved</span>
        </div>
        </div>


    </TipPageLayout>
</template>