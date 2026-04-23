<template>
  <div class="bg-white p-4 rounded-2xl shadow h-[300px]">
    <Line :data="chartData" :options="chartOptions" />

    <div class="mt-3 text-sm">
      <p><strong>Total:</strong> {{ total }} kWh</p>
      <p><strong>Peak:</strong> {{ peakDay }} ({{ peakValue }} kWh)</p>
    </div>
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

// Props coming from Dashboard
const props = defineProps({
  labels: Array,
  values: Array,
  total: Number,
  peakDay: String,
  peakValue: Number
})

// Chart data
const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: 'Energy Usage',
      data: props.values,
      tension: 0.4
    }
  ]
}

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>
