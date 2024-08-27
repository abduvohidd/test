<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { Location } from '@element-plus/icons-vue'
import apiClient from '@/utils/axios'
import { useI18n } from 'vue-i18n'
import { GoogleMap, Marker } from 'vue3-google-map'

import 'vue3-toastify/dist/index.css'
import { useRoute } from 'vue-router'

const route = useRoute()
const api = 'AIzaSyAkNF2jDmfg-aJFFAwkxOLisnqmtkcHoV0'
const { t } = useI18n()
const data = ref([])
const data1 = ref([])
const data2 = ref([])
const rent = ref('')
const commission = ref()
const electricityCost = ref()
const rentCost = ref()

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/station/${route.params.id}`)

    data.value = response.data.data
    rent.value = response.data.data.station_cost.rent_type
    commission.value = response.data.data.station_cost.commission
    electricityCost.value = response.data.data.station_cost.electricity_cost
    rentCost.value = response.data.data.station_cost.rent_cost

    console.log(rent.value)
  } catch (err) {
    console.log(err)
  }
}

const getDataStats = async () => {
  try {
    const response = await apiClient.get(`/dashboard/stats/?id=${route.params.id}`)

    data2.value = response.data.data

    console.log(data2.value)
  } catch (err) {
    console.log(err)
  }
}

const getData1 = async () => {
  try {
    const response = await apiClient.get(`/dashboard/connector-type/`)
    data1.value = response.data.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getData()
  getData1()
  getDataStats()
})
</script>

<template>
  <div>
    <div class="w-full bg-slate-100 rounded-xl px-12 py-8">
      <div class="w-full flex justify-between items-center">
        <div class="flex flex-col">
          <h1 class="font-bold text-3xl">View station</h1>

          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/station-list' }">Station List</el-breadcrumb-item>
            <el-breadcrumb-item>View Station</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <router-link :to="{ name: 'station-stats', params: { id: route.params.id } }">
          <el-button type="success">Success</el-button>
        </router-link>
      </div>

      <div class="mt-10">
        <el-form label-width="120px" label-position="top" ref="dataRef" :model="data">
          <div class="flex gap-4 w-full">
            <el-form-item label="Name" class="flex flex-row-reverse w-[50%]">
              <el-input v-model="data.name" placeholder="Station Name" disabled />
            </el-form-item>

            <el-form-item label="Address" class="flex flex-row-reverse w-[50%]">
              <el-input v-model="data.address" placeholder="Volt Auto address" disabled>
                <template #append>
                  <el-button @click="centerDialogVisible = true" :icon="Location" />
                </template>
              </el-input>
            </el-form-item>
          </div>

          <div class="flex gap-4 w-full">
            <el-form-item label="Nearby Places" class="w-[50%]">
              <el-select
                v-model="data.nearby_places"
                multiple
                filterable
                allow-create
                default-first-option
                :reserve-keyword="false"
                placeholder="Select the place"
                disabled
              >
                <el-option v-for="item in data.nearby_places" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>

            <el-form-item label="OCPP ID" class="flex flex-row-reverse w-[50%]">
              <el-input v-model="data.ocpp_id" type="number" placeholder="OCPP ID" disabled />
            </el-form-item>
          </div>

          <div class="flex justify-between w-full gap-2">
            <el-form-item label="Energy power" class="flex flex-row-reverse w-full">
              <el-input v-model="data.power" placeholder="Energy power" disabled />
            </el-form-item>
          </div>

          <div class="flex w-full mt-10">
            <div class="flex flex-col w-full">
              <h1>Add Price</h1>
              <div v-for="item in data.dynamic_prices" :key="item" class="flex gap-4 items-center w-full">
                <div class="my-1 gap-2 flex">
                  <div class="flex gap-2 p-2 bg-slate-200 rounded-xl items-center font-semibold">
                    <span>{{ item.start_time }}</span> /
                    <span>{{ item.end_time }}</span>
                  </div>
                  <div class="flex gap-2 p-2 bg-slate-200 rounded-xl">
                    <div class="flex items-center font-semibold gap-4">
                      <div class="flex gap-2">
                        <span>{{ item.price }}</span> /
                        <span class="uppercase">{{ item.currency }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col w-full">
              <h1>Add Socket</h1>

              <div v-for="item in data.sockets" :key="item" class="flex gap-4 items-center w-full">
                <div class="my-1 gap-2 flex">
                  <div class="flex items-center font-semibold gap-2 p-2 bg-slate-300 rounded-xl">
                    <span class="uppercase">{{ item.plug_type }}</span> /
                    <div v-for="item1 in data1" :key="item1.id">
                      <span
                        v-if="item.connector_type_id === item1?.id"
                        :class="item.connector_type_id === item1?.id ? 'block' : 'hidden'"
                      >
                        {{ item1.name }}
                      </span>
                    </div>
                  </div>
                  <div class="flex gap-2 p-2 bg-slate-300 rounded-xl">
                    <div class="flex items-center gap-2">
                      <div class="flex font-semibold gap-2 items-center">
                        <span>{{ item.connector_id }}</span> /
                        <span>{{ item.power }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div label="Rent for station" class="flex flex-col my-5">
            <el-radio-group v-model="rent" disabled class="my-5">
              <el-radio label="monthly_rent" :value="rent === 'monthly_rent'">Monthly rent</el-radio>
              <el-radio label="rent_for_kw" :value="rent === 'rent_for_kw'">Rent of 1 Kw</el-radio>
              <el-radio label="free_rent" :value="rent === 'free_rent'">Free rent</el-radio>
            </el-radio-group>

            <div class="flex gap-4">
              <el-input v-if="rent === 'monthly_rent'" v-model="rentCost" type="number" placeholder="0" disabled />
              <el-input v-if="rent === 'rent_for_kw'" v-model="rentCost" placeholder="0" type="number" disabled />
            </div>
          </div>

          <div class="flex justify-between w-full gap-2">
            <el-form-item label="The cost of 1 KW of electricity" class="flex flex-row-reverse w-full">
              <el-input v-model="electricityCost" placeholder="The cost of 1 KW of electrtcity" disabled />
            </el-form-item>

            <el-form-item label="Company commission" class="flex flex-row-reverse w-full">
              <el-input v-model="commission" placeholder="Company commission" disabled />
            </el-form-item>
          </div>

          <div class="flex w-full mt-10">
            <!-- <div class="flex flex-col w-full">
              <h1>Investors</h1>

              <div v-if="investor" class="flex gap-4 items-center w-full">
                <div class="my-1 gap-2 flex">
                  <div class="inline-block gap-2 p-2 bg-slate-200 rounded-xl">
                    <div class="flex gap-4 items-center">
                      <div class="flex gap-2 font-semibold">
                        <span>{{ data.station_investor.investor }}</span> /
                        <span>{{ data.station_investor.investor_expense }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->

            <div class="flex flex-col w-full mb-5">
              <h1>Referns point</h1>

              <div v-if="data.reference_points?.length !== 0" class="flex gap-4 items-center w-full">
                <div class="my-1 gap-2 flex">
                  <div class="inline-block gap-2 p-2 bg-slate-200 rounded-xl">
                    <div class="flex gap-4 items-center font-semibold">
                      <span.id v-for="item in data.reference_points" :key="item">{{ item.name }}</span.id>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex gap-4 w-full mt-5">
            <el-form-item label="Image" class="w-[50%]">
              <div v-for="item in data.station_images" :key="item.id" class="flex">
                <img class="w-[5vw] ml-2 mr-2" :src="item.image" alt="station image" />
              </div>
            </el-form-item>

            <el-form-item label="QR code" class="w-[50%]">
              <img class="w-[5vw] ml-2 mr-2" :src="data.qr_code" alt="Code" />
            </el-form-item>
          </div>

          <div class="mt-10 flex gap-4">
            <router-link :to="{ path: '/station-list' }">
              <el-button class="cursor-pointer"> Close </el-button>
            </router-link>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style>
.el-form-item__label {
  display: flex !important;
  flex-direction: row-reverse !important;
  gap: 4px !important;
}

.g-maps {
  height: 400px;
}

.g-maps a {
  display: none !important;
}
.el-upload-list__item-actions {
  width: 5vw !important;
  height: 5vw !important;
}
.el-upload--picture-card {
  width: 5vw !important;
  height: 5vw !important;
}

.el-upload-list__item-thumbnail {
  width: 5vw !important;
  height: 5vw !important;
}
.is-ready {
  width: 5vw !important;
  height: 5vw !important;
}
</style>
