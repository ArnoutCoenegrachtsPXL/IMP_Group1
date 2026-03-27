<script setup>
    import SideBar from '../components/SideBar.vue'
    import TopBar from '@/components/TopBar.vue';
</script>

<template>
    <!-- Daily Streak Section (Bento Highlight) -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
    <div class="lg:col-span-2 bg-surface-container-lowest p-8 rounded-md relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group border border-outline-variant/10">
    <!-- Abstract Bio-pattern background -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-colors duration-500"></div>
    <div class="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
    <span class="bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Current Status</span>
    <h3 class="text-4xl font-extrabold text-on-surface font-headline mb-2 leading-tight">2 Day Streak! 🔥</h3>
    <p class="text-on-surface-variant max-w-md leading-relaxed">Stars are earned by keeping your household energy consumption below the community average for 24 hours.</p>
    </div>
    <div class="relative z-10 flex flex-col gap-4 w-full md:w-auto ml-auto">
    <div class="flex items-center justify-between md:justify-end gap-3 px-2">
    <p class="text-sm font-bold font-headline text-on-surface-variant uppercase tracking-tighter">Growth Week</p>
    </div>
    <div class="flex gap-2">
    <!-- Monday -->
    <div class="flex flex-col items-center gap-2">
    <div class="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20">
    <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">star</span>
    </div>
    <span class="text-[10px] font-bold text-on-surface-variant">MON</span>
    </div>
    <!-- Tuesday -->
    <div class="flex flex-col items-center gap-2">
    <div class="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20">
    <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">star</span>
    </div>
    <span class="text-[10px] font-bold text-on-surface-variant">TUE</span>
    </div>
    <!-- Wednesday -->
    <div class="flex flex-col items-center gap-2">
    <div class="w-12 h-12 rounded-md bg-error-container/10 flex items-center justify-center border border-error/20">
    <span class="material-symbols-outlined text-error">close</span>
    </div>
    <span class="text-[10px] font-bold text-error">WED</span>
    </div>
    <!-- Thursday -->
    <div class="flex flex-col items-center gap-2">
    <div class="w-12 h-12 rounded-md bg-surface-container-high flex items-center justify-center border border-transparent">
    <span class="material-symbols-outlined text-on-surface-variant/30">pending</span>
    </div>
    <span class="text-[10px] font-bold text-on-surface-variant/40">THU</span>
    </div>
    <!-- Friday -->
    <div class="flex flex-col items-center gap-2">
    <div class="w-12 h-12 rounded-md bg-surface-container-high flex items-center justify-center border border-transparent">
    <span class="material-symbols-outlined text-on-surface-variant/30">pending</span>
    </div>
    <span class="text-[10px] font-bold text-on-surface-variant/40">FRI</span>
    </div>
    </div>
    </div>
    </div>
    <div class="bg-primary text-white p-8 rounded-md flex flex-col justify-between solar-glow">
    <div>
    <h4 class="text-lg font-bold font-headline mb-2">Power Goal</h4>
    <p class="text-white/80 text-sm leading-relaxed">Reduce by 15% this weekend to unlock the "Eco-Legend" badge.</p>
    </div>
    <div class="mt-6">
    <div class="flex justify-between text-xs font-bold mb-2">
    <span>PROGRESS</span>
    <span>65%</span>
    </div>
    <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden">
    <div class="h-full bg-white rounded-full w-[65%] shadow-sm"></div>
    </div>
    </div>
    </div>
    </section>
    <!-- Top 3 Ranking Section (Asymmetric Layout) -->
    <h3 class="text-2xl font-black font-headline text-on-surface mb-8">Top Energy Saviors</h3>
    <div class="flex flex-col lg:flex-row items-end justify-center gap-6 mb-16 px-4">
    <!-- Rank 2 -->
    <div class="w-full lg:w-1/4 flex flex-col items-center order-2 lg:order-1">
    <div class="relative mb-6">
    <div class="w-24 h-24 rounded-full border-4 border-outline-variant overflow-hidden p-1 bg-surface-container-lowest">
    <img class="w-full h-full object-cover rounded-full" data-alt="Portrait of Sarah Jenkins" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJpfMNQqaNUKg_7qpEqAA8jM51cS7FK3sfkHOO-hRnu5_MFO49c8VeAR6Cub9tSiU0jqqr8QsnQRi8IhsQ7EToIU_wPrAIPe28U1hIKM1wDfgq2-5PZKLjtdGI3U5IBJaosEnOMEYXa1pusTkfkxi9Y66UcJeqv60uDUko9-AL81jZ2WgYD8GFCt7QvFq_wZqXeNVmCQkQhsp1fSsLOSDgwZhJPztT4mTYPqeHtV4DwuhyWyJnO1TFqNA2a-FGfUNV-RGo2vRF8Lw"/>
    </div>
    <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-outline-variant text-on-surface px-3 py-0.5 rounded-full text-xs font-bold shadow-md">2nd</div>
    </div>
    <div class="text-center bg-surface-container-low w-full pt-8 pb-6 px-4 rounded-t-lg border-b-4 border-outline-variant">
    <p class="font-bold text-on-surface font-headline">Sarah Jenkins</p>
    <p class="text-primary font-black text-xl">142 kWh</p>
    <p class="text-[10px] uppercase tracking-widest text-on-surface-variant mt-2">Monthly Usage</p>
    </div>
    </div>
    <!-- Rank 1 (Featured) -->
    <div class="w-full lg:w-1/3 flex flex-col items-center order-1 lg:order-2 z-10">
    <div class="relative mb-8 scale-110">
    <div class="absolute -top-6 left-1/2 -translate-x-1/2">
    <span class="material-symbols-outlined text-primary text-4xl" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
    </div>
    <div class="w-32 h-32 rounded-full border-4 border-primary p-1 bg-surface-container-lowest ring-8 ring-primary/10">
    <img class="w-full h-full object-cover rounded-full" data-alt="Portrait of Michael Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBuw6iXes0Gm7gJo_7jXADh6frq1MKZ-3uCsjSbBboHASWtNNki1NOSZ-cQg13llh09jhcPEMWgOy0EbCFqqRl98QVg8_jId-9Uy_O6Czl1ZIUWJkYat-pu5DmK6RETSlhP6bWA7OABjj997DuKMS_BUftWWiMZH_Zho8f5vx2BUWH2-9VIM2AP6lwVBB8HuSp3mS00tNvKRB5gRxR8aJI-Hi7lmK4k4JdYJJuPfkmTLaGaM6gRXjbVBAW6vjDkO_lMY2f749_RVY"/>
    </div>
    <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 solar-glow text-white px-5 py-1 rounded-full text-sm font-bold shadow-lg">1st</div>
    </div>
    <div class="text-center bg-surface-container-highest w-full pt-10 pb-8 px-6 rounded-t-lg shadow-xl relative">
    <p class="font-extrabold text-on-surface font-headline text-lg">Michael Chen</p>
    <p class="text-primary font-black text-3xl">128 kWh</p>
    <p class="text-xs uppercase tracking-widest text-on-surface-variant mt-2 font-bold">Community Leader</p>
    </div>
    </div>
    <!-- Rank 3 -->
    <div class="w-full lg:w-1/4 flex flex-col items-center order-3">
    <div class="relative mb-6">
    <div class="w-24 h-24 rounded-full border-4 border-primary-fixed-dim overflow-hidden p-1 bg-surface-container-lowest">
    <img class="w-full h-full object-cover rounded-full" data-alt="Portrait of Elena Rodriguez" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfJTyylkA6VfPtmt9p0-tELLITB4B065Dzfcl9HAIGF_lHR1xnrMysWmxNtMuJu0PECPgDBoBiqvr6-TXwslAIDlheoHvlHD4OTVyV5lO_FvmwghYZcTtXlCatpNyKyOXU14Xd1xS0cxdiLGfmx0mjo8tMrO8DEbEpmDD2jtNGAobCR2SBqoyXWGkSubokK4v9nY0FSfi9zLFDnPr7JTp2rs_5ZDK-pHX7AXJ-tPkPAjORfeXGDlW-gJOLdUc_kuFS8XFaV7OcBbI"/>
    </div>
    <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary-fixed-dim text-on-primary-fixed px-3 py-0.5 rounded-full text-xs font-bold shadow-md">3rd</div>
    </div>
    <div class="text-center bg-surface-container-low w-full pt-8 pb-6 px-4 rounded-t-lg border-b-4 border-primary-fixed-dim">
    <p class="font-bold text-on-surface font-headline">Elena Rodriguez</p>
    <p class="text-primary font-black text-xl">155 kWh</p>
    <p class="text-[10px] uppercase tracking-widest text-on-surface-variant mt-2">Monthly Usage</p>
    </div>
    </div>
    </div>
    <!-- Monthly Rankings Table -->
    <section class="bg-surface-container-low rounded-md p-6 md:p-10 border border-outline-variant/10">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
    <div>
    <h3 class="text-2xl font-bold font-headline text-on-surface">Monthly Rankings</h3>
    <p class="text-on-surface-variant text-sm">Top energy savers in your local district</p>
    </div>
    <div class="flex gap-2">
    <button class="bg-surface-container-highest px-4 py-2 rounded-md text-sm font-bold border border-outline-variant/20 hover:bg-surface-dim transition-colors">District</button>
    <button class="bg-primary text-white px-4 py-2 rounded-md text-sm font-bold shadow-sm">Global</button>
    </div>
    </div>
    <div class="space-y-3">
    <!-- Rank 4 -->
    <div class="flex items-center bg-surface-container-lowest p-4 rounded-md hover:bg-white transition-all border border-transparent hover:border-primary-fixed/30 group">
    <span class="w-8 text-center font-black text-on-surface-variant font-headline">4</span>
    <div class="w-12 h-12 rounded-full overflow-hidden mx-4 flex-shrink-0">
    <img class="w-full h-full object-cover" data-alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV8V5F70aoIgSYnGkaN6Hlgcf1taTkpaXvfjSpEgY-LeRDjFhIYUqw2W7CYK1pTJJ6Bi8wZK0R8njzK_ML5pq2gNmBZ5qVFDUVt9dURu1qXoTsAhnVS-tiRom_QavU_GM8co-URQRA1NNeozRpNOMI5CBEeH3EMI0pmr0f_9oF3kPFwN4CCEgw5uBXHLtMtleUPQFlWji6I1AdsLqjkPYKgbgHJtM1r2kf1pEEA8tAAlhuouyBlg2gd0ZuV5pQuEoyJW0g1exN3UM"/>
    </div>
    <div class="flex-1">
    <p class="font-bold text-on-surface">David Wilson</p>
    <p class="text-xs text-on-surface-variant">Oakwood District</p>
    </div>
    <div class="text-right flex items-center gap-4">
    <div class="hidden sm:block">
    <p class="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Usage</p>
    <p class="font-black text-on-surface">162 kWh</p>
    </div>
    <div class="w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
    <span class="material-symbols-outlined text-sm">trending_down</span>
    </div>
    </div>
    </div>
    <!-- Rank 5 -->
    <div class="flex items-center bg-surface-container-lowest p-4 rounded-md hover:bg-white transition-all border border-transparent hover:border-primary-fixed/30 group">
    <span class="w-8 text-center font-black text-on-surface-variant font-headline">5</span>
    <div class="w-12 h-12 rounded-full overflow-hidden mx-4 flex-shrink-0">
    <img class="w-full h-full object-cover" data-alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbx-FjLIhkOjBi_b8tlJipvBp1M7sPv2CxcdXYUBJzdWqkgxoXAuUQISHCQIYQxeDvlZ0oHwVTh1-wNgLyx2zhxJwsgK5ahVyG9PDhTmfSjzCFHej5j1dNRYW4Q1xlQ4qwXkqVhmdz6wdB5JjZ3zMxpC8tZWzhQ_YGYzL51qDL8j3fIQt9WFTQZsXlY0dMzYcrMejF6IDHOyh7mqoHNpUmBcnSdsTe8D5jfj8iCbsWM0IagVN6BCMJ8tD5LIWmUH7pwp6iZTaHT7g"/>
    </div>
    <div class="flex-1">
    <p class="font-bold text-on-surface">Amina Sato</p>
    <p class="text-xs text-on-surface-variant">Green Valley</p>
    </div>
    <div class="text-right flex items-center gap-4">
    <div class="hidden sm:block">
    <p class="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Usage</p>
    <p class="font-black text-on-surface">168 kWh</p>
    </div>
    <div class="w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
    <span class="material-symbols-outlined text-sm">trending_down</span>
    </div>
    </div>
    </div>
    <!-- Rank 6 (Current User Simulation - Active) -->
    <div class="flex items-center bg-primary-container p-4 rounded-md border-2 border-primary shadow-lg scale-[1.02] z-10">
    <span class="w-8 text-center font-black text-on-primary-container font-headline text-lg">6</span>
    <div class="w-12 h-12 rounded-full overflow-hidden mx-4 flex-shrink-0 border-2 border-white">
    <img class="w-full h-full object-cover" data-alt="Current User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk3X9fLHC9CUeW0_v-vUeHtQBlFjJEoiBgE4rsO8lAnKTbJ8eaUnFIzG30-WoD8VcWYODE2R_QC-huqPMkyZGGuuKvTZyJKhDQ8xNk3xBgffF8qzfpdB542MS8lU54bP_AYhUE0e3YNfTVlZqXE7ZCKPBf_dV_8N1ObqZNTj39Kf71LYrPqkkCb7lBm8RjAbslW_UeVn838KRfuqG70D1BrthgJu2zFzmBdgr9HKo3R6eAxCIiWHpzJrUGzXMIhyR5-bdK5hJNgbA"/>
    </div>
    <div class="flex-1">
    <div class="flex items-center gap-2">
    <p class="font-black text-on-primary-container">You (Energy Hero)</p>
    <span class="bg-white/50 text-[10px] px-2 py-0.5 rounded-full font-bold">ME</span>
    </div>
    <p class="text-xs text-on-primary-container/70">Oakwood District</p>
    </div>
    <div class="text-right flex items-center gap-4">
    <div class="hidden sm:block">
    <p class="text-xs font-bold text-on-primary-container/70 uppercase tracking-tighter">Usage</p>
    <p class="font-black text-on-primary-container">174 kWh</p>
    </div>
    <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
    <span class="material-symbols-outlined text-sm">military_tech</span>
    </div>
    </div>
    </div>
    <!-- Rank 7 -->
    <div class="flex items-center bg-surface-container-lowest p-4 rounded-md hover:bg-white transition-all border border-transparent hover:border-primary-fixed/30 group">
    <span class="w-8 text-center font-black text-on-surface-variant font-headline">7</span>
    <div class="w-12 h-12 rounded-full overflow-hidden mx-4 flex-shrink-0">
    <img class="w-full h-full object-cover" data-alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD11cRQen_HTdjmFKxltdtfExcETUIbPJdZwpKomnVt51lBUS_sMBwk2qUbwJMkV_ioQFTaj_mNyMALtN3m-dV4_aS3VRoz7OhKpIZZsHSsNhTvdQigc62JfY5Iqy3_AekNDmcLTPosMWM9yuo8caCuwgqCCbY8W1clpJ4Ks1Wi1RvIih3nwLAihwNnyr09ID7jy0xA_nCbW2lvyd_povc5P97yNCfdqfqBX2BXzuFvfB4NOM-gp306KkEkDXavonJYwHGmVR9evs8"/>
    </div>
    <div class="flex-1">
    <p class="font-bold text-on-surface">Tom Bradi</p>
    <p class="text-xs text-on-surface-variant">Oakwood District</p>
    </div>
    <div class="text-right flex items-center gap-4">
    <div class="hidden sm:block">
    <p class="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Usage</p>
    <p class="font-black text-on-surface">181 kWh</p>
    </div>
    <div class="w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
    <span class="material-symbols-outlined text-sm">trending_up</span>
    </div>
    </div>
    </div>
    </div>
    <div class="mt-8 flex justify-center">
    <button class="text-primary font-bold text-sm flex items-center gap-2 hover:gap-4 transition-all group">
                        View full leaderboard
                        <span class="material-symbols-outlined text-base">arrow_forward</span>
    </button>
    </div>
    </section>
    <!-- BottomNavBar (Mobile only) -->
    <nav class="md:hidden fixed bottom-0 w-full bg-surface border-t border-outline-variant/10 py-3 px-6 flex justify-around items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
    <a class="flex flex-col items-center gap-1 text-on-surface-variant/60" href="#">
    <span class="material-symbols-outlined">grid_view</span>
    </a>
    <a class="flex flex-col items-center gap-1 text-primary" href="#">
    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">leaderboard</span>
    </a>
    <div class="-mt-12 bg-primary p-4 rounded-full shadow-lg border-4 border-surface">
    <span class="material-symbols-outlined text-white">add</span>
    </div>
    <a class="flex flex-col items-center gap-1 text-on-surface-variant/60" href="#">
    <span class="material-symbols-outlined">group</span>
    </a>
    <a class="flex flex-col items-center gap-1 text-on-surface-variant/60" href="#">
    <span class="material-symbols-outlined">settings</span>
    </a>
    </nav>

</template>