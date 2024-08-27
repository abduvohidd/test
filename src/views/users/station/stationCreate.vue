<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { Location, Edit, Delete, Plus } from '@element-plus/icons-vue'
import apiClient from '@/utils/axios'
import { useI18n } from 'vue-i18n'
import { GoogleMap, Marker } from 'vue3-google-map'
import router from '@/router'
import { UploadProps, UploadRawFile, genFileId, type UploadInstance } from 'element-plus'
import type { UploadFile } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import AddPriveModal from '../../../components/station/addPriceModal.vue'
import SocketModal from '../../../components/station/socketModal.vue'
import { usePriceStore, useSocketStore } from '../../../stores/priceStore.js'
const priceStore = usePriceStore()
const socketStore = useSocketStore()

const lat = ref('41.3425468')
const lng = ref('69.3353011')
const api = 'AIzaSyAkNF2jDmfg-aJFFAwkxOLisnqmtkcHoV0'
const center = ref({ lat: +lat.value, lng: +lng.value })
const markerOptions = ref({ position: center })
const { t } = useI18n()
const data = ref([])
const data2 = ref([])
const pointArray = ref([])
const investor = ref('')
const initial_investment_amount = ref(0)
const freeRent = ref(0)
const monthlyRentValue = ref(0)
const kwRentValue = ref(0)
const rentCost = ref(0)
const addInvestor = ref(false)
const addPoint = ref(false)
const centerDialogVisible = ref(false)
const rentType = ref('monthly_rent')
const investorText = ref(false)
const editInvestorModal = ref(false)
const editPointModal = ref(false)
const point = ref()
const invested_date = ref('')

const upload = ref<UploadInstance>()
const ruleFormRef = ref<FormInstance>()

watch(rentType, (newRentType) => {
  ruleForm.station_cost.rent_type = newRentType
})

watch(rentCost, (newRentCost) => {
  ruleForm.station_cost.rent_cost = newRentCost
})

interface RuleForm {
  name: string
  address: string
  power: string
  latitude: string
  longitude: string
  ocpp_id: number
  nearby_places_ids: any
  reference_point_names: string[]
  sockets: string[]
  dynamic_prices: string[]
  station_cost: any
  rent_type: string
  investor: string
  initial_investment_amount: any
  // station_investor: any
  invested_date: string
  stationStatus: string
  start_time: string
  end_time: string
  price: number
  connector_type_id: string
  image: any
  status: Boolean
  station: string
}

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: 'Please station name', trigger: 'blur' }],
  address: [{ required: true, message: 'Please location', trigger: 'blur' }],
  latitude: [{ required: true, message: 'Please address latitude', trigger: 'blur' }],
  longitude: [{ required: true, message: 'Please address longitude', trigger: 'blur' }],
  power: [{ required: true, message: 'Please Energy power', trigger: 'blur' }],
  ocpp_id: [{ required: true, message: 'Please OCPP id', trigger: 'blur' }],
  reference_point_names: [{ required: true, message: 'Please OCPP id', trigger: 'blur' }],
  rent_type: [{ required: true, message: 'Please reference point', trigger: 'change' }],
  investor: [{ required: true, message: 'Please investor', trigger: 'change' }],
  initial_investment_amount: [{ required: true, message: 'Please investor expense', trigger: 'blur' }],
})

