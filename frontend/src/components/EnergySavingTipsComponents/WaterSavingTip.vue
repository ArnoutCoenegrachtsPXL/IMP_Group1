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

        <!-- Hero Section -->
        <div class="bg-hero-pattern text-white px-8 py-16 md:py-24 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
        <img class="w-full h-full object-cover" data-alt="abstract close-up of water droplets on a blue surface with elegant lighting and soft bokeh effects" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpBtkfmSaARmg-sBOTD6qVlu6062LiHHzRFi1bpC_C4kLgUbjyl_fY1IjjR-VI8L79hKdfWFcg8n4zgnmFALkE6nJXj0nbBNnOC_wB_QSz0IfBdUruDd1QlIUN0uZ9qkFjFN3evEO496ihHDViazgVHLK-9UD_frPKAJOcNJ7QzXsYZ-XRmNPgqdt6083DXeiDjIaZfQ65X7AGvp7t3Ht5rejIgwsLeVmymnwi4Bu5S9s0d5Vti5If5RVVh_FpFkftPoXkVncUYbjp"/>
        </div>
        <div class="relative z-10 max-w-5xl">
        <span class="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">Water Sustainability</span>
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Water Conservation Tips</h1>
        <p class="text-lg md:text-xl text-blue-50/90 max-w-2xl font-light leading-relaxed">
                                Optimize your household water usage with these practical, high-impact strategies designed to reduce waste and lower your utility bills.
                            </p>
        </div>
        </div>
      <!-- Section Title -->
            <div class="flex items-center justify-between mb-8">
            <div>
            <h3 class="text-2xl font-bold text-slate-900 tracking-tight">Expert Water Saving Tips</h3>
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
       
        <!-- Tip Card 1 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-slate-100 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="p-3 bg-blue-50 text-blue-700 rounded">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">shower</span>
        </div>
        <input class="w-5 h-5 rounded text-blue-700 border-slate-300 focus:ring-blue-500" type="checkbox"/>
        </div>
        <h3 class="text-lg font-bold text-on-background mb-2">Low-Flow Showerheads</h3>
        <p class="text-on-surface-variant text-sm mb-6 flex-grow leading-relaxed">
                                    Replace standard showerheads with high-efficiency models to reduce flow rates from 2.5 gpm to 1.5 gpm or less without losing pressure.
                                </p>
        <div class="pt-4 border-t border-slate-50">
            <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-xs font-black text-blue-700 uppercase tracking-tighter">$45/yr saved</span>
        </div>
        </div>
        <!-- Tip Card 2 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-slate-100 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="p-3 bg-blue-50 text-blue-700 rounded">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">plumbing</span>
        </div>
        <input class="w-5 h-5 rounded text-blue-700 border-slate-300 focus:ring-blue-500" type="checkbox"/>
        </div>
        <h3 class="text-lg font-bold text-on-background mb-2">Fix Leaks</h3>
        <p class="text-on-surface-variant text-sm mb-6 flex-grow leading-relaxed">
                                    A single leaky faucet dripping one drop per second can waste over 3,000 gallons per year. Check toilets, faucets, and pipe joints regularly.
                                </p>
        <div class="pt-4 border-t border-slate-50">
            <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-xs font-black text-blue-700 uppercase tracking-tighter"> $60/yr saved</span>
        </div>
        </div>
        <!-- Tip Card 3 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-slate-100 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="p-3 bg-blue-50 text-blue-700 rounded">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">laundry</span>
        </div>
        <input class="w-5 h-5 rounded text-blue-700 border-slate-300 focus:ring-blue-500" type="checkbox"/>
        </div>
        <h3 class="text-lg font-bold text-on-background mb-2">Full Load Optimization</h3>
        <p class="text-on-surface-variant text-sm mb-6 flex-grow leading-relaxed">
                                    Wait until you have a full load before running the dishwasher or washing machine. Modern appliances use the same water for partial loads.
                                </p>
        <div class="pt-4 border-t border-slate-50">
            <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-xs font-black text-blue-700 uppercase tracking-tighter"> $30/yr saved</span>
        </div>
        </div>
        <!-- Tip Card 4 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-slate-100 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="p-3 bg-blue-50 text-blue-700 rounded">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">yard</span>
        </div>
        <input class="w-5 h-5 rounded text-blue-700 border-slate-300 focus:ring-blue-500" type="checkbox"/>
        </div>
        <h3 class="text-lg font-bold text-on-background mb-2">Smart Irrigation</h3>
        <p class="text-on-surface-variant text-sm mb-6 flex-grow leading-relaxed">
                                    Water your lawn in the early morning or late evening to prevent evaporation. Install soil moisture sensors to skip unnecessary watering.
                                </p>
        <div class="pt-4 border-t border-slate-50">
            <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-xs font-black text-blue-700 uppercase tracking-tighter"> $120/yr saved</span>
        </div>
        </div>
        <!-- Tip Card 5 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-slate-100 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="p-3 bg-blue-50 text-blue-700 rounded">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">water_voc</span>
        </div>
        <input checked="" class="w-5 h-5 rounded text-blue-700 border-slate-300 focus:ring-blue-500" type="checkbox"/>
        </div>
        <h3 class="text-lg font-bold text-on-background mb-2">Dual-Flush Toilets</h3>
        <p class="text-on-surface-variant text-sm mb-6 flex-grow leading-relaxed">
                                    Upgrade to dual-flush toilets or install a displacement bag in your existing tank to reduce the volume of water used per flush.
                                </p>
        <div class="pt-4 border-t border-slate-50">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-xs font-black text-blue-700 uppercase tracking-tighter"> $85/yr saved</span>
        </div>
        </div>
        <!-- Tip Card 6 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-slate-100 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="p-3 bg-blue-50 text-blue-700 rounded">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">kitchen</span>
        </div>
        <input class="w-5 h-5 rounded text-blue-700 border-slate-300 focus:ring-blue-500" type="checkbox"/>
        </div>
        <h3 class="text-lg font-bold text-on-background mb-2">Faucet Aerators</h3>
        <p class="text-on-surface-variant text-sm mb-6 flex-grow leading-relaxed">
                                    Install low-cost aerators on kitchen and bathroom faucets to mix air into the stream, reducing water flow while maintaining pressure.
                                </p>
        <div class="pt-4 border-t border-slate-50">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-xs font-black text-blue-700 uppercase tracking-tighter"> $25/yr saved</span>
        </div>
        </div>

            <!-- Tip Card 7 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-slate-100 flex flex-col hover:shadow-lg transition-shadow">
                <div class="flex justify-between items-start mb-4">
                <div class="p-3 bg-blue-50 text-blue-700 rounded">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">water_voc</span>
                </div>
                <input checked="" class="w-5 h-5 rounded text-blue-700 border-slate-300 focus:ring-blue-500" type="checkbox"/>
                </div>
                <h3 class="text-lg font-bold text-on-background mb-2">Collect Rainwater</h3>
                <p class="text-on-surface-variant text-sm mb-6 flex-grow leading-relaxed">
                                           Collecting rainwater for gardening and outdoor cleaning can reduce your municipal water demand by up to 40%. Start small with a basic rain barrel system
                                        </p>
                <div class="pt-4 border-t border-slate-50">
                <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
                <span class="text-xs font-black text-blue-700 uppercase tracking-tighter"> $85/yr saved</span>
                </div>
                </div>
        <!-- Tip Card 8 -->
                <div class="bg-white p-6 rounded-lg shadow-md border border-slate-100 flex flex-col hover:shadow-lg transition-shadow">
                <div class="flex justify-between items-start mb-4">
                <div class="p-3 bg-blue-50 text-blue-700 rounded">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">shower</span>
                </div>
                <input checked="" class="w-5 h-5 rounded text-blue-700 border-slate-300 focus:ring-blue-500" type="checkbox"/>
                </div>
                <h3 class="text-lg font-bold text-on-background mb-2">5-minute Showers</h3>
                <p class="text-on-surface-variant text-sm mb-6 flex-grow leading-relaxed">
                                            Taking shorter showers can significantly reduce your water usage and lower your utility bills.
                                        </p>
                <div class="pt-4 border-t border-slate-50">
                <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
                <span class="text-xs font-black text-blue-700 uppercase tracking-tighter"> $85/yr saved</span>
                </div>
                </div>
        </div>
        
            <!-- Call to Action Footer -->
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
    

</template>