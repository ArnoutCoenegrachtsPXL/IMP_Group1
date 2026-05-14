
<script setup>
import TipPageLayout from './TipPageLayout.vue'
 const emit= defineEmits(['back'])

</script>

<template>
     <!--Connect pageLayout to the page, doesnt work yet-->
  <TipPageLayout
    title="Laundry Saving Tips"
    subtitle="Optimize your laundry routine to save energy, reduce utility bills..."
    badge="Sustainable Laundry Guide"
    heroImage="https://lh3.googleusercontent.com/aida-public/..."
    heroImageAlt="Fresh clean laundry..."
    sectionTitle="Expert Laundry Tips"
    sectionSubtitle="Expert-verified ways to lower your carbon footprint and costs."
    @back="emit('back')"
  >
     <!-- Tip Card 1: cold water -->
     <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="bg-primary-container p-3 rounded-xl text-primary">
        <span class="material-symbols-outlined text-3xl" data-icon="ac_unit">ac_unit</span>
        </div>
            <input 
            type="checkbox"
            class="w-4 h-4 cursor-pointer accent-primary"
            />
        </div>
        <h3 class="text-xl font-bold mb-3">Wash in Cold Water</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                About 90% of energy used by washers goes to heating water. Use cold water for most loads to significantly cut energy use.
                            </p>
        <div class="pt-4 border-t border-outline-variant/40 mt-auto">
        <div class="flex items-center gap-2 text-primary font-bold text-sm tracking-wide">
       
            <span class="text-xs font-bold uppercase text-on-surface-variant">Impact</span>
            <span class="text-primary font-bold">$40/yr saved</span>
        </div>
        </div>
    </div>

    <!-- Tip Card 2: Lint Filter -->
        <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="bg-primary-container p-3 rounded-xl text-primary">
        <span class="material-symbols-outlined text-3xl" data-icon="filter_alt">filter_alt</span>
        </div>
        <input class="w-6 h-6 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary" type="checkbox"/>
        </div>
        <h3 class="text-xl font-bold mb-3">Clean Lint Filter</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                A clogged filter restricts airflow and forces your dryer to work harder. Clean it after every single load for efficiency.
                            </p>
        <div class="pt-4 border-t border-outline-variant/40 mt-auto">
        <div class="flex items-center gap-2 text-primary font-bold text-sm tracking-wide">
        <span class="text-xs font-bold uppercase text-on-surface-variant">Impact</span>
        <span> $25/yr saved</span>
        </div>
        </div>
        </div>
 <!-- Tip Card 3: Dryer Balls -->
        <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="bg-primary-container p-3 rounded-xl text-primary">
        <span class="material-symbols-outlined text-3xl" data-icon="sports_baseball">sports_baseball</span>
        </div>
        <input class="w-6 h-6 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary" type="checkbox"/>
        </div>
        <h3 class="text-xl font-bold mb-3">Use Dryer Balls</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                Wool or rubber dryer balls separate clothes, allowing hot air to circulate better and reducing drying time by up to 25%.
                            </p>
        <div class="pt-4 border-t border-outline-variant/40 mt-auto">
        <div class="flex items-center gap-2 text-primary font-bold text-sm tracking-wide">
        <span class="text-xs font-bold uppercase text-on-surface-variant">Impact</span>
        <span> $30/yr saved</span>
        </div>
        </div>
        </div>
         <!-- Tip Card 4: Full Loads -->
        <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="bg-primary-container p-3 rounded-xl text-primary">
        <span class="material-symbols-outlined text-3xl" data-icon="inventory_2">inventory_2</span>
        </div>
        <input class="w-6 h-6 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary" type="checkbox"/>
        </div>
        <h3 class="text-xl font-bold mb-3">Run Full Loads Only</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                Washers and dryers use similar amounts of energy regardless of load size. Wait for a full drum to maximize efficiency.
                            </p>
        <div class="pt-4 border-t border-outline-variant/40 mt-auto">
        <div class="flex items-center gap-2 text-primary font-bold text-sm tracking-wide">
       <span class="text-xs font-bold uppercase text-on-surface-variant">Impact</span>
        <span> $15/yr saved</span>
        </div>
        </div>
        </div>
        <!-- Tip Card 5: Air Drying -->
        <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="bg-primary-container p-3 rounded-xl text-primary">
        <span class="material-symbols-outlined text-3xl" data-icon="air">air</span>
        </div>
        <input class="w-6 h-6 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary" type="checkbox"/>
        </div>
        <h3 class="text-xl font-bold mb-3">Air Dry Clothes</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                The most energy-efficient dryer is the sun. Use a clothesline or drying rack whenever possible to eliminate dryer costs.
                            </p>
        <div class="pt-4 border-t border-outline-variant/40 mt-auto">
        <div class="flex items-center gap-2 text-primary font-bold text-sm tracking-wide">
        <span class="text-xs font-bold uppercase text-on-surface-variant">Impact</span>
        <span> $80/yr saved</span>
        </div>
        </div>
        </div>
        <!-- Tip Card 6: Moisture Sensor -->
        <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
        <div class="bg-primary-container p-3 rounded-xl text-primary">
        <span class="material-symbols-outlined text-3xl" data-icon="sensors">sensors</span>
        </div>
        <input class="w-6 h-6 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary" type="checkbox"/>
        </div>
        <h3 class="text-xl font-bold mb-3">Use Sensor Drying</h3>
        <p class="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
                                Use the "auto-dry" setting instead of timed drying. Sensors detect moisture and stop the cycle as soon as clothes are dry.
                            </p>
        <div class="pt-4 border-t border-outline-variant/40 mt-auto">
        <div class="flex items-center gap-2 text-primary font-bold text-sm tracking-wide">
        <span class="text-xs font-bold uppercase text-on-surface-variant">Impact</span>
        <span> $20/yr saved</span>
        </div>
        </div>
        </div>
       
  </TipPageLayout>
</template>

