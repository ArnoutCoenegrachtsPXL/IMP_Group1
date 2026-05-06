<script setup>
import TipPageLayout from './TipPageLayout.vue';
const emit= defineEmits(['back'])

</script>

<template>
    <!--Connect pageLayout to the page, doesnt work yet-->
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
    <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">lightbulb</span>
      </div>
      <h4 class="font-bold text-slate-900 mb-2">LED Lighting Upgrade</h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Replace old incandescent bulbs with energy-efficient LED alternatives across your home.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$150/yr saved</span>
      </div>
    </div>

            <!-- Tip 2 -->
        <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">thermostat</span>
        </div>
        <h4 class="font-bold text-slate-900 mb-2">Smart Thermostat Installation</h4>
        <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Automate your home temperature based on occupancy to slash heating and cooling costs.</p>
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$220/yr saved</span>
        </div>
        </div>
        <!-- Tip 3 -->
        <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">power_off</span>
        </div>
        <h4 class="font-bold text-slate-900 mb-2">Unplug Phantom Electronics</h4>
        <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Devices like chargers and TVs draw power even when off. Use smart power strips to cut it.</p>
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$75/yr saved</span>
        </div>
        </div>
        <!-- Tip 4 -->
        <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-cyan-50 text-cyan-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">water_drop</span>
        </div>
        <h4 class="font-bold text-slate-900 mb-2">Use Cold Water for Laundry</h4>
        <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Heating water accounts for 90% of washing machine energy. Cold water is just as effective.</p>
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$60/yr saved</span>
        </div>
        </div>
        <!-- Tip 5 -->
        <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-green-50 text-green-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">window</span>
        </div>
        <h4 class="font-bold text-slate-900 mb-2">Seal Air Leaks &amp; Insulation</h4>
        <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Keep the conditioned air inside by sealing gaps in windows and doors with weatherstripping.</p>
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$180/yr saved</span>
        </div>
        </div>
        <!-- Tip 6 -->
        <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">filter_alt</span>
        </div>
        <h4 class="font-bold text-slate-900 mb-2">Clean AC/Heater Filters</h4>
        <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Dirty filters restrict airflow, making your HVAC system work harder and use more energy.</p>
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$45/yr saved</span>
        </div>
        </div>
        <!-- Tip 7 -->
        <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">schedule</span>
        </div>
        <h4 class="font-bold text-slate-900 mb-2">Off-Peak Appliance Use</h4>
        <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Run dishwashers and dryers during off-peak hours when electricity rates are lower.</p>
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$90/yr saved</span>
        </div>
        </div>
        <!-- Tip 8 -->
        <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative"><div class="absolute top-4 right-4 flex items-center">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined">wb_sunny</span>
        </div>
        <h4 class="font-bold text-slate-900 mb-2">Natural Light Optimization</h4>
        <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Open blinds during the day to heat your home naturally and reduce the need for lights.</p>
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold">$30/yr saved</span>
        </div>
        </div>
 

    </TipPageLayout>
</template>









