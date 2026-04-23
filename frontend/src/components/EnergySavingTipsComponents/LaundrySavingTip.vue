<script setup>

    const emit= defineEmits(['back'])

 tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "primary-container": "#008812",
                    "surface-container-highest": "#e0e2ec",
                    "primary": "#006c0c",
                    "primary-fixed-dim": "#19e52d",
                    "on-primary-fixed": "#002201",
                    "tertiary-fixed-dim": "#ffb785",
                    "surface-bright": "#f9f9ff",
                    "primary-fixed": "#75ff69",
                    "secondary-container": "#7fa0fd",
                    "surface-tint": "#006e0c",
                    "on-primary-fixed-variant": "#005307",
                    "secondary-fixed-dim": "#b3c5ff",
                    "on-surface": "#181c22",
                    "secondary-fixed": "#dbe1ff",
                    "tertiary": "#924800",
                    "outline": "#717785",
                    "outline-variant": "#c1c6d5",
                    "on-error": "#ffffff",
                    "on-primary": "#ffffff",
                    "on-tertiary-fixed-variant": "#723700",
                    "on-background": "#181c22",
                    "secondary": "#365ab3",
                    "inverse-primary": "#19e52d",
                    "inverse-on-surface": "#eff0fa",
                    "surface-container": "#ecedf7",
                    "surface-container-high": "#e6e8f1",
                    "on-tertiary": "#ffffff",
                    "on-tertiary-fixed": "#301400",
                    "on-surface-variant": "#414753",
                    "surface-container-low": "#f2f3fd",
                    "on-secondary-fixed": "#001849",
                    "inverse-surface": "#2d3038",
                    "surface": "#f9f9ff",
                    "on-primary-container": "#f8fff0",
                    "on-error-container": "#93000a",
                    "error-container": "#ffdad6",
                    "on-tertiary-container": "#fffbff",
                    "on-secondary-fixed-variant": "#174199",
                    "error": "#ba1a1a",
                    "tertiary-container": "#b75b00",
                    "surface-variant": "#e0e2ec",
                    "on-secondary": "#ffffff",
                    "tertiary-fixed": "#ffdcc6",
                    "on-secondary-container": "#003389",
                    "background": "#f9f9ff",
                    "surface-dim": "#d8dae3",
                    "surface-container-lowest": "#ffffff"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "fontFamily": {
                    "headline": ["Inter"],
                    "display": ["Inter"],
                    "body": ["Inter"],
                    "label": ["Inter"]
            }
          },
        },
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
        <span class="bg-blue-400/30 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block">Sustainable Laundry Guide</span>
        <h1 class="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">Laundry Saving Tips</h1>
        <p class="text-blue-100 text-lg max-w-xl">Optimize your laundry routine to save energy, reduce utility bills, and extend the life of your garments while minimizing your environmental footprint.</p>
        </div>
        <div class="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden shadow-2xl z-10 border-4 border-white/10">
        <img alt="Fresh clean laundry in a modern energy efficient setting" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD829ry3HLR4F5GJCgpDHZ52azHmMu_DcLKwzB0PPUi4-RX7yonC_SMPj7oD6gQT41RpL7_LsbPCHPtWiGDlINPuQpH22hfvJk85g0YGV8BHKu2E5-6AO_NhurRCMKn_w3awmWikXRo1pwc44XytlMudzs_OPyr0Uozfs4VAcDBDzsM8ivpFpLAays0PxYwUJH8jeVmBXbsxJSRbW3DiUlPSz2FFHCJjLtjanHsUhOxrgyPu3MJn0Iy-Lvao_UmxNgUHfG8Nr6aTLP2"/>
        </div>
        <!-- Decorative background shapes -->
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply opacity-50 filter blur-3xl"></div>
        <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-800 rounded-full mix-blend-multiply opacity-50 filter blur-3xl"></div>
        </div>
        <!-- Section Title -->
                    <div class="flex items-center justify-between mb-8">
                    <div>
                    <h3 class="text-2xl font-bold text-slate-900 tracking-tight">Expert Laundry Tips</h3>
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
        <!-- Uniform Grid of Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Tip Card 1: Cold Water -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="bg-blue-50 p-3 rounded-xl text-blue-700">
        <span class="material-symbols-outlined text-3xl" data-icon="ac_unit">ac_unit</span>
        </div>
        <input class="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <h3 class="text-xl font-bold mb-3">Wash in Cold Water</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                About 90% of energy used by washers goes to heating water. Use cold water for most loads to significantly cut energy use.
                            </p>
        <div class="pt-4 border-t border-slate-100 mt-auto">
        <div class="flex items-center gap-2 text-blue-700 font-bold text-sm tracking-wide">
       
            <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
            <span class="text-blue-700 font-bold">$40/yr saved</span>
        </div>
        </div>
        </div>
        <!-- Tip Card 2: Lint Filter -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="bg-blue-50 p-3 rounded-xl text-blue-700">
        <span class="material-symbols-outlined text-3xl" data-icon="filter_alt">filter_alt</span>
        </div>
        <input class="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <h3 class="text-xl font-bold mb-3">Clean Lint Filter</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                A clogged filter restricts airflow and forces your dryer to work harder. Clean it after every single load for efficiency.
                            </p>
        <div class="pt-4 border-t border-slate-100 mt-auto">
        <div class="flex items-center gap-2 text-blue-700 font-bold text-sm tracking-wide">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span> $25/yr saved</span>
        </div>
        </div>
        </div>
        <!-- Tip Card 3: Dryer Balls -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="bg-blue-50 p-3 rounded-xl text-blue-700">
        <span class="material-symbols-outlined text-3xl" data-icon="sports_baseball">sports_baseball</span>
        </div>
        <input class="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <h3 class="text-xl font-bold mb-3">Use Dryer Balls</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                Wool or rubber dryer balls separate clothes, allowing hot air to circulate better and reducing drying time by up to 25%.
                            </p>
        <div class="pt-4 border-t border-slate-100 mt-auto">
        <div class="flex items-center gap-2 text-blue-700 font-bold text-sm tracking-wide">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span> $30/yr saved</span>
        </div>
        </div>
        </div>
        <!-- Tip Card 4: Full Loads -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="bg-blue-50 p-3 rounded-xl text-blue-700">
        <span class="material-symbols-outlined text-3xl" data-icon="inventory_2">inventory_2</span>
        </div>
        <input class="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <h3 class="text-xl font-bold mb-3">Run Full Loads Only</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                Washers and dryers use similar amounts of energy regardless of load size. Wait for a full drum to maximize efficiency.
                            </p>
        <div class="pt-4 border-t border-slate-100 mt-auto">
        <div class="flex items-center gap-2 text-blue-700 font-bold text-sm tracking-wide">
       <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span> $15/yr saved</span>
        </div>
        </div>
        </div>
        <!-- Tip Card 5: Air Drying -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="bg-blue-50 p-3 rounded-xl text-blue-700">
        <span class="material-symbols-outlined text-3xl" data-icon="air">air</span>
        </div>
        <input class="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <h3 class="text-xl font-bold mb-3">Air Dry Clothes</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                The most energy-efficient dryer is the sun. Use a clothesline or drying rack whenever possible to eliminate dryer costs.
                            </p>
        <div class="pt-4 border-t border-slate-100 mt-auto">
        <div class="flex items-center gap-2 text-blue-700 font-bold text-sm tracking-wide">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span> $80/yr saved</span>
        </div>
        </div>
        </div>
        <!-- Tip Card 6: Moisture Sensor -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="bg-blue-50 p-3 rounded-xl text-blue-700">
        <span class="material-symbols-outlined text-3xl" data-icon="sensors">sensors</span>
        </div>
        <input class="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox"/>
        </div>
        <h3 class="text-xl font-bold mb-3">Use Sensor Drying</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                Use the "auto-dry" setting instead of timed drying. Sensors detect moisture and stop the cycle as soon as clothes are dry.
                            </p>
        <div class="pt-4 border-t border-slate-100 mt-auto">
        <div class="flex items-center gap-2 text-blue-700 font-bold text-sm tracking-wide">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span> $20/yr saved</span>
        </div>
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
        </div>
   </div>
</template>