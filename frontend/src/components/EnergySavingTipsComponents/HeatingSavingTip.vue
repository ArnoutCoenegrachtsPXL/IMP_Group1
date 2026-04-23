<script setup>
    const emit= defineEmits(['back'])

tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary": "#1978e5",
                        "surface-bright": "#f9f9ff",
                        "on-primary": "#ffffff",
                        "secondary": "#365ab3",
                        "on-surface-variant": "#414753",
                        "outline": "#717785",
                        "surface-container": "#ecedf7",
                        "surface-variant": "#e0e2ec",
                        "on-surface": "#181c22",
                        "surface": "#f9f9ff",
                        "surface-container-lowest": "#ffffff",
                        "surface-container-low": "#f2f3fd",
                        "background": "#f9f9ff",
                        "on-background": "#181c22",
                        "outline-variant": "#c1c6d5"
                    },
                    "borderRadius": {
                        "DEFAULT": "4px",
                        "lg": "4px",
                        "xl": "8px",
                        "full": "9999px"
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
            <div class="mb-10 relative overflow-hidden rounded-xl bg-[#1978e5] p-8 lg:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 z-10">
            <span class="bg-blue-400/30 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block">Winter Efficiency Guide</span>
            <h2 class="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">Heating Efficiency Tips</h2>
            <p class="text-blue-100 text-lg max-w-xl">Maximize your comfort while minimizing your environmental footprint and utility costs this season.</p>
            </div>
            <div class="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden shadow-2xl z-10 border-4 border-white/10">
            <img class="w-full h-full object-cover" data-alt="abstract warm orange and blue gradients flowing smoothly like heat waves in a clean modern style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2snNiiKqA0Tu8hQZlHUbRMWbKthlJhoAr4Rz8L7L-2a2ml6V025ji7iEXFCv-JBtJiKhRJIQ9R1BeHTy7IK0AsnHrPdfHxN57rI9USdBqShJgUbV4GiaU1PCHYJXwB2GPQGWVIa1eZOrfJztFX_E5raXvIeTwr0xzq2SknYo9yK0roi7yE2I_jYf-N50LmqV7sqePh61Mn6EMYIooIIrf8FVJh_drRRnh94VMavVLE78MDwRGh8OeJerF1mo7Zd6PbSw0oIv1Q2Mb"/>
            </div>
            <!-- Decorative background shapes -->
            <div class="absolute -right-20 -top-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply opacity-50 filter blur-3xl"></div>
            <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-800 rounded-full mix-blend-multiply opacity-50 filter blur-3xl"></div>
            </div>
            <!-- Section Title -->
            <div class="flex items-center justify-between mb-8">
            <div>
            <h3 class="text-2xl font-bold text-slate-900 tracking-tight">Expert Heating Tips</h3>
            <p class="text-slate-500">Curated ways to keep your home warm and your bills low.</p>
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
            <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
            <div class="absolute top-4 right-4 flex items-center">
            <input class="h-5 w-5 rounded border-slate-300 text-[#1978e5] focus:ring-[#1978e5] cursor-pointer" type="checkbox"/>
            </div>
            <div class="w-12 h-12 bg-blue-50 text-[#1978e5] rounded flex items-center justify-center mb-4">
            <span class="material-symbols-outlined">nest_thermostat_gen_3</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-2">Smart Thermostat</h4>
            <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Automate your home's temperature based on your schedule to avoid heating an empty house.</p>
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
            <span class="text-[#1978e5] font-bold">$180/yr saved</span>
            </div>
            </div>
            <!-- Tip 2 -->
            <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
            <div class="absolute top-4 right-4 flex items-center">
            <input class="h-5 w-5 rounded border-slate-300 text-[#1978e5] focus:ring-[#1978e5] cursor-pointer" type="checkbox"/>
            </div>
            <div class="w-12 h-12 bg-green-50 text-green-600 rounded flex items-center justify-center mb-4">
            <span class="material-symbols-outlined">air</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-2">Seal Air Leaks</h4>
            <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Seal leaks around windows and doors with weatherstripping to keep warm air from escaping.</p>
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
            <span class="text-[#1978e5] font-bold">$110/yr saved</span>
            </div>
            </div>
            <!-- Tip 3 -->
            <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
            <div class="absolute top-4 right-4 flex items-center">
            <input class="h-5 w-5 rounded border-slate-300 text-[#1978e5] focus:ring-[#1978e5] cursor-pointer" type="checkbox"/>
            </div>
            <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded flex items-center justify-center mb-4">
            <span class="material-symbols-outlined">wb_sunny</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-2">Harness Sunlight</h4>
            <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Open south-facing curtains during the day to let the sun naturally heat your living spaces.</p>
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
            <span class="text-[#1978e5] font-bold">$45/yr saved</span>
            </div>
            </div>
            <!-- Tip 4 -->
            <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
            <div class="absolute top-4 right-4 flex items-center">
            <input class="h-5 w-5 rounded border-slate-300 text-[#1978e5] focus:ring-[#1978e5] cursor-pointer" type="checkbox"/>
            </div>
            <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded flex items-center justify-center mb-4">
            <span class="material-symbols-outlined">build</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-2">Filter Maintenance</h4>
            <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Replace furnace filters monthly. Clean systems run more efficiently and consume less fuel.</p>
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
            <span class="text-[#1978e5] font-bold">$60/yr saved</span>
            </div>
            </div>
            <!-- Tip 5 -->
            <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
            <div class="absolute top-4 right-4 flex items-center">
            <input class="h-5 w-5 rounded border-slate-300 text-[#1978e5] focus:ring-[#1978e5] cursor-pointer" type="checkbox"/>
            </div>
            <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded flex items-center justify-center mb-4">
            <span class="material-symbols-outlined">checkroom</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-2">Layer Up</h4>
            <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Lower the thermostat by 2 degrees and wear a sweater. It significantly reduces heating load.</p>
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
            <span class="text-[#1978e5] font-bold">$95/yr saved</span>
            </div>
            </div>
            <!-- Tip 6 -->
            <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
            <div class="absolute top-4 right-4 flex items-center">
            <input class="h-5 w-5 rounded border-slate-300 text-[#1978e5] focus:ring-[#1978e5] cursor-pointer" type="checkbox"/>
            </div>
            <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded flex items-center justify-center mb-4">
            <span class="material-symbols-outlined">settings_suggest</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-2">Water Heater Temp</h4>
            <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Lower your water heater setting to 120°F (49°C) to prevent standby heat loss.</p>
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
            <span class="text-[#1978e5] font-bold">$30/yr saved</span>
            </div>
            </div>
            <!-- Tip 7 -->
            <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
            <div class="absolute top-4 right-4 flex items-center">
            <input class="h-5 w-5 rounded border-slate-300 text-[#1978e5] focus:ring-[#1978e5] cursor-pointer" type="checkbox"/>
            </div>
            <div class="w-12 h-12 bg-cyan-50 text-cyan-600 rounded flex items-center justify-center mb-4"><span class="material-symbols-outlined">mode_fan</span></div>
            <h4 class="font-bold text-slate-900 mb-2">Reverse Fans</h4>
            <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Run ceiling fans in reverse (clockwise) at low speed to push warm air back down.</p>
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
            <span class="text-[#1978e5] font-bold">$15/yr saved</span>
            </div>
            </div>
            <!-- Tip 8 -->
            <div class="bg-white border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow relative rounded">
            <div class="absolute top-4 right-4 flex items-center">
            <input class="h-5 w-5 rounded border-slate-300 text-[#1978e5] focus:ring-[#1978e5] cursor-pointer" type="checkbox"/>
            </div>
            <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded flex items-center justify-center mb-4">
            <span class="material-symbols-outlined">blanket</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-2">Insulate Attic</h4>
            <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">Adding proper insulation to your attic can prevent massive heat loss through the roof.</p>
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
            <span class="text-[#1978e5] font-bold">$220/yr saved</span>
            </div>
            </div>
            </div>
            <!-- Call to Action Footer -->
            <div class="mt-12 bg-slate-900 rounded-xl p-10 text-center relative overflow-hidden">
            <h3 class="text-2xl font-bold text-white mb-4 relative z-10">Ready for a full home energy audit?</h3>
            <p class="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10">Connect your smart meter for real-time analysis and a comprehensive breakdown of your home's energy performance.</p>
            <div class="flex flex-wrap justify-center gap-4 relative z-10">
            <button class="bg-[#1978e5] text-white font-bold py-3 px-8 rounded hover:bg-blue-600 transition-colors flex items-center gap-2">
            <span class="material-symbols-outlined">bolt</span>
                                        Connect My Meter
                                    </button>
            <button class="bg-transparent border border-slate-700 text-white font-bold py-3 px-8 rounded hover:bg-slate-800 transition-colors">
                                        Learn More
                                    </button>
            </div>
            <!-- Background texture -->
            <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2CXUPLXLRLvThx40-d0ksSlC9FkGC5MAkEj5B1zg_P0KYRtfBzMiKkWl1O0MevK0akfdKqn1rzBtvUAfQQTnrqTPvxtX_mrJlYarKND_iaIAQ2pmJKx4EdrtpvHCjz7qebw26tUA8P8OdVizwP0N2zQ89MLiKAjgEww08lECej7nh18fM4kdN3QijSXP57AwDzbIE2icZLXEjyM9dVO9FdWTspged1oywGOWOjYYPqtNKlC1V4JAVRJ0eajy3xXdEbZ0meCMKLO_M');"></div>
            </div>
            </div>
    

</template>