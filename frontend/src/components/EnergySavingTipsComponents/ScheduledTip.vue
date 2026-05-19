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
  high:   { label: 'High Impact',   bg: 'bg-red-100',     text: 'text-red-700'    },
  medium: { label: 'Medium Impact', bg: 'bg-amber-100',   text: 'text-amber-700'  },
  low:    { label: 'Low Impact',    bg: 'bg-emerald-100', text: 'text-emerald-700' },
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

// Fallback placeholder images per category so cards always have a hero image
const categoryImages = {
  Cooling:     'https://lh3.googleusercontent.com/aida-public/AB6AXuDav2CwnH7_sK8zJshe51W_8peePokZF0VTHkhWK4i9wTp6MyPQHEPLQwlT7VIgerogydLfGW2KApRyJz3yJ12ag0hVp0Qu30a9fJWKMeYzJV3IRKeiV2oWa87-F4U-Ax6lGsdMOI6ZvnRpLpgSJmFcXoENTx8zTeXXCl5391lz6ncX43yLvfGfmYlKhKYHzBZM8gpSeZXbXmeBMfDlCX4dU8vlqKVRW8ecGpaeqHHR_uXAbSiG9eFv59K8AMOMPzzBhUthr6eSoNHA',
  Laundry:     'https://lh3.googleusercontent.com/aida-public/AB6AXuBjhLHZbdX_il1lydLfYaztp3hmg5jMfaaX_Qbb0HnNyPKm55i2ALDK72ZzzqmTv0r0ssunoJZTFgEZXHFRyOnXj5R5C05W1vgWIO2EeJht9vBFcDZRhwpkrZ6MsPhKrqkU2q9xxXgEZQMUED9Xk1nJj9rT0GrWUHq3oTLMwM-G9pdnEqhpUgT7oaLgasOOJumjkuE5RTLVbksns_UXtH3RDmA-j15oK4-1Jp3InIVLIfs5OBvOK2U7kQgqFGeqJDg3PpFglzRuSWeu',
  Kitchen:     'https://lh3.googleusercontent.com/aida-public/AB6AXuDMy0PhlxobZcJ_4g4Mf9SeMLlF-_DkNtY2SyB6FAWUZHT69Udt45Qsbzuz0ny5-lhDO8unmQcOl3R5vlohm9-yrUTfbhqqfJZyGmYcb45mgqtckZLcMiFAquIe9meoXQbicAKqGdmfXbvUR-oxLoBlywqw2E9uMyMWXpjVv7N6sB6TPmeYssnSGvnVFtzIUabwt393gKzyxnEfJEONPvz-Rpq9bNX9ZvceMD4KN8Q56KHtxXqLKHNXXKHlvDXGzhHKi0MFlg0w59vY',
  Water:       'https://lh3.googleusercontent.com/aida-public/AB6AXuDzmlNYVJl7YfKlpEYRkrcL9kQCQOvMn3CQF4v86Dh5_ybH6eGL5sAEybZJq1lf-n8SqfB_09QtWYaiRw9PT8Dxy2TL98K0iTYGwq-XA1MTc2iAgD3fYl-f5x4NEe8eCvkXSDtTUq3IWXNhwD-bNvzWCAzePLMnID6duNaqbceSQDFgWQGG0L9MkvuDniJc2DWltOPLkbfFUZ-qlnu7-CHPsxTztEHtQS8c9nrFWCYK32iAAW2TB_83yz7ua9xEnrHr0WWzuwWfgnSd',
  Solar:       'https://lh3.googleusercontent.com/aida-public/AB6AXuC_t0LazH9tTWFhJf0OamJnaPhTE20HMRvoYyiHW4ovkvW8Obf7iqYb2FG2me5J0v5HsFi7e97ChynQX2wQZ0PRYHm_Cdwo-nbV8zNdwy2GEnYe6BmyBC1DPzLbTB98VyChVIHGAak7WY_NRtz4VLl6gPqE1aOkHw64-jAmN217gekRN2mk3jtK77cK9RJWsTEOK523_JQvwlJ_ScxAwONO1DwTtQANhS07eHuu4Ftl9AlZcyp4bL87ckS5TttmR-bJm0zMhaemM_Jh',
  Electricity: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80',
  Heating:     'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=640&q=80',
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
  return `${fmt(startTime.value)} - ${fmt(endTime.value)}`
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
      class="flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors mb-6"
      @click="emit('back')"
    >
      <span class="material-symbols-outlined text-base">arrow_back</span>
      Back to all tips
    </button>

    <!-- ── Timeline card ─────────────────────────────────────── -->
    <div class="bg-inverse-surface rounded-xl p-6 border border-surface/10 mb-8">

      <!-- Header row -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary-fixed-dim">schedule</span>
          <h2 class="text-base font-bold text-surface">Peak Hour Tracker</h2>
        </div>
        <div class="flex flex-wrap gap-4 text-xs text-surface/60">
          <span class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-sm bg-red-500 inline-block"></span>Peak
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-sm bg-orange-400 inline-block"></span>Standard
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-sm inline-block" style="background:#22c55e"></span>Off-peak
          </span>
        </div>
      </div>

      <!-- Time inputs -->
      <div class="flex flex-wrap gap-4 mb-6">
        <div>
          <label class="block text-[10px] uppercase tracking-wider text-surface/60 mb-1">From</label>
          <input
            type="time"
            v-model="startTime"
            class="bg-surface/10 border border-surface/20 rounded-lg px-3 py-1.5 text-surface text-sm focus:outline-none focus:border-primary w-36"
          />
        </div>
        <div>
          <label class="block text-[10px] uppercase tracking-wider text-surface/60 mb-1">To</label>
          <input
            type="time"
            v-model="endTime"
            class="bg-surface/10 border border-surface/20 rounded-lg px-3 py-1.5 text-surface text-sm focus:outline-none focus:border-primary w-36"
          />
        </div>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <br>
        <!-- Colour zones -->
        <div class="relative h-12 rounded-xl overflow-hidden flex">
          <div class="" style="width:25%;background:#16a34a"  title="00:00–06:00 Off-peak"></div>
          <div class="bg-orange-500" style="width:4.17%"  title="06:00–07:00 Standard"></div>
          <div class="bg-red-600"    style="width:12.5%"  title="07:00–10:00 Peak"></div>
          <div class="bg-orange-500" style="width:8.33%"  title="10:00–12:00 Standard"></div>
          <div class="" style="width:12.5%;background:#16a34a" title="12:00–15:00 Off-peak"></div>
          <div class="bg-orange-500" style="width:8.33%"  title="15:00–17:00 Standard"></div>
          <div class="bg-red-600"    style="width:16.67%" title="17:00–21:00 Peak"></div>
          <div class="bg-orange-500" style="width:8.33%"  title="21:00–23:00 Standard"></div>
          <div class="" style="width:4.17%;background:#16a34a"  title="23:00–24:00 Off-peak"></div>
        </div>

        <!-- Glass overlay -->
        <div
          v-for="(seg, i) in selectionSegments"
          :key="i"
          class="absolute top-6 h-12 rounded-xl border-2 border-on-primary/60 bg-on-primary/20 backdrop-blur-sm transition-all duration-300 pointer-events-none"
          :style="{ left: seg.left + '%', width: seg.width + '%' }"
        ></div>

        <!-- Selected time label -->
        <div
          class="absolute top-0 text-[11px] font-bold text-surface bg-surface/20 backdrop-blur-sm px-4 py-0.5 rounded-md whitespace-nowrap transition-all duration-300"
          :style="{ left: selectionSegments[0].left + '%', transform: 'translateX(-10%)' }"
        >
          {{ selectionLabel }}
        </div>

        <!-- Hour markers -->
        <div class="flex justify-between mt-2 px-0.5">
          <span class="text-[10px] text-surface/60">0:00</span>
          <span class="text-[10px] text-surface/60">6:00</span>
          <span class="text-[10px] text-surface/60">12:00</span>
          <span class="text-[10px] text-surface/60">18:00</span>
          <span class="text-[10px] text-surface/60">24:00</span>
        </div>
      </div>
    </div>
    <!-- /Timeline card -->

    <h1 class="text-3xl font-extrabold text-on-background tracking-tight">Your Personalised Tips</h1>
    <p v-if="data" class="text-on-surface-variant text-sm mt-1">
      Based on your active hours:
      <span class="font-bold text-primary">{{ data.scheduleSummary }}</span>
    </p>
  </div>

  <!-- Loading -->
  <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-4">
    <div class="w-12 h-12 border-4 border-primary-container border-t-primary rounded-full animate-spin"></div>
    <p class="text-on-surface-variant font-medium">Generating your personalised tips…</p>
  </div>

  <!-- Error -->
  <div v-else-if="error" class="flex flex-col items-center justify-center py-24 gap-4 text-center">
    <span class="material-symbols-outlined text-5xl text-red-400">error_outline</span>
    <p class="text-lg font-bold text-on-surface">Could not connect to the server</p>
    <button
      class="mt-2 px-6 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold hover:opacity-90"
      @click="fetchTips"
    >
      Retry
    </button>
  </div>

  <!-- Cards -->
  <template v-else-if="data">

    <!-- Summary stats -->
    <div class="flex flex-wrap gap-4 mb-8">
      <div class="bg-primary-container/40 border border-outline-variant rounded-xl px-6 py-4 text-center">
        <p class="text-xs font-bold text-primary uppercase tracking-wider mb-1">Potential Saving</p>
        <p class="text-2xl font-black text-primary">{{ data.potentialSaving }}</p>
      </div>
      <div class="bg-surface-container border border-outline-variant rounded-xl px-6 py-4 text-center">
        <p class="text-xs font-bold text-primary uppercase tracking-wider mb-1">Tips Generated</p>
        <p class="text-2xl font-black text-on-surface">{{ data.tipCount }}</p>
      </div>
    </div>

    <!-- ── Tips grid — matches main view card style ── -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div
        v-for="tip in data.tips"
        :key="tip.title"
        class="bg-surface-container-lowest border border-outline-variant/40 rounded-[16px]
               overflow-hidden shadow-sm hover:shadow-md transition-all group"
      >
        <!-- Hero image -->
        <div class="h-36 relative overflow-hidden">
          <img
            :src="tip.imageUrl || categoryImages[tip.category] || categoryImages['Electricity']"
            :alt="tip.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <!-- Badges -->
          <div class="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
            <span
              class="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full tracking-wider"
              :class="[
                impactConfig[tip.impact]?.bg ?? 'bg-surface-container',
                impactConfig[tip.impact]?.text ?? 'text-on-surface-variant'
              ]"
            >
              {{ impactConfig[tip.impact]?.label ?? tip.impact }}
            </span>
            <span
              v-if="tip.timeLabel"
              class="px-2 py-0.5 bg-primary/90 text-on-primary text-[10px] font-bold uppercase rounded-full tracking-wider"
            >
              {{ tip.timeLabel }}
            </span>
          </div>
        </div>

        <!-- Card body -->
        <div class="p-4">
          <span class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 mb-1 block">
            {{ tip.category }}
          </span>
          <h4 class="text-sm font-bold text-on-surface mb-1.5 group-hover:text-primary transition-colors leading-snug">
            {{ tip.title }}
          </h4>
          <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-2 mb-3">
            {{ tip.description }}
          </p>

          <!-- Footer row -->
          <div class="flex items-center justify-between pt-3 border-t border-outline-variant/15 gap-2">
            <span class="flex items-center gap-1.5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
              <span class="material-symbols-outlined text-[14px]" style="font-variation-settings:'FILL' 1">
                {{ categoryIcons[tip.category] ?? 'lightbulb' }}
              </span>
              {{ tip.category }}
            </span>
            <span v-if="tip.saving" class="text-xs font-bold text-primary">
              {{ tip.saving }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA footer -->
    <div class="mt-12 bg-inverse-surface rounded-xl p-10 text-center">
      <h3 class="text-2xl font-bold text-surface mb-4">Ready for a full home energy audit?</h3>
      <p class="text-surface/60 mb-8 max-w-2xl mx-auto">
        Connect your smart meter for real-time analysis and a comprehensive breakdown of your home's energy performance.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <button
          class="bg-primary text-on-primary font-bold py-3 px-8 rounded-md hover:opacity-90 transition-opacity flex items-center gap-2"
          @click="currentView = 'uploadMeter'"
        >
          <span class="material-symbols-outlined">bolt</span>
          Connect My Meter
        </button>
        <button class="bg-transparent border border-surface/30 text-surface font-bold py-3 px-8 rounded-md hover:bg-surface/10 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  </template>

  <UploadMeterForm v-if="currentView === 'uploadMeter'" @back="currentView = 'main'" />
</template>
