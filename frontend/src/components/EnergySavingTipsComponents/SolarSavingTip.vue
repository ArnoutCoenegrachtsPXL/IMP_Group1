<script setup>

const emit= defineEmits(['back'])
import TipPageLayout from './TipPageLayout.vue'
</script>


<template>
 <!--Connect pageLayout to the page, doesnt work yet-->
   <TipPageLayout
       title="Get the Most Out of Your Solar Panels"
        subtitle="Small changes lead to significant savings. Follow our curated expert tips to reduce your monthly energy bill by up to 30%."
        badge="Featured Guide"
        heroImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDZFgLcl9H7PcbeTbQPsVOB9HKnAzIjjnnBH2ydXH6TlwOD5MtG5zzHvd93T0REdoJ3Rqvf9A6dS86nFIdjoJ..."
        heroImageAlt="Modern eco-friendly home exterior at twilight"
        sectionTitle="Expert Solar Tips"
        sectionSubtitle="Expert-verified ways to maximize your solar energy output and reduce your carbon footprint."
        @back="emit('back')"
    > 
        
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
        

   
</TipPageLayout>
</template>







































