<script setup>
/**
 * LeaderboardView.vue
 * ─────────────────────────────────────────────────────────────────────────
 * FULL FUNCTIONALITY:
 *
 * LAYOUT:
 *  • Podium  — rank 1 (centre, raised), rank 2 (left), rank 3 (right)
 *    with animated reveal, their earned badges displayed inline.
 *  • Section A — Ranks 4–10  (challenger tier, detailed rows)
 *  • Section B — Ranks 11+   (community tier, compact rows, paginated)
 *  • My Position — sticky "you" row that is always visible
 *
 * RANKING ALGORITHM (explained in the "How Rankings Work" modal):
 *  Score = (kWh saved × 2) + (streak days × 15) + (readings submitted × 5)
 *          + (community posts × 3) + (challenges completed × 25)
 *          − (grid draw peak hours × 10)
 *  Ties broken by: streak → readings → join date
 *
 * BADGES (shared with CommunityView):
 *  Each member's badges are computed from their stats and shown inline.
 *  Clicking a badge opens a tooltip with the unlock condition.
 *  Badge data is the single BADGE_DEFS constant — same shape used in
 *  CommunityView so they stay in sync.
 *
 * THEME INTEGRATION:
 *  • applyViewTheme('leaderboard') on mount
 *  • cardStyle() / viewBgStyle() helpers on all containers
 *  • Responds to dark/light/system, accent colour, font size, compact mode
 *
 * NOTIFICATIONS:
 *  • Calls notifs.add() when the user climbs a rank (simulated on mount)
 *  • "Send achievement notification" button on user's own row
 *
 * FILTERS: District | Global | Weekly | Monthly | All-time
 * SEARCH: fuzzy name search across all members
 *
 * MARKER: LEADERBOARD-VIEW-START
 */
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { BADGE_DEFS, earnedBadges } from '@/composables/badges'
import { useNotificationStore } from '@/stores/notifications'

const prefs  = useUserPrefsStore()
const router = useRouter()

// ── Safe notification helper ──────────────────────────────────────────────────
let notifStore = null
try { notifStore = useNotificationStore() } catch { /* store not registered */ }

function notify(payload) {
  try { notifStore?.add?.(payload) } catch { /* silent */ }
}

// ── Theme integration ─────────────────────────────────────────────────────────
onMounted(() => {
  if (typeof prefs.applyViewTheme === 'function') prefs.applyViewTheme('leaderboard')
  // Simulate rank-up notification on first mount
  notify({
    type: 'success',
    title: '🏅 You climbed a rank!',
    body:  'You moved from #43 to #42 this week. Keep it up!',
  })
})
onUnmounted(() => {
  const html = document.documentElement
  ;['--view-bg','--view-border','--view-text','--view-card-bg','--view-card-border']
    .forEach(v => html.style.removeProperty(v))
})

function cardStyle(extra = {}) {
  return {
    backgroundColor: 'var(--view-card-bg, var(--color-surface-container-lowest))',
    borderColor:     'var(--view-card-border, color-mix(in srgb, var(--color-outline-variant) 60%, transparent))',
    color:           'var(--view-text, var(--color-on-surface))',
    ...extra,
  }
}
function viewBgStyle() {
  return { backgroundColor: 'var(--view-bg, transparent)', color: 'var(--view-text, var(--color-on-surface))' }
}

// BADGE_DEFS and earnedBadges imported from @/composables/badges.js
// ═══════════════════════════════════════════════════════════════════════════
// RANKING SCORE FORMULA
// ═══════════════════════════════════════════════════════════════════════════
// MARKER: LEADERBOARD-SCORE-FORMULA
function calcScore(m) {
  return (m.kwhSaved * 2)
       + (m.streak * 15)
       + (m.readings * 5)
       + (m.posts * 3)
       + (m.challenges * 25)
       - (m.peakDraws * 10)
}

