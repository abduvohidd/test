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
      </div>
    </div>

    <div class="w-full mt-5 flex gap-4">
      <div class="flex gap-4">
        <div class="flex flex-col gap-4">
          <div class="bg-slate-50 border-2 p-4 rounded-lg min-w-[30vw] h-[250px]">
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

      <div class="bg-slate-50 border-2 p-4 rounded-lg min-w-[25vw] overflow-y-scroll no-scrollbar h-[250px]">
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

      <div class="bg-slate-50 border-2 p-4 rounded-lg w-full overflow-y-scroll no-scrollbar h-[250px]">
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
      <div class="w-[30vw]">
        <div class="bg-slate-50 border-2 p-4 px-8 rounded-lg min-w-[30vw] h-[350px] flex flex-col justify-between">
          <div class="flex flex-col gap-2">
            <h1 class="text-black text-base 2xl:text-xl">{{ t('dashboard.revenue') }}</h1>
            <div class="flex justify-between">
              <span class="text-green-500 text-base font-bold">{{ totalPrice.toLocaleString('en') }} UZS</span>

              <div>
                <a-space>
                  <a-select
                    ref="select"
                    v-model:value="value"
                    style="width: 100px"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="last_year_monthly">{{ t('dashboard.year') }}</a-select-option>
                    <a-select-option value="last_week">{{ t('dashboard.lastWeek') }}</a-select-option>
                    <a-select-option value="yesterday">{{ t('dashboard.yesterday') }}</a-select-option>
                    <a-select-option value="today">{{ t('dashboard.today') }}</a-select-option>
                    <a-select-option value="weekly">{{ t('dashboard.weekly') }}</a-select-option>
                    <a-select-option value="monthly">{{ t('dashboard.monthly') }}</a-select-option>
                  </a-select>
                </a-space>
              </div>
            </div>
          </div>

          <div v-loading="loading" class="flex mt-12">
            <div
              id="components-a-tooltip-demo-color"
              class="flex justify-between w-full h-full gap-4 no-scrollbar overflow-x-scroll"
            >
              <div v-for="(item, key) in transformedData" :key="key" class="flex flex-col items-center gap-2">
                <a-tooltip
                  :title="`${item.price} Uzs`"
                  color="green"
                  class="flex flex-col items-center justify-end h-[180px]"
                >
                  <div
                    :style="{
                      height: item.percentage,
                    }"
                    class="w-[10px] cursor-pointer bg-green-500 rounded-2xl hover:bg-green-700 transition-all"
                  ></div>
                  <p class="mt-3">{{ item.date }}</p>
                </a-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import UserChart from '@/components/UserChart.vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
const { t } = useI18n()

const dataChart = ref([])
const value = ref('monthly')
const loading = ref(false)

const data = ref([])
import { useRoute } from 'vue-router'

const route = useRoute()

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/stats/?station_id=${route.params.id}`)
    data.value = response.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getData()
  getDataa(value.value)
})

const getDataa = async (value) => {
  try {
    loading.value = true
    const response = await apiClient.get(`/dashboard/stats/revenue/?timeframe=${value}&station_id=${route.params.id}`)
    dataChart.value = response.data.data
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

const focus = () => {
  console.log('focus')
}

const maxRevenue = computed(() => {
  return Math.max(...Object.values(dataChart.value))
})

const transformedData = computed(() => {
  return Object.keys(dataChart.value).map((day) => {
    const percentage =
      dataChart.value[day] !== 0 && !isNaN(dataChart.value[day])
        ? (dataChart.value[day] / maxRevenue.value) * 180 + 'px'
        : '0px'
    return {
      date: value.value === 'today' || value.value === 'yesterday' ? day.substring(0, 5) : day.substring(0, 3),
      price: Math.round(dataChart.value[day]).toLocaleString('en-US'),
      percentage: percentage, // Extract the first 3 characters of the day
    }
  })
})

const totalPrice = computed(() => {
  return transformedData.value.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.price.replace(/,/g, ''))
  }, 0)
})

const handleChange = async (value) => {
  loading.value = true
  await getDataa(value)
}
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
