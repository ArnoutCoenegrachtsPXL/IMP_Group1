<script setup>
import { ref, computed } from 'vue'
import UploadMeterForm from '@/components/UploadMeterComponents/UploadMeterForm.vue'

const props = defineProps({
  timeFrom: { type: String, default: '08:00' },
  timeTo:   { type: String, default: '22:00' },
})

const emit = defineEmits(['back', 'navigate'])
const currentView = ref('main')

const loading = ref(true)
const error   = ref(false)
const data    = ref(null)

const startTime = ref(props.timeFrom)
const endTime   = ref(props.timeTo)

const impactConfig = {
  high:   { label: 'High Impact',   classes: 'bg-red-100 text-red-700' },
  medium: { label: 'Medium Impact', classes: 'bg-green-100 text-green-700' },
  low:    { label: 'Low Impact',    classes: 'bg-yellow-100 text-yellow-700' },
}

const categoryIcons = {
  Cooling:     'ac_unit',
  Heating:     'local_fire_department',
  Laundry:     'local_laundry_service',
  Kitchen:     'microwave',
  Water:       'water_drop',
  Solar:       'solar_power',
  Electricity: 'bolt',
}


const toMinutes = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}


const selectionSegments = computed(() => {
  const s = (toMinutes(startTime.value) / 1440) * 100
  const e = (toMinutes(endTime.value)   / 1440) * 100
  if (s <= e) return [{ left: s, width: e - s }]
  return [{ left: s, width: 100 - s }, { left: 0, width: e }]
})

const selectionLabel = computed(() => {
  const fmt = (t) => {
    const [h, m] = t.split(':').map(Number)
    const suffix = h < 12 ? 'AM' : 'PM'
    const hour   = h % 12 || 12
    return `${hour}:${String(m).padStart(2, '0')} ${suffix}`
  }
  return `${fmt(startTime.value)} – ${fmt(endTime.value)}`
})

