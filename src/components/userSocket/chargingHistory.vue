<template>
  <div>
    <div class="flex flex-col w-full gap-4 mx-auto">
      <CharchingChart :chart="props?.chartHistory" />
      <el-table :data="props.chartHistory.charging_history" border style="width: 100%">
        <el-table-column prop="station_name" label="Station Name" width="250" />
        <el-table-column prop="station_address" label="Station Address" width="380" />
        <el-table-column prop="status" label="Status" width="260" />
        <el-table-column prop="price" label="Price" width="260" />
        <el-table-column prop="charged_price" label="Charged Price" width="260" />
        <el-table-column prop="energy_delivered" label="Energy Delivered" width="260" />
        <el-table-column prop="start_time" label="Start Date" width="250" />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import CharchingChart from '/src/components/userSocket/CharchingChart.vue'

const props = defineProps({
  chartHistory: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped></style>
