<script setup>
/**
 * ImpactReport.vue
 * ─────────────────────────────────────────────────────────────────────────
 * Impact Report modal + PDF export.
 *
 * HOW IT WORKS:
 * 1. The "View Impact Report" button in SideBar opens this modal.
 * 2. The modal renders a fully-styled HTML report (not a canvas).
 * 3. "Download PDF" uses html2canvas to snapshot the report element,
 *    then jsPDF to embed it as a multi-page PDF — no backend required.
 * 4. All data is pulled from userPrefs (profile), localStorage (tickets,
 *    posts), and the same seed data used in Dashboard / Leaderboard.
 *    In production, replace REPORT_DATA with an API call.
 *
 * DEPENDENCIES (loaded from CDN at runtime — no npm install needed):
 *   jsPDF     https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
 *   html2canvas https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
 *
 * THEME INTEGRATION:
 * • Inherits --color-primary, --color-on-surface, --color-surface-* from userPrefs.
 * • Report card uses white/light-grey so the PDF always looks clean regardless
 *   of the current dark/light mode — PDF output is always light-themed.
 *
 * MARKER: IMPACT-REPORT-START
 */
import { ref, computed, nextTick } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { BADGE_DEFS, earnedBadges } from '@/composables/badges'

const prefs = useUserPrefsStore()

// ── Modal state ────────────────────────────────────────────────────────────────
const open        = ref(false)
const generating  = ref(false)
const reportRef   = ref(null)

defineExpose({ openReport })
function openReport() { open.value = true }

// ── Report data ────────────────────────────────────────────────────────────────
// In production replace these stubs with your API response.
// Shape mirrors the data used in DashboardView and LeaderboardView.
const REPORT_DATA = computed(() => {
  const tickets = (() => {
    try { return JSON.parse(localStorage.getItem('ep-support-tickets') || '[]') } catch { return [] }
  })()
  const posts = (() => {
    try { return JSON.parse(localStorage.getItem('ep-community-posts') || '[]') } catch { return [] }
  })()

  const kwhSaved    = 612.8
  const kwhTotal    = 789.4
  const greenPct    = Math.round((kwhSaved / kwhTotal) * 100)
  const co2Saved    = (kwhSaved * 0.92).toFixed(1)   // 0.92 kg CO₂/kWh SA grid factor
  const moneySaved  = (kwhSaved * 2.48).toFixed(2)   // ZAR 2.48/kWh average tariff
  const streak      = 7
  const rank        = 42
  const readings    = 18
  const challenges  = 2

  const myStats = { kwhSaved, streak, readings, posts: posts.length,
                    challenges, zeroPeakDays: 5, rank }
  const badges = earnedBadges(myStats)

  const monthly = [
    { month: 'Jul', kwh: 98.2,  saved: 243.5 },
    { month: 'Aug', kwh: 104.1, saved: 258.2 },
    { month: 'Sep', kwh: 91.7,  saved: 227.4 },
    { month: 'Oct', kwh: 112.4, saved: 278.7 },
    { month: 'Nov', kwh: 108.6, saved: 269.3 },
    { month: 'Dec', kwh: 97.8,  saved: 242.7 },
  ]

  const maxKwh = Math.max(...monthly.map(m => m.kwh))

  return {
    generatedAt: new Date().toLocaleString('en-ZA', { dateStyle: 'long', timeStyle: 'short' }),
    period: 'July 2024 – December 2024',
    profile: {
      name:     prefs.profile.displayName || 'Energy Hero',
      email:    prefs.profile.email       || '—',
      location: prefs.profile.location    || 'South Africa',
    },
    kwhSaved, kwhTotal, greenPct, co2Saved, moneySaved,
    streak, rank, readings, challenges,
    badges, myStats,
    monthly, maxKwh,
    tickets: tickets.length,
    posts:   posts.length,
    treesEquiv: Math.round(Number(co2Saved) / 21.77),  // 1 tree ≈ 21.77 kg CO₂/year
  }
})

