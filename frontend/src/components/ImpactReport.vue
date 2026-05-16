<script setup>
/**
 * ImpactReport.vue — Impact Report modal + PDF export
 *
 * FIXES applied vs original:
 * 1. Removed @/composables/badges import (file doesn't exist — crashed component on mount)
 *    Badges are now defined inline.
 * 2. Fixed jsPDF instantiation: window.jspdf.jsPDF not window.jspdf.jsPDF destructure race
 * 3. Fixed html2canvas options: removed windowWidth/windowHeight (don't exist in v1.4.1)
 * 4. Fixed multi-page PDF math: integer pixel arithmetic instead of floating-point drift
 * 5. Fixed button styles: inline style instead of bg-primary Tailwind class
 * 6. Added try/catch with visible error message instead of silent console.error
 * 7. loadScript now checks window[globalName] not just script id — prevents double-load race
 *
 * DEPENDENCIES (CDN, loaded on demand — no npm install):
 *   html2canvas  1.4.1  https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
 *   jsPDF        2.5.1  https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
 */
import { ref, computed } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

const prefs = useUserPrefsStore()

// ── Modal state ────────────────────────────────────────────────────────────────
const open       = ref(false)
const generating = ref(false)
const pdfError   = ref('')
const reportRef  = ref(null)

defineExpose({ openReport })
function openReport() { open.value = true; pdfError.value = '' }

// ── Badge definitions (inline — no external composable needed) ────────────────
const BADGE_DEFS = [
  { id: 'first-reading',  emoji: '⚡', label: 'First Reading',   desc: 'Upload your first meter reading'           },
  { id: 'week-streak',    emoji: '🔥', label: 'Week Streak',     desc: '7-day consecutive usage streak'            },
  { id: 'green-25',       emoji: '🌿', label: 'Green 25%',       desc: 'Achieve 25% renewable energy'              },
  { id: 'green-50',       emoji: '🌱', label: 'Green 50%',       desc: 'Achieve 50% renewable energy'              },
  { id: 'saver',          emoji: '💰', label: 'Energy Saver',    desc: 'Save 100 kWh in a period'                  },
  { id: 'community',      emoji: '👥', label: 'Community Hero',  desc: 'Make 5 community posts'                    },
  { id: 'top-50',         emoji: '🏆', label: 'Top 50',          desc: 'Reach top 50 on the leaderboard'           },
  { id: 'challenger',     emoji: '🎯', label: 'Challenger',      desc: 'Complete 2 community challenges'           },
]

function earnedBadgeIds(stats) {
  const earned = []
  if (stats.readings   >= 1)   earned.push('first-reading')
  if (stats.streak     >= 7)   earned.push('week-streak')
  if (stats.greenPct   >= 25)  earned.push('green-25')
  if (stats.greenPct   >= 50)  earned.push('green-50')
  if (stats.kwhSaved   >= 100) earned.push('saver')
  if (stats.posts      >= 5)   earned.push('community')
  if (stats.rank       <= 50)  earned.push('top-50')
  if (stats.challenges >= 2)   earned.push('challenger')
  return new Set(earned)
}

