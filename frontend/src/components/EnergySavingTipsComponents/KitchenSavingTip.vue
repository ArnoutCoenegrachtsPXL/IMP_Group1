<script setup>

const emit= defineEmits(['back'])

 tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-primary-container": "#f8fff0",
                        "tertiary-fixed": "#ffdcc6",
                        "secondary-fixed-dim": "#b3c5ff",
                        "on-primary-fixed": "#002201",
                        "on-background": "#181c22",
                        "secondary": "#365ab3",
                        "primary": "#006c0c",
                        "on-primary-fixed-variant": "#005307",
                        "background": "#f9f9ff",
                        "primary-container": "#008812",
                        "surface-dim": "#d8dae3",
                        "surface-container-low": "#f2f3fd",
                        "surface": "#f9f9ff",
                        "on-tertiary": "#ffffff",
                        "error": "#ba1a1a",
                        "outline": "#717785",
                        "on-secondary-fixed": "#001849",
                        "tertiary": "#924800",
                        "tertiary-fixed-dim": "#ffb785",
                        "tertiary-container": "#b75b00",
                        "on-secondary-fixed-variant": "#174199",
                        "surface-container": "#ecedf7",
                        "primary-fixed-dim": "#19e52d",
                        "on-surface-variant": "#414753",
                        "on-tertiary-fixed-variant": "#723700",
                        "surface-bright": "#f9f9ff",
                        "on-error-container": "#93000a",
                        "on-secondary": "#ffffff",
                        "secondary-fixed": "#dbe1ff",
                        "on-secondary-container": "#003389",
                        "surface-container-highest": "#e0e2ec",
                        "on-tertiary-fixed": "#301400",
                        "surface-tint": "#006e0c",
                        "on-tertiary-container": "#fffbff",
                        "error-container": "#ffdad6",
                        "surface-container-lowest": "#ffffff",
                        "primary-fixed": "#75ff69",
                        "secondary-container": "#7fa0fd",
                        "inverse-on-surface": "#eff0fa",
                        "inverse-surface": "#2d3038",
                        "outline-variant": "#c1c6d5",
                        "on-surface": "#181c22",
                        "on-error": "#ffffff",
                        "inverse-primary": "#19e52d",
                        "surface-variant": "#e0e2ec",
                        "on-primary": "#ffffff",
                        "surface-container-high": "#e6e8f1"
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
                }
            }
        }