// ── PDF download ───────────────────────────────────────────────────────────────
async function downloadPDF() {
  if (generating.value) return
  generating.value = true

  try {
    // Load libs from CDN if not already present
    await loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
      'html2canvas-sdk'
    )
    await loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
      'jspdf-sdk'
    )

    const el = reportRef.value
    if (!el) return

    // Temporarily force light background for clean PDF output
    const prevBg = el.style.backgroundColor
    el.style.backgroundColor = '#ffffff'

    const canvas = await window.html2canvas(el, {
      scale:            2,
      useCORS:          true,
      backgroundColor:  '#ffffff',
      logging:          false,
      windowWidth:      el.scrollWidth,
      windowHeight:     el.scrollHeight,
    })

    el.style.backgroundColor = prevBg

    const { jsPDF } = window.jspdf
    const imgData   = canvas.toDataURL('image/png', 1.0)
    const pdfW      = 210        // A4 mm width
    const pdfH      = (canvas.height * pdfW) / canvas.width
    const pageH     = 297        // A4 mm height
    const pdf       = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    let yOffset = 0
    while (yOffset < pdfH) {
      if (yOffset > 0) pdf.addPage()
      // Crop slice of the image for this page
      const sliceCanvas   = document.createElement('canvas')
      const scaleF        = canvas.width / pdfW
      sliceCanvas.width   = canvas.width
      sliceCanvas.height  = Math.min(pageH * scaleF, canvas.height - yOffset * scaleF)
      const ctx = sliceCanvas.getContext('2d')
      ctx.drawImage(canvas, 0, yOffset * scaleF, sliceCanvas.width, sliceCanvas.height,
                    0, 0, sliceCanvas.width, sliceCanvas.height)
      pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG', 0, 0, pdfW,
                   sliceCanvas.height / scaleF)
      yOffset += pageH
    }

    const name = (prefs.profile.displayName || 'EcoSave').replace(/\s+/g, '_')
    pdf.save(`EcoSave_Impact_Report_${name}_${new Date().getFullYear()}.pdf`)
  } catch (err) {
    console.error('PDF generation failed:', err)
    alert('PDF generation failed. Please try again.')
  } finally {
    generating.value = false
  }
}

function loadScript(src, id) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) { resolve(); return }
    const s = document.createElement('script')
    s.id = id; s.src = src; s.onload = resolve; s.onerror = reject
    document.head.appendChild(s)
  })
}

// Bar chart helper — returns height % for a monthly bar
function barH(kwh, max) { return Math.round((kwh / max) * 100) }
// MARKER: IMPACT-REPORT-SCRIPT-END
</script>

