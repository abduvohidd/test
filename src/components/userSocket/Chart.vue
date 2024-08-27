<template>
  <div>
    <div class="w-[30vw]">
      <div class="bg-slate-50 border-2 p-4 px-8 rounded-lg min-w-[30vw] h-[350px] flex flex-col justify-between">
        <div class="flex flex-col gap-2">
          <h1 class="text-black text-base 2xl:text-xl">{{ t('dashboard.revenue') }}</h1>
          <div class="flex justify-between">
            <span class="text-green-500 text-base font-bold">{{ totalPrice.toLocaleString('en') }} UZS</span>

            <div>
              <a-space>
                <a-select ref="select" v-model:value="value" style="width: 100px" @focus="focus" @change="handleChange">
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const data = ref([])
const { t } = useI18n()
const value = ref('monthly')
const loading = ref(false)

const getData = async (value) => {
  try {
    loading.value = true
    const response = await apiClient.get(`/dashboard/stats/revenue/?timeframe=${value}`)
    data.value = response.data.data
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
  return Math.max(...Object.values(data.value))
})

const transformedData = computed(() => {
  return Object.keys(data.value).map((day) => {
    const percentage =
      data.value[day] !== 0 && !isNaN(data.value[day]) ? (data.value[day] / maxRevenue.value) * 180 + 'px' : '0px'
    return {
      date: value.value === 'today' || value.value === 'yesterday' ? day.substring(0, 5) : day.substring(0, 3),
      price: Math.round(data.value[day]).toLocaleString('en-US'),
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
  await getData(value)
}

onMounted(() => {
  getData(value.value)
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
