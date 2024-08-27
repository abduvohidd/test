<template>
  <div id="app">
    <div class="flex justify-between gap-4 my-5">
      <h1 class="text-xl">
        Total Charged KW -
        <span class="text-green-500 font-bold"> {{ props?.chart?.statistics?.total_charged_kw / 1000 }} Kw </span>
      </h1>
      <h1 class="text-xl">
        Total Charged Price -
        <span class="text-green-500 font-bold"> {{ props?.chart?.statistics?.total_charged_price }} UZS </span>
      </h1>
    </div>
    <apexchart
      class="mx-auto !w-[65rem]"
      :type="chart.type || 'bar'"
      height="400"
      width="1000"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  chart: {
    type: Object,
    required: true,
  },
})

const series = computed(() => [
  {
    name: 'Total Charged kW',
    data: props?.chart?.statistics?.yearly_statistics?.map((item) => item.total_charged_kw / 1000) || [],
  },
  {
    name: 'Total Charged Price',
    data: props?.chart?.statistics?.yearly_statistics?.map((item) => item.total_charged_price) || [],
  },
])

const chartOptions = ref({
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '85%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + 'UZS'
      },
    },
  },
})
</script>

<script>
export default {
  components: {
    apexchart: VueApexCharts,
  },
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
