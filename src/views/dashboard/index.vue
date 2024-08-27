<template>
  <div>
    <div class="w-full mt-5">
      <div class="w-full flex gap-4 mx-auto">
        <div class="flex justify-between px-4 py-6 items-center bg-[#1A1F37] text-white rounded-2xl w-[55rem]">
          <div class="">
            <h1>Total charged price</h1>
            <span>
              {{ Number(data.total_charged_price?.toFixed(0)).toLocaleString() }}
              UZS
            </span>
          </div>
          <img src="/src/assets/wallet.svg" alt="wallet" />
        </div>
        <div class="flex justify-between p-4 items-center bg-[#1A1F37] text-white rounded-2xl w-[55rem]">
          <div class="">
            <h1>Total KW</h1>
            <span> {{ Number(data.total_kw?.toFixed(0)).toLocaleString() }} KW </span>
          </div>
          <img src="/src/assets/userLogo.svg" alt="wallet" />
        </div>
        <div class="flex justify-between p-4 items-center bg-[#1A1F37] text-white rounded-2xl w-[55rem]">
          <div class="">
            <h1>Total Users</h1>
            <span>
              {{ Number(data.total_users?.toFixed(0)).toLocaleString() }}
            </span>
          </div>
          <img src="/src/assets/sales.svg" alt="wallet" />
        </div>
      </div>
    </div>

    <div class="w-full mt-5 flex gap-4">
      <div class="flex gap-4">
        <div class="flex flex-col gap-4">
          <div
            :class="{ 'dark:bg-[#060B26]': flag, 'bg-slate-50': !flag }"
            class="border-2 p-4 flex flex-col justify-around rounded-lg min-w-[25vw] h-[173px]"
          >
            <div>
              <h1 class="text-black 2xl:text-xl text-base">{{ t('dashboard.general') }}</h1>
              <p class="text-black text-xs">{{ t('dashboard.panel') }}</p>
            </div>
            <a-space :size="20" class="mt-4">
              <div>
                <h6 class="text-xs">{{ t('dashboard.from') }}</h6>
                <a-date-picker
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  type="date"
                  v-model:value="value1"
                  @change="dateFilter(value1)"
                  clearable="false"
                />
              </div>

              <div>
                <h6 class="text-xs">{{ t('dashboard.to') }}</h6>
                <a-date-picker
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  type="date"
                  v-model:value="value2"
                  @change="dateFilter1(value2)"
                />
              </div>
            </a-space>
          </div>
          <div class="bg-slate-50 border-2 p-4 rounded-lg min-w-[30vw] h-[173px]">
            <div class="flex justify-between">
              <div>
                <h1 class="text-black 2xl:text-xl text-base">{{ t('dashboard.electricity') }}</h1>
              </div>

              <span class="text-green-500 text-base font-bold whitespace-nowrap flex justify-end"
                >{{ Number(data.total_electricity_cost?.toFixed(0)).toLocaleString() }} UZS</span
              >
            </div>

            <div class="flex justify-between">
              <div>
                <h1 class="text-black 2xl:text-xl text-base">{{ t('dashboard.sold') }}</h1>
              </div>

              <span class="text-green-500 text-base font-bold whitespace-nowrap flex justify-end">
                {{ Number(data.total_kw?.toFixed(0)).toLocaleString() }}
                KW</span
              >
            </div>

            <div class="flex justify-between">
              <div>
                <h1 class="text-black 2xl:text-xl text-base">{{ t('dashboard.profit') }}</h1>
              </div>
              <span class="text-green-500 text-base font-bold whitespace-nowrap flex justify-end">
                {{ Number(data.total_profit?.toFixed(0)).toLocaleString() }}
                UZS</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="bg-slate-50 border-2 p-4 rounded-lg min-w-[25vw] overflow-y-scroll no-scrollbar h-[362px]">
        <div class="flex justify-between items-center border-b pb-2 mb-2">
          <h1 class="text-black text-base mb-0 2xl:text-xl">{{ t('dashboard.rentCost') }}</h1>
          <span class="text-green-500 text-base font-bold">
            {{ Number(data.total_rent_cost?.toFixed(0)).toLocaleString() }}
            UZS</span
          >
        </div>
        <div>
          <div class="flex justify-center items-center">
            <h1 class="text-black text-base 2xl:text-xl">{{ t('dashboard.rent') }}</h1>
          </div>

          <div v-for="item in data.rent_cost_stations" :key="item.station_id" class="flex justify-between items-center">
            <div class="flex flex-col items-center mt-2">
              <h4 class="text-base font-normal m-0">{{ item.station_name }}</h4>
            </div>
            <span class="text-green-500 font-bold text-base mt-2">
              {{ Number(item.rent_cost?.toFixed(0)).toLocaleString() }}
              UZS</span
            >
          </div>
        </div>
      </div>

      <div class="bg-slate-50 border-2 p-4 rounded-lg w-full overflow-y-scroll no-scrollbar h-[362px]">
        <div class="flex 2xl:flex-row flex-col justify-between items-center border-b pb-2 mb-2 gap-2">
          <h1 class="text-black text-base mb-0 whitespace-nowrap 2xl:text-xl">{{ t('dashboard.allCommissions') }}</h1>
          <span class="text-green-500 text-base whitespace-nowrap font-bold">
            {{ Number(data.total_commission?.toFixed(0)).toLocaleString() }}
            UZS</span
          >
        </div>
        <div>
          <div class="flex justify-center items-center">
            <h1 class="text-black 2xl:text-xl text-base">{{ t('dashboard.commission') }}</h1>
          </div>

          <div v-for="item in data.commissions" :key="item.station_id" class="flex justify-between items-center">
            <div class="flex flex-col items-center mt-3">
              <h4 class="text-base m-0 font-normal">{{ item.station_name }}</h4>
            </div>
            <span class="text-green-500 font-bold text-base whitespace-nowrap mt-3">
              {{ Number(item.commission?.toFixed(0)).toLocaleString() }}
              UZS</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex gap-4 mt-5">
      <div class="bg-slate-50 border-2 p-4 rounded-lg min-w-[25vw] h-[350px]">
        <h1 class="text-black text-base">Popular Day</h1>
        <UserChart :days="data?.popular_days" />
      </div>
      <Chart />
      <div class="bg-slate-50 border-2 p-4 rounded-lg overflow-y-scroll no-scrollbar h-[350px] w-full">
        <div class="flex justify-between items-center border-b pb-2 mb-2">
          <h1 class="text-black text-base mb-0 2xl:text-xl">Top Users</h1>
        </div>
        <div>
          <div class="flex flex-col justify-between items-center">
            <div v-for="item in data.top_users" :key="item.user_id" class="flex gap-4 items-center w-full mt-2 p-2">
              <el-avatar :size="40" src="/src/assets/userPhoto.png" />
              <div class="flex flex-col">
                <h4 class="text-base m-0 font-bold">{{ item.first_name }} {{ item.last_name }}</h4>
                <p class="text-xs">
                  Charging count -
                  <span class="text-base font-bold text-green-500">
                    {{ item.count }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-slate-50 border-2 p-4 flex flex-col justify-around rounded-lg mt-5">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1">
          <template #tab>
            <span class="font-bold">{{ t('dashboard.map') }} </span>
          </template>
          <Map />
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #tab>
            <span class="font-bold"> {{ t('dashboard.pulseTable') }} </span>
          </template>
          <Table />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Map from '@/components/Map.vue'
import UserChart from '@/components/UserChart.vue'
import Chart from '@/components/userSocket/Chart.vue'
import Table from '@/components/Table.vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
const { t } = useI18n()
const activeKey = ref('1')
const number = ref(2055555)
const d = new Date()
const dateFormat = 'YYYY-MM-DD'
const value1 = ref('2024-01-01', dateFormat)
const value2 = ref(dayjs().format(dateFormat))

const data = ref([])

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/stats/?start_time=${value1.value}&end_time=${value2.value}`)
    data.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const dateFilter = async (start) => {
  value1.value = start
  getData()
}
const dateFilter1 = async (end) => {
  value2.value = end
  getData()
}

onMounted(() => {
  getData()
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e1e1e1;
  border: 4px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;
}

.no-scrollbar::-webkit-scrollbar {
  width: 16px;
}

.no-scrollbar {
  -ms-overflow-style: none;
  /* scrollbar-width: thin; */
  /* margin: inherit; */
  scroll-margin-block-start: 0;
}
</style>
