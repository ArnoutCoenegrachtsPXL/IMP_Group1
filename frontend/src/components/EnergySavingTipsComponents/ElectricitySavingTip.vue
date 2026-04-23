<script setup>
const emit= defineEmits(['back'])

 tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-bright": "#f9f9ff",
                        "primary-fixed-dim": "#19e52d",
                        "on-secondary-container": "#003389",
                        "tertiary-fixed": "#ffdcc6",
                        "on-primary": "#ffffff",
                        "secondary": "#365ab3",
                        "tertiary-fixed-dim": "#ffb785",
                        "on-secondary-fixed-variant": "#174199",
                        "on-surface-variant": "#414753",
                        "outline": "#717785",
                        "tertiary-container": "#b75b00",
                        "surface-container": "#ecedf7",
                        "surface-tint": "#006e0c",
                        "surface-variant": "#e0e2ec",
                        "primary-fixed": "#75ff69",
                        "on-error": "#ffffff",
                        "surface-container-highest": "#e0e2ec",
                        "on-surface": "#181c22",
                        "on-tertiary-fixed": "#301400",
                        "inverse-on-surface": "#eff0fa",
                        "secondary-fixed": "#dbe1ff",
                        "inverse-surface": "#2d3038",
                        "surface": "#f9f9ff",
                        "on-primary-container": "#f8fff0",
                        "secondary-container": "#7fa0fd",
                        "surface-container-lowest": "#ffffff",
                        "surface-container-low": "#f2f3fd",
                        "tertiary": "#924800",
                        "on-primary-fixed": "#002201",
                        "secondary-fixed-dim": "#b3c5ff",
                        "error-container": "#ffdad6",
                        "inverse-primary": "#19e52d",
                        "error": "#ba1a1a",
                        "surface-container-high": "#e6e8f1",
                        "primary-container": "#008812",
                        "primary": "#006c0c",
                        "background": "#f9f9ff",
                        "on-background": "#181c22",
                        "on-tertiary": "#ffffff",
                        "on-secondary": "#ffffff",
                        "outline-variant": "#c1c6d5",
                        "on-error-container": "#93000a",
                        "on-primary-fixed-variant": "#005307",
                        "on-tertiary-container": "#fffbff",
                        "on-tertiary-fixed-variant": "#723700",
                        "surface-dim": "#d8dae3",
                        "on-secondary-fixed": "#001849"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "fontFamily": {
                        "headline": ["Inter", "sans-serif"],
                        "display": ["Inter", "sans-serif"],
                        "body": ["Inter", "sans-serif"],
                        "label": ["Inter", "sans-serif"]
                    }
                }
            }
        }



</script>

<template>

    <button @click="emit('back')" class="mb-6 flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-700">
  ← Back to All Tips
    </button>

                <div class="max-w-6xl mx-auto">
            <!-- Hero Header -->
            <div class="mb-10 relative overflow-hidden rounded-xl bg-blue-700 p-8 lg:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 z-10">
            <span class="bg-blue-500/30 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block">Featured Guide</span>
            <h2 class="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">Electricity Saving Tips</h2>
            <p class="text-blue-100 text-lg max-w-xl">Small changes lead to significant savings. Follow our curated expert tips to reduce your monthly energy bill by up to 30%.</p>
            </div>
            <div class="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden shadow-2xl z-10 border-4 border-white/10">
            <img class="w-full h-full object-cover" data-alt="modern eco-friendly home exterior at twilight with warm led lighting highlighting clean architectural lines" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZFgLcl9H7PcbeTbQPsVOB9HKnAzIjjnnBH2ydXH6TlwOD5MtG5zzHvd93T0REdoJ3Rqvf9A6dS86nFHisPMadLPvXN2NIWLxB-nBbI4iA0lL1LfUV9LdW1P4FCrmJ_BryIfyFxSUyrp6RQ0iICYSVAEO4XwLFXoB4hN7HuRp5q3lXUUnD0qjg0zk5Eh56wOcPU9e620SMEmikZHr5MEh9ggfddF5iBRchRzMf2RESEl-wkpmpzV7T9HxQycwpQYsXEi-_cvaafL8Q"/>
            </div>
            <!-- Decorative background shapes -->
            <div class="absolute -right-20 -top-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply opacity-50 filter blur-3xl"></div>
            <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-800 rounded-full mix-blend-multiply opacity-50 filter blur-3xl"></div>
            </div>
            <!-- Section Title -->
            <div class="flex items-center justify-between mb-8">
            <div>
            <h3 class="text-2xl font-bold text-slate-900 tracking-tight">Expert Electricity Tips</h3>
            <p class="text-slate-500">Expert-verified ways to lower your carbon footprint and costs.</p>
            </div>
            <div class="flex gap-2">
            <button class="p-2 border border-slate-200 rounded hover:bg-slate-50 transition-colors">
            <span class="material-symbols-outlined text-slate-600">filter_list</span>
            </button>
            <button class="p-2 border border-slate-200 rounded hover:bg-slate-50 transition-colors">
            <span class="material-symbols-outlined text-slate-600">sort</span>
            </button>
            </div>
            </div>
            <!-- Tips Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Tip 1 -->
            <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative"><div class="absolute top-4 right-4 flex items-center">
            <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
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
            </div>
                 <!-- Quick Action Card -->
            <div class="mt-12 bg-slate-900 rounded-xl p-10 text-center relative overflow-hidden">
            <h3 class="text-2xl font-bold text-white mb-4 relative z-10">Ready for a full home energy audit?</h3>
            <p class="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10">Connect your smart meter for real-time analysis and a comprehensive breakdown of your home's energy performance.</p>
            <div class="flex flex-wrap justify-center gap-4 relative z-10">
            <button class="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-500 transition-colors flex items-center gap-2">
            <span class="material-symbols-outlined">bolt</span>
                Connect My Meter
                </button>
            <button class="bg-transparent border border-slate-700 text-white font-bold py-3 px-8 rounded-md hover:bg-slate-800 transition-colors">
                Learn More
                </button>
            </div>
            <!-- Background texture -->
            <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2CXUPLXLRLvThx40-d0ksSlC9FkGC5MAkEj5B1zg_P0KYRtfBzMiKkWl1O0MevK0akfdKqn1rzBtvUAfQQTnrqTPvxtX_mrJlYarKND_iaIAQ2pmJKx4EdrtpvHCjz7qebw26tUA8P8OdVizwP0N2zQ89MLiKAjgEww08lECej7nh18fM4kdN3QijSXP57AwDzbIE2icZLXEjyM9dVO9FdWTspged1oywGOWOjYYPqtNKlC1V4JAVRJ0eajy3xXdEbZ0meCMKLO_M');"></div>
            </div>
            </div>
            
       
</template>









