
<script setup>
 
  import ElectricitySavingTip from '@/components/EnergySavingTipsComponents/ElectricitySavingTip.vue'
  import HeatingSavingTip from '@/components/EnergySavingTipsComponents/HeatingSavingTip.vue'
  import KitchenSavingTip from '@/components/EnergySavingTipsComponents/KitchenSavingTip.vue'
  import LaundrySavingTip from '@/components/EnergySavingTipsComponents/LaundrySavingTip.vue'
  import SolarSavingTip from '@/components/EnergySavingTipsComponents/SolarSavingTip.vue'
  import WaterSavingTip from '@/components/EnergySavingTipsComponents/WaterSavingTip.vue'

  import {ref} from 'vue'

  const currentView = ref('main')

  tailwind.config = {
                darkMode: "class",
                theme: {
                    extend: {
                        "colors": {
                            "on-surface-variant": "#414753",
                            "outline-variant": "#c1c6d5",
                            "on-secondary-container": "#003389",
                            "surface-dim": "#d8dae3",
                            "background": "#f9f9ff",
                            "surface-variant": "#e0e2ec",
                            "on-error": "#ffffff",
                            "error-container": "#ffdad6",
                            "tertiary-container": "#b75b00",
                            "on-error-container": "#93000a",
                            "on-tertiary-fixed": "#301400",
                            "surface": "#f9f9ff",
                            "primary-fixed": "#75ff69",
                            "inverse-surface": "#2d3038",
                            "secondary-fixed": "#dbe1ff",
                            "surface-bright": "#f9f9ff",
                            "on-primary": "#ffffff",
                            "outline": "#717785",
                            "secondary": "#365ab3",
                            "on-tertiary-container": "#fffbff",
                            "on-primary-fixed-variant": "#005307",
                            "surface-container": "#ecedf7",
                            "primary": "#006c0c",
                            "on-secondary-fixed-variant": "#174199",
                            "surface-tint": "#006e0c",
                            "tertiary-fixed-dim": "#ffb785",
                            "error": "#ba1a1a",
                            "inverse-primary": "#19e52d",
                            "inverse-on-surface": "#eff0fa",
                            "primary-container": "#008812",
                            "on-primary-fixed": "#002201",
                            "on-background": "#181c22",
                            "surface-container-lowest": "#ffffff",
                            "surface-container-low": "#f2f3fd",
                            "on-secondary-fixed": "#001849",
                            "tertiary": "#924800",
                            "on-surface": "#181c22",
                            "secondary-container": "#7fa0fd",
                            "secondary-fixed-dim": "#b3c5ff",
                            "on-secondary": "#ffffff",
                            "tertiary-fixed": "#ffdcc6",
                            "on-tertiary-fixed-variant": "#723700",
                            "on-tertiary": "#ffffff",
                            "primary-fixed-dim": "#19e52d",
                            "surface-container-high": "#e6e8f1",
                            "surface-container-highest": "#e0e2ec",
                            "on-primary-container": "#f8fff0"
                        },
                        "borderRadius": {
                            "DEFAULT": "0.125rem",
                            "lg": "0.25rem",
                            "xl": "0.5rem",
                            "full": "0.75rem"
                        },
                        "fontFamily": {
                            "headline": ["Inter"],
                            "body": ["Inter"],
                            "label": ["Inter"]
                        }
                    },
                },
            }
</script>