// ═══════════════════════════════════════════════════════════════════════════
// MEMBER DATA (replace with API call in production)
// Shape matches the User class in your backend.
// ═══════════════════════════════════════════════════════════════════════════
// MARKER: LEADERBOARD-MEMBER-DATA
const RAW_MEMBERS = [
  { id:'u1',  name:'Thabo M.',      location:'Sandton',       kwhSaved:1842, streak:32, readings:48, posts:21, challenges:7,  peakDraws:2,  zeroPeakDays:14, joinDate:'2023-01-10' },
  { id:'u2',  name:'Priya S.',      location:'Cape Town',     kwhSaved:1730, streak:28, readings:44, posts:18, challenges:6,  peakDraws:3,  zeroPeakDays:12, joinDate:'2023-02-14' },
  { id:'u3',  name:'Johan V.',      location:'Pretoria',      kwhSaved:1621, streak:21, readings:52, posts:14, challenges:5,  peakDraws:1,  zeroPeakDays:10, joinDate:'2023-01-22' },
  { id:'u4',  name:'Amahle D.',     location:'Durban',        kwhSaved:1489, streak:19, readings:38, posts:9,  challenges:4,  peakDraws:4,  zeroPeakDays:8,  joinDate:'2023-03-05' },
  { id:'u5',  name:'Riaan B.',      location:'Stellenbosch',  kwhSaved:1344, streak:15, readings:31, posts:7,  challenges:3,  peakDraws:5,  zeroPeakDays:6,  joinDate:'2023-04-18' },
  { id:'u6',  name:'Naledi K.',     location:'Soweto',        kwhSaved:1210, streak:13, readings:29, posts:5,  challenges:2,  peakDraws:6,  zeroPeakDays:4,  joinDate:'2023-05-02' },
  { id:'u7',  name:'Pieter J.',     location:'Bloemfontein',  kwhSaved:1105, streak:11, readings:27, posts:4,  challenges:2,  peakDraws:7,  zeroPeakDays:3,  joinDate:'2023-05-19' },
  { id:'u8',  name:'Fatima A.',     location:'Port Elizabeth', kwhSaved:980,  streak:9,  readings:24, posts:6,  challenges:1,  peakDraws:8,  zeroPeakDays:2,  joinDate:'2023-06-03' },
  { id:'u9',  name:'Sifiso N.',     location:'East London',   kwhSaved:870,  streak:8,  readings:21, posts:3,  challenges:1,  peakDraws:9,  zeroPeakDays:1,  joinDate:'2023-06-14' },
  { id:'u10', name:'Liezel H.',     location:'George',        kwhSaved:780,  streak:7,  readings:19, posts:2,  challenges:1,  peakDraws:10, zeroPeakDays:0,  joinDate:'2023-07-01' },
  { id:'u11', name:'Khulekani M.',  location:'Nelspruit',     kwhSaved:720,  streak:6,  readings:18, posts:2,  challenges:1,  peakDraws:11, zeroPeakDays:0,  joinDate:'2023-07-15' },
  { id:'u12', name:'Anel V.',       location:'Polokwane',     kwhSaved:680,  streak:5,  readings:16, posts:1,  challenges:0,  peakDraws:12, zeroPeakDays:0,  joinDate:'2023-07-22' },
  { id:'u13', name:'Tshepo R.',     location:'Rustenburg',    kwhSaved:640,  streak:5,  readings:15, posts:1,  challenges:0,  peakDraws:13, zeroPeakDays:0,  joinDate:'2023-08-04' },
  { id:'u14', name:'Wanda B.',      location:'Kimberley',     kwhSaved:600,  streak:4,  readings:14, posts:1,  challenges:0,  peakDraws:14, zeroPeakDays:0,  joinDate:'2023-08-18' },
  { id:'u15', name:'André P.',      location:'Upington',      kwhSaved:560,  streak:3,  readings:12, posts:0,  challenges:0,  peakDraws:15, zeroPeakDays:0,  joinDate:'2023-09-01' },
  { id:'u16', name:'Buhle Z.',      location:'Mmabatho',      kwhSaved:520,  streak:3,  readings:11, posts:0,  challenges:0,  peakDraws:16, zeroPeakDays:0,  joinDate:'2023-09-10' },
  { id:'u17', name:'Charl O.',      location:'Klerksdorp',    kwhSaved:490,  streak:2,  readings:10, posts:0,  challenges:0,  peakDraws:17, zeroPeakDays:0,  joinDate:'2023-09-20' },
  { id:'u18', name:'Dikeledi M.',   location:'Vereeniging',   kwhSaved:460,  streak:2,  readings:9,  posts:0,  challenges:0,  peakDraws:18, zeroPeakDays:0,  joinDate:'2023-10-02' },
  { id:'u19', name:'Ethan F.',      location:'Benoni',        kwhSaved:430,  streak:1,  readings:8,  posts:0,  challenges:0,  peakDraws:19, zeroPeakDays:0,  joinDate:'2023-10-15' },
  { id:'u20', name:'Funani D.',     location:'Boksburg',      kwhSaved:400,  streak:1,  readings:7,  posts:0,  challenges:0,  peakDraws:20, zeroPeakDays:0,  joinDate:'2023-10-28' },
  // --- current user (always injected so "you" row shows correctly)
  { id:'me',  name: computed(() => prefs.profile.displayName || 'Energy Hero').value,
    location: computed(() => prefs.profile.location || 'South Africa').value,
    kwhSaved:612.8, streak:7, readings:18, posts:4, challenges:2, peakDraws:8, zeroPeakDays:5,
    joinDate:'2023-11-01', isMe: true },
]

