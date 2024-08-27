<template>
  <div id="chart"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import ApexCharts from 'apexcharts'

const props = defineProps(['days'])

// Define the chart instance
let chart = null

// Define the colors array
const colors = ['#FEB019', '#FEB019', '#FEB019', '#FEB019', '#FEB019', '#FEB019', '#FEB019']

// Define the chart options
const options = ref({
  series: [
    {
      name: 'Day',
      data: [],
    },
  ],
  chart: {
    height: 320,
    type: 'bar',
  },
  colors: colors,
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    labels: {
      style: {
        colors: colors,
        fontSize: '12px',
      },
    },
  },
})

// Use the onMounted lifecycle hook to render the chart
onMounted(() => {
  chart = new ApexCharts(document.querySelector('#chart'), options.value)
  chart.render()
  updateChartData(props.days)
})

// Watch for changes in props.days to update the chart
watch(
  () => props.days,
  (newValue) => {
    updateChartData(newValue)
  },
  { deep: true }
)

// Function to update chart data
function updateChartData(days) {
  if (chart) {
    chart.updateSeries([
      {
        data: [
          days?.monday || 0,
          days?.tuesday || 0,
          days?.wednesday || 0,
          days?.thursday || 0,
          days?.friday || 0,
          days?.saturday || 0,
          days?.sunday || 0,
        ],
      },
    ])
  }
}
</script>

<style scoped>
#chart {
  max-width: 100%;
}
</style>
