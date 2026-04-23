<script setup>

const emit= defineEmits(['back'])
tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "inverse-primary": "#19e52d",
                        "error": "#ba1a1a",
                        "surface-container-high": "#e6e8f1",
                        "primary-container": "#008812",
                        "primary": "#006c0c",
                        "surface-container-low": "#f2f3fd",
                        "tertiary": "#924800",
                        "on-primary-fixed": "#002201",
                        "secondary-fixed-dim": "#b3c5ff",
                        "error-container": "#ffdad6",
                        "surface-container-lowest": "#ffffff",
                        "surface": "#f9f9ff",
                        "on-primary-container": "#f8fff0",
                        "secondary-container": "#7fa0fd",
                        "on-secondary-fixed": "#001849",
                        "on-tertiary-container": "#fffbff",
                        "on-tertiary-fixed-variant": "#723700",
                        "surface-dim": "#d8dae3",
                        "outline-variant": "#c1c6d5",
                        "on-error-container": "#93000a",
                        "on-primary-fixed-variant": "#005307",
                        "background": "#f9f9ff",
                        "on-background": "#181c22",
                        "on-tertiary": "#ffffff",
                        "on-secondary": "#ffffff",
                        "tertiary-container": "#b75b00",
                        "surface-container": "#ecedf7",
                        "on-surface-variant": "#414753",
                        "outline": "#717785",
                        "on-primary": "#ffffff",
                        "secondary": "#365ab3",
                        "tertiary-fixed-dim": "#ffb785",
                        "on-secondary-fixed-variant": "#174199",
                        "surface-bright": "#f9f9ff",
                        "primary-fixed-dim": "#19e52d",
                        "on-secondary-container": "#003389",
                        "tertiary-fixed": "#ffdcc6",
                        "secondary-fixed": "#dbe1ff",
                        "inverse-surface": "#2d3038",
                        "on-surface": "#181c22",
                        "on-tertiary-fixed": "#301400",
                        "inverse-on-surface": "#eff0fa",
                        "primary-fixed": "#75ff69",
                        "on-error": "#ffffff",
                        "surface-container-highest": "#e0e2ec",
                        "surface-tint": "#006e0c",
                        "surface-variant": "#e0e2ec"
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
    <!-- Hero Section -->
      <div class="max-w-6xl mx-auto">
        <section class="bg-secondary text-white py-12 px-8 md:px-12 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <span class="material-symbols-outlined text-[240px]" style="font-variation-settings: 'FILL' 1;">wb_sunny</span>
        </div>
        <div class="max-w-5xl relative z-10">
        <nav class="flex items-center gap-2 text-blue-100 text-sm mb-6">
        <a class="hover:underline" href="#">Dashboard</a>
        <span class="material-symbols-outlined text-xs">chevron_right</span>
        <span>Solar Optimization</span>
        </nav>
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Solar Optimization Tips</h1>
        <p class="text-blue-100 text-lg max-w-2xl leading-relaxed">
                            Maximize your renewable energy yield with these expert-vetted maintenance and optimization strategies. Small adjustments can lead to significant increases in annual production.
                        </p>
        <div class="flex flex-wrap gap-4 mt-8">
        <div class="bg-white/10 backdrop-blur-md px-4 py-2 rounded border border-white/20 flex items-center gap-2">
        <span class="material-symbols-outlined text-tertiary-fixed">trending_up</span>
        <span class="text-sm font-medium">Avg. Yield Increase: +12%</span>
        </div>
        <div class="bg-white/10 backdrop-blur-md px-4 py-2 rounded border border-white/20 flex items-center gap-2">
        <span class="material-symbols-outlined text-primary-fixed">eco</span>
        <span class="text-sm font-medium">Eco-Impact Score: 98/100</span>
        </div>
        </div>
        </div>
        </section>
        <!-- Content Grid -->
        <section class="p-8 md:p-12">
        <div class="flex justify-between items-end mb-8">
        <div>
        <h3 class="text-2xl font-bold text-on-background">Recommended Actions</h3>
        <p class="text-on-surface-variant">Personalized steps based on your current setup</p>
        </div>
        <button class="flex items-center gap-2 text-secondary font-semibold hover:underline px-2 py-1">
        <span class="material-symbols-outlined text-sm">tune</span>
                            Adjust Preferences
                        </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <!-- Tip Card 1 -->
        <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all relative flex flex-col group">
        <div class="absolute top-4 right-4">
        <input class="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary" type="checkbox"/>
        </div>
        <div class="mb-6">
        <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-secondary rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined text-3xl">cleaning_services</span>
        </div>
        <h4 class="text-xl font-bold text-on-background mb-2">Panel Cleaning</h4>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-6">
                                    Dust, pollen, and bird droppings can reduce output by up to 25%. Schedule a soft-water wash every 6 months.
                                </p>
        </div>
        <div class="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
        <p class="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Potential Savings</p>
        <p class="text-lg font-extrabold text-on-background">$120<span class="text-sm font-normal text-on-surface-variant">/yr saved</span></p>
        </div>
        </div>
        <!-- Tip Card 2 -->
        <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all relative flex flex-col group">
        <div class="absolute top-4 right-4">
        <input checked="" class="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary" type="checkbox"/>
        </div>
        <div class="mb-6">
        <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-secondary rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined text-3xl">content_cut</span>
        </div>
        <h4 class="text-xl font-bold text-on-background mb-2">Shade Management</h4>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-6">
                                    Trim overhanging branches that may cast shadows during peak sun hours (10 AM - 2 PM).
                                </p>
        </div>
        <div class="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
        <p class="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Potential Savings</p>
        <p class="text-lg font-extrabold text-on-background">$85<span class="text-sm font-normal text-on-surface-variant">/yr saved</span></p>
        </div>
        </div>
        <!-- Tip Card 3 -->
        <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all relative flex flex-col group">
        <div class="absolute top-4 right-4">
        <input class="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary" type="checkbox"/>
        </div>
        <div class="mb-6">
        <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-secondary rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined text-3xl">battery_charging_full</span>
        </div>
        <h4 class="text-xl font-bold text-on-background mb-2">Peak Shaving</h4>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-6">
                                    Run heavy appliances during peak generation hours to reduce grid dependency and maximize self-consumption.
                                </p>
        </div>
        <div class="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
        <p class="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Potential Savings</p>
        <p class="text-lg font-extrabold text-on-background">$240<span class="text-sm font-normal text-on-surface-variant">/yr saved</span></p>
        </div>
        </div>
        <!-- Tip Card 4 -->
        <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all relative flex flex-col group">
        <div class="absolute top-4 right-4">
        <input class="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary" type="checkbox"/>
        </div>
        <div class="mb-6">
        <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-secondary rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined text-3xl">router</span>
        </div>
        <h4 class="text-xl font-bold text-on-background mb-2">Inverter Update</h4>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-6">
                                    Ensure your inverter firmware is up to date to access better MPPT algorithms and efficiency improvements.
                                </p>
        </div>
        <div class="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
        <p class="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Potential Savings</p>
        <p class="text-lg font-extrabold text-on-background">$45<span class="text-sm font-normal text-on-surface-variant">/yr saved</span></p>
        </div>
        </div>
        <!-- Tip Card 5 -->
        <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all relative flex flex-col group">
        <div class="absolute top-4 right-4">
        <input class="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary" type="checkbox"/>
        </div>
        <div class="mb-6">
        <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-secondary rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined text-3xl">nest_thermostat</span>
        </div>
        <h4 class="text-xl font-bold text-on-background mb-2">Smart Export</h4>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-6">
                                    Install a smart controller to export excess energy when grid prices are highest (if your utility plan allows).
                                </p>
        </div>
        <div class="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
        <p class="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Potential Savings</p>
        <p class="text-lg font-extrabold text-on-background">$310<span class="text-sm font-normal text-on-surface-variant">/yr saved</span></p>
        </div>
        </div>
        <!-- Tip Card 6 -->
        <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all relative flex flex-col group">
        <div class="absolute top-4 right-4">
        <input checked="" class="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary" type="checkbox"/>
        </div>
        <div class="mb-6">
        <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-secondary rounded flex items-center justify-center mb-4">
        <span class="material-symbols-outlined text-3xl">monitoring</span>
        </div>
        <h4 class="text-xl font-bold text-on-background mb-2">Daily Monitoring</h4>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-6">
                                    Review your app weekly to spot unusual dips in production that could indicate a technical fault.
                                </p>
        </div>
        <div class="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
        <p class="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Potential Savings</p>
        <p class="text-lg font-extrabold text-on-background">$155<span class="text-sm font-normal text-on-surface-variant">/yr saved</span></p>
        </div>
        </div>
        </div>
        <!-- Bento/Detail Section -->
        <div class="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden group">
        <div class="absolute inset-0 z-0 opacity-40">
        <img alt="Solar efficiency" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="vibrant blue solar panels reflecting a clear sky at dusk with sharp metallic details and futuristic feel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvRSoAc4F1R-URJOzVcJ-VsV3CBkuPQPwyiJYoiWgI-kCwPW4JcAq6DEHEohF9wLry5qooFgWA9g3xRSxPVmadCEbonX9lE6UxJiUk5q4xcWiE9U0NNezoJS10ehntm7ehbgjLvys4-ruZZ0NnfCemM562z4dOOpPeSw0p1bStYT98s838ngWMyu5The3XMC7vZHprO6tRD7Tf0LBU4zY1_wyMrOi5ZKsx3H3DcNTsixb9sEOU-co5MKfRGhCEYqMY08cfD7IP3M2p"/>
        </div>
        <div class="relative z-10">
        <span class="px-3 py-1 bg-tertiary text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Premium Insight</span>
        <h2 class="text-3xl font-bold mt-4 mb-4">Seasonal Tilt Adjustment</h2>
        <p class="text-slate-300 max-w-lg mb-6">Adjusting your panel angle four times a year can increase overall energy production by up to 10% compared to a fixed mount system.</p>
        <button class="bg-primary hover:bg-primary-container text-white px-6 py-2.5 rounded font-bold transition-colors">Calculate My Angle</button>
        </div>
        </div>
        <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center">
        <h3 class="text-xl font-bold mb-4">Total Efficiency Gain</h3>
        <div class="text-5xl font-black text-secondary mb-2">+1,240<span class="text-xl font-medium">kWh</span></div>
        <p class="text-on-surface-variant text-sm leading-relaxed">By implementing all checked tips above, you can increase your yearly output significantly.</p>
        <div class="mt-6 flex items-center gap-3">
        <div class="flex -space-x-2">
        <div class="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">JD</div>
        <div class="w-8 h-8 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-[10px] font-bold">MK</div>
        <div class="w-8 h-8 rounded-full border-2 border-white bg-slate-400 flex items-center justify-center text-[10px] font-bold">AL</div>
        </div>
        <span class="text-xs text-on-surface-variant font-medium">Join 4k others this month</span>
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
        <!-- BottomNavBar (Mobile Only) -->
        <nav class="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around z-50">
        <button class="flex flex-col items-center gap-1 text-slate-400">
        <span class="material-symbols-outlined">home</span>
        <span class="text-[10px]">Home</span>
        </button>
        <button class="flex flex-col items-center gap-1 text-blue-700">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">solar_power</span>
        <span class="text-[10px]">Solar</span>
        </button>
        <button class="flex flex-col items-center gap-1 text-slate-400">
        <span class="material-symbols-outlined">analytics</span>
        <span class="text-[10px]">Data</span>
        </button>
        <button class="flex flex-col items-center gap-1 text-slate-400">
        <span class="material-symbols-outlined">person</span>
        <span class="text-[10px]">Profile</span>
        </button>
        </nav>

    </div>
</div>
</template>