<template>

      <div v-if="currentView === 'main'">
            
      <!-- Header Section -->
          <section class="mb-12">
          <h1 class="text-4xl font-extrabold text-on-background tracking-tight mb-2">Your Personal Energy Advisor</h1>
          <p class="text-on-surface-variant max-w-2xl text-lg">We analyze your energy patterns to provide tailored tips that fit your lifestyle and help you save on your next bill.</p>
          </section>
          <!-- Personalization Hub & Filter Combined Bento -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <!-- Set Your Schedule Card -->
          <div class="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
          <div class="flex items-center space-x-2 mb-4">
          <span class="material-symbols-outlined text-blue-700" style="font-variation-settings: 'FILL' 1;">timer</span>
          <h3 class="text-xl font-bold text-on-background">Set Your Schedule</h3>
          </div>
          <p class="text-sm text-on-surface-variant mb-6">Tell us when you are most active at home to receive time-sensitive saving opportunities.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
          <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Time From</label>
          <input class="w-full rounded border-slate-200 bg-slate-50 px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500" type="time" value="16:00"/>
          </div>
          <div>
          <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Time To</label>
          <input class="w-full rounded border-slate-200 bg-slate-50 px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500" type="time" value="18:00"/>
          </div>
          </div>
          </div>
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center space-x-3">
          <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-700">
          <span class="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition"></span>
          </button> <br>
          <br>
          <span class="text-sm font-medium text-slate-700"> <br>Show only tips for my schedule</span>
          </div>
          <button class="w-full sm:w-auto px-6 py-2.5 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2">
          <span>Get Tailored Tips</span>
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
          </div>
          </div>
          <!-- Stats/Category Quick Info Card -->
          <div class="bg-blue-700 rounded-lg p-6 text-white shadow-lg relative overflow-hidden">
          <div class="relative z-10">
          <h3 class="text-lg font-bold mb-1">Impact Overview</h3>
          <p class="text-blue-100 text-sm mb-6">Following your personalized tips could save you up to:</p>
          <div class="text-5xl font-black mb-2">$42<span class="text-xl font-normal">/mo</span></div>
          <div class="w-full bg-blue-800 h-2 rounded-full mt-6 overflow-hidden">
          <div class="bg-white h-full" style="width: 100%;"></div>
          </div>
          <p class="text-xs text-blue-200 mt-2">65% of potential savings achieved this week</p>
          </div>
          <!-- Decorative background icon -->
          <span class="material-symbols-outlined absolute -bottom-6 -right-6 text-blue-600 opacity-30 text-[120px]" style="font-variation-settings: 'FILL' 1;">insights</span>
          </div>
          </div>
          <!-- Filtering & Search Section -->
          <div class="mb-8">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex flex-wrap gap-2">
          <button class="px-4 py-1.5 rounded-full bg-blue-700 text-white text-sm font-medium">All Tips</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300" @click="currentView = 'electricity'">Electricity</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300" @click="currentView = 'water'">Water</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300" @click="currentView = 'heating'">Heating</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300" @click="currentView = 'solar'">Solar</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300" @click="currentView = 'kitchen'">Kitchen</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300" @click="currentView = 'laundry'">Laundry</button>
          </div>
          </div>
          </div>
          <!-- Tips Feed Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Tip Card 1 -->
          <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
          <div class="h-40 relative">
          <img class="w-full h-full object-cover" data-alt="Close up of a smart thermostat on a minimalist white wall with soft natural lighting and modern design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDav2CwnH7_sK8zJshe51W_8peePokZF0VTHkhWK4i9wTp6MyPQHEPLQwlT7VIgerogydLfGW2KApRyJz3yJ12ag0hVp0Qu30a9fJWKMeYzJV3IRKeiV2oWa87-F4U-Ax6lGsdMOI6ZvnRpLpgSJmFcXoENTx8zTeXXCl5391lz6ncX43yLvfGfmYlKhKYHzBZM8gpSeZXbXmeBMfDlCX4dU8vlqKVRW8ecGpaeqHHR_uXAbSiG9eFv59K8AMOMPzzBhUthr6eSoNHA"/>
          <div class="absolute top-3 left-3 flex gap-2">
          <span class="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded tracking-wider">High Impact</span>
          <span class="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded tracking-wider">4 PM - 6 PM</span>
          </div>
          </div>
          <div class="p-5">
          <h4 class="text-lg font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Optimize Peak Hour Cooling</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">Lower your AC activity by 2 degrees between 4 PM and 6 PM to avoid peak tariff pricing and reduce grid strain.</p>
          <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Cooling</span>
          <button class="text-blue-700 text-sm font-bold flex items-center space-x-1">
          <span>Details</span>
          <span class="material-symbols-outlined text-xs">open_in_new</span>
          </button>
          </div>
          </div>
          </div>
          <!-- Tip Card 2 -->
          <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
          <div class="h-40 relative">
          <img class="w-full h-full object-cover" data-alt="Modern washing machine in a bright clean laundry room with wooden accents and organized shelves" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjhLHZbdX_il1lydLfYaztp3hmg5jMfaaX_Qbb0HnNyPKm55i2ALDK72ZzzqmTv0r0ssunoJZTFgEZXHFRyOnXj5R5C05W1vgWIO2EeJht9vBFcDZRhwpkrZ6MsPhKrqkU2q9xxXgEZQMUED9Xk1nJj9rT0GrWUHq3oTLMwM-G9pdnEqhpUgT7oaLgasOOJumjkuE5RTLVbksns_UXtH3RDmA-j15oK4-1Jp3InIVLIfs5OBvOK2U7kQgqFGeqJDg3PpFglzRuSWeu"/>
          <div class="absolute top-3 left-3 flex gap-2">
          <span class="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded tracking-wider">Medium Impact</span>
          </div>
          </div>
          <div class="p-5">
          <h4 class="text-lg font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">The Eco-Wash Delay</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">Use the 'Delay Start' feature on your washing machine to run during solar surplus hours or late night intervals.</p>
          <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Laundry</span>
          <button class="text-blue-700 text-sm font-bold flex items-center space-x-1" @click="currentView = 'laundry'">
          <span>Details</span>
          <span class="material-symbols-outlined text-xs" >open_in_new</span>
          </button>
          </div>
          </div>
          </div>
          <!-- Tip Card 3 -->
          <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
          <div class="h-40 relative">
          <img class="w-full h-full object-cover" data-alt="High-end modern induction cooktop in a luxury kitchen with boiling water in a designer pot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMy0PhlxobZcJ_4g4Mf9SeMLlF-_DkNtY2SyB6FAWUZHT69Udt45Qsbzuz0ny5-lhDO8unmQcOl3R5vlohm9-yrUTfbhqqfJZyGmYcb45mgqtckZLcMiFAquIe9meoXQbicAKqGdmfXbvUR-oxLoBlywqw2E9uMyMWXpjVv7N6sB6TPmeYssnSGvnVFtzIUabwt393gKzyxnEfJEONPvz-Rpq9bNX9ZvceMD4KN8Q56KHtxXqLKHNXXKHlvDXGzhHKi0MFlg0w59vY"/>
          <div class="absolute top-3 left-3 flex gap-2">
          <span class="px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase rounded tracking-wider">Low Impact</span>
          <span class="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded tracking-wider">4 PM - 6 PM</span>
          </div>
          </div>
          <div class="p-5">
          <h4 class="text-lg font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Smart Cooking Habits</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">Cover pots while boiling water and use the microwave for small heating tasks to reduce energy consumption by 20%.</p>
          <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Kitchen</span>
          <button class="text-blue-700 text-sm font-bold flex items-center space-x-1" @click="currentView = 'kitchen'">
          <span>Details</span>
          <span class="material-symbols-outlined text-xs">open_in_new</span>
          </button>
          </div>
          </div>
          </div>
          <!-- Tip Card 4 -->
          <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
          <div class="h-40 relative">
          <img class="w-full h-full object-cover" data-alt="Close-up of water droplets falling from a modern shower head with elegant bathroom tiling and atmospheric lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzmlNYVJl7YfKlpEYRkrcL9kQCQOvMn3CQF4v86Dh5_ybH6eGL5sAEybZJq1lf-n8SqfB_09QtWYaiRw9PT8Dxy2TL98K0iTYGwq-XA1MTc2iAgD3fYl-f5x4NEe8eCvkXSDtTUq3IWXNhwD-bNvzWCAzePLMnID6duNaqbceSQDFgWQGG0L9MkvuDniJc2DWltOPLkbfFUZ-qlnu7-CHPsxTztEHtQS8c9nrFWCYK32iAAW2TB_83yz7ua9xEnrHr0WWzuwWfgnSd"/>
          <div class="absolute top-3 left-3 flex gap-2">
          <span class="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded tracking-wider">High Impact</span>
          </div>
          </div>
          <div class="p-5">
          <h4 class="text-lg font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">The 5-Minute Challenge</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">Reducing shower time to 5 minutes can save up to 15 gallons of water and significant energy used for heating.</p>
          <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Water</span>
          <button class="text-blue-700 text-sm font-bold flex items-center space-x-1"  @click="currentView = 'water'">
          <span>Details</span>
          <span class="material-symbols-outlined text-xs">open_in_new</span>
          </button>
          </div>
          </div>
          </div>
          <!-- Tip Card 5 -->
          <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
          <div class="h-40 relative">
          <img class="w-full h-full object-cover" data-alt="Solar panels on a residential roof reflecting a bright blue sky with wispy clouds and bright afternoon sun" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_t0LazH9tTWFhJf0OamJnaPhTE20HMRvoYyiHW4ovkvW8Obf7iqYb2FG2me5J0v5HsFi7e97ChynQX2wQZ0PRYHm_Cdwo-nbV8zNdwy2GEnYe6BmyBC1DPzLbTB98VyChVIHGAak7WY_NRtz4VLl6gPqE1aOkHw64-jAmN217gekRN2mk3jtK77cK9RJWsTEOK523_JQvwlJ_ScxAwONO1DwTtQANhS07eHuu4Ftl9AlZcyp4bL87ckS5TttmR-bJm0zMhaemM_Jh"/>
          <div class="absolute top-3 left-3 flex gap-2">
          <span class="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded tracking-wider">Medium Impact</span>
          </div>
          </div>
          <div class="p-5">
          <h4 class="text-lg font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Max Solar Self-Consumption</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">Run high-wattage appliances during peak sun hours (11 AM - 3 PM) to use your own solar energy instead of grid power.</p>
          <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Solar</span>
          <button class="text-blue-700 text-sm font-bold flex items-center space-x-1" @click="currentView = 'solar'">
          <span>Details</span>
          <span class="material-symbols-outlined text-xs">open_in_new</span>
          </button>
          </div>
          </div>
          </div>
          <!-- Tip Card 6 (Empty/CTA) -->
          <div class="bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:bg-white hover:border-blue-300 transition-all">
          <div class="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
          <span class="material-symbols-outlined text-slate-400 group-hover:text-blue-700">add</span>
          </div>
          <h4 class="text-lg font-bold text-slate-600 mb-2">Request Custom Advice</h4>
          <p class="text-sm text-slate-400">Can't find what you need? Ask our advisors for a custom energy audit of your home.</p>
          </div>
          </div>

  
            </div>

            <!-- Category views -->
            <ElectricitySavingTip v-if="currentView === 'electricity'" @back="currentView = 'main'" />
            <WaterSavingTip v-if="currentView=='water'" @back="currentView = 'main'"/>
            <HeatingSavingTip v-if="currentView=='heating'" @back="currentView = 'main'"/>
            <SolarSavingTip v-if="currentView=='solar'" @back="currentView = 'main'"/>
            <KitchenSavingTip v-if="currentView=='kitchen'" @back="currentView = 'main'"/>
            <LaundrySavingTip v-if="currentView=='laundry'" @back="currentView = 'main'"/>
</template>



