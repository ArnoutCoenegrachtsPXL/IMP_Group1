<script setup>
import TipPageLayout from './TipPageLayout.vue'
const emit = defineEmits(['back'])
</script>

<template>
  <TipPageLayout
    title="Get the Most Out of Your Solar Panels"
    subtitle="Small changes lead to significant savings. Follow our curated expert tips to reduce your monthly energy bill by up to 30%."
    badge="Featured Guide"
    heroImage="https://lh3.googleusercontent.com/aida-public/AB6AXuC_t0LazH9tTWFhJf0OamJnaPhTE20HMRvoYyiHW4ovkvW8Obf7iqYb2FG2me5J0v5HsFi7e97ChynQX2wQZ0PRYHm_Cdwo-nbV8zNdwy2GEnYe6BmyBC1DPzLbTB98VyChVIHGAak7WY_NRtz4VLl6gPqE1aOkHw64-jAmN217gekRN2mk3jtK77cK9RJWsTEOK523_JQvwlJ_ScxAwONO1DwTtQANhS07eHuu4Ftl9AlZcyp4bL87ckS5TttmR-bJm0zMhaemM_Jh"
    heroImageAlt="Solar panels on a residential roof reflecting a bright blue sky"
    sectionTitle="Expert Solar Tips"
    sectionSubtitle="Expert-verified ways to maximize your solar energy output and reduce your carbon footprint."
    @back="emit('back')"
  >
    <!-- Tip 1 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-yellow-100 transition-colors">
        <span class="material-symbols-outlined">cleaning_services</span>
      </div>
      <h4 class="font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Panel Cleaning</h4>
      <p class="text-on-surface-variant text-sm mb-4 flex-1 leading-relaxed">Dust, pollen, and bird droppings can reduce output by up to 25%. Schedule a soft-water wash every 6 months.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$120/yr saved</span>
      </div>
    </div>

    <!-- Tip 2 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors">
        <span class="material-symbols-outlined">content_cut</span>
      </div>
      <h4 class="font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Shade Management</h4>
      <p class="text-on-surface-variant text-sm mb-4 flex-1 leading-relaxed">Trim overhanging branches that may cast shadows during peak sun hours (10 AM - 2 PM).</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$85/yr saved</span>
      </div>
    </div>

    <!-- Tip 3 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
        <span class="material-symbols-outlined">battery_charging_full</span>
      </div>
      <h4 class="font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Peak Shaving</h4>
      <p class="text-on-surface-variant text-sm mb-4 flex-1 leading-relaxed">Run heavy appliances during peak generation hours to reduce grid dependency and maximize self-consumption.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$240/yr saved</span>
      </div>
    </div>

    <!-- Tip 4 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition-colors">
        <span class="material-symbols-outlined">router</span>
      </div>
      <h4 class="font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Inverter Update</h4>
      <p class="text-on-surface-variant text-sm mb-4 flex-1 leading-relaxed">Ensure your inverter firmware is up to date to access better MPPT algorithms and efficiency improvements.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$45/yr saved</span>
      </div>
    </div>

    <!-- Tip 5 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-orange-100 transition-colors">
        <span class="material-symbols-outlined">nest_thermostat</span>
      </div>
      <h4 class="font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Smart Export</h4>
      <p class="text-on-surface-variant text-sm mb-4 flex-1 leading-relaxed">Install a smart controller to export excess energy when grid prices are highest (if your utility plan allows).</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$310/yr saved</span>
      </div>
    </div>

    <!-- Tip 6 -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-purple-100 transition-colors">
        <span class="material-symbols-outlined">monitoring</span>
      </div>
      <h4 class="font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Daily Monitoring</h4>
      <p class="text-on-surface-variant text-sm mb-4 flex-1 leading-relaxed">Review your app weekly to spot unusual dips in production that could indicate a technical fault.</p>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-bold uppercase text-slate-400">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$155/yr saved</span>
      </div>
    </div>
  </TipPageLayout>
</template>