const ruleForm = reactive<RuleForm>({
  name: '',
  address: '',
  power: '',
  latitude: null,
  longitude: null,
  ocpp_id: null,
  nearby_places_ids: null,
  reference_point_names: null,
  sockets: null,
  dynamic_prices: null,
  station_cost: {
    rent_type: rentType.value,
    electricity_cost: null,
    commission: null,
    rent_cost: rentCost.value,
  },
  investor: '',
  initial_investment_amount: null,
  invested_date: '',
  stationStatus: '',
  status: false,
  rent_type: '',
  investor: '',
  start_time: '',
  end_time: '',
  price: null,
  connector_type_id: '',
  image: '',
  station: '',
})

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/nearby-places/`)
    data.value = response.data.data
  } catch (err) {
    console.log(err)
  }
}

// const getData2 = async () => {
//   try {
//     const response = await apiClient.get(`/dashboard/station-investor/`)
//     data2.value = response.data
//   } catch (err) {
//     console.log(err)
//   }
// }

const postData = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        saveInputValue()

        ruleForm.dynamic_prices = priceStore.dynamicPrice
        ruleForm.sockets = socketStore.socket
        const response = await apiClient.post(`/dashboard/station/create/`, {
          name: ruleForm.name,
          address: ruleForm.address,
          power: ruleForm.power,
          latitude: ruleForm.latitude,
          ocpp_id: +ruleForm.ocpp_id,
          longitude: ruleForm.longitude,
          nearby_places_ids: ruleForm.nearby_places_ids,
          reference_point_names: ruleForm.reference_point_names,
          sockets: ruleForm.sockets,
          dynamic_prices: ruleForm.dynamic_prices,
          station_cost: ruleForm.station_cost,
          investor: ruleForm.investor,
          initial_investment_amount: ruleForm.initial_investment_amount,
          invested_date: ruleForm.invested_date,
        })
        console.log(priceStore.$state, 'create')
        const stationId = response.data.data.id // Station ID ni olish
        await postImage(stationId)
        router.push('/station-list')
      } catch (err) {
        console.log(err)
        toast.error(err.message, {
          autoClose: 3000,
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const postImage = async (station: string) => {
  try {
    const formData = new FormData()
    if (Array.isArray(ruleForm.image)) {
      ruleForm.image.forEach((image: any) => {
        formData.append('image', image)
      })
    } else {
      // Agar ruleForm.image massiv emas bo'lsa, faqat faylni qo'shamiz
      formData.append('image', ruleForm.image)
    }
    // formData.append('images', ruleForm.image)
    formData.append('station', station)
    const response = await apiClient.post(`/dashboard/station-image/create/`, formData)
  } catch (err) {
    console.log(err)
  }
}

// Station image

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handleFile = (event: any) => {
  if (!Array.isArray(ruleForm.image)) {
    ruleForm.image = []
  }

  ruleForm.image.push(event.raw)
}
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

// Station image end

//// Dinamic price Edit and Delete

const priceDelete = (item: string) => {
  const index = dynamicPriceArray.value.indexOf(item)
  if (index !== -1) {
    dynamicPriceArray.value.splice(index, 1)
  }
}

const priceEdit = (item: string) => {
  const index = dynamicPriceArray.value.indexOf(item)
  indexPrice.value = dynamicPriceArray.value.indexOf(item)
  if (index !== -1) {
    const selectedItem = dynamicPriceArray.value[index]

    startTime.value = selectedItem.start_time
    endTime.value = selectedItem.end_time
    price.value = selectedItem.price
    currency.value = selectedItem.currency
  }
  editPrice.value = true
}

// Open Modal

const saveInputValue = () => {
  switch (ruleForm.station_cost.rent_type) {
    case 'monthly_rent':
      ruleForm.station_cost.rent_cost = +monthlyRentValue.value
      break
    case 'rent_for_kw':
      ruleForm.station_cost.rent_cost = +kwRentValue.value
      break
    case 'free_rent':
      ruleForm.station_cost.rent_cost = +freeRent.value
      break
    default:
      break
  }
}
const handleClick = (event: { latLng: { lat: () => number; lng: () => number } }) => {
  center.value = { lat: +event.latLng.lat().toFixed(6), lng: +event.latLng.lng().toFixed(6) }
  markerOptions.value = { position: center.value }
}
const location = () => {
  ruleForm.latitude = center.value.lat.toString()
  ruleForm.longitude = center.value.lng.toString()
  centerDialogVisible.value = false
}
const investorSave = () => {
  ruleForm.investor = investor.value
  ruleForm.initial_investment_amount = initial_investment_amount.value
  ruleForm.invested_date = invested_date.value

  investor.value = ''
  initial_investment_amount.value = null
  addInvestor.value = false
  investorText.value = true
  editInvestorModal.value = true
}

const investorDelete = () => {
  ruleForm.investor = ''
  ruleForm.initial_investment_amount = ''
  editInvestorModal.value = false
}

const pointSave = () => {
  pointArray.value.push(point.value)

  ruleForm.reference_point_names = pointArray.value

  addPoint.value = false
  editPointModal.value = true
  point.value = null
}

const pointDelete = () => {
  editPointModal.value = false
  pointArray.value.length = null
}

// Open modal end

const close = () => {
  addInvestor.value = false
  addPoint.value = false
  investor.value = ''
  initial_investment_amount.value = null
  point.value = null
}

onMounted(() => {
  getData()
  // getData2()
})
</script>

<template>
  <div>
    <div class="w-full bg-[#f7f7f7] rounded-xl px-12 py-8">
      <h1 class="font-bold text-3xl">Create station</h1>

      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/station-list' }">Station List</el-breadcrumb-item>
        <el-breadcrumb-item>Add Station</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="mt-10">
        <el-form label-width="120px" label-position="top" :rules="rules" ref="ruleFormRef" :model="ruleForm">
          <div class="flex gap-4 w-full">
            <el-form-item label="Name" class="flex flex-row-reverse w-[50%]" prop="name">
              <el-input v-model="ruleForm.name" placeholder="Station Name" />
            </el-form-item>

            <el-form-item label="Address" class="flex flex-row-reverse w-[50%]" prop="address">
              <el-input v-model="ruleForm.address" placeholder="Volt Auto address">
                <template #append>
                  <el-button @click="centerDialogVisible = true" :icon="Location" />
                </template>
              </el-input>
            </el-form-item>
          </div>

          <div class="flex gap-4 w-full">
            <el-form-item label="Nearby Places" prop="nearby_places_ids" class="w-[50%]">
              <el-select
                v-model="ruleForm.nearby_places_ids"
                multiple
                filterable
                allow-create
                default-first-option
                :reserve-keyword="false"
                placeholder="Select the place"
                class="!border-[#6b7280]"
              >
                <el-option v-for="item in data" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>

            <el-form-item label="OCPP ID" class="flex flex-row-reverse w-[50%]" prop="ocpp_id">
              <el-input v-model="ruleForm.ocpp_id" type="number" placeholder="OCPP ID" />
            </el-form-item>
          </div>
          <div class="flex justify-between w-full gap-2">
            <el-form-item label="Energy power" class="flex flex-row-reverse w-full" prop="power">
              <el-input v-model="ruleForm.power" placeholder="Energy power" />
            </el-form-item>
          </div>

          <div class="flex w-full mt-10">
            <div class="flex w-full justify-around">
              <AddPriveModal />

              <SocketModal />
            </div>
          </div>

          <div label="Rent for station" class="flex flex-col my-5">
            <el-radio-group v-model="rentType" @change="saveInputValue()" class="my-5">
              <el-radio label="monthly_rent">Monthly rent</el-radio>
              <el-radio label="rent_for_kw">Rent of 1 Kw</el-radio>
              <el-radio label="free_rent">Free rent</el-radio>
            </el-radio-group>

            <div class="flex gap-4">
              <el-input
                v-model="monthlyRentValue"
                type="number"
                placeholder="0"
                class="!w-[15%]"
                :disabled="rentType !== 'monthly_rent'"
              />
              <el-input
                v-model="kwRentValue"
                class="!w-[15%]"
                placeholder="0"
                type="number"
                :disabled="rentType !== 'rent_for_kw'"
              />

              <!-- <el-date-picker
                v-model="rentStart"
                type="date"
                placeholder="Pick a day"
                size="default"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              /> -->
            </div>
          </div>

          <div class="flex justify-between w-full gap-2">
            <el-form-item label="The cost of 1 KW of electricity" class="flex flex-row-reverse w-full">
              <el-input
                v-model="ruleForm.station_cost.electricity_cost"
                class="!w-[80%]"
                placeholder="The cost of 1 KW of electrtcity"
              />
            </el-form-item>

            <el-form-item label="Company commission" class="flex flex-row-reverse w-full">
              <el-input v-model="ruleForm.station_cost.commission" class="!w-[80%]" placeholder="Company commission" />
            </el-form-item>
          </div>

          <el-dialog v-model="centerDialogVisible" title="Map" width="45%" align-center>
            <div class="container">
              <div class="rounded-2xl overflow-hidden w-[100%]">
                <GoogleMap
                  @click="handleClick"
                  id="map"
                  class="g-maps"
                  ref="mapRef"
                  :api-key="api"
                  :center="center"
                  :zoom="12"
                >
                  <Marker :options="markerOptions" />
                </GoogleMap>
              </div>
              <div class="flex gap-4 mt-5 w-full">
                <div class="flex flex-col gap-2 w-[50%]">
                  <el-form-item label="Lat" class="flex flex-row-reverse" prop="latitude">
                    <el-input v-model="center.lat" placeholder="lang" />
                  </el-form-item>
                </div>
                <div class="flex flex-col gap-2 w-[50%]">
                  <el-form-item label="Lang" class="flex flex-row-reverse" prop="longitude">
                    <el-input v-model="center.lng" placeholder="lang" />
                  </el-form-item>
                </div>
              </div>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">{{ t('buttons.cancel') }}</el-button>
                <el-button type="primary " @click="location"> {{ t('buttons.save') }} </el-button>
              </span>
            </template>
          </el-dialog>

          <!-- <el-dialog v-model="addInvestor" title="Investors" width="20%" align-center>
            <div class="flex flex-col">
              <div class="flex flex-col gap-2">
                <el-form-item label="Investor" class="flex flex-row-reverse w-full">
                  <el-select v-model="investor" class="my-2 w-full" placeholder="Select" size="large">
                    <el-option v-for="item in data2" :key="item.id" :label="item.first_name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="flex flex-col gap-2">
                <el-form-item label="Investor Expense" class="flex flex-row-reverse w-full">
                  <input v-model="initial_investment_amount" class="w-full rounded-md" type="number" />
                </el-form-item>
              </div>

              <div class="flex flex-col gap-2">
                <el-date-picker
                  v-model="invested_date"
                  type="date"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="Pick a day"
                />
              </div>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
                <el-button type="primary" @click="investorSave"> {{ t('buttons.save') }} </el-button>
              </span>
            </template>
          </el-dialog> -->

          <el-dialog v-model="addPoint" title="Reference Point" width="15%" align-center>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <el-form-item label="Reference Point" class="flex flex-row-reverse w-full" prop="reference_point_names">
                  <input v-model="point" class="w-full rounded-md" type="text" required />
                </el-form-item>
              </div>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
                <el-button type="primary" @click="pointSave"> {{ t('buttons.save') }} </el-button>
              </span>
            </template>
          </el-dialog>

          <div class="flex w-full mt-10">
            <div class="flex flex-col">
              <!-- <el-form-item label="Investors" class="flex flex-row-reverse w-full">
                <div
                  @click="addInvestor = true"
                  class="flex p-4 rounded-lg items-center justify-center bg-slate-200 hover:bg-slate-300 cursor-pointer"
                >
                  <el-icon><Plus /></el-icon>
                </div>
              </el-form-item> -->

              <!-- <div v-if="editInvestorModal" class="flex gap-4 items-center w-full">
                <div class="my-1 gap-2 flex">
                  <div class="inline-block gap-2 p-2 bg-slate-200 rounded-xl">
                    <div class="flex gap-4 items-center">
                      <div class="flex gap-2 font-semibold">

                        <div v-for="item1 in data2" :key="item1.id">
                      <span
                        v-if="ruleForm.investor === item1?.id"
                        :class="ruleForm.investor === item1?.id ? 'block' : 'hidden'"
                      >
                        {{ item1.first_name }}
                      </span>
                    </div>

                         / 
                         <span>{{ ruleForm.initial_investment_amount }}</span> 

                         <span>{{ ruleForm.invested_date }}</span>

                      </div>

                     <!-- <div class="flex">
                        <el-button class="cursor-pointer" type="danger" @click="investorDelete()">
                          <el-icon size="16" color="#fff">
                            <Delete />
                          </el-icon>
                        </el-button ton>
                      </div> -->
              <!-- </div>
                  </div>
                </div>
              </div>  -->
            </div>

            <div class="flex flex-col w-full mb-5">
              <el-form-item label="Referns point" class="flex flex-row-reverse w-full">
                <div
                  @click="addPoint = true"
                  class="flex p-4 rounded-lg items-center justify-center bg-slate-200 hover:bg-slate-300 cursor-pointer"
                >
                  <el-icon><Plus /></el-icon>
                </div>
              </el-form-item>

              <div v-if="editPointModal" class="flex gap-4 items-center w-full">
                <div class="my-1 gap-2 flex">
                  <div class="inline-block gap-2 p-2 bg-slate-200 rounded-xl">
                    <div class="flex gap-4 items-center font-semibold">
                      <span v-for="item in pointArray" :key="item">{{ item }}</span>

                      <div class="flex">
                        <el-button class="cursor-pointer" type="danger" @click="pointDelete()">
                          <el-icon size="16" color="#fff">
                            <Delete />
                          </el-icon>
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <el-form-item label="Image">
            <el-upload
              action="#"
              v-model="ruleForm.image"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="handleFile"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
          </el-form-item>

          <div class="mt-10 flex gap-4">
            <el-button type="primary" @click="postData(ruleFormRef)">Create</el-button>
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