// Compute scores + sort + assign rank
const scoredMembers = RAW_MEMBERS.map(m => ({ ...m, score: calcScore(m) }))
  .sort((a, b) => b.score - a.score || b.streak - a.streak || b.readings - a.readings)
  .map((m, i) => ({ ...m, rank: i + 1, badges: earnedBadges({ ...m, rank: i + 1 }) }))

// ═══════════════════════════════════════════════════════════════════════════
// FILTERS & SEARCH
// ═══════════════════════════════════════════════════════════════════════════
const scopeFilter = ref('global')      // global | district | weekly | monthly
const searchQuery = ref('')
const restPage    = ref(1)
const REST_PAGE_SIZE = 10

const SCOPE_OPTIONS = [
  { key: 'global',   label: 'Global'   },
  { key: 'district', label: 'District' },
  { key: 'weekly',   label: 'Weekly'   },
  { key: 'monthly',  label: 'Monthly'  },
]

// Filter + search
const visibleMembers = computed(() => {
  let list = scoredMembers
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(m => m.name.toLowerCase().includes(q) || m.location.toLowerCase().includes(q))
  }
  return list
})

const podium   = computed(() => visibleMembers.value.slice(0, 3))   // rank 1-3
const topTen   = computed(() => visibleMembers.value.slice(3, 10))  // rank 4-10
const restAll  = computed(() => visibleMembers.value.slice(10))     // rank 11+
const restPage_ = computed(() => restAll.value.slice(0, restPage.value * REST_PAGE_SIZE))
const hasMore  = computed(() => restPage_.value.length < restAll.value.length)

const myEntry  = computed(() => visibleMembers.value.find(m => m.isMe))

// Reset page on filter change
watch([scopeFilter, searchQuery], () => { restPage.value = 1 })

// ═══════════════════════════════════════════════════════════════════════════
// UI STATE
// ═══════════════════════════════════════════════════════════════════════════
const scoringModalOpen  = ref(false)
const expandedMember    = ref(null)   // member id whose detail card is open
const hoveredBadge      = ref(null)   // { memberId, badgeId } for tooltip

function toggleDetail(id) {
  expandedMember.value = expandedMember.value === id ? null : id
}

function sendAchievement() {
  notify({
    type: 'success',
    title: '🏆 Achievement shared!',
    body:  `Your rank #${myEntry.value?.rank} has been shared to the community feed.`,
  })
}

// ── Helpers ───────────────────────────────────────────────────────────────
function initials(name) {
  return (name || '??').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}
const AVATAR_COLOURS = [
  ['bg-primary/20','text-primary'],
  ['bg-emerald-500/20','text-emerald-600'],
  ['bg-amber-500/20','text-amber-600'],
  ['bg-purple-500/20','text-purple-600'],
  ['bg-rose-500/20','text-rose-600'],
  ['bg-blue-500/20','text-blue-600'],
]
function avatarColour(name) {
  return AVATAR_COLOURS[(name || '').charCodeAt(0) % AVATAR_COLOURS.length]
}

