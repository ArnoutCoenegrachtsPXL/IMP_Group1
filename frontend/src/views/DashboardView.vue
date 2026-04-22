<script setup>
  // Dashboard — no additional imports needed
</script>

<template>
  <!-- Dashboard Hero Section -->
  <div class="mb-8">
    <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface mb-1">Energy Hub</h1>
    <p class="text-on-surface-variant">Live system overview for your sustainable home.</p>
  </div>

  <!-- Bento Grid Dashboard -->
  <div class="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">

    <!-- Real-time Energy Chart (Large Card) -->
    <div class="col-span-1 md:col-span-8
                bg-surface-container-lowest dark:bg-surface-container-low
                border border-outline-variant/20 dark:border-outline-variant/10
                rounded-xl p-4 sm:p-6 shadow-sm overflow-hidden relative">
      <div class="flex justify-between items-start mb-6 flex-wrap gap-3">
        <div>
          <h2 class="text-base sm:text-lg font-bold text-on-surface">Production vs Consumption</h2>
          <p class="text-sm text-on-surface-variant">Last 24 hours (kW)</p>
        </div>
        <div class="flex gap-2 flex-wrap">
          <span class="inline-flex items-center gap-1 text-xs font-medium text-primary px-2 py-1 bg-primary-fixed dark:bg-primary/20 rounded-full">
            <span class="w-2 h-2 rounded-full bg-primary"></span> Solar
          </span>
          <span class="inline-flex items-center gap-1 text-xs font-medium text-secondary px-2 py-1 bg-secondary-fixed dark:bg-secondary/20 rounded-full">
            <span class="w-2 h-2 rounded-full bg-secondary"></span> Usage
          </span>
        </div>
      </div>
      <div class="h-48 sm:h-64 flex items-end justify-between gap-1 mt-4">
        <div class="w-full h-full flex items-end gap-1">
          <div class="flex-1 bg-primary/20 rounded-t h-[40%]"></div>
          <div class="flex-1 bg-primary/30 rounded-t h-[55%]"></div>
          <div class="flex-1 bg-primary/40 rounded-t h-[70%]"></div>
          <div class="flex-1 bg-primary/60 rounded-t h-[85%]"></div>
          <div class="flex-1 bg-primary   rounded-t h-[95%]"></div>
          <div class="flex-1 bg-primary/80 rounded-t h-[80%]"></div>
          <div class="flex-1 bg-primary/50 rounded-t h-[60%]"></div>
          <div class="flex-1 bg-secondary/40 rounded-t h-[45%]"></div>
          <div class="flex-1 bg-secondary/60 rounded-t h-[50%]"></div>
          <div class="flex-1 bg-secondary   rounded-t h-[65%]"></div>
          <div class="flex-1 bg-secondary/70 rounded-t h-[55%]"></div>
          <div class="flex-1 bg-secondary/30 rounded-t h-[40%]"></div>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-surface-container-high dark:border-outline-variant/10 flex justify-around">
        <div class="text-center">
          <p class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Total Generated</p>
          <p class="text-xl font-bold text-primary">24.8 kWh</p>
        </div>
        <div class="text-center">
          <p class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Total Consumed</p>
          <p class="text-xl font-bold text-secondary">18.2 kWh</p>
        </div>
      </div>
    </div>

    <!-- Battery Level -->
    <div class="col-span-1 md:col-span-4 bg-primary text-on-primary rounded-xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
      <div class="absolute top-0 right-0 p-8 opacity-10">
        <span class="material-symbols-outlined text-9xl">battery_charging_full</span>
      </div>
      <div class="z-10">
        <h2 class="text-base sm:text-lg font-bold mb-1 opacity-90">Battery Storage</h2>
        <p class="text-sm opacity-75">Tesla Powerwall 2</p>
      </div>
      <div class="z-10 mt-8 mb-4">
        <div class="flex items-end gap-2">
          <span class="text-5xl sm:text-6xl font-black">82</span>
          <span class="text-xl sm:text-2xl font-bold pb-1">%</span>
        </div>
        <p class="text-sm mt-2 font-medium bg-on-primary/20 inline-block px-3 py-1 rounded-full text-white">
          Discharging • 2.1 kW
        </p>
      </div>
      <div class="z-10 mt-auto">
        <div class="w-full bg-white/20 h-2 rounded-full overflow-hidden">
          <div class="bg-white h-full w-[82%]"></div>
        </div>
        <div class="flex justify-between mt-2 text-xs font-medium">
          <span>Empty</span>
          <span>Estimated 14h left</span>
        </div>
      </div>
    </div>

    <!-- Sustainability Score -->
    <div class="col-span-1 md:col-span-5
                bg-surface-container-high dark:bg-surface-container
                border border-outline-variant/20 dark:border-outline-variant/10
                rounded-xl p-4 sm:p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-base sm:text-lg font-bold text-on-surface">Sustainability Score</h2>
        <span class="material-symbols-outlined text-tertiary">workspace_premium</span>
      </div>
      <div class="flex items-center gap-4 sm:gap-6 flex-wrap">
        <div class="relative flex items-center justify-center shrink-0">
          <svg class="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90">
            <circle class="text-surface-container-highest dark:text-surface-container-high"
                    cx="48" cy="48" fill="transparent" r="40"
                    stroke="currentColor" stroke-width="8"/>
            <circle class="text-primary"
                    cx="48" cy="48" fill="transparent" r="40"
                    stroke="currentColor" stroke-dasharray="251.2" stroke-dashoffset="25.12" stroke-width="8"/>
          </svg>
          <span class="absolute text-2xl font-bold text-on-surface">90</span>
        </div>
        <div>
          <p class="text-sm text-on-surface-variant leading-relaxed">
            You are in the <span class="text-primary font-bold">top 5%</span> of EcoSave users in your region this month.
          </p>
          <button class="mt-3 text-sm font-bold text-primary flex items-center gap-1 hover:underline">
            View Report <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Solar Forecast -->
    <div class="col-span-1 md:col-span-7
                bg-surface-container-lowest dark:bg-surface-container-low
                border border-outline-variant/20 dark:border-outline-variant/10
                rounded-xl p-4 sm:p-6 shadow-sm">
      <h2 class="text-base sm:text-lg font-bold text-on-surface mb-4">Solar Forecast</h2>
      <div class="grid grid-cols-2 xs:grid-cols-4 gap-3">
        <div class="text-center p-3 rounded-lg bg-surface-container-low dark:bg-surface-container transition-colors hover:bg-surface-container-high">
          <p class="text-xs text-on-surface-variant mb-1">09:00</p>
          <span class="material-symbols-outlined text-tertiary-fixed-dim dark:text-primary/60 block mb-1">wb_sunny</span>
          <p class="text-sm font-bold text-on-surface">1.2 kW</p>
        </div>
        <div class="text-center p-3 rounded-lg bg-primary-container dark:bg-primary/20 text-on-primary-container dark:text-primary shadow-sm">
          <p class="text-xs opacity-80 mb-1">12:00</p>
          <span class="material-symbols-outlined block mb-1">light_mode</span>
          <p class="text-sm font-black">4.8 kW</p>
        </div>
        <div class="text-center p-3 rounded-lg bg-surface-container-low dark:bg-surface-container transition-colors hover:bg-surface-container-high">
          <p class="text-xs text-on-surface-variant mb-1">15:00</p>
          <span class="material-symbols-outlined text-outline block mb-1">cloud</span>
          <p class="text-sm font-bold text-on-surface">2.4 kW</p>
        </div>
        <div class="text-center p-3 rounded-lg bg-surface-container-low dark:bg-surface-container transition-colors hover:bg-surface-container-high">
          <p class="text-xs text-on-surface-variant mb-1">18:00</p>
          <span class="material-symbols-outlined text-outline block mb-1">wb_twilight</span>
          <p class="text-sm font-bold text-on-surface">0.5 kW</p>
        </div>
      </div>
    </div>

    <!-- Impact Stats -->
    <div class="col-span-1 md:col-span-12 grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6">
      <div class="bg-secondary-container dark:bg-secondary/20 text-on-secondary-container dark:text-on-surface rounded-xl p-5 sm:p-6 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-white/30 dark:bg-white/10 rounded-lg shrink-0">
          <span class="material-symbols-outlined text-3xl">eco</span>
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider opacity-80">CO2 Offset</p>
          <p class="text-2xl font-black">1.4 tons</p>
          <p class="text-xs opacity-80">Equivalent to 64 trees planted</p>
        </div>
      </div>
      <div class="bg-surface-container-highest dark:bg-surface-container border border-outline-variant/20 dark:border-outline-variant/10 rounded-xl p-5 sm:p-6 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-surface-container-low dark:bg-surface-container-high rounded-lg shrink-0">
          <span class="material-symbols-outlined text-3xl text-secondary">payments</span>
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Estimated Savings</p>
          <p class="text-2xl font-black text-on-surface">$342.50</p>
          <p class="text-xs text-on-surface-variant">Since Jan 2024</p>
        </div>
      </div>
      <div class="bg-surface-container-highest dark:bg-surface-container border border-outline-variant/20 dark:border-outline-variant/10 rounded-xl p-5 sm:p-6 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-surface-container-low dark:bg-surface-container-high rounded-lg shrink-0">
          <span class="material-symbols-outlined text-3xl text-tertiary">electric_car</span>
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">EV Charging</p>
          <p class="text-2xl font-black text-on-surface">Scheduled</p>
          <p class="text-xs text-on-surface-variant">Next: 02:00 AM (Off-peak)</p>
        </div>
      </div>
    </div>

  </div>
</template>
