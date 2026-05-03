<script setup>
import TipPageLayout from './TipPageLayout.vue';
const emit= defineEmits(['back'])

</script>

<template>
  <!--Connect pageLayout to the page, doesnt work yet-->
   <TipPageLayout
        title="Save Energy in the Kitchen"
        subtitle="Small changes lead to significant savings. Follow our curated expert tips to reduce your monthly energy bill by up to 30%."
        badge="Featured Guide"
        heroImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDZFgLcl9H7PcbeTbQPsVOB9HKnAzIjjnnBH2ydXH6TlwOD5MtG5zzHvd93T0REdoJ3Rqvf9A6dS86nFIdjoJ..."
        heroImageAlt="Modern eco-friendly home exterior at twilight"
        sectionTitle="Expert Kitchen Tips"
        sectionSubtitle="Expert-verified ways to reduce your energy consumption and lower your utility bills."
        @back="emit('back')"
    > 
        
    
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

</TipPageLayout>
</template>