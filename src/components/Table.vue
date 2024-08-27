<template>
  <div>
    <el-table :data="data" border style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <div
            v-for="(item, index) in props.row.connector"
            :key="index"
            class="flex mb-5 w-[98%] mx-auto bg-[#f5f4f4] p-2 rounded-lg"
          >
            <div class="w-full flex 2xl:flex-row flex-col p-2 gap-8 2xl:items-center">
              <div class="gap-8 flex">
                <img src="/src/assets/car.png" class="w-[5rem]" alt="" />
                <el-tag type="success" v-if="item.status === 'Available'">{{ item.status }}</el-tag>
                <el-tag type="warning" v-else-if="item.status === 'Charging'">{{ item.status }}</el-tag>
                <el-tag type="warning" v-else-if="item.status === 'Preparing'">{{ item.status }}</el-tag>
                <el-tag type="danger" v-else>{{ item.status }}</el-tag>

                <span v-if="item.car_model !== null" class="flex items-center gap-3"
                  >Car Model : <el-tag type="primary">{{ item.car_model }}</el-tag></span
                >

                <span v-if="item.connector_type !== null" class="flex items-center gap-3"
                  >Connector : <el-tag type="primary">{{ item.connector_type }}</el-tag></span
                >

                <span v-if="item.battery_percentage !== null" class="flex items-center gap-3"
                  >Battery : <el-tag type="primary">{{ item.battery_percentage }}</el-tag></span
                >

                <span v-if="item.phone_number !== null" class="flex items-center gap-3"
                  >Phone : <el-tag type="primary">{{ item.phone_number }}</el-tag></span
                >
              </div>

              <div class="flex gap-8">
                <span v-if="item.charged_price !== null" class="flex items-center gap-3"
                  >Charged Price : <el-tag type="primary">{{ item.charged_price }}</el-tag></span
                >

                <span v-if="item.energy_power !== null" class="flex items-center gap-3"
                  >Power : <el-tag type="primary">{{ item.energy_power }}</el-tag></span
                >

                <span v-if="item.plug_type !== null" class="flex items-center gap-3"
                  >Plat Type : <el-tag type="primary">{{ item.plug_type }}</el-tag></span
                >

                <span v-if="item.start_time !== null" class="flex items-center gap-3"
                  >Start Time : <el-tag type="primary">{{ item.start_time }}</el-tag></span
                >
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Name" prop="station_name" />
      <el-table-column :label="t('stationsList.stationTable.location')" class="w-[180px]">
        <template #default="scope">
          <a :href="`https://www.google.com/maps?q=${scope.row.latitude},${scope.row.longitude}`">
            <el-tooltip :content="scope.row.station_name" placement="top">
              <el-button
                ><el-icon><Location /></el-icon>
              </el-button>
            </el-tooltip>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="Status">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status === 'Available'">{{ scope.row.status }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Status Info">
        <template #default="scope">
          <img v-if="scope.row.status_info === 1" src="/src/assets/green-change.svg" alt="" />
          <img v-if="scope.row.status_info === 2" src="/src/assets/half-change-3.svg" alt="" />
          <img v-if="scope.row.status_info === 3" src="/src/assets/yellow-change.svg" alt="" />
          <img v-if="scope.row.status_info === 4" src="/src/assets/red-change.svg" alt="" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { Location } from '@element-plus/icons-vue'
const { t } = useI18n()
const data = ref([])

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/station-statuses/`)
    data.value = response.data.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getData()
})
</script>

<style>
.ant-table-content::-webkit-scrollbar-thumb {
  background-color: #e1e1e1 !important;
  border: 4px solid transparent !important;
  border-radius: 8px !important;
  background-clip: padding-box !important;
}
.ant-table-content::-webkit-scrollbar {
  width: 16px !important;
}
.ant-table-content {
  -ms-overflow-style: none !important;
  scrollbar-width: thin !important;
  scroll-margin-block-start: 0 !important;
}
</style>
