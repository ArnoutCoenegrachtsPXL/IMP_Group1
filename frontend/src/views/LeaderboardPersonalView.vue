<script setup>
   
    import { ref, onMounted } from 'vue'
    import SideBar from '../components/SideBar.vue'
    import TopBar from '@/components/TopBar.vue'

    const leaderboard = ref([])        
    const communityAverage = ref(0)
    const myRank = ref(null)            
    const currentUserId = localStorage.getItem('userId')

    onMounted(async () => {
   //community rank
    const res = await fetch('/api/leaderboard')
    const data = await res.json()
    leaderboard.value = data.topHouseholds      
    communityAverage.value = data.communityAverage
//currentuser rank
    if (currentUserId) {
        const userRes = await fetch(`/api/leaderboard/user/${currentUserId}`)
        if (userRes.ok) {
        myRank.value = await userRes.json()    
        }
    }
})
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
            <p v-if="myRank" class="mt-3 text-sm font-semibold text-on-surface">
        Your rank: #{{ myRank.rank }} —
        <span :class="myRank.isBelowCommunityAverage ? 'text-primary' : 'text-error'">
            {{ myRank.isBelowCommunityAverage ? 'Below community average ' : 'Above community average' }}
        </span>
        </p>
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
    <p class="font-bold text-on-surface font-headline">{{ leaderboard[1]?.userName }}</p>
    <p class="text-primary font-black text-xl">{{ leaderboard[1]?.energyPerPerson }} kWh</p>
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
    <p class="font-extrabold text-on-surface font-headline text-lg">{{ leaderboard[0]?.userName }}</p>
    <p class="text-primary font-black text-3xl">{{ leaderboard[0]?.energyPerPerson }} kWh</p>
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
    <p class="font-bold text-on-surface font-headline">{{ leaderboard[2]?.userName }}</p>
    <p class="text-primary font-black text-xl">{{ leaderboard[2]?.energyPerPerson }} kWh</p>
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
      <div
        v-for="entry in leaderboard.slice(3)"
        :key="entry.householdId"
        class="flex items-center bg-surface-container-lowest p-4 rounded-md"
        :class="entry.householdId === currentUserId
            ? 'bg-primary-container border-2 border-primary'
            : 'hover:bg-white'"
        >
        <span class="w-8 text-center font-black ...">{{ entry.rank }}</span>
        <div class="flex-1">
            <p class="font-bold text-on-surface">
            {{ entry.userName }}
            <span v-if="entry.householdId === currentUserId"> (You)</span>
            </p>
            <p class="text-xs text-on-surface-variant">Postal: {{ entry.postalCode }}</p>
        </div>
        <div class="text-right">
            <p class="font-black text-on-surface">{{ entry.energyPerPerson }} kWh/person</p>
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

    <!-- ══ PAGE HEADER ════════════════════════════════════════════════════ -->
    <div class="flex items-start justify-between flex-wrap gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-on-surface tracking-tight mb-1 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[32px]"
                style="font-variation-settings:'FILL' 1">leaderboard</span>
          Community Leaderboard
        </h1>
        <p class="text-on-surface-variant text-sm max-w-xl">
          Rankings are updated daily. Score = kWh saved × 2 + streak × 15 + readings × 5 + posts × 3
          + challenges × 25 − peak draws × 10.
          <button class="text-primary underline underline-offset-2 font-medium ml-1"
                  @click="scoringModalOpen = true">How it works →</button>
        </p>
      </div>
      <!-- Scope filter pills -->
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="s in SCOPE_OPTIONS" :key="s.key"
          class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[34px]
                 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          :class="scopeFilter === s.key
            ? 'bg-primary text-on-primary shadow-sm'
            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'"
          @click="scopeFilter = s.key"
        >{{ s.label }}</button>
      </div>
    </div>

    <!-- ══ SEARCH BAR ═════════════════════════════════════════════════════ -->
    <div class="relative mb-8">
      <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2
                   text-on-surface-variant text-[18px] pointer-events-none">search</span>
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search members by name or location…"
        class="w-full bg-surface-container border border-outline-variant/30 rounded-xl
               py-2.5 pl-9 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/50
               focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40
               transition-all"
      />
    </div>

    <!-- ══ PODIUM — RANK 1 / 2 / 3 ════════════════════════════════════════ -->
    <!-- MARKER: LEADERBOARD-PODIUM -->
    <section class="mb-10">
      <h2 class="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-6
                 flex items-center gap-2">
        <span class="flex-1 h-px bg-outline-variant/30"/>
        Top 3 Solar Champions
        <span class="flex-1 h-px bg-outline-variant/30"/>
      </h2>

      <div v-if="podium.length >= 3" class="flex flex-col lg:flex-row items-end justify-center gap-4 px-2">

        <!-- ── Rank 2 ────────────────────────────────────────────────── -->
        <div class="w-full lg:w-64 flex flex-col items-center order-2 lg:order-1">
          <!-- Avatar -->
          <div class="relative mb-5">
            <div class="w-24 h-24 rounded-full border-4 overflow-hidden flex items-center justify-center text-2xl font-bold"
                 :class="[...avatarColour(podium[1].name), 'border-outline-variant']">
              {{ initials(podium[1].name) }}
            </div>
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-surface-container-high text-on-surface
                        px-3 py-0.5 rounded-full text-xs font-bold shadow-md border border-outline-variant/30">
              🥈 2nd
            </div>
          </div>
          <!-- Badges row -->
          <div class="flex flex-wrap gap-1 justify-center mb-3 min-h-[24px]">
            <span v-for="b in podium[1].badges.slice(0,4)" :key="b.id"
                  class="text-base cursor-pointer" :title="b.label + ': ' + b.desc"
                  @click="router.push('/community')">{{ b.emoji }}</span>
          </div>
          <!-- Info card -->
          <div class="text-center w-full pt-8 pb-5 px-4 rounded-t-2xl border border-b-4 border-outline-variant/40"
               :style="cardStyle({ borderBottomColor: 'var(--color-outline-variant)' })">
            <p class="font-bold text-on-surface text-base">{{ podium[1].name }}</p>
            <p class="text-xs text-on-surface-variant mt-0.5">{{ podium[1].location }}</p>
            <p class="text-primary font-black text-2xl mt-2">{{ podium[1].kwhSaved.toLocaleString() }} kWh</p>
            <p class="text-[10px] uppercase tracking-widest text-on-surface-variant mt-1">Total saved</p>
            <div class="mt-3 pt-3 border-t border-outline-variant/20 flex justify-around text-xs">
              <div><p class="font-bold text-on-surface">{{ podium[1].score.toLocaleString() }}</p><p class="text-on-surface-variant">Score</p></div>
              <div><p class="font-bold text-on-surface">{{ podium[1].streak }}d</p><p class="text-on-surface-variant">Streak</p></div>
              <div><p class="font-bold text-on-surface">{{ podium[1].badges.length }}</p><p class="text-on-surface-variant">Badges</p></div>
            </div>
          </div>
        </div>

        <!-- ── Rank 1 (centre, elevated) ────────────────────────────── -->
        <div class="w-full lg:w-72 flex flex-col items-center order-1 lg:order-2 z-10">
          <!-- Crown -->
          <span class="material-symbols-outlined text-primary text-[40px] mb-1"
                style="font-variation-settings:'FILL' 1">workspace_premium</span>
          <!-- Avatar -->
          <div class="relative mb-6">
            <div class="w-32 h-32 rounded-full border-4 border-primary p-1 ring-8 ring-primary/15
                        overflow-hidden flex items-center justify-center text-3xl font-bold"
                 :class="avatarColour(podium[0].name)">
              {{ initials(podium[0].name) }}
            </div>
            <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 solar-glow text-on-primary
                        px-5 py-1 rounded-full text-sm font-bold shadow-lg">
              🥇 1st
            </div>
          </div>
          <!-- Badges -->
          <div class="flex flex-wrap gap-1.5 justify-center mb-3 min-h-[28px]">
            <span v-for="b in podium[0].badges.slice(0,6)" :key="b.id"
                  class="text-xl cursor-pointer" :title="b.label + ': ' + b.desc"
                  @click="router.push('/community')">{{ b.emoji }}</span>
          </div>
          <!-- Info card — tallest -->
          <div class="text-center w-full pt-10 pb-8 px-6 rounded-t-2xl border-2 border-primary/30 shadow-xl"
               :style="{ ...cardStyle(), backgroundColor: 'color-mix(in srgb, var(--color-primary) 6%, var(--color-surface-container-lowest))' }">
            <p class="font-extrabold text-on-surface text-xl">{{ podium[0].name }}</p>
            <p class="text-xs text-on-surface-variant mt-0.5">{{ podium[0].location }}</p>
            <p class="text-primary font-black text-4xl mt-3">{{ podium[0].kwhSaved.toLocaleString() }} kWh</p>
            <p class="text-[10px] uppercase tracking-widest text-on-surface-variant mt-1">Total saved</p>
            <div class="mt-4 pt-3 border-t border-primary/15 flex justify-around text-xs">
              <div><p class="font-bold text-on-surface text-base">{{ podium[0].score.toLocaleString() }}</p><p class="text-on-surface-variant">Score</p></div>
              <div><p class="font-bold text-on-surface text-base">{{ podium[0].streak }}d</p><p class="text-on-surface-variant">Streak</p></div>
              <div><p class="font-bold text-on-surface text-base">{{ podium[0].badges.length }}</p><p class="text-on-surface-variant">Badges</p></div>
            </div>
          </div>
        </div>

        <!-- ── Rank 3 ────────────────────────────────────────────────── -->
        <div class="w-full lg:w-64 flex flex-col items-center order-3">
          <div class="relative mb-5">
            <div class="w-24 h-24 rounded-full border-4 overflow-hidden flex items-center justify-center text-2xl font-bold"
                 :class="[...avatarColour(podium[2].name), 'border-amber-500/60']">
              {{ initials(podium[2].name) }}
            </div>
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500/20 text-amber-700 dark:text-amber-400
                        px-3 py-0.5 rounded-full text-xs font-bold shadow-md border border-amber-500/30">
              🥉 3rd
            </div>
          </div>
          <div class="flex flex-wrap gap-1 justify-center mb-3 min-h-[24px]">
            <span v-for="b in podium[2].badges.slice(0,4)" :key="b.id"
                  class="text-base cursor-pointer" :title="b.label + ': ' + b.desc"
                  @click="router.push('/community')">{{ b.emoji }}</span>
          </div>
          <div class="text-center w-full pt-8 pb-5 px-4 rounded-t-2xl border border-b-4 border-amber-500/40"
               :style="cardStyle()">
            <p class="font-bold text-on-surface text-base">{{ podium[2].name }}</p>
            <p class="text-xs text-on-surface-variant mt-0.5">{{ podium[2].location }}</p>
            <p class="text-primary font-black text-2xl mt-2">{{ podium[2].kwhSaved.toLocaleString() }} kWh</p>
            <p class="text-[10px] uppercase tracking-widest text-on-surface-variant mt-1">Total saved</p>
            <div class="mt-3 pt-3 border-t border-outline-variant/20 flex justify-around text-xs">
              <div><p class="font-bold text-on-surface">{{ podium[2].score.toLocaleString() }}</p><p class="text-on-surface-variant">Score</p></div>
              <div><p class="font-bold text-on-surface">{{ podium[2].streak }}d</p><p class="text-on-surface-variant">Streak</p></div>
              <div><p class="font-bold text-on-surface">{{ podium[2].badges.length }}</p><p class="text-on-surface-variant">Badges</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ SECTION A — RANKS 4–10 ══════════════════════════════════════════ -->
    <!-- MARKER: LEADERBOARD-TOP10 -->
    <section class="mb-8">
      <h2 class="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-4
                 flex items-center gap-2">
        <span class="flex-1 h-px bg-outline-variant/30"/>
        Challenger Tier — Ranks 4–10
        <span class="flex-1 h-px bg-outline-variant/30"/>
      </h2>

      <div class="rounded-2xl border overflow-hidden" :style="cardStyle()">
        <!-- Header row -->
        <div class="grid grid-cols-12 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest
                    text-on-surface-variant bg-surface-container border-b border-outline-variant/20">
          <span class="col-span-1 text-center">#</span>
          <span class="col-span-4">Member</span>
          <span class="col-span-2 text-right hidden sm:block">Score</span>
          <span class="col-span-2 text-right hidden sm:block">kWh</span>
          <span class="col-span-2 text-right hidden sm:block">Streak</span>
          <span class="col-span-1 text-right">Trend</span>
        </div>

        <div class="divide-y divide-outline-variant/10">
          <div
            v-for="member in topTen" :key="member.id"
            class="transition-all"
          >
            <!-- Main row -->
            <div
              class="grid grid-cols-12 px-4 py-3.5 items-center cursor-pointer transition-colors
                     hover:bg-surface-container"
              :class="member.isMe ? 'bg-primary/5 hover:bg-primary/8' : ''"
              @click="toggleDetail(member.id)"
            >
              <!-- Rank -->
              <div class="col-span-1 text-center">
                <span class="text-base font-bold" :class="member.isMe ? 'text-primary' : 'text-on-surface-variant'">
                  {{ rankMedal(member.rank) }}
                </span>
              </div>
              <!-- Avatar + name -->
              <div class="col-span-4 flex items-center gap-3 min-w-0">
                <div class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                     :class="avatarColour(member.name)">
                  {{ initials(member.name) }}
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <p class="text-sm font-semibold truncate" :class="member.isMe ? 'text-primary' : 'text-on-surface'">
                      {{ member.name }}
                      <span v-if="member.isMe" class="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full ml-1">YOU</span>
                    </p>
                  </div>
                  <p class="text-[10px] text-on-surface-variant truncate">{{ member.location }}</p>
                  <!-- Badges inline (first 4) -->
                  <div class="flex gap-0.5 mt-0.5">
                    <span v-for="b in member.badges.slice(0,4)" :key="b.id"
                          class="text-[13px] cursor-pointer" :title="b.label + ': ' + b.desc"
                          @click.stop="router.push('/community')">{{ b.emoji }}</span>
                    <span v-if="member.badges.length > 4"
                          class="text-[10px] text-on-surface-variant self-center">+{{ member.badges.length - 4 }}</span>
                  </div>
                </div>
              </div>
              <!-- Score -->
              <div class="col-span-2 text-right hidden sm:block">
                <p class="text-sm font-bold text-on-surface">{{ member.score.toLocaleString() }}</p>
                <p class="text-[10px] text-on-surface-variant">pts</p>
              </div>
              <!-- kWh -->
              <div class="col-span-2 text-right hidden sm:block">
                <p class="text-sm font-semibold text-primary">{{ member.kwhSaved.toLocaleString() }}</p>
                <p class="text-[10px] text-on-surface-variant">kWh</p>
              </div>
              <!-- Streak -->
              <div class="col-span-2 text-right hidden sm:block">
                <p class="text-sm font-semibold text-on-surface">{{ member.streak }}🔥</p>
                <p class="text-[10px] text-on-surface-variant">days</p>
              </div>
              <!-- Trend -->
              <div class="col-span-1 flex justify-end items-center gap-1">
                <span class="material-symbols-outlined text-[18px]" :class="trendIcon(member).cls">
                  {{ trendIcon(member).icon }}
                </span>
              </div>
            </div>

            <!-- Expandable detail row -->
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-[400px]"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 max-h-[400px]"
              leave-to-class="opacity-0 max-h-0"
            >
              <!-- MARKER: LEADERBOARD-DETAIL-ROW -->
              <div v-if="expandedMember === member.id"
                   class="overflow-hidden bg-surface-container-low border-t border-outline-variant/15 px-4 py-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Score breakdown -->
                  <div>
                    <p class="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant mb-2">
                      Score breakdown
                    </p>
                    <div class="space-y-1">
                      <div v-for="row in scoreBreakdown(member)" :key="row.label"
                           class="flex items-center justify-between text-xs">
                        <span class="text-on-surface-variant">{{ row.label }} (×{{ row.mult }})</span>
                        <div class="flex items-center gap-2">
                          <span class="text-on-surface-variant/60">{{ row.val }}</span>
                          <span class="font-bold w-16 text-right"
                                :class="row.pts < 0 ? 'text-red-500' : 'text-primary'">
                            {{ row.pts > 0 ? '+' : '' }}{{ row.pts.toLocaleString() }} pts
                          </span>
                        </div>
                      </div>
                      <div class="flex items-center justify-between text-xs pt-1 border-t border-outline-variant/20 font-bold">
                        <span class="text-on-surface">Total score</span>
                        <span class="text-primary">{{ member.score.toLocaleString() }} pts</span>
                      </div>
                    </div>
                  </div>
                  <!-- All badges -->
                  <div>
                    <p class="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant mb-2">
                      All badges ({{ member.badges.length }}/{{ BADGE_DEFS.length }})
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <div v-for="b in BADGE_DEFS" :key="b.id"
                           class="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] transition-all"
                           :class="member.badges.find(mb => mb.id === b.id)
                             ? 'bg-primary/8 text-on-surface cursor-pointer hover:bg-primary/15'
                             : 'bg-surface-container text-on-surface-variant/40 grayscale'"
                           :title="b.desc"
                           @click="router.push('/community')">
                        <span>{{ b.emoji }}</span>
                        <span class="font-medium">{{ b.label }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Achievement notification button (only on own row) -->
                <div v-if="member.isMe" class="mt-4 flex gap-2 flex-wrap">
                  <button
                    class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
                           solar-glow hover:opacity-90 transition-all"
                    @click="sendAchievement"
                  >
                    <span class="material-symbols-outlined text-[14px]">share</span>
                    Share achievement to community
                  </button>
                  <button
                    class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
                           bg-surface-container text-on-surface-variant border border-outline-variant/30
                           hover:bg-surface-container-high transition-all"
                    @click="router.push('/community')"
                  >
                    <span class="material-symbols-outlined text-[14px]">group</span>
                    View community
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ MY POSITION (sticky banner if not in top 10) ═══════════════════ -->
    <!-- MARKER: LEADERBOARD-MY-POSITION -->
    <div v-if="myEntry && myEntry.rank > 10"
         class="mb-8 rounded-2xl border-2 border-primary/30 p-4 shadow-lg"
         :style="{ ...cardStyle(), backgroundColor: 'color-mix(in srgb, var(--color-primary) 5%, var(--color-surface-container-lowest))' }">
      <p class="text-[10px] font-semibold uppercase tracking-widest text-primary mb-3">Your Position</p>
      <div class="flex items-center gap-3 flex-wrap">
        <div class="w-10 h-10 rounded-full overflow-hidden shrink-0">
          <img v-if="prefs.avatarUrl" :src="prefs.avatarUrl" class="w-full h-full object-cover" :alt="prefs.profile.displayName"/>
          <div v-else class="w-full h-full flex items-center justify-center text-sm font-bold"
               :class="avatarColour(prefs.profile.displayName || 'Me')">
            {{ initials(prefs.profile.displayName || 'Me') }}
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <p class="text-sm font-bold text-primary">{{ prefs.profile.displayName }} (you)</p>
            <span class="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">RANK #{{ myEntry.rank }}</span>
          </div>
          <div class="flex gap-1 mt-1 flex-wrap">
            <span v-for="b in myEntry.badges.slice(0,5)" :key="b.id"
                  class="text-base cursor-pointer" :title="b.label" @click="router.push('/community')">{{ b.emoji }}</span>
          </div>
        </div>
        <div class="text-right shrink-0">
          <p class="text-xl font-black text-primary">{{ myEntry.score.toLocaleString() }}</p>
          <p class="text-[10px] text-on-surface-variant">pts</p>
        </div>
        <div class="text-right shrink-0">
          <p class="text-xl font-black text-on-surface">{{ myEntry.kwhSaved }}</p>
          <p class="text-[10px] text-on-surface-variant">kWh</p>
        </div>
        <button
          class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold
                 solar-glow hover:opacity-90 transition-all shrink-0"
          @click="toggleDetail(myEntry.id)"
        >
          <span class="material-symbols-outlined text-[14px]">expand_more</span>
          Details
        </button>
      </div>

      <!-- Expandable my-detail -->
      <Transition enter-active-class="transition-all duration-200 ease-out"
                  enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-[400px]"
                  leave-active-class="transition-all duration-150 ease-in"
                  leave-from-class="opacity-100 max-h-[400px]" leave-to-class="opacity-0 max-h-0">
        <div v-if="expandedMember === myEntry?.id" class="overflow-hidden mt-4 pt-4 border-t border-primary/15">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p class="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant mb-2">Score breakdown</p>
              <div class="space-y-1">
                <div v-for="row in scoreBreakdown(myEntry)" :key="row.label"
                     class="flex items-center justify-between text-xs">
                  <span class="text-on-surface-variant">{{ row.label }} (×{{ row.mult }})</span>
                  <span class="font-bold" :class="row.pts < 0 ? 'text-red-500' : 'text-primary'">
                    {{ row.pts > 0 ? '+' : '' }}{{ row.pts.toLocaleString() }} pts
                  </span>
                </div>
                <div class="flex justify-between text-xs pt-1 border-t border-outline-variant/20 font-bold">
                  <span class="text-on-surface">Total</span>
                  <span class="text-primary">{{ myEntry.score.toLocaleString() }} pts</span>
                </div>
              </div>
            </div>
            <div>
              <p class="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant mb-2">
                My badges ({{ myEntry.badges.length }}/{{ BADGE_DEFS.length }})
              </p>
              <div class="flex flex-wrap gap-2">
                <div v-for="b in BADGE_DEFS" :key="b.id"
                     class="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] transition-all"
                     :class="myEntry.badges.find(mb => mb.id === b.id)
                       ? 'bg-primary/8 text-on-surface cursor-pointer hover:bg-primary/15'
                       : 'bg-surface-container text-on-surface-variant/40 grayscale'"
                     :title="b.desc" @click="router.push('/community')">
                  <span>{{ b.emoji }}</span><span class="font-medium">{{ b.label }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex gap-2 mt-4 flex-wrap">
            <button class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold solar-glow hover:opacity-90 transition-all"
                    @click="sendAchievement">
              <span class="material-symbols-outlined text-[14px]">share</span>Share achievement
            </button>
            <button class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
                           bg-surface-container text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-high transition-all"
                    @click="router.push('/community')">
              <span class="material-symbols-outlined text-[14px]">group</span>View community
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- ══ SECTION B — RANKS 11+ ═══════════════════════════════════════════ -->
    <!-- MARKER: LEADERBOARD-REST -->
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-4
                 flex items-center gap-2">
        <span class="flex-1 h-px bg-outline-variant/30"/>
        Community Tier — Rank 11 &amp; beyond
        <span class="flex-1 h-px bg-outline-variant/30"/>
      </h2>

      <div class="rounded-2xl border overflow-hidden" :style="cardStyle()">
        <div class="divide-y divide-outline-variant/10">
          <div
            v-for="member in restPage_" :key="member.id"
            class="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-container"
            :class="member.isMe ? 'bg-primary/5' : ''"
          >
            <span class="text-xs font-bold text-on-surface-variant w-8 text-center shrink-0">#{{ member.rank }}</span>
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                 :class="avatarColour(member.name)">
              {{ initials(member.name) }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5">
                <p class="text-sm font-semibold truncate"
                   :class="member.isMe ? 'text-primary' : 'text-on-surface'">{{ member.name }}</p>
                <span v-if="member.isMe" class="text-[9px] font-bold bg-primary/10 text-primary px-1 py-0.5 rounded-full shrink-0">YOU</span>
              </div>
              <div class="flex gap-0.5 mt-0.5">
                <span v-for="b in member.badges.slice(0,3)" :key="b.id"
                      class="text-[12px] cursor-pointer" :title="b.label"
                      @click="router.push('/community')">{{ b.emoji }}</span>
              </div>
            </div>
            <div class="hidden sm:block text-right shrink-0">
              <p class="text-xs font-bold text-primary">{{ member.kwhSaved.toLocaleString() }} kWh</p>
              <p class="text-[10px] text-on-surface-variant">{{ member.score.toLocaleString() }} pts</p>
            </div>
            <span class="material-symbols-outlined text-[16px] shrink-0" :class="trendIcon(member).cls">
              {{ trendIcon(member).icon }}
            </span>
          </div>
        </div>
        <!-- Load more -->
        <div v-if="hasMore" class="p-4 border-t border-outline-variant/10 text-center">
          <button
            class="px-6 py-2.5 rounded-xl text-sm font-semibold bg-surface-container
                   text-on-surface-variant hover:bg-surface-container-high transition-colors border border-outline-variant/30"
            @click="restPage++"
          >
            Load more ({{ restAll.length - restPage_.length }} remaining)
          </button>
        </div>
        <div v-if="!restAll.length" class="py-10 text-center text-on-surface-variant text-sm">
          No additional members found.
        </div>
      </div>
    </section>

    <!-- ══ HOW RANKINGS WORK — MODAL ═══════════════════════════════════════ -->
    <!-- MARKER: LEADERBOARD-SCORING-MODAL -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="scoringModalOpen"
             class="fixed inset-0 z-[500] flex items-center justify-center p-4"
             style="background:rgba(0,0,0,0.5); backdrop-filter:blur(4px);"
             @click.self="scoringModalOpen = false">
          <div class="w-full max-w-lg rounded-2xl border border-outline-variant/20 shadow-2xl
                      overflow-y-auto max-h-[88vh] p-6 space-y-5"
               :style="cardStyle()">
            <!-- Header -->
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-on-surface text-xl flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">info</span>
                How Rankings Work
              </h3>
              <button class="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors"
                      @click="scoringModalOpen = false">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <!-- Formula -->
            <div class="p-4 rounded-xl bg-primary/6 border border-primary/15">
              <p class="text-[10px] font-semibold uppercase tracking-widest text-primary mb-2">Scoring Formula</p>
              <code class="text-xs font-mono text-on-surface leading-relaxed block">
                Score = (kWh saved × 2)<br/>
                      + (streak days × 15)<br/>
                      + (meter readings × 5)<br/>
                      + (community posts × 3)<br/>
                      + (challenges × 25)<br/>
                      − (peak-hour draws × 10)
              </code>
            </div>

            <!-- Breakdown table -->
            <div class="space-y-3">
              <div v-for="item in SCORING_ITEMS" :key="item.label"
              class="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/15">
                <span class="material-symbols-outlined text-[20px] shrink-0 mt-0.5" :class="item.col">{{ item.icon }}</span>
                <div class="min-w-0">
                  <div class="flex items-center gap-2 flex-wrap mb-1">
                    <p class="text-sm font-bold text-on-surface">{{ item.label }}</p>
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono">{{ item.mult }}</span>
                  </div>
                  <p class="text-xs text-on-surface-variant leading-relaxed mb-1">{{ item.why }}</p>
                  <p class="text-[11px] text-primary font-medium flex items-center gap-1">
                    <span class="material-symbols-outlined text-[12px]">tips_and_updates</span>{{ item.tip }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Tie-breaker -->
            <div class="p-3 rounded-xl bg-surface-container border border-outline-variant/20">
              <p class="text-xs font-semibold text-on-surface mb-1">Tie-breaking order</p>
              <p class="text-xs text-on-surface-variant">
                1. Longer streak → 2. More meter readings → 3. Earlier join date
              </p>
            </div>

            <!-- Badge reference -->
            <div>
              <p class="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant mb-3">
                Community Badges
              </p>
              <div class="grid grid-cols-2 gap-2">
                <div v-for="b in BADGE_DEFS" :key="b.id"
                     class="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant/15">
                  <span class="text-xl shrink-0">{{ b.emoji }}</span>
                  <div class="min-w-0">
                    <p class="text-[11px] font-semibold text-on-surface truncate">{{ b.label }}</p>
                    <p class="text-[10px] text-on-surface-variant leading-tight">{{ b.desc }}</p>
                  </div>
                </div>
              </div>
            </div>

            <button class="w-full solar-glow py-3 rounded-2xl text-sm font-semibold"
                    @click="scoringModalOpen = false">Got it — let's climb the board!</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  <!-- MARKER: LEADERBOARD-VIEW-TEMPLATE-END -->
</template>

<style scoped>
.modal-enter-active { transition: all 0.25s ease; }
.modal-leave-active { transition: all 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from > div, .modal-leave-to > div { transform: scale(0.96) translateY(8px); }
</style>
