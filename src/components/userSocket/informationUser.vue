<template>
  <div>
    <!-- <div class="flex items-center gap-12 mt-10"> -->
    <!-- <el-avatar :size="120" @error="errorHandler">
          <el-avatar
            v-if="!data.photo"
            shape="square"
            :size="120"
            src="/src/assets/userPhoto.png"
          />
          <el-avatar v-if="data.photo" shape="square" :size="120" :src="data?.photo" />
        </el-avatar> -->

    <!-- <span class="text-green-500 font-bold text-2xl">{{ data?.balance }} Uzs</span> -->
    <!-- </div> -->

    <div class="w-full p-8 gap-4 flex mt-5">
      <div class="bg-white p-4 w-full h-28 rounded-lg relative border-[2px]">
        <h1 class="font-bold text-xl">Charging Amount</h1>

        <span class="text-green-500 font-bold absolute bottom-5 right-5 text-2xl">{{ data.charging_amount }}</span>
      </div>
      <div class="bg-white p-4 w-full h-28 rounded-lg relative border-[2px]">
        <h1 class="font-bold text-xl">Charging Count</h1>

        <span class="text-green-500 font-bold absolute bottom-5 right-5 text-2xl">{{ data.charging_count }}</span>
      </div>
      <div class="bg-white p-4 w-full h-28 rounded-lg relative border-[2px]">
        <h1 class="font-bold text-xl">Balance</h1>

        <span class="text-green-500 font-bold absolute bottom-5 right-5 text-2xl">{{ data.balance }}</span>
      </div>
    </div>

    <div class="mt-10 flex flex-col gap-2">
      <div class="flex flex-row gap-4 items-center" v-if="data?.first_name !== '' && data?.first_name !== null">
        <p class="font-bold m-0">{{ t('usersList.information.fullName') }}</p>
        ->
        <span class="text-lg capitalize">{{ data?.first_name }} {{ data?.last_name }}</span>
      </div>
      <div class="flex flex-row gap-4 items-center" v-if="data?.phone_number !== '' && data?.phone_number !== null">
        <p class="m-0 font-bold">{{ t('usersList.userEdit.phone') }}</p>
        ->
        <span class="text-lg">{{ data?.phone_number }} </span>
      </div>

      <div class="flex flex-row gap-4 items-center" v-if="data?.email !== '' && data?.email !== null">
        <p class="m-0 font-bold">{{ t('usersList.information.email') }}</p>
        <span class="text-lg">{{ data?.email }} </span>
      </div>

      <div class="flex flex-row gap-4 items-center" v-if="data?.birth_date !== '' && data?.birth_date !== null">
        <p class="m-0 font-bold">Birth Date</p>
        <span class="text-lg">{{ data?.birth_date }} </span>
      </div>

      <div class="flex flex-col mt-10">
        <p class="font-bold">{{ t('usersList.information.cardName') }}</p>
        <div v-for="item in data?.saved_cars" :key="item" class="p-4 rounded-lg flex border-2">
          <div class="flex flex-col w-full">
            <h1>{{ item.brand.name }}</h1>
            <h2>
              Vin number:
              <span class="text-zinc-400">
                {{ item.vin_number }}
              </span>
            </h2>
          </div>
          <div class="flex flex-col gap-4 w-full items-center">
            <img :src="item.connector_type.icon" class="w-[5rem] h-[5rem] object-cover" alt="" />
            <span>{{ item.connector_type.description }}</span>
          </div>
          <div class="flex flex-col gap-4 w-full items-center">
            <img :src="item.connector_type.image" class="w-[5rem] h-[5rem] object-cover" alt="" />
            <span>{{ item.connector_type.name }}</span>
          </div>

          <div class="flex flex-col justify-between w-full items-center p-4">
            <img src="/src/assets/car.png" class="w-[20rem]" alt="" />
            <p class="m-0 mt-2">{{ item.model.name }}</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col mt-10">
        <p class="mb-2 font-bold">{{ t('usersList.information.topStation') }}</p>
        <!-- v-for="item in data?.top_stations"
          :key="item" -->

        <div class="flex flex-row w-full gap-4 overflow-x-scroll no-scrollbar pb-2">
          <div class="p-4 rounded-lg flex flex-col border-2 w-[100%]">
            <div class="flex justify-between w-[20rem] items-center">
              <p class="">
                <!-- {{ item.station_name }}  -->
                Volt Auto 220Kw
              </p>
              <p class="bg-green-500 w-10 h-10 rounded-full flex justify-center items-center text-white p-2">
                <!-- {{ item.charging_count }} -->
                5
              </p>
            </div>
            <span>
              <!-- {{ item.station_address }}  -->
              Toshkent qoraqish 2/4 a4</span
            >
          </div>
          <div class="p-4 rounded-lg flex flex-col border-2 w-[100%]">
            <div class="flex justify-between w-[20rem] items-center">
              <p class="">
                <!-- {{ item.station_name }}  -->
                Volt Auto 220Kw
              </p>
              <p class="bg-green-500 w-10 h-10 rounded-full flex justify-center items-center text-white p-2">
                <!-- {{ item.charging_count }} -->
                5
              </p>
            </div>
            <span>
              <!-- {{ item.station_address }}  -->
              Toshkent qoraqish 2/4 a4</span
            >
          </div>
          <div class="p-4 rounded-lg flex flex-col border-2 w-[100%]">
            <div class="flex justify-between w-[20rem] items-center">
              <p class="">
                <!-- {{ item.station_name }}  -->
                Volt Auto 220Kw
              </p>
              <p class="bg-green-500 w-10 h-10 rounded-full flex justify-center items-center text-white p-2">
                <!-- {{ item.charging_count }} -->
                5
              </p>
            </div>
            <span>
              <!-- {{ item.station_address }}  -->
              Toshkent qoraqish 2/4 a4</span
            >
          </div>
          <div class="p-4 rounded-lg flex flex-col border-2 w-[100%]">
            <div class="flex justify-between w-[20rem] items-center">
              <p class="">
                <!-- {{ item.station_name }}  -->
                Volt Auto 220Kw
              </p>
              <p class="bg-green-500 w-10 h-10 rounded-full flex justify-center items-center text-white p-2">
                <!-- {{ item.charging_count }} -->
                5
              </p>
            </div>
            <span>
              <!-- {{ item.station_address }}  -->
              Toshkent qoraqish 2/4 a4</span
            >
          </div>
          <div class="p-4 rounded-lg flex flex-col border-2 w-[100%]">
            <div class="flex justify-between w-[20rem] items-center">
              <p class="">
                <!-- {{ item.station_name }}  -->
                Volt Auto 220Kw
              </p>
              <p class="bg-green-500 w-10 h-10 rounded-full flex justify-center items-center text-white p-2">
                <!-- {{ item.charging_count }} -->
                5
              </p>
            </div>
            <span>
              <!-- {{ item.station_address }}  -->
              Toshkent qoraqish 2/4 a4</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const errorHandler = () => true
const props = defineProps({
  data: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.el-tabs--card > .el-tabs__header {
  border-bottom: 0px;
}
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-bottom: 1px solid #e4e7ed;
}

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
  scroll-margin-block-start: 0;
}
</style>
