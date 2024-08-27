<template>
  <div>
    <h1 class="text-4xl m-0 mb-2 flex gap-2">
      List of charging stations
      <!-- <div class="circle"></div> -->
    </h1>

    <div class="mt-16">
      <el-table :data="data" border style="width: 100%" class="mt-16 mx-auto">
        <el-table-column label=" Station name" class="w-[180px]">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.station_info.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Station address" class="w-[180px]">
          <template #default="scope">
            <a
              :href="`https://www.google.com/maps?q=${scope.row.station_info.latitude},${scope.row.station_info.longitude}`"
            >
              <el-tooltip :content="scope.row.station_info.address" placement="top">
                <el-button
                  ><el-icon><Location /></el-icon>
                </el-button>
              </el-tooltip>
            </a>
          </template>
        </el-table-column>
        <el-table-column label="Charged Price" class="w-[180px]">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.session_info.charged_price.toLocaleString() }} UZS </span>
          </template>
        </el-table-column>
        <el-table-column label="Energy Delivered" class="w-[180px]">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.session_info.energy_delivered }} KW</span>
          </template>
        </el-table-column>
        <el-table-column label="Start Date" class="w-[180px]">
          <template #default="scope">
            <span style="margin-left: 10px">
              {{ new Date(scope.row.session_info.start_time).toLocaleDateString('en-US') }}
              {{ new Date(scope.row.session_info.start_time).toLocaleTimeString('en-US') }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Battery" class="w-[180px]">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.session_info.battery_current }} </span>
          </template>
        </el-table-column>
        <el-table-column label="User" class="w-[180px]">
          <template #default="scope">
            <span style="margin-left: 10px"
              >{{ scope.row.user_info.first_name }} {{ scope.row.user_info.last_name }} -
              {{ scope.row.user_info.phone_number }}</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { Search, Location, ArrowDown } from '@element-plus/icons-vue'
import { markRaw } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
const size = ref<'default' | 'large' | 'small'>('default')
import apiClient from '@/utils/axios'
const value1 = ref('')
const data = ref([])

const { t } = useI18n()
const search = ref('')

// const filterData = computed(() => {
//   return tableData.filter((item) => item.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
// })

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/station-investor/live-charging-stations`)
    data.value = response.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getData()
})
</script>

<style>
.el-pagination.is-background .el-pager li.is-active {
  background: rgb(34 197 94) !important;
}
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  /* cursor: pointer; */
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.circle {
  position: absolute;
  left: 35%;
  /* top: 11%; */
  /* transform: translateX(-50%) translateY(-50%); */
  width: 15px;
  height: 15px;
}

.circle:before {
  content: '';
  position: relative;
  display: block;
  width: 250%;
  height: 250%;
  box-sizing: border-box;
  margin-left: -75%;
  margin-top: -75%;
  border-radius: 45px;
  background-color: #75daad;
  animation: pulse 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

.circle:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: #75daad;
  border-radius: 50px;
  animation: circle 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.33);
  }
  80%,
  100% {
    opacity: 0;
  }
}

@keyframes circle {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}
</style>