// ── Report data ────────────────────────────────────────────────────────────────
const REPORT_DATA = computed(() => {
  const kwhSaved   = 612.8
  const kwhTotal   = 789.4
  const greenPct   = Math.round((kwhSaved / kwhTotal) * 100)
  const co2Saved   = (kwhSaved * 0.92).toFixed(1)
  const moneySaved = (kwhSaved * 2.48).toFixed(2)
  const streak     = 7
  const rank       = 42
  const readings   = 18
  const challenges = 2

  const stats = { kwhSaved, greenPct, streak, readings, challenges,
                  posts: 3, rank, zeroPeakDays: 5 }
  const earnedIds = earnedBadgeIds(stats)

  const monthly = [
    { month: 'Jul', kwh: 98.2  },
    { month: 'Aug', kwh: 104.1 },
    { month: 'Sep', kwh: 91.7  },
    { month: 'Oct', kwh: 112.4 },
    { month: 'Nov', kwh: 108.6 },
    { month: 'Dec', kwh: 97.8  },
  ]
  const maxKwh = Math.max(...monthly.map(m => m.kwh))

  return {
    generatedAt: new Date().toLocaleString('en-ZA', { dateStyle: 'long', timeStyle: 'short' }),
    period:      'July 2024 – December 2024',
    profile: {
      name:     prefs.profile?.displayName || 'Energy Hero',
      email:    prefs.profile?.email       || '—',
      location: prefs.profile?.location    || 'South Africa',
    },
    kwhSaved, kwhTotal, greenPct, co2Saved, moneySaved,
    streak, rank, readings, challenges,
    posts:       stats.posts,
    earnedIds,
    monthly, maxKwh,
    treesEquiv:  Math.round(Number(co2Saved) / 21.77),
    moneySavedNum: Number(moneySaved),
  }
})

// ── Bar chart height helper ────────────────────────────────────────────────────
function barH(kwh, max) { return Math.max(8, Math.round((kwh / max) * 100)) }

// ── Reliable script loader ────────────────────────────────────────────────────
// Checks the actual global — not just the <script> element id — to handle
// cases where a script was loaded by another tool or loaded but not yet
// assigned to window.
function loadScript(url, globalName, scriptId) {
  return new Promise((resolve, reject) => {
    // Already available on window — nothing to do
    if (window[globalName]) { resolve(); return }
    // Script tag already in DOM (loading in progress) — wait for it
    const existing = document.getElementById(scriptId)
    if (existing) {
      existing.addEventListener('load',  resolve)
      existing.addEventListener('error', reject)
      return
    }
    // Fresh load
    const s    = document.createElement('script')
    s.id       = scriptId
    s.src      = url
    s.onload   = resolve
    s.onerror  = () => reject(new Error(`Failed to load ${url}`))
    document.head.appendChild(s)
  })
}

