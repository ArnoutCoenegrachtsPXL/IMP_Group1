<script setup>
import { ref, computed, watch } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { useNotificationStore } from '@/stores/notifications'

import ElectricitySavingTip from '@/components/EnergySavingTipsComponents/ElectricitySavingTip.vue'
import HeatingSavingTip     from '@/components/EnergySavingTipsComponents/HeatingSavingTip.vue'
import KitchenSavingTip     from '@/components/EnergySavingTipsComponents/KitchenSavingTip.vue'
import LaundrySavingTip     from '@/components/EnergySavingTipsComponents/LaundrySavingTip.vue'
import SolarSavingTip       from '@/components/EnergySavingTipsComponents/SolarSavingTip.vue'
import WaterSavingTip       from '@/components/EnergySavingTipsComponents/WaterSavingTip.vue'

const prefs  = useUserPrefsStore()
const notifs = useNotificationStore()

  const currentView = ref('main')
    const timeFrom = ref('16:00')
    const timeTo = ref('22:00')
  /*tailwind.config = {
                darkMode: "class",
                theme: {
                    extend: {
                        "colors": {
                            "on-surface-variant": "#414753",
                            "outline-variant": "#c1c6d5",
                            "on-secondary-container": "#003389",
                            "surface-dim": "#d8dae3",
                            "background": "#f9f9ff",
                            "surface-variant": "#e0e2ec",
                            "on-error": "#ffffff",
                            "error-container": "#ffdad6",
                            "tertiary-container": "#b75b00",
                            "on-error-container": "#93000a",
                            "on-tertiary-fixed": "#301400",
                            "surface": "#f9f9ff",
                            "primary-fixed": "#75ff69",
                            "inverse-surface": "#2d3038",
                            "secondary-fixed": "#dbe1ff",
                            "surface-bright": "#f9f9ff",
                            "on-primary": "#ffffff",
                            "outline": "#717785",
                            "secondary": "#365ab3",
                            "on-tertiary-container": "#fffbff",
                            "on-primary-fixed-variant": "#005307",
                            "surface-container": "#ecedf7",
                            "primary": "#006c0c",
                            "on-secondary-fixed-variant": "#174199",
                            "surface-tint": "#006e0c",
                            "tertiary-fixed-dim": "#ffb785",
                            "error": "#ba1a1a",
                            "inverse-primary": "#19e52d",
                            "inverse-on-surface": "#eff0fa",
                            "primary-container": "#008812",
                            "on-primary-fixed": "#002201",
                            "on-background": "#181c22",
                            "surface-container-lowest": "#ffffff",
                            "surface-container-low": "#f2f3fd",
                            "on-secondary-fixed": "#001849",
                            "tertiary": "#924800",
                            "on-surface": "#181c22",
                            "secondary-container": "#7fa0fd",
                            "secondary-fixed-dim": "#b3c5ff",
                            "on-secondary": "#ffffff",
                            "tertiary-fixed": "#ffdcc6",
                            "on-tertiary-fixed-variant": "#723700",
                            "on-tertiary": "#ffffff",
                            "primary-fixed-dim": "#19e52d",
                            "surface-container-high": "#e6e8f1",
                            "surface-container-highest": "#e0e2ec",
                            "on-primary-container": "#f8fff0",
                            "primary": "#006c0c", 
                             "brand": "#1978e5",
                        },
                        "borderRadius": {
                            "DEFAULT": "0.125rem",
                            "lg": "0.25rem",
                            "xl": "0.5rem",
                            "full": "0.75rem"
                        },
                        "fontFamily": {
                            "headline": ["Inter"],
                            "body": ["Inter"],
                            "label": ["Inter"]
                        }
                    },
                },
            }*/
</script>