</script>
<template>

  <button @click="emit('back')" class="mb-6 flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-700">
  ← Back to All Tips
    </button>
        <!-- Hero Section -->
        <section class="relative h-64 flex items-center px-8 md:px-12 bg-secondary overflow-hidden">
        <div class="absolute inset-0 z-0">
        <img alt="Kitchen Hero" class="w-full h-full object-cover mix-blend-overlay opacity-30 grayscale" data-alt="Modern professional kitchen with stainless steel appliances and clean minimalist design under bright soft studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwPOESxu-cvU21VT7I62P9OO1mf5H6wpoiU0kGR2K6cdvLDhKAVVpi9iy89z8RkZDf7rYfBFA9OZnTNvG3dKcxFsG5rVaesO7ROV2HN-M95i3-xidFxBzYtbvhI8UYcpnSZWp3trkhkPhIM9vDzXTl3JMWb9TilsHyiSgz1cBX5QSgeoFHkfgWBipOrvFGwqFrOMqKd7DJ8UOGq1hInCGyCIv3jOoDa18PyoV3NftVj7beUDUNAWl0QsYOOWpbnlEYEyRn-ij9lgTn"/>
        </div>
        <div class="relative z-10 max-w-2xl">
             <span class="bg-blue-500/30 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block">Featured Guide</span>
        <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-3">Kitchen Energy Tips</h1>
        <p class="text-blue-100 text-lg md:text-xl font-medium">Smart strategies for a more efficient kitchen and lower monthly bills.</p>
        </div>
        </section>
        <!-- Tip Grid Section -->
        <section class="p-8 md:p-12">
        <div class="flex justify-between items-end mb-8">
        <div>
        <h2 class="text-2xl font-bold text-on-surface">Tips to Reduce Kitchen Energy Consumption</h2>
        <p class="text-on-surface-variant">Track your progress toward a net-zero kitchen.</p>
        </div>
        <div class="bg-secondary-container/20 px-4 py-2 rounded-xl border border-secondary-container/30">
        <span class="text-secondary font-bold">4 of 12</span>
        <span class="text-on-surface-variant text-sm ml-1">Tips Implemented</span>
        </div>
        </div>
        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Tip Card 1 -->
        <div class="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-outline-variant hover:shadow-md transition-shadow flex flex-col h-full group">
        <div class="flex justify-between items-start mb-4">
        <div class="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined" data-icon="dishwasher">dishwasher</span>
        </div>
        <input checked="" class="w-6 h-6 rounded border-outline text-secondary focus:ring-secondary cursor-pointer" type="checkbox"/>
        </div>
        <h3 class="text-lg font-bold text-on-surface mb-2">Full Dishwasher Loads</h3>
        <p class="text-on-surface-variant text-sm flex-grow">Wait until the dishwasher is completely full before running a cycle to maximize water and energy efficiency per dish.</p>
        <div class="mt-4 pt-4 border-t border-outline-variant flex items-center text-primary font-bold text-xs tracking-wider uppercase">
        <span class="material-symbols-outlined text-sm mr-1" data-icon="savings">savings</span>
                                    SAVE $45/yr
                                </div>
        </div>
        <!-- Tip Card 2 -->
        <div class="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-outline-variant hover:shadow-md transition-shadow flex flex-col h-full group">
        <div class="flex justify-between items-start mb-4">
        <div class="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined" data-icon="kitchen">kitchen</span>
        </div>
        <input class="w-6 h-6 rounded border-outline text-secondary focus:ring-secondary cursor-pointer" type="checkbox"/>
        </div>
        <h3 class="text-lg font-bold text-on-surface mb-2">Refrigerator Maintenance</h3>
        <p class="text-on-surface-variant text-sm flex-grow">Clean condenser coils every six months and ensure door seals are airtight to prevent cold air leakage and motor overwork.</p>
        <div class="mt-4 pt-4 border-t border-outline-variant flex items-center text-primary font-bold text-xs tracking-wider uppercase">
        <span class="material-symbols-outlined text-sm mr-1" data-icon="savings">savings</span>
                                    SAVE $30/yr
                                </div>
        </div>
        <!-- Tip Card 3 -->
        <div class="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-outline-variant hover:shadow-md transition-shadow flex flex-col h-full group">
        <div class="flex justify-between items-start mb-4">
        <div class="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined" data-icon="cooking">cooking</span>
        </div>
        <input class="w-6 h-6 rounded border-outline text-secondary focus:ring-secondary cursor-pointer" type="checkbox"/>
        </div>
        <h3 class="text-lg font-bold text-on-surface mb-2">Efficient Cooking Habits</h3>
        <p class="text-on-surface-variant text-sm flex-grow">Use lids on pots to retain heat, match pan size to burner size, and utilize smaller appliances like air fryers when possible.</p>
        <div class="mt-4 pt-4 border-t border-outline-variant flex items-center text-primary font-bold text-xs tracking-wider uppercase">
        <span class="material-symbols-outlined text-sm mr-1" data-icon="savings">savings</span>
                                    SAVE $25/yr
                                </div>
        </div>
        <!-- Tip Card 4 -->
        <div class="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-outline-variant hover:shadow-md transition-shadow flex flex-col h-full group">
        <div class="flex justify-between items-start mb-4">
        <div class="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined" data-icon="thaw">severe_cold</span>
        </div>
        <input checked="" class="w-6 h-6 rounded border-outline text-secondary focus:ring-secondary cursor-pointer" type="checkbox"/>
        </div>
        <h3 class="text-lg font-bold text-on-surface mb-2">Smart Thawing</h3>
        <p class="text-on-surface-variant text-sm flex-grow">Thaw frozen foods in the refrigerator rather than using the microwave or running water. It helps cool the fridge while saving energy.</p>
        <div class="mt-4 pt-4 border-t border-outline-variant flex items-center text-primary font-bold text-xs tracking-wider uppercase">
        <span class="material-symbols-outlined text-sm mr-1" data-icon="savings">savings</span>
                                    SAVE $15/yr
                                </div>
        </div>
        <!-- Tip Card 5 -->
        <div class="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-outline-variant hover:shadow-md transition-shadow flex flex-col h-full group">
        <div class="flex justify-between items-start mb-4">
        <div class="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined" data-icon="oven_gen">oven_gen</span>
        </div>
        <input class="w-6 h-6 rounded border-outline text-secondary focus:ring-secondary cursor-pointer" type="checkbox"/>
        </div>
        <h3 class="text-lg font-bold text-on-surface mb-2">Convection Cooking</h3>
        <p class="text-on-surface-variant text-sm flex-grow">Use the convection setting on your oven to circulate hot air, allowing for lower temperatures and faster cooking times.</p>
        <div class="mt-4 pt-4 border-t border-outline-variant flex items-center text-primary font-bold text-xs tracking-wider uppercase">
        <span class="material-symbols-outlined text-sm mr-1" data-icon="savings">savings</span>
                                    SAVE $35/yr
                                </div>
        </div>
        <!-- Tip Card 6 -->
        <div class="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-outline-variant hover:shadow-md transition-shadow flex flex-col h-full group">
        <div class="flex justify-between items-start mb-4">
        <div class="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
        <span class="material-symbols-outlined" data-icon="faucet">faucet</span>
        </div>
        <input checked="" class="w-6 h-6 rounded border-outline text-secondary focus:ring-secondary cursor-pointer" type="checkbox"/>
        </div>
        <h3 class="text-lg font-bold text-on-surface mb-2">Low-Flow Aerators</h3>
        <p class="text-on-surface-variant text-sm flex-grow">Install high-efficiency aerators on your kitchen faucet to reduce hot water consumption without sacrificing water pressure.</p>
        <div class="mt-4 pt-4 border-t border-outline-variant flex items-center text-primary font-bold text-xs tracking-wider uppercase">
        <span class="material-symbols-outlined text-sm mr-1" data-icon="savings">savings</span>
                                    SAVE $20/yr
                                </div>
        </div>
        </div>
        </section>
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

        <!-- Bottom Savings Summary Footer for Content Area -->
        <section class="p-8 md:p-12 bg-surface-container-low border-t border-outline-variant">
        <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-6">
        <div class="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center">
        <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">eco</span>
        </div>
        <div>
        <h4 class="text-xl font-bold text-on-surface">Your Estimated Savings</h4>
        <p class="text-on-surface-variant">Based on currently implemented kitchen tips</p>
        </div>
        </div>
        <div class="text-center md:text-right">
        <span class="block text-4xl font-black text-secondary">$80<span class="text-lg font-medium text-on-surface-variant">/year</span></span>
        <p class="text-sm text-primary font-semibold mt-1">12% CO2 Reduction</p>
        </div>
        </div>
        </section>



</template>