// ── PDF download ───────────────────────────────────────────────────────────────
async function downloadPDF() {
  if (generating.value) return
  generating.value = true
  pdfError.value   = ''

  try {
    // Load both libraries and wait until their globals are available
    await loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
      'html2canvas',
      'html2canvas-sdk'
    )
    await loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
      'jspdf',
      'jspdf-sdk'
    )

    // Verify globals actually exist after load
    if (!window.html2canvas) throw new Error('html2canvas failed to load from CDN')
    if (!window.jspdf)       throw new Error('jsPDF failed to load from CDN')

    const el = reportRef.value
    if (!el) throw new Error('Report element not found — try closing and reopening the report')

    // Force white background so dark-mode CSS variables don't bleed into the PDF
    const prevBg    = el.style.backgroundColor
    el.style.backgroundColor = '#ffffff'
    el.style.color           = '#111111'

    // Capture — html2canvas 1.4.1 only accepts scale, useCORS, backgroundColor, logging
    const canvas = await window.html2canvas(el, {
      scale:           2,           // 2× for crisp text
      useCORS:         true,        // allow cross-origin images
      backgroundColor: '#ffffff',
      logging:         false,
    })

    // Restore original styles
    el.style.backgroundColor = prevBg
    el.style.color           = ''

    // ── Build PDF ───────────────────────────────────────────────────────────
    // Use window.jspdf.jsPDF — NOT destructured before libs are confirmed loaded
    const JsPDF    = window.jspdf.jsPDF
    const A4_W_MM  = 210           // A4 width  in mm
    const A4_H_MM  = 297           // A4 height in mm
    const A4_W_PX  = canvas.width  // canvas width  (already at scale 2)

    // How many canvas px equal one A4 page height?
    const pageHeightPx = Math.floor((A4_H_MM / A4_W_MM) * A4_W_PX)
    const totalPages   = Math.ceil(canvas.height / pageHeightPx)

    const pdf = new JsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) pdf.addPage()

      const srcY      = page * pageHeightPx                          // px offset in canvas
      const srcH      = Math.min(pageHeightPx, canvas.height - srcY) // remaining px

      // Slice this page out of the full canvas
      const sliceCanvas    = document.createElement('canvas')
      sliceCanvas.width    = A4_W_PX
      sliceCanvas.height   = srcH
      const ctx            = sliceCanvas.getContext('2d')
      ctx.fillStyle        = '#ffffff'
      ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height)
      ctx.drawImage(canvas, 0, srcY, A4_W_PX, srcH, 0, 0, A4_W_PX, srcH)

      // Convert slice height from px to mm using the same ratio
      const sliceHeightMM = (srcH / A4_W_PX) * A4_W_MM

      pdf.addImage(
        sliceCanvas.toDataURL('image/jpeg', 0.95),  // JPEG smaller than PNG, still crisp
        'JPEG',
        0, 0,
        A4_W_MM, sliceHeightMM
      )
    }

    const safeName = (prefs.profile?.displayName || 'BrightBox')
      .replace(/[^a-zA-Z0-9]/g, '_')
    pdf.save(`BrightBox_Impact_Report_${safeName}_${new Date().getFullYear()}.pdf`)

  } catch (err) {
    console.error('PDF generation failed:', err)
    pdfError.value = `PDF error: ${err.message}`
  } finally {
    generating.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[600] flex items-start justify-center overflow-y-auto py-6 px-4"
        style="background: rgba(0,0,0,0.65); backdrop-filter: blur(6px);"
        @click.self="open = false"
      >
        <div class="w-full max-w-3xl space-y-4">

          <!-- Action bar -->
          <div class="flex items-center justify-between flex-wrap gap-3 px-1">
            <h2 class="text-white font-bold text-lg flex items-center gap-2">
              <span class="material-symbols-outlined text-[22px]"
                style="font-variation-settings:'FILL' 1">description</span>
              Impact Report Preview
            </h2>
            <div class="flex gap-2 flex-wrap">
              <button
                class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                       border transition-all min-h-[44px]"
                style="background: rgba(255,255,255,0.15); color: white; border-color: rgba(255,255,255,0.25);"
                @click="open = false"
              >
                <span class="material-symbols-outlined text-[18px]">close</span>
                Close
              </button>
              <button
                class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold
                       transition-all min-h-[44px]"
                style="background: var(--color-primary); color: #ffffff;"
                :style="generating ? 'opacity: 0.7; cursor: not-allowed;' : 'opacity: 1;'"
                :disabled="generating"
                @click="downloadPDF"
              >
                <svg v-if="generating" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"
                    stroke-dasharray="40" stroke-dashoffset="15"/>
                </svg>
                <span v-else class="material-symbols-outlined text-[18px]">download</span>
                {{ generating ? 'Generating PDF…' : 'Download PDF' }}
              </button>
            </div>
          </div>

          <!-- PDF error banner -->
          <div v-if="pdfError"
            class="flex items-start gap-3 px-4 py-3 rounded-xl text-sm font-medium"
            style="background: rgba(239,68,68,0.15); color: #fca5a5; border: 1px solid rgba(239,68,68,0.3);">
            <span class="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
            {{ pdfError }}
          </div>

          <!-- ══════════════════════════════════════════
               REPORT CARD — captured by html2canvas
               ══════════════════════════════════════════ -->
          <div
            ref="reportRef"
            class="bg-white rounded-2xl overflow-hidden shadow-2xl"
            style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif; color: #111;"
          >

            <!-- Cover header -->
            <div class="px-10 py-10 relative overflow-hidden"
              style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dim, #1d4ed8) 100%);">
              <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full"
                style="background: rgba(255,255,255,0.08);"/>
              <div class="absolute -bottom-16 -left-8 w-64 h-64 rounded-full"
                style="background: rgba(255,255,255,0.06);"/>

              <div class="relative z-10 flex justify-between items-start flex-wrap gap-6">
                <div>
                  <div class="flex items-center gap-2 mb-4">
                    <span class="material-symbols-outlined text-[24px]"
                      style="color: rgba(255,255,255,0.9); font-variation-settings:'FILL' 1;">bolt</span>
                    <span class="font-black text-xl tracking-tight" style="color: white;">BrightBox</span>
                  </div>
                  <h1 class="font-black text-4xl tracking-tight mb-1" style="color: white;">Impact Report</h1>
                  <p class="text-base" style="color: rgba(255,255,255,0.75);">{{ REPORT_DATA.period }}</p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-xl" style="color: white;">{{ REPORT_DATA.profile.name }}</p>
                  <p class="text-sm" style="color: rgba(255,255,255,0.70);">{{ REPORT_DATA.profile.email }}</p>
                  <p class="text-sm" style="color: rgba(255,255,255,0.70);">{{ REPORT_DATA.profile.location }}</p>
                  <p class="text-xs mt-3" style="color: rgba(255,255,255,0.50);">Generated {{ REPORT_DATA.generatedAt }}</p>
                </div>
              </div>

              <!-- KPI strip -->
              <div class="relative z-10 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div v-for="kpi in [
                  { val: REPORT_DATA.kwhSaved + ' kWh', label: 'Energy Saved'   },
                  { val: REPORT_DATA.co2Saved + ' kg',  label: 'CO₂ Offset'    },
                  { val: 'R ' + REPORT_DATA.moneySaved, label: 'Est. Savings'   },
                  { val: '#' + REPORT_DATA.rank,         label: 'Community Rank' },
                ]" :key="kpi.label"
                class="rounded-xl px-4 py-3 text-center"
                style="background: rgba(255,255,255,0.15);">
                  <p class="font-black text-xl leading-tight" style="color: white;">{{ kpi.val }}</p>
                  <p class="text-[10px] uppercase tracking-wider mt-0.5"
                    style="color: rgba(255,255,255,0.65);">{{ kpi.label }}</p>
                </div>
              </div>
            </div>

            <!-- Report body -->
            <div class="px-10 py-8 space-y-10" style="background: #ffffff;">

              <!-- 01 Energy Summary -->
              <section>
                <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
                  style="color: var(--color-primary); border-color: var(--color-primary);">
                  01 — Energy Summary
                </h2>
                <div class="grid grid-cols-3 gap-4 mb-6">
                  <div v-for="stat in [
                    { val: REPORT_DATA.kwhSaved, label: 'kWh Saved'    },
                    { val: REPORT_DATA.greenPct + '%', label: 'Green Energy' },
                    { val: REPORT_DATA.kwhTotal, label: 'kWh Total'    },
                  ]" :key="stat.label"
                  class="rounded-xl p-4 text-center"
                  style="background: #f8fafc; border: 1px solid #e2e8f0;">
                    <p class="text-3xl font-black" style="color: var(--color-primary);">{{ stat.val }}</p>
                    <p class="text-xs font-semibold uppercase tracking-wider mt-1" style="color: #64748b;">{{ stat.label }}</p>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-xs mb-1.5" style="color: #94a3b8;">
                    <span>Green energy portion</span><span>{{ REPORT_DATA.greenPct }}%</span>
                  </div>
                  <div class="w-full h-4 rounded-full overflow-hidden" style="background: #e2e8f0;">
                    <div class="h-full rounded-full"
                      :style="{ width: REPORT_DATA.greenPct + '%', background: 'var(--color-primary)' }"/>
                  </div>
                  <div class="flex justify-between text-xs mt-1" style="color: #cbd5e1;">
                    <span>0 kWh</span><span>{{ REPORT_DATA.kwhTotal }} kWh</span>
                  </div>
                </div>
              </section>

              <!-- 02 Monthly Trend -->
              <section>
                <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
                  style="color: var(--color-primary); border-color: var(--color-primary);">
                  02 — Monthly Energy Trend
                </h2>
                <div class="flex items-end justify-between gap-2" style="height: 120px;">
                  <div v-for="m in REPORT_DATA.monthly" :key="m.month"
                    class="flex-1 flex flex-col items-center gap-1">
                    <span class="text-[9px] font-bold" style="color: var(--color-primary);">{{ m.kwh }}</span>
                    <div class="w-full rounded-t-md"
                      :style="{
                        height: barH(m.kwh, REPORT_DATA.maxKwh) + '%',
                        background: 'var(--color-primary)',
                        minHeight: '8px',
                      }"/>
                    <span class="text-[9px] font-medium" style="color: #94a3b8;">{{ m.month }}</span>
                  </div>
                </div>
                <p class="text-[10px] mt-2 text-right" style="color: #94a3b8;">kWh saved per month</p>
              </section>

              <!-- 03 Environmental Impact -->
              <section>
                <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
                  style="color: var(--color-primary); border-color: var(--color-primary);">
                  03 — Environmental Impact
                </h2>
                <div class="grid grid-cols-2 gap-4">
                  <div v-for="stat in [
                    { emoji:'🌿', val: REPORT_DATA.co2Saved + ' kg',        label:'CO₂ Offset',       sub:'vs. SA grid average'       },
                    { emoji:'🌳', val: REPORT_DATA.treesEquiv + ' trees',   label:'Tree Equivalent',  sub:'annual CO₂ absorption'     },
                    { emoji:'💧', val: '18 400 L',                           label:'Water Saved',      sub:'via shorter showers'       },
                    { emoji:'🔥', val: REPORT_DATA.streak + '-day streak',  label:'Consistency',      sub:'daily green habit'         },
                  ]" :key="stat.label"
                  class="flex items-start gap-3 rounded-xl p-4"
                  style="background: #f8fafc; border: 1px solid #e2e8f0;">
                    <span class="text-2xl shrink-0">{{ stat.emoji }}</span>
                    <div>
                      <p class="text-xl font-black" style="color: var(--color-primary);">{{ stat.val }}</p>
                      <p class="text-xs font-semibold" style="color: #334155;">{{ stat.label }}</p>
                      <p class="text-[10px] mt-0.5" style="color: #94a3b8;">{{ stat.sub }}</p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 04 Financial Savings -->
              <section>
                <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
                  style="color: var(--color-primary); border-color: var(--color-primary);">
                  04 — Financial Savings
                </h2>
                <div class="grid grid-cols-3 gap-4">
                  <div v-for="f in [
                    { label: 'Estimated Savings', val: 'R ' + REPORT_DATA.moneySaved,
                      sub: 'at R2.48/kWh' },
                    { label: 'Projected Annual',  val: 'R ' + (REPORT_DATA.moneySavedNum * 2).toFixed(2),
                      sub: 'based on current rate' },
                    { label: '5-Year Projection', val: 'R ' + (REPORT_DATA.moneySavedNum * 10).toFixed(0),
                      sub: 'at current consumption' },
                  ]" :key="f.label"
                  class="rounded-xl p-4 text-center"
                  style="background: #f0fdf4; border: 1px solid #bbf7d0;">
                    <p class="text-lg font-black" style="color: #15803d;">{{ f.val }}</p>
                    <p class="text-xs font-semibold mt-1" style="color: #475569;">{{ f.label }}</p>
                    <p class="text-[10px] mt-0.5" style="color: #94a3b8;">{{ f.sub }}</p>
                  </div>
                </div>
                <p class="text-[10px] mt-3 italic" style="color: #94a3b8;">
                  * Estimates based on Eskom's published Schedule of Tariffs and Charges. Actual savings may vary.
                </p>
              </section>

              <!-- 05 Community Standing -->
              <section>
                <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
                  style="color: var(--color-primary); border-color: var(--color-primary);">
                  05 — Community Standing
                </h2>
                <div class="grid grid-cols-4 gap-3 mb-5">
                  <div v-for="s in [
                    { val: '#' + REPORT_DATA.rank,    label: 'Rank'        },
                    { val: REPORT_DATA.readings,      label: 'Readings'    },
                    { val: REPORT_DATA.challenges,    label: 'Challenges'  },
                    { val: REPORT_DATA.posts,         label: 'Posts'       },
                  ]" :key="s.label"
                  class="rounded-xl p-3 text-center"
                  style="background: #f8fafc; border: 1px solid #e2e8f0;">
                    <p class="text-2xl font-black" style="color: var(--color-primary);">{{ s.val }}</p>
                    <p class="text-[9px] font-semibold uppercase tracking-wider mt-1"
                      style="color: #64748b;">{{ s.label }}</p>
                  </div>
                </div>

                <!-- Badges -->
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wider mb-3"
                    style="color: #64748b;">
                    Earned Badges ({{ REPORT_DATA.earnedIds.size }}/{{ BADGE_DEFS.length }})
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <div v-for="b in BADGE_DEFS" :key="b.id"
                      class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                      :style="REPORT_DATA.earnedIds.has(b.id)
                        ? { background: 'color-mix(in srgb, var(--color-primary) 12%, #fff)', color: 'var(--color-primary)', border: '1px solid color-mix(in srgb, var(--color-primary) 25%, transparent)' }
                        : { background: '#f1f5f9', color: '#94a3b8', border: '1px solid #e2e8f0' }">
                      <span :style="REPORT_DATA.earnedIds.has(b.id) ? '' : 'filter:grayscale(1); opacity:0.4'">
                        {{ b.emoji }}
                      </span>
                      {{ b.label }}
                    </div>
                  </div>
                </div>
              </section>

              <!-- 06 Recommendations -->
              <section>
                <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
                  style="color: var(--color-primary); border-color: var(--color-primary);">
                  06 — Personalised Recommendations
                </h2>
                <div class="space-y-3">
                  <div v-for="rec in [
                    { icon:'bolt',         tip:'Run your geyser, dishwasher and washing machine before 5 PM to avoid Eskom peak-hour tariffs and reduce grid strain.' },
                    { icon:'solar_power',  tip:'Your solar generation peaks between 10 AM and 3 PM. Schedule high-wattage appliances in this window for maximum self-consumption.' },
                    { icon:'local_fire_department', tip:`Your current ${REPORT_DATA.streak}-day streak is great. Aim for 30 days to unlock the Hot Streak badge and climb the leaderboard.` },
                    { icon:'upload_file',  tip:'Submitting meter readings twice a week (instead of once) improves your data accuracy and earns 10 extra points per week.' },
                  ]" :key="rec.icon"
                  class="flex items-start gap-3 rounded-xl p-3"
                  style="background: #f8fafc; border: 1px solid #e2e8f0;">
                    <span class="material-symbols-outlined text-[18px] mt-0.5 shrink-0"
                      style="color: var(--color-primary);">{{ rec.icon }}</span>
                    <p class="text-xs leading-relaxed" style="color: #475569;">{{ rec.tip }}</p>
                  </div>
                </div>
              </section>

              <!-- Footer -->
              <footer class="flex items-center justify-between flex-wrap gap-3 pt-6"
                style="border-top: 1px solid #e2e8f0;">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px]"
                    style="color: var(--color-primary); font-variation-settings:'FILL' 1;">bolt</span>
                  <span class="font-bold" style="color: #334155;">BrightBox</span>
                  <span class="text-xs" style="color: #94a3b8;">· Empowering sustainable homes</span>
                </div>
                <p class="text-[10px]" style="color: #94a3b8;">
                  Confidential · {{ REPORT_DATA.profile.name }} · {{ REPORT_DATA.generatedAt }}
                </p>
              </footer>

            </div>
          </div>
          <!-- END REPORT CARD -->

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active { transition: all 0.28s cubic-bezier(0.34,1.4,0.64,1); }
.modal-leave-active { transition: all 0.18s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.97) translateY(12px); }
</style>