async function fetchTips() {
  loading.value = true
  error.value   = false
  try {
    const res = await fetch('https://localhost:7126/api/tips/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timeFrom: props.timeFrom, timeTo: props.timeTo }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    data.value = await res.json()
  } catch (e) {
    console.error(e)
    error.value = true
  } finally {
    loading.value = false
  }
}

fetchTips()
</script>

<template>
  <!-- Back button -->
  <div class="mb-8">
    <button
      class="flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors mb-6"
      @click="emit('back')"
    >
      <span class="material-symbols-outlined text-base">arrow_back</span>
      Back to all tips
    </button>

    <!-- ── Timeline card ─────────────────────────────────────── -->
    <div class="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-8">

      <!-- Header row -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-blue-400">schedule</span>
          <h2 class="text-base font-bold text-white">Peak Hour Tracker</h2>
        </div>
        <div class="flex flex-wrap gap-4 text-xs text-slate-400">
          <span class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-sm bg-red-500 inline-block"></span>Peak
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-sm bg-orange-400 inline-block"></span>Standard
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-sm bg-green-500 inline-block"></span>Off-peak
          </span>
        </div>
      </div>

      <!-- Time inputs -->
      <div class="flex flex-wrap gap-4 mb-6">
        <div>
          <label class="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">From</label>
          <input
            type="time"
            v-model="startTime"
            class="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500 w-36"
          />
        </div>
        <div>
          <label class="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">To</label>
          <input
            type="time"
            v-model="endTime"
            class="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500 w-36"
          />
        </div>
      </div>

      <!-- timeline  --> 
      <div class="relative">
          <br>
        <!-- Colour zones for timeline -->
        <div class="relative h-12 rounded-xl overflow-hidden flex">
          <div class="bg-green-600"  style="width:25%"    title="00:00–06:00 Off-peak"></div>
          <div class="bg-orange-500" style="width:4.17%"  title="06:00–07:00 Standard"></div>
          <div class="bg-red-600"    style="width:12.5%"  title="07:00–10:00 Peak"></div>
          <div class="bg-orange-500" style="width:8.33%"  title="10:00–12:00 Standard"></div>
          <div class="bg-green-600"  style="width:12.5%"  title="12:00–15:00 Off-peak"></div>
          <div class="bg-orange-500" style="width:8.33%"  title="15:00–17:00 Standard"></div>
          <div class="bg-red-600"    style="width:16.67%" title="17:00–21:00 Peak"></div>
          <div class="bg-orange-500" style="width:8.33%"  title="21:00–23:00 Standard"></div>
          <div class="bg-green-600"  style="width:4.17%"  title="23:00–24:00 Off-peak"></div>
        </div>

        <!-- cool glass effect over timeline --> 
        <div
          v-for="(seg, i) in selectionSegments"
          :key="i"
          class="absolute top-6 h-12 rounded-xl border-2 border-white bg-white/25 backdrop-blur-sm transition-all duration-300 pointer-events-none"
          :style="{ left: seg.left + '%', width: seg.width + '%' }"
        ></div>

        <!-- users'time selected shown above timeline -->
        <div
          class="absolute top-0 text-[11px] font-bold text-white bg-slate-700 px-4 py-0.5 rounded-md whitespace-nowrap transition-all duration-300"
          :style="{ left: selectionSegments[0].left + '%', transform: 'translateX(-10%)' }"
        >
          {{ selectionLabel }}
        </div>

        <!-- Hour markers at bottom of timeline -->
        <div class="flex justify-between mt-2 px-0.5">
          <span class="text-[10px] text-slate-500">0:00</span>
          <span class="text-[10px] text-slate-500">6:00</span>
          <span class="text-[10px] text-slate-500">12:00</span>
          <span class="text-[10px] text-slate-500">18:00</span>
          <span class="text-[10px] text-slate-500">24:00</span>
        </div>
      </div>

    </div>
    <!--Timeline card -->

    <h1 class="text-3xl font-extrabold text-on-background tracking-tight">Your Personalised Tips</h1>
    <p v-if="data" class="text-on-surface-variant text-sm mt-1">
      Based on your active hours:
      <span class="font-bold text-blue-700">{{ data.scheduleSummary }}</span>
    </p>
  </div>

  <!-- Loading -->
  <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-4">
    <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>
    <p class="text-slate-500 font-medium">Generating your personalised tips…</p>
  </div>

  <!-- Error -->
  <div v-else-if="error" class="flex flex-col items-center justify-center py-24 gap-4 text-center">
    <span class="material-symbols-outlined text-5xl text-red-400">error_outline</span>
    <p class="text-lg font-bold text-slate-700">Could not connect to the server</p>
    <button
      class="mt-2 px-6 py-2 bg-blue-700 text-white rounded-lg text-sm font-bold hover:bg-blue-800"
      @click="fetchTips"
    >
      Retry
    </button>
  </div>

  <!-- Cards -->
  <template v-else-if="data">
    <div class="flex flex-wrap gap-4 mb-8">
      <div class="bg-green-50 border border-green-200 rounded-xl px-6 py-4 text-center">
        <p class="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Potential Saving</p>
        <p class="text-2xl font-black text-green-800">{{ data.potentialSaving }}</p>
      </div>
      <div class="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 text-center">
        <p class="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Tips Generated</p>
        <p class="text-2xl font-black text-blue-800">{{ data.tipCount }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="tip in data.tips"
        :key="tip.title"
        class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
      >
        <div class="flex items-start gap-4 mb-4">
          <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 flex-shrink-0 group-hover:bg-blue-100 transition-colors">
            <span class="material-symbols-outlined text-2xl">
              {{ categoryIcons[tip.category] ?? 'lightbulb' }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap gap-1.5 mb-2">
              <span
                class="px-2 py-0.5 text-[10px] font-bold uppercase rounded tracking-wider"
                :class="impactConfig[tip.impact]?.classes ?? 'bg-slate-100 text-slate-600'"
              >
                {{ impactConfig[tip.impact]?.label ?? tip.impact }}
              </span>
              <span
                v-if="tip.timeLabel"
                class="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded tracking-wider"
              >
                {{ tip.timeLabel }}
              </span>
            </div>
            <h4 class="text-base font-bold text-on-background group-hover:text-blue-700 transition-colors leading-snug">
              {{ tip.title }}
            </h4>
          </div>
        </div>

        <p class="text-sm text-on-surface-variant leading-relaxed flex-1">{{ tip.description }}</p>

        <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ tip.category }}</span>
          <span v-if="tip.saving" class="text-xs font-bold text-green-700">{{ tip.saving }}</span>
        </div>
      </div>
    </div>

    <!-- CTA footer -->
    <div class="mt-12 bg-slate-900 rounded-xl p-10 text-center">
      <h3 class="text-2xl font-bold text-white mb-4">Ready for a full home energy audit?</h3>
      <p class="text-slate-400 mb-8 max-w-2xl mx-auto">
        Connect your smart meter for real-time analysis and a comprehensive breakdown of your home's energy performance.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <button
          class="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-500 transition-colors flex items-center gap-2"
          @click="currentView='uploadMeter'"
        >
          <span class="material-symbols-outlined">bolt</span>
          Connect My Meter
        </button>
        <button class="bg-transparent border border-slate-700 text-white font-bold py-3 px-8 rounded-md hover:bg-slate-800 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  </template>

  <UploadMeterForm v-if="currentView === 'uploadMeter'" @back="currentView = 'main'"/>
</template>