<template>
  <!-- IMPORTANT: No outer container with its own max-width here.
       App.vue's <main> already provides responsive padding.
       This div is purely a semantic wrapper with NO layout overrides. -->
  <div>

    <!-- ── Sub-category detail views ──────────────────────────────────────── -->
    <ElectricitySavingTip v-if="currentView === 'electricity'" @back="currentView = 'main'" />
    <WaterSavingTip       v-if="currentView === 'water'"       @back="currentView = 'main'" />
    <HeatingSavingTip     v-if="currentView === 'heating'"     @back="currentView = 'main'" />
    <SolarSavingTip       v-if="currentView === 'solar'"       @back="currentView = 'main'" />
    <KitchenSavingTip     v-if="currentView === 'kitchen'"     @back="currentView = 'main'" />
    <LaundrySavingTip     v-if="currentView === 'laundry'"     @back="currentView = 'main'" />

    <!-- ── Main view ──────────────────────────────────────────────────────── -->
    <div v-if="currentView === 'main'" class="space-y-8">

      <!-- Page header -->
      <header>
        <h1 class="font-display text-3xl sm:text-4xl text-on-surface mb-2">Your Personal Energy Advisor</h1>
        <p class="text-on-surface-variant max-w-2xl text-sm sm:text-base leading-relaxed">
          We analyse your energy patterns to provide tailored tips that fit your lifestyle and save on your next bill.
        </p>
      </header>

      <!-- ── Bento: Schedule + Impact ─────────────────────────────────────── -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <!-- Set Your Schedule card -->
        <div class="lg:col-span-2 card card-elevated flex flex-col justify-between gap-6">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="material-symbols-outlined text-primary text-[22px]" style="font-variation-settings:'FILL' 1">timer</span>
              <h2 class="text-lg font-bold text-on-surface">Set Your Schedule</h2>
            </div>
            <p class="text-sm text-on-surface-variant mb-5">
              Tell us when you are most active at home so we can surface time-sensitive saving opportunities.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="time-from">
                  Active from
                </label>
                <input
                  id="time-from"
                  v-model="scheduleFrom"
                  type="time"
                  class="form-input"
                  aria-label="Active hours start time"
                />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="time-to">
                  Active until
                </label>
                <input
                  id="time-to"
                  v-model="scheduleTo"
                  type="time"
                  class="form-input"
                  aria-label="Active hours end time"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-outline-variant/20">
            <!-- Schedule filter toggle -->
            <label class="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <ToggleSwitch
                v-model="scheduleFilter"
                aria-label="Show only tips matching my schedule"
              />
              <span class="text-sm font-semibold text-on-surface">Show tips for my active hours only</span>
            </label>

            <!-- Apply button -->
            <button
              class="solar-glow px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 min-h-[44px] shrink-0 transition-all"
              :class="scheduleApplied ? 'bg-emerald-500' : ''"
              :style="scheduleApplied ? 'background: #10b981;' : ''"
              @click="applySchedule"
              :disabled="savingSchedule"
            >
              <svg v-if="savingSchedule" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="40" stroke-dashoffset="15"/>
              </svg>
              <span class="material-symbols-outlined text-[16px]" v-else-if="scheduleApplied" style="font-variation-settings:'FILL' 1">check</span>
              <span class="material-symbols-outlined text-[16px]" v-else>arrow_forward</span>
              {{ savingSchedule ? 'Saving…' : scheduleApplied ? 'Saved!' : 'Get Tailored Tips' }}
            </button>
          </div>
        </div>

        <!-- Impact Overview card -->
        <div
          class="rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between"
          style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dim) 100%);"
        >
          <div class="relative z-10">
            <h2 class="text-lg font-bold mb-1">Impact Overview</h2>
            <p class="text-white/70 text-xs mb-5 leading-relaxed">
              Following your personalised tips could save you up to:
            </p>

            <!-- Savings amount — computed from algorithm -->
            <div class="text-5xl font-black mb-1 tracking-tight">
              {{ estimatedSavings.symbol }}{{ estimatedSavings.amount }}
              <span class="text-xl font-normal opacity-80">/mo</span>
            </div>
            <p class="text-white/60 text-xs mb-5">in {{ prefs.currency || 'ZAR' }}</p>

            <!-- Progress bar -->
            <div class="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                class="bg-white h-full rounded-full transition-all duration-700"
                :style="{ width: estimatedSavings.percentage + '%' }"
              ></div>
            </div>
            <div class="flex items-center justify-between mt-2">
              <p class="text-[11px] text-white/60">{{ estimatedSavings.percentage }}% of potential savings achieved</p>
              <p class="text-[11px] font-bold text-white/80">{{ completedTips.length }} tips done</p>
            </div>

            <!-- Feature status pills -->
            <div class="flex flex-wrap gap-1.5 mt-4">
              <span v-if="prefs.energy?.smart"
                class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15">
                ⚡ Smart scheduling
              </span>
              <span v-if="prefs.energy?.autoOffset"
                class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15">
                ☀️ Auto-offset on
              </span>
              <span v-if="prefs.energy?.ev"
                class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15">
                🚗 EV off-peak
              </span>
            </div>
          </div>

          <!-- Decorative icon -->
          <span
            class="material-symbols-outlined absolute -bottom-6 -right-6 opacity-20 text-[120px] pointer-events-none"
            style="font-variation-settings:'FILL' 1; color:white;"
          >insights</span>
        </div>
      </div>

      <!-- ── Filter bar ──────────────────────────────────────────────────── -->
      <div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        <div class="flex gap-2 min-w-max sm:flex-wrap sm:min-w-0">
          <button
            v-for="f in FILTERS"
            :key="f.id"
            class="px-4 py-2 rounded-full text-sm font-semibold transition-all min-h-[40px] shrink-0
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary border"
            :class="activeFilter === f.id
              ? 'border-transparent text-on-primary'
              : 'bg-surface-container-lowest border-outline-variant/40 text-on-surface-variant hover:border-primary/30'"
            :style="activeFilter === f.id
              ? 'background: var(--color-primary);'
              : ''"
            :aria-pressed="activeFilter === f.id"
            @click="setFilter(f.id)"
          >
            {{ f.label }}
          </button>
        </div>
      </div>

      <!-- Schedule filter active notice -->
      <div v-if="scheduleFilter"
        class="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
        style="background: color-mix(in srgb, var(--color-primary) 8%, transparent); color: var(--color-primary); border: 1px solid color-mix(in srgb, var(--color-primary) 15%, transparent);">
        <span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1">filter_alt</span>
        Showing tips for your active hours: {{ scheduleFrom }}–{{ scheduleTo }}
        <button class="ml-auto text-xs underline hover:no-underline" @click="scheduleFilter = false">Clear filter</button>
      </div>

      <!-- ── Tips grid ───────────────────────────────────────────────────── -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        <!-- Tip cards -->
        <div
          v-for="tip in filteredTips"
          :key="tip.id"
          class="bg-surface-container-lowest border border-outline-variant/40 rounded-[16px]
                 overflow-hidden shadow-sm hover:shadow-md transition-all group"
          :class="completedTips.includes(tip.id) ? 'ring-2 ring-emerald-500/30' : ''"
        >
          <!-- Image -->
          <div class="h-36 relative overflow-hidden">
            <img
              :src="tip.img"
              :alt="tip.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <!-- Overlay gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <!-- Badges -->
            <div class="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
              <span
                class="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full tracking-wider"
                :class="[IMPACT_CONFIG[tip.impact].bg, IMPACT_CONFIG[tip.impact].text]"
              >{{ IMPACT_CONFIG[tip.impact].label }}</span>
              <span v-if="tip.timeWindow"
                class="px-2 py-0.5 bg-primary/90 text-on-primary text-[10px] font-bold uppercase rounded-full tracking-wider">
                {{ tip.timeWindow }}
              </span>
            </div>
            <!-- Completed tick -->
            <div v-if="completedTips.includes(tip.id)"
              class="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-[14px]" style="font-variation-settings:'FILL' 1">check</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-4">
            <span class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 mb-1 block">{{ tip.label }}</span>
            <h4 class="text-sm font-bold text-on-surface mb-1.5 group-hover:text-primary transition-colors leading-snug">
              {{ tip.title }}
            </h4>
            <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-2 mb-3">{{ tip.desc }}</p>

            <!-- Actions -->
            <div class="flex items-center justify-between pt-3 border-t border-outline-variant/15 gap-2">
              <!-- Mark done toggle -->
              <button
                class="flex items-center gap-1.5 text-xs font-bold transition-colors"
                :class="completedTips.includes(tip.id) ? 'text-emerald-500' : 'text-on-surface-variant hover:text-emerald-500'"
                @click="toggleTip(tip.id)"
                :aria-pressed="completedTips.includes(tip.id)"
              >
                <span class="material-symbols-outlined text-[14px]"
                  :style="completedTips.includes(tip.id) ? 'font-variation-settings:\'FILL\' 1' : ''">
                  {{ completedTips.includes(tip.id) ? 'check_circle' : 'radio_button_unchecked' }}
                </span>
                {{ completedTips.includes(tip.id) ? 'Done' : 'Mark done' }}
              </button>

              <!-- Details button -->
              <button v-if="tip.action"
                class="text-primary text-xs font-bold flex items-center gap-1 hover:opacity-70 transition-opacity"
                @click="currentView = tip.action"
                aria-label="View full details"
              >
                <span>Details</span>
                <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty state when schedule filter hides everything -->
        <div v-if="filteredTips.length === 0"
          class="sm:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col items-center justify-center
                 py-14 gap-3 text-center card border-dashed">
          <span class="material-symbols-outlined text-[44px] text-on-surface-variant/30">search_off</span>
          <p class="font-bold text-on-surface">No tips match your current filter</p>
          <p class="text-sm text-on-surface-variant max-w-xs">
            Try expanding your active hours window or clearing the schedule filter to see all tips.
          </p>
          <button
            class="mt-1 text-sm font-bold text-primary hover:opacity-70 transition-opacity"
            @click="scheduleFilter = false; activeFilter = 'all'"
          >Show all tips</button>
        </div>

        <!-- Request Custom Advice CTA card -->
        <div
          class="border-2 border-dashed border-outline-variant/50 rounded-[16px] flex flex-col
                 items-center justify-center p-6 text-center group cursor-pointer
                 hover:border-primary/40 hover:bg-primary/[0.03] transition-all"
          @click="showAdviceModal = true"
          role="button"
          tabindex="0"
          @keydown.enter="showAdviceModal = true"
          aria-label="Request a custom energy audit"
        >
          <div class="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center mb-3
                      group-hover:bg-primary/10 transition-colors">
            <span class="material-symbols-outlined text-on-surface-variant text-[26px] group-hover:text-primary transition-colors"
              style="font-variation-settings:'FILL' 1">support_agent</span>
          </div>
          <h4 class="font-bold text-sm text-on-surface mb-1.5 group-hover:text-primary transition-colors">Request Custom Advice</h4>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            Can't find what you need? Request a personalised energy audit tailored to your home.
          </p>
          <span class="mt-3 text-xs font-bold text-primary flex items-center gap-1">
            Free consultation <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
          </span>
        </div>
      </div>

    </div><!-- end main view -->

    <!-- ─────────────────────────────────────────────────────────────────────
         REQUEST CUSTOM ADVICE MODAL
    ──────────────────────────────────────────────────────────────────────── -->
    <Transition name="modal-fade">
      <div v-if="showAdviceModal"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Request custom energy advice"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="closeAdviceModal"
        ></div>

        <!-- Modal panel -->
        <div
          class="relative w-full sm:max-w-lg rounded-t-[24px] sm:rounded-[24px] overflow-hidden overflow-y-auto"
          style="background: var(--color-surface-container-lowest); max-height: 92dvh;"
        >
          <!-- Header -->
          <div class="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-outline-variant/20"
            style="background: var(--color-surface-container-lowest);">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-primary text-[18px]" style="font-variation-settings:'FILL' 1">support_agent</span>
              </div>
              <div>
                <h2 class="font-bold text-base text-on-surface leading-tight">Custom Energy Audit</h2>
                <p class="text-[11px] text-on-surface-variant">Free · Response within 2 business days</p>
              </div>
            </div>
            <button
              class="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors"
              @click="closeAdviceModal"
              aria-label="Close"
            >
              <span class="material-symbols-outlined text-on-surface-variant text-[18px]">close</span>
            </button>
          </div>

          <!-- Success state -->
          <div v-if="adviceSent" class="flex flex-col items-center justify-center py-14 px-6 gap-4 text-center">
            <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-emerald-500 text-[32px]" style="font-variation-settings:'FILL' 1">check_circle</span>
            </div>
            <h3 class="font-bold text-lg text-on-surface">Request Submitted!</h3>
            <p class="text-sm text-on-surface-variant max-w-xs leading-relaxed">
              Thanks, {{ adviceForm.name }}! Our energy advisors will review your profile and respond to
              <strong>{{ adviceForm.email }}</strong> within 2 business days.
            </p>
            <button class="solar-glow px-6 py-2.5 rounded-xl text-sm font-bold mt-2" @click="closeAdviceModal">
              Done
            </button>
          </div>

          <!-- Form -->
          <form v-if="!adviceSent" class="px-5 py-5 space-y-5" @submit.prevent="submitAdvice">

            <!-- Name + email -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-name">
                  Your Name *
                </label>
                <input id="adv-name" v-model="adviceForm.name" type="text" placeholder="Full name"
                  autocomplete="name" class="form-input" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-email">
                  Email Address *
                </label>
                <input id="adv-email" v-model="adviceForm.email" type="email" placeholder="your@email.com"
                  autocomplete="email" class="form-input" />
              </div>
            </div>

            <!-- Home type -->
            <div class="space-y-2">
              <p class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Home Type *</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="h in HOME_TYPES" :key="h" type="button"
                  class="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all min-h-[36px]"
                  :class="adviceForm.homeType === h
                    ? 'border-primary bg-primary/8 text-primary'
                    : 'border-outline-variant/40 text-on-surface-variant hover:border-primary/30'"
                  @click="adviceForm.homeType = h"
                >{{ h }}</button>
              </div>
            </div>

            <!-- Occupants + primary cost -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-occ">
                  Number of Occupants *
                </label>
                <select id="adv-occ" v-model="adviceForm.occupants" class="form-input">
                  <option value="" disabled>Select…</option>
                  <option>1</option><option>2</option><option>3–4</option>
                  <option>5–6</option><option>7+</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-cost">
                  Biggest Cost Area
                </label>
                <select id="adv-cost" v-model="adviceForm.primaryCost" class="form-input">
                  <option value="" disabled>Select…</option>
                  <option v-for="c in COST_AREAS" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
            </div>

            <!-- Monthly budget -->
            <div class="space-y-2">
              <p class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Monthly Energy Budget</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="b in BUDGET_OPTS" :key="b" type="button"
                  class="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all min-h-[36px]"
                  :class="adviceForm.budget === b
                    ? 'border-primary bg-primary/8 text-primary'
                    : 'border-outline-variant/40 text-on-surface-variant hover:border-primary/30'"
                  @click="adviceForm.budget = b"
                >{{ b }}</button>
              </div>
            </div>

            <!-- Goals (multi-select) -->
            <div class="space-y-2">
              <p class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Your Goals (select all that apply)</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="g in GOAL_OPTS" :key="g" type="button"
                  class="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all min-h-[36px] flex items-center gap-1.5"
                  :class="adviceForm.goals.includes(g)
                    ? 'border-primary bg-primary/8 text-primary'
                    : 'border-outline-variant/40 text-on-surface-variant hover:border-primary/30'"
                  :aria-pressed="adviceForm.goals.includes(g)"
                  @click="toggleGoal(g)"
                >
                  <span class="material-symbols-outlined text-[13px]"
                    :style="adviceForm.goals.includes(g) ? 'font-variation-settings:\'FILL\' 1' : ''">
                    {{ adviceForm.goals.includes(g) ? 'check_circle' : 'circle' }}
                  </span>
                  {{ g }}
                </button>
              </div>
            </div>

            <!-- Extra notes -->
            <div class="space-y-1.5">
              <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-extra">
                Anything else we should know?
              </label>
              <textarea id="adv-extra" v-model="adviceForm.extra" rows="3"
                placeholder="Appliances you want to optimise, existing solar setup, specific concerns…"
                class="form-input resize-none"></textarea>
            </div>

            <p v-if="adviceError" class="text-sm text-red-500">{{ adviceError }}</p>

            <!-- Submit -->
            <button
              type="submit"
              class="w-full py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[48px]"
              :class="adviceValid
                ? 'solar-glow shadow-md hover:scale-[1.01] active:scale-[0.99]'
                : 'bg-surface-container text-on-surface-variant/40 cursor-not-allowed'"
              :disabled="!adviceValid || adviceSending"
            >
              <svg v-if="adviceSending" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="40" stroke-dashoffset="15"/>
              </svg>
              <span class="material-symbols-outlined text-[18px]" v-else style="font-variation-settings:'FILL' 1">send</span>
              {{ adviceSending ? 'Sending…' : 'Submit Audit Request' }}
            </button>

            <p class="text-[10px] text-on-surface-variant/60 text-center">
              Free service · Your data is handled per our Privacy Policy · Response within 2 business days
            </p>
          </form>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.modal-fade-enter-active { transition: opacity 0.22s ease; }
.modal-fade-leave-active { transition: opacity 0.18s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

.modal-fade-enter-active .relative,
.modal-fade-leave-active .relative {
  transition: transform 0.22s cubic-bezier(0.34, 1.3, 0.64, 1);
}
.modal-fade-enter-from .relative { transform: translateY(20px); }
.modal-fade-leave-to .relative   { transform: translateY(10px); }
</style>
