<script setup>
import TipPageLayout from './TipPageLayout.vue'
const emit = defineEmits(['back'])
</script>

<template>
  <TipPageLayout
    title="Save Energy in the Kitchen"
    subtitle="Small changes lead to significant savings. Follow our curated expert tips to reduce your monthly energy bill by up to 30%."
    badge="Featured Guide"
    heroImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDMy0PhlxobZcJ_4g4Mf9SeMLlF-_DkNtY2SyB6FAWUZHT69Udt45Qsbzuz0ny5-lhDO8unmQcOl3R5vlohm9-yrUTfbhqqfJZyGmYcb45mgqtckZLcMiFAquIe9meoXQbicAKqGdmfXbvUR-oxLoBlywqw2E9uMyMWXpjVv7N6sB6TPmeYssnSGvnVFtzIUabwt393gKzyxnEfJEONPvz-Rpq9bNX9ZvceMD4KN8Q56KHtxXqLKHNXXKHlvDXGzhHKi0MFlg0w59vY"
    heroImageAlt="High-end modern induction cooktop in a luxury kitchen"
    sectionTitle="Expert Kitchen Tips"
    sectionSubtitle="Expert-verified ways to reduce your energy consumption and lower your utility bills."
    @back="emit('back')"
  >
    <!-- Tip 1 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
        <span class="material-symbols-outlined">dishwasher</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Full Dishwasher Loads</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Wait until the dishwasher is completely full before running a cycle to maximize water and energy efficiency per dish.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$45/yr saved</span>
      </div>
    </div>

    <!-- Tip 2 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors">
        <span class="material-symbols-outlined">kitchen</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Refrigerator Maintenance</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Clean condenser coils every six months and ensure door seals are airtight to prevent cold air leakage and motor overwork.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$30/yr saved</span>
      </div>
    </div>

    <!-- Tip 3 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-orange-100 transition-colors">
        <span class="material-symbols-outlined">cooking</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Efficient Cooking Habits</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Use lids on pots to retain heat, match pan size to burner size, and utilize smaller appliances like air fryers when possible.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$25/yr saved</span>
      </div>
    </div>

    <!-- Tip 4 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-cyan-100 transition-colors">
        <span class="material-symbols-outlined">severe_cold</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Smart Thawing</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Thaw frozen foods in the refrigerator rather than using the microwave or running water. It helps cool the fridge while saving energy.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$15/yr saved</span>
      </div>
    </div>

    <!-- Tip 5 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-yellow-100 transition-colors">
        <span class="material-symbols-outlined">oven_gen</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Convection Cooking</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Use the convection setting on your oven to circulate hot air, allowing for lower temperatures and faster cooking times.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$35/yr saved</span>
      </div>
    </div>

    <!-- Tip 6 -->
    <div class="rounded-lg p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group relative" style="background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);">
      <div class="absolute top-4 right-4">
        <input class="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" type="checkbox" />
      </div>
      <div class="w-12 h-12 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mb-5 group-hover:bg-teal-100 transition-colors">
        <span class="material-symbols-outlined">faucet</span>
      </div>
      <h4 class="font-bold mb-2 transition-colors" style="color: var(--color-on-surface);">Low-Flow Aerators</h4>
      <p class="text-sm mb-4 flex-1 leading-relaxed" style="color: var(--color-on-surface-variant);">Install high-efficiency aerators on your kitchen faucet to reduce hot water consumption without sacrificing water pressure.</p>
      <div class="pt-4 flex items-center justify-between" style="border-top: 1px solid var(--color-outline-variant);">
        <span class="text-xs font-bold uppercase" style="color: var(--color-on-surface-variant);">Impact</span>
        <span class="text-blue-700 font-bold text-sm">$20/yr saved</span>
      </div>
    </div>
  </TipPageLayout>
</template>