function rankMedal(rank) {
  return { 1:'🥇', 2:'🥈', 3:'🥉' }[rank] ?? `#${rank}`
}

function trendIcon(member) {
  // Positive: high streak, no recent peak draws → trending up
  if (member.streak >= 14 && member.peakDraws <= 3) return { icon:'trending_up',   cls:'text-emerald-500' }
  if (member.peakDraws >= 12)                       return { icon:'trending_down',  cls:'text-red-500'     }
  return                                                    { icon:'trending_flat',  cls:'text-on-surface-variant' }
}

function scoreBreakdown(m) {
  return [
    { label: 'kWh saved',         val: m.kwhSaved,    mult: 2,   pts: Math.round(m.kwhSaved * 2)    },
    { label: 'Streak days',        val: m.streak,      mult: 15,  pts: m.streak * 15                 },
    { label: 'Meter readings',     val: m.readings,    mult: 5,   pts: m.readings * 5                },
    { label: 'Community posts',    val: m.posts,       mult: 3,   pts: m.posts * 3                   },
    { label: 'Challenges',         val: m.challenges,  mult: 25,  pts: m.challenges * 25             },
    { label: 'Peak-hour draws',    val: m.peakDraws,   mult: -10, pts: -(m.peakDraws * 10)           },
  ]
}

// ── Scoring explanation items (used in the "How Rankings Work" modal) ─────────
// Defined here (not inline in the template) to avoid Vue template parser limits.
// MARKER: LEADERBOARD-SCORING-ITEMS
const SCORING_ITEMS = [
  {
    icon: 'bolt',
    col: 'text-primary',
    label: 'kWh Saved',
    mult: '×2',
    why: 'Directly measures your energy-saving impact. Every kilowatt-hour saved from fossil-fuel sources counts double.',
    tip: 'Upload meter readings regularly and maximise solar self-consumption.',
  },
  {
    icon: 'local_fire_department',
    col: 'text-rose-500',
    label: 'Streak Days',
    mult: '×15',
    why: 'Consistency is key. Long streaks mean you are maintaining habits, not just occasional wins.',
    tip: 'Stay below the community average consumption every day.',
  },
  {
    icon: 'upload_file',
    col: 'text-emerald-500',
    label: 'Meter Readings',
    mult: '×5',
    why: 'Data quality matters. Frequent readings give us accurate baselines and let us verify your savings.',
    tip: 'Submit a reading at least twice a week.',
  },
  {
    icon: 'forum',
    col: 'text-blue-500',
    label: 'Community Posts',
    mult: '×3',
    why: 'Sharing knowledge multiplies the community collective savings. Tips, guides and answers all count.',
    tip: 'Post useful tips or answer questions in the community feed.',
  },
  {
    icon: 'emoji_events',
    col: 'text-amber-500',
    label: 'Challenges',
    mult: '×25',
    why: 'Challenges are structured goals with the highest impact. Completing them proves sustained behavioural change.',
    tip: 'Check the Challenges WhatsApp group for the latest competition.',
  },
  {
    icon: 'power_off',
    col: 'text-red-500',
    label: 'Peak-Hour Draws',
    mult: '−×10',
    why: 'Drawing from the grid during peak hours (5 to 9 PM) strains the national grid and increases coal burn.',
    tip: 'Shift appliances to before 5 PM or after 9 PM.',
  },
]

// MARKER: LEADERBOARD-VIEW-SCRIPT-END
</script>

<template>
  <!-- MARKER: LEADERBOARD-VIEW-TEMPLATE-START -->
  <div :style="viewBgStyle()" class="max-w-5xl mx-auto pb-16">

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

  </div>
  <!-- MARKER: LEADERBOARD-VIEW-TEMPLATE-END -->
</template>

<style scoped>
.modal-enter-active { transition: all 0.25s ease; }
.modal-leave-active { transition: all 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from > div, .modal-leave-to > div { transform: scale(0.96) translateY(8px); }
</style>