<template>
  <!-- MARKER: IMPACT-REPORT-TEMPLATE-START -->

  <!-- ── Trigger slot ─────────────────────────────────────────────────────── -->
  <!-- Usage: <ImpactReport ref="reportModal" />
       Then call reportModal.openReport() from the sidebar button. -->

  <!-- ── Modal overlay ────────────────────────────────────────────────────── -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[600] flex items-start justify-center
               overflow-y-auto py-6 px-4"
        style="background: rgba(0,0,0,0.6); backdrop-filter: blur(6px);"
        @click.self="open = false"
      >
        <div class="w-full max-w-3xl space-y-4">

          <!-- ── Action bar (above the report card) ───────────────────── -->
          <div class="flex items-center justify-between flex-wrap gap-3 px-1">
            <h2 class="text-white font-bold text-lg flex items-center gap-2">
              <span class="material-symbols-outlined text-[22px]"
                    style="font-variation-settings:'FILL' 1">description</span>
              Impact Report Preview
            </h2>
            <div class="flex gap-2">
              <button
                class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                       bg-white/15 text-white border border-white/20
                       hover:bg-white/25 transition-all min-h-[44px]"
                @click="open = false"
              >
                <span class="material-symbols-outlined text-[18px]">close</span>
                Close
              </button>
              <button
                class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                       bg-primary text-on-primary hover:opacity-90 transition-all
                       min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
                :disabled="generating"
                @click="downloadPDF"
              >
                <span
                  class="material-symbols-outlined text-[18px]"
                  :class="generating ? 'animate-spin' : ''"
                >{{ generating ? 'progress_activity' : 'download' }}</span>
                {{ generating ? 'Generating PDF…' : 'Download PDF' }}
              </button>
            </div>
          </div>

          <!-- ══════════════════════════════════════════════════════════════
               REPORT CARD — this is what gets captured by html2canvas
               MARKER: IMPACT-REPORT-CARD
               ══════════════════════════════════════════════════════════════ -->
          <div
            ref="reportRef"
            class="bg-white rounded-2xl overflow-hidden shadow-2xl"
            style="font-family: 'Inter', system-ui, sans-serif; color: #111;"
          >

            <!-- ── Cover header ────────────────────────────────────────── -->
            <div
              class="px-10 py-10 relative overflow-hidden"
              style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dim, #1d4ed8) 100%);"
            >
              <!-- Decorative circles -->
              <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10"
                   style="background: white;"/>
              <div class="absolute -bottom-16 -left-8 w-64 h-64 rounded-full opacity-10"
                   style="background: white;"/>

              <div class="relative z-10 flex justify-between items-start flex-wrap gap-6">
                <div>
                  <!-- Logo / brand -->
                  <div class="flex items-center gap-2 mb-4">
                    <span class="material-symbols-outlined text-white/90 text-[28px]"
                          style="font-variation-settings:'FILL' 1">solar_power</span>
                    <span class="text-white/90 font-bold text-xl tracking-tight">EcoSave</span>
                  </div>
                  <h1 class="text-white font-extrabold text-4xl tracking-tight mb-1">
                    Impact Report
                  </h1>
                  <p class="text-white/75 text-base">{{ REPORT_DATA.period }}</p>
                </div>
                <!-- Profile block -->
                <div class="text-right">
                  <p class="text-white font-bold text-xl">{{ REPORT_DATA.profile.name }}</p>
                  <p class="text-white/70 text-sm">{{ REPORT_DATA.profile.email }}</p>
                  <p class="text-white/70 text-sm">{{ REPORT_DATA.profile.location }}</p>
                  <p class="text-white/50 text-xs mt-3">Generated {{ REPORT_DATA.generatedAt }}</p>
                </div>
              </div>

              <!-- Quick KPI strip -->
              <div class="relative z-10 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div v-for="kpi in [
                  { icon:'bolt',       val: REPORT_DATA.kwhSaved + ' kWh', label: 'Energy Saved'  },
                  { icon:'eco',        val: REPORT_DATA.co2Saved + ' kg',  label: 'CO₂ Offset'   },
                  { icon:'payments',   val: 'R ' + REPORT_DATA.moneySaved, label: 'Est. Savings'  },
                  { icon:'leaderboard',val: '#' + REPORT_DATA.rank,         label: 'Community Rank'},
                ]" :key="kpi.label"
                class="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                  <p class="text-white font-black text-xl leading-tight">{{ kpi.val }}</p>
                  <p class="text-white/65 text-[10px] uppercase tracking-wider mt-0.5">{{ kpi.label }}</p>
                </div>
              </div>
            </div>

            <!-- ── Report body ─────────────────────────────────────────── -->
            <div class="px-10 py-8 space-y-10">

              <!-- SECTION 1: Energy summary ─────────────────────────────── -->
              <!-- MARKER: REPORT-SECTION-ENERGY -->
              <section>
                <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
                    style="color: var(--color-primary); border-color: var(--color-primary);">
                  01 — Energy Summary
                </h2>
                <div class="grid grid-cols-3 gap-4 mb-6">
                  <div class="rounded-xl p-4 text-center" style="background:#f8fafc; border:1px solid #e2e8f0;">
                    <p class="text-3xl font-black" style="color: var(--color-primary);">{{ REPORT_DATA.kwhSaved }}</p>
                    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">kWh Saved</p>
                  </div>
                  <div class="rounded-xl p-4 text-center" style="background:#f8fafc; border:1px solid #e2e8f0;">
                    <p class="text-3xl font-black" style="color: var(--color-primary);">{{ REPORT_DATA.greenPct }}%</p>
                    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Green Energy</p>
                  </div>
                  <div class="rounded-xl p-4 text-center" style="background:#f8fafc; border:1px solid #e2e8f0;">
                    <p class="text-3xl font-black" style="color: var(--color-primary);">{{ REPORT_DATA.kwhTotal }}</p>
                    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">kWh Total Used</p>
                  </div>
                </div>

                <!-- Horizontal green bar -->
                <div>
                  <div class="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>Green energy portion</span>
                    <span>{{ REPORT_DATA.greenPct }}%</span>
                  </div>
                  <div class="w-full h-4 rounded-full overflow-hidden" style="background:#e2e8f0;">
                    <div class="h-full rounded-full transition-all"
                         :style="{ width: REPORT_DATA.greenPct + '%', background: 'var(--color-primary)' }"/>
                  </div>
                  <div class="flex justify-between text-xs text-slate-400 mt-1">
                    <span>0 kWh</span><span>{{ REPORT_DATA.kwhTotal }} kWh</span>
                  </div>
                </div>
              </section>

              <!-- SECTION 2: Monthly trend bar chart ──────────────────────── -->
              <!-- MARKER: REPORT-SECTION-CHART -->
              <section>
                <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
                    style="color: var(--color-primary); border-color: var(--color-primary);">
                  02 — Monthly Energy Trend
                </h2>
                <div class="flex items-end justify-between gap-2" style="height: 120px;">
                  <div
                    v-for="m in REPORT_DATA.monthly"
                    :key="m.month"
                    class="flex-1 flex flex-col items-center gap-1"
                  >
                    <span class="text-[9px] font-bold" style="color: var(--color-primary);">{{ m.kwh }}</span>
                    <div
                      class="w-full rounded-t-md transition-all"
                      :style="{
                        height: barH(m.kwh, REPORT_DATA.maxKwh) + '%',
                        background: 'var(--color-primary)',
                        opacity: 0.75 + (barH(m.kwh, REPORT_DATA.maxKwh) / 400),
                        minHeight: '8px',
                      }"
                    />
                    <span class="text-[9px] text-slate-400 font-medium">{{ m.month }}</span>
                  </div>
                </div>
                <p class="text-[10px] text-slate-400 mt-2 text-right">kWh saved per month</p>
              </section>

              <!-- SECTION 3: Environmental impact ─────────────────────────── -->
              <!-- MARKER: REPORT-SECTION-ENVIRONMENT -->
              <section>
                <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
                    style="color: var(--color-primary); border-color: var(--color-primary);">
                  03 — Environmental Impact
                </h2>
                <div class="grid grid-cols-2 gap-4">
                  <div v-for="stat in [
                    { emoji:'🌿', val: REPORT_DATA.co2Saved + ' kg', label:'CO₂ Offset', sub:'vs. SA grid average' },
                    { emoji:'🌳', val: REPORT_DATA.treesEquiv + ' trees', label:'Tree Equivalent', sub:'annual CO₂ absorption' },
                    { emoji:'💧', val: '18 400 L',               label:'Water Saved',   sub:'via shorter showers' },
                    { emoji:'⚡', val: REPORT_DATA.streak + '-day streak', label:'Consistency',  sub:'daily green habit' },
                  ]" :key="stat.label"
                  class="flex items-start gap-3 rounded-xl p-4" style="background:#f8fafc; border:1px solid #e2e8f0;">
                    <span class="text-2xl shrink-0">{{ stat.emoji }}</span>
                    <div>
                      <p class="text-xl font-black" style="color: var(--color-primary);">{{ stat.val }}</p>
                      <p class="text-xs font-semibold text-slate-700">{{ stat.label }}</p>
                      <p class="text-[10px] text-slate-400 mt-0.5">{{ stat.sub }}</p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- SECTION 4: Financial savings ──────────────────────────── -->
              <!-- MARKER: REPORT-SECTION-FINANCIAL -->
              <section>
                <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
                    style="color: var(--color-primary); border-color: var(--color-primary);">
                  04 — Financial Savings
                </h2>
                <div class="grid grid-cols-3 gap-4">
                  <div v-for="f in [
                    { label:'Estimated Savings', val: 'R ' + REPORT_DATA.moneySaved,       sub:'at R2.48/kWh'         },
                    { label:'Projected Annual',  val: 'R ' + (Number(REPORT_DATA.moneySaved) * 2).toFixed(2), sub:'based on current rate' },
                    { label:'5-Year Projection', val: 'R ' + (Number(REPORT_DATA.moneySaved) * 10).toFixed(0), sub:'at current consumption' },
                  ]" :key="f.label"
                  class="rounded-xl p-4 text-center" style="background:#f0fdf4; border:1px solid #bbf7d0;">
                    <p class="text-lg font-black text-emerald-700">{{ f.val }}</p>
                    <p class="text-xs font-semibold text-slate-600 mt-1">{{ f.label }}</p>
                    <p class="text-[10px] text-slate-400 mt-0.5">{{ f.sub }}</p>
                  </div>
                </div>
                <p class="text-[10px] text-slate-400 mt-3 italic">
                  * Estimates based on Eskom's published Schedule of Tariffs and Charges. Actual savings may vary.
                </p>
              </section>

              <!-- SECTION 5: Community standing ───────────────────────────── -->
              <!-- MARKER: REPORT-SECTION-COMMUNITY -->
              <section>
                <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
                    style="color: var(--color-primary); border-color: var(--color-primary);">
                  05 — Community Standing
                </h2>
                <div class="grid grid-cols-4 gap-3 mb-5">
                  <div v-for="s in [
                    { icon:'leaderboard', val:'#' + REPORT_DATA.rank,       label:'Community Rank'  },
                    { icon:'upload_file', val:REPORT_DATA.readings,          label:'Meter Readings'  },
                    { icon:'emoji_events',val:REPORT_DATA.challenges,        label:'Challenges Done' },
                    { icon:'forum',       val:REPORT_DATA.posts,             label:'Community Posts' },
                  ]" :key="s.label"
                  class="rounded-xl p-3 text-center" style="background:#f8fafc; border:1px solid #e2e8f0;">
                    <p class="text-2xl font-black" style="color: var(--color-primary);">{{ s.val }}</p>
                    <p class="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mt-1">{{ s.label }}</p>
                  </div>
                </div>

                <!-- Badges ── -->
                <div>
                  <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Earned Badges ({{ REPORT_DATA.badges.length }}/{{ BADGE_DEFS.length }})
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <div
                      v-for="b in BADGE_DEFS"
                      :key="b.id"
                      class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                      :style="REPORT_DATA.badges.find(eb => eb.id === b.id)
                        ? { background: 'color-mix(in srgb, var(--color-primary) 12%, white)', color: 'var(--color-primary)', border: '1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)' }
                        : { background: '#f1f5f9', color: '#94a3b8', border: '1px solid #e2e8f0' }"
                    >
                      <span :style="REPORT_DATA.badges.find(eb => eb.id === b.id) ? {} : { filter: 'grayscale(1)', opacity: '0.5' }">
                        {{ b.emoji }}
                      </span>
                      {{ b.label }}
                    </div>
                  </div>
                </div>
              </section>

              <!-- SECTION 6: Recommendations ───────────────────────────────── -->
              <!-- MARKER: REPORT-SECTION-RECS -->
              <section>
                <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
                    style="color: var(--color-primary); border-color: var(--color-primary);">
                  06 — Personalised Recommendations
                </h2>
                <div class="space-y-3">
                  <div
                    v-for="rec in [
                      { icon:'bolt',         tip:'Run your geyser, dishwasher and washing machine before 5 PM to avoid Eskom peak-hour tariffs and reduce grid strain.' },
                      { icon:'solar_power',  tip:'Your solar generation peaks between 10 AM and 3 PM. Schedule high-wattage appliances in this window for maximum self-consumption.' },
                      { icon:'local_fire_department', tip:'Your current ' + REPORT_DATA.streak + '-day streak is great. Aim for 30 days to unlock the Hot Streak badge and jump up the leaderboard.' },
                      { icon:'upload_file',  tip:'Submitting meter readings twice a week (instead of once) increases your score by 10 points per week and improves your data accuracy.' },
                    ]"
                    :key="rec.tip.slice(0,30)"
                    class="flex items-start gap-3 rounded-xl p-3"
                    style="background:#f8fafc; border:1px solid #e2e8f0;"
                  >
                    <span class="material-symbols-outlined text-[18px] mt-0.5 shrink-0"
                          style="color: var(--color-primary);">{{ rec.icon }}</span>
                    <p class="text-xs text-slate-600 leading-relaxed">{{ rec.tip }}</p>
                  </div>
                </div>
              </section>

              <!-- Report footer ──────────────────────────────────────────── -->
              <footer class="border-t border-slate-200 pt-6 flex items-center justify-between flex-wrap gap-3">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[20px]"
                        style="color: var(--color-primary); font-variation-settings:'FILL' 1;">solar_power</span>
                  <span class="font-bold text-slate-700">EcoSave</span>
                  <span class="text-slate-400 text-xs">· Empowering sustainable homes across South Africa</span>
                </div>
                <p class="text-[10px] text-slate-400">
                  Confidential · Generated for {{ REPORT_DATA.profile.name }} · {{ REPORT_DATA.generatedAt }}
                </p>
              </footer>

            </div>
          </div>
          <!-- END REPORT CARD -->

        </div>
      </div>
    </Transition>
  </Teleport>
  <!-- MARKER: IMPACT-REPORT-TEMPLATE-END -->
</template>

<style scoped>
.modal-enter-active { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.modal-leave-active { transition: all 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.97) translateY(10px); }
</style>
