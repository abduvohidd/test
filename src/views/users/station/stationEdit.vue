<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { Location, Edit, Delete, Plus } from '@element-plus/icons-vue'
import apiClient from '@/utils/axios'
import { useI18n } from 'vue-i18n'
import { GoogleMap, Marker } from 'vue3-google-map'
import { UploadProps, UploadRawFile, genFileId, type UploadInstance } from 'element-plus'
import type { UploadFile } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useRoute } from 'vue-router'
import router from '@/router'
import { rule } from 'postcss'

const route = useRoute()

const lat = ref('41.3425468')
const lng = ref('69.3353011')
const api = 'AIzaSyAkNF2jDmfg-aJFFAwkxOLisnqmtkcHoV0'
const center = ref({ lat: +lat.value, lng: +lng.value })
const markerOptions = ref({ position: center })
const { t } = useI18n()
const indexPrice = ref()
const indexSoccket = ref()
const data = ref([])
const data1 = ref([])
const data2 = ref([])
const data3 = ref([])
const priceEditData = ref([])
const socketEditData = ref([])
const dynamicPriceArray = ref([])
const pointArray = ref([])
const socketArray = ref([])
const startTime = ref('')
const endTime = ref('')
const currency = ref('')
const investor = ref('')
const socketType = ref('')
const connectorType = ref('')
const rentStart = ref('')
const price = ref(null)
const investorExpense = ref(0)
const power = ref(0)
const connectorId = ref(0)
const electricityCost = ref(null)
const commission = ref(null)
const freeRent = ref(0)
const monthlyRentValue = ref(null)
const kwRentValue = ref(null)
const rentCost = ref(null)
const addPrice = ref(false)
const editPrice = ref(false)
const addInvestor = ref(false)
const addSocket = ref(false)
const addPoint = ref(false)
const centerDialogVisible = ref(false)
const rentType = ref('')
const investorText = ref(false)
const editSocket = ref(false)
const editInvestorModal = ref(false)
const editPointModal = ref(false)
const point = ref()
const image = ref([])
const nearbyPlaces = ref()
const test = ref([])

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
  dynamic_prices: any
  station_cost: any
  rent_type: string
  investor: string
  investor_expense: number
  station_investor: any
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
})

const ruleForm = reactive<RuleForm>({
  name: '',
  address: '',
  power: '',
  latitude: null,
  longitude: null,
  ocpp_id: null,
  nearby_places_ids: nearbyPlaces.value,
  reference_point_names: pointArray.value,
  sockets: socketArray.value,
  dynamic_prices: dynamicPriceArray.value,
  station_cost: {
    rent_type: rentType.value,
    electricity_cost: null,
    commission: null,
    rent_cost: rentCost.value,
  },
  station_investor: {
    investor: '',
    investor_expense: null,
  },
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
  investor_expense: null,
})

const options = [
  {
    value: 'uzs',
    label: 'uzs',
  },
  {
    value: 'usd',
    label: 'usd',
  },
  {
    value: 'ktz',
    label: 'ktz',
  },
  {
    value: 'kgs',
    label: 'kgs',
  },
  {
    value: 'rub',
    label: 'rub',
  },
  {
    value: 'somoni',
    label: 'somoni',
  },
  {
    value: 'manat',
    label: 'manat',
  },
]
const sockets = [
  {
    value: 'dc',
    label: 'DC',
  },
  {
    value: 'ac',
    label: 'AC',
  },
]

const getData3 = async () => {
  try {
    const response = await apiClient.get(`/dashboard/station/${route.params.id}`)
    data3.value = response.data.data
    ruleForm.name = response.data.data.name
    ruleForm.address = response.data.data.address
    ruleForm.latitude = response.data.data.latitude
    ruleForm.longitude = response.data.data.longitude
    ruleForm.nearby_places_ids = response.data.data.nearby_places.map((item: { id: any }) => item.id)
    ruleForm.ocpp_id = response.data.data.ocpp_id
    ruleForm.power = response.data.data.power
    dynamicPriceArray.value = response.data.data.dynamic_prices

    socketArray.value = response.data.data.sockets
    rentType.value = response.data.data.station_cost.rent_type
    ruleForm.station_cost.rent_cost = response.data.data.station_cost.rent_cost
    ruleForm.station_cost.commission = response.data.data.station_cost.commission
    ruleForm.station_cost.electricity_cost = response.data.data.station_cost.electricity_cost
    ruleForm.reference_point_names = response.data.data.reference_points.map((item: { name: any }) => item.name)
    pointArray.value = response.data.data.reference_points.map((item: { name: any }) => item.name)
    ruleForm.station_investor.investor = response.data.data.station_investor.investor
    ruleForm.station_investor.investor_expense = response.data.data.station_investor.investor_expense
    investor.value = response.data.data.station_investor.investor
    investorExpense.value = response.data.data.station_investor.investor_expense
    // ruleForm.image = response.data.data.station_images
    image.value = response.data.data.station_images

    if (response.data.data.station_cost.rent_type === 'monthly_rent') {
      monthlyRentValue.value = response.data.data.station_cost.rent_cost
    } else if (response.data.data.station_cost.rent_type === 'rent_for_kw') {
      kwRentValue.value = response.data.data.station_cost.rent_cost
    }
  } catch (err) {
    console.log(err)
  }
}

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/nearby-places/`)
    data.value = response.data.data
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

const getData2 = async () => {
  try {
    const response = await apiClient.get(`/dashboard/station-investor/`)
    data2.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const postData = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        saveInputValue()
        const response = await apiClient.put(`/dashboard/station/${route.params.id}/`, {
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
          station_investor: ruleForm.station_investor,
        })
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

const dynamicPrice = () => {
  dynamicPriceArray.value.push({
    start_time: startTime.value,
    end_time: endTime.value,
    price: price.value,
    currency: currency.value,
  })

  ruleForm.dynamic_prices = dynamicPriceArray.value

  startTime.value = ''
  endTime.value = ''
  price.value = null
  currency.value = ''
  addPrice.value = false
  editPrice.value = false
}
const postImage = async (station: string) => {
  try {
    const formData = new FormData()
    if (Array.isArray(ruleForm.image)) {
      ruleForm.image.forEach((image: any) => {
        formData.append('images', image)
      })
    } else {
      // Agar ruleForm.image massiv emas bo'lsa, faqat faylni qo'shamiz
      formData.append('images', ruleForm.image)
    }
    // formData.append('images', ruleForm.image)
    formData.append('station_id', station)
    const response = await apiClient.put(`/dashboard/station-image/update/`, formData)
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
  console.log('ok', dynamicPriceArray.value.indexOf(item))

  if (index !== -1) {
    dynamicPriceArray.value.splice(index, 1)
    ruleForm.dynamic_prices = dynamicPriceArray.value
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
const dynamicPriceEdit = () => {
  if (indexPrice.value !== -1) {
    dynamicPriceArray.value[indexPrice.value].start_time = startTime.value
    dynamicPriceArray.value[indexPrice.value].end_time = endTime.value
    dynamicPriceArray.value[indexPrice.value].price = price.value
    dynamicPriceArray.value[indexPrice.value].currency = currency.value
    ruleForm.dynamic_prices = dynamicPriceArray.value
    editPrice.value = false
  }
}

/// dinamic price end

//// sockket Edit and Delete

const socketDelete = (item: string) => {
  const index = socketArray.value.indexOf(item)

  if (index !== -1) {
    socketArray.value.splice(index, 1)
    ruleForm.sockets = socketArray.value
  }
}

const socketEdit = (item: string) => {
  const index = socketArray.value.indexOf(item)
  indexSoccket.value = socketArray.value.indexOf(item)
  if (index !== -1) {
    const selectedItem = socketArray.value[index]

    socketType.value = selectedItem.plug_type
    connectorType.value = selectedItem.connector_type_id
    power.value = selectedItem.power
    connectorId.value = selectedItem.connector_id
  }
  editSocket.value = true
}
const socketEditModal = () => {
  if (indexSoccket.value !== -1) {
    socketArray.value[indexSoccket.value].plug_type = socketType.value
    socketArray.value[indexSoccket.value].connector_type_id = connectorType.value
    socketArray.value[indexSoccket.value].power = power.value
    socketArray.value[indexSoccket.value].connector_id = connectorId.value

    ruleForm.sockets = socketArray.value
    editSocket.value = false
  }
}

///  sockket end

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
  addInvestor.value = false
  investorText.value = true
  editInvestorModal.value = true
}

const investorDelete = () => {
  ruleForm.station_investor.investor = ''
  ruleForm.station_investor.investor_expense = ''
  editInvestorModal.value = false
}

const pointSave = () => {
  pointArray.value.push(point.value)
  ruleForm.reference_point_names = pointArray.value
  addPoint.value = false
  editPointModal.value = true
  point.value = null
}

const pointDelete = (item: string) => {
  const index = pointArray.value.indexOf(item)

  if (index !== -1) {
    pointArray.value.splice(index, 1)
    ruleForm.reference_point_names = pointArray.value
    editPointModal.value = false
  }
}

const socketSave = () => {
  socketArray.value.push({
    plug_type: socketType.value,
    connector_type_id: connectorType.value,
    connector_id: connectorId.value,
    power: power.value,
  })

  ruleForm.sockets = socketArray.value
  addSocket.value = false
  editSocket.value = false
  socketType.value = ''
  connectorType.value = ''
  connectorId.value = null
  power.value = null
}

// Open modal end

const close = () => {
  addPrice.value = false
  addInvestor.value = false
  addSocket.value = false
  addPoint.value = false
  editPrice.value = false
  editSocket.value = false
  startTime.value = ''
  endTime.value = ''
  price.value = null
  currency.value = ''
  socketType.value = ''
  connectorType.value = ''
  connectorId.value = null
  power.value = null
  point.value = null
}

const imageDelete = async (id: any) => {
  try {
    const response = await apiClient.delete(`/station/station-image/${id}`)
    getData3()
    toast.success('Delete image', {
      autoClose: 3000,
    })
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getData()
  getData1()
  getData2()
  getData3()
})
</script>

<template>
  <div>
    <div class="w-full bg-slate-100 rounded-xl px-12 py-8">
      <h1 class="font-bold text-3xl">Edit station</h1>

      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/station-list' }">Station List</el-breadcrumb-item>
        <el-breadcrumb-item>Edit Station</el-breadcrumb-item>
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
            <div class="flex flex-col w-full">
              <el-form-item label="Edit Price" class="flex flex-row-reverse w-full">
                <div
                  @click="addPrice = true"
                  class="flex p-4 rounded-lg items-center justify-center bg-slate-200 hover:bg-slate-300 cursor-pointer"
                >
                  <el-icon><Plus /></el-icon>
                </div>
              </el-form-item>
              <div v-for="item in dynamicPriceArray" :key="item" class="flex gap-4 items-center w-full">
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

                      <div class="flex">
                        <el-button class="cursor-pointer" type="info" @click="priceEdit(item)">
                          <el-icon size="16" color="#fff">
                            <Edit />
                          </el-icon>
                        </el-button>
                        <el-button class="cursor-pointer" type="danger" @click="priceDelete(item)">
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
            <div class="flex flex-col w-full">
              <el-form-item label="Edit Socket" class="flex flex-row-reverse w-full">
                <div
                  @click="addSocket = true"
                  class="flex p-4 rounded-lg items-center justify-center bg-slate-200 hover:bg-slate-300 cursor-pointer"
                >
                  <el-icon><Plus /></el-icon>
                </div>
              </el-form-item>

              <div v-for="item in socketArray" :key="item" class="flex gap-4 items-center w-full">
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

                      <div class="flex">
                        <el-button class="cursor-pointer" type="info" @click="socketEdit(item)">
                          <el-icon size="16" color="#fff">
                            <Edit />
                          </el-icon>
                        </el-button>
                        <el-button class="cursor-pointer" type="danger" @click="socketDelete(item)">
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
                :disabled="rentType !== 'monthly_rent'"
              />
              <el-input v-model="kwRentValue" placeholder="0" type="number" :disabled="rentType !== 'rent_for_kw'" />
            </div>
          </div>

          <div class="flex justify-between w-full gap-2">
            <el-form-item label="The cost of 1 KW of electricity" class="flex flex-row-reverse w-full">
              <el-input
                v-model="ruleForm.station_cost.electricity_cost"
                placeholder="The cost of 1 KW of electrtcity"
              />
            </el-form-item>

            <el-form-item label="Company commission" class="flex flex-row-reverse w-full">
              <el-input v-model="ruleForm.station_cost.commission" placeholder="Company commission" />
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
                  <!-- <label prop="la">Lat</label>
            <el-input v-model="center.lat" placeholder="lat" /> -->

                  <el-form-item label="Lat" class="flex flex-row-reverse" prop="latitude">
                    <el-input v-model="center.lat" placeholder="lang" />
                  </el-form-item>
                </div>

                <div class="flex flex-col gap-2 w-[50%]">
                  <el-form-item label="Lang" class="flex flex-row-reverse" prop="longitude">
                    <el-input v-model="center.lng" placeholder="lang" />
                  </el-form-item>
                  <!-- <label>Lang</label>
            <el-input v-model="center.lng" placeholder="lang" /> -->
                </div>
              </div>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">{{ t('buttons.cancel') }}</el-button>
                <el-button type="primary " @click="location">
                  {{ t('buttons.save') }}
                </el-button>
              </span>
            </template>
          </el-dialog>
          <el-dialog v-model="addPrice" title="Price Form" width="20%" align-center>
            <div class="flex flex-col gap-2">
              <div class="flex flex-col gap-2">
                <el-form-item label="From" class="flex flex-row-reverse w-full" prop="start_time">
                  <input
                    v-model="startTime"
                    id="appt-time"
                    type="time"
                    name="appt-time"
                    step="2"
                    required
                    class="w-full rounded-md"
                  />
                </el-form-item>
              </div>
              <div class="flex flex-col gap-2">
                <el-form-item label="To" class="flex flex-row-reverse w-full" prop="end_time">
                  <input
                    v-model="endTime"
                    id="appt-time"
                    type="time"
                    name="appt-time"
                    step="2"
                    required
                    class="w-full rounded-md"
                  />
                </el-form-item>
              </div>

              <div class="flex flex-col gap-2">
                <el-form-item label="Price Cost" class="flex flex-row-reverse w-full" prop="price">
                  <input v-model="price" type="number" required class="w-full rounded-md" />
                </el-form-item>
              </div>

              <div class="flex flex-col gap-2">
                <label>Currency</label>
                <el-select v-model="currency" class="w-full" size="large">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
                <el-button type="primary" @click="dynamicPrice">
                  {{ t('buttons.save') }}
                </el-button>
              </span>
            </template>
          </el-dialog>

          <el-dialog v-model="addInvestor" title="Investors" width="20%" align-center>
            <div class="flex flex-col">
              <div class="flex flex-col gap-2">
                <el-form-item label="Investor" class="flex flex-row-reverse w-full">
                  <el-select
                    v-model="ruleForm.station_investor.investor"
                    class="my-2 w-full rounded-md"
                    placeholder="Select"
                    size="large"
                  >
                    <el-option
                      v-for="item in data2"
                      :key="item.id"
                      :label="item.investor.first_name"
                      :value="item.investor.id"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="flex flex-col gap-2">
                <el-form-item label="Investor Expense" class="flex flex-row-reverse w-full">
                  <input v-model="ruleForm.station_investor.investor_expense" class="w-full rounded-md" type="number" />
                </el-form-item>
              </div>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
                <el-button type="primary" @click="investorSave">
                  {{ t('buttons.save') }}
                </el-button>
              </span>
            </template>
          </el-dialog>

          <el-dialog v-model="addPoint" title="Referns Point" width="20%" align-center>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <el-form-item label="Referns Point" class="flex flex-row-reverse w-full" prop="reference_point_names">
                  <input v-model="point" class="w-full rounded-md" type="text" />
                </el-form-item>
              </div>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
                <el-button type="primary" @click="pointSave">
                  {{ t('buttons.save') }}
                </el-button>
              </span>
            </template>
          </el-dialog>

          <el-dialog v-model="addSocket" title="Price Form" width="25%" align-center>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <el-form-item label="Plug Type" prop="station_cost.rent_type">
                  <el-select
                    v-model="socketType"
                    class="m-2"
                    placeholder="Select"
                    style="width: 240px"
                    prop="rent_type"
                  >
                    <el-option v-for="item in sockets" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="flex flex-col gap-2">
                <el-form-item label="Connector Type" prop="connector_type_id">
                  <el-select v-model="connectorType" class="m-2" placeholder="Select" style="width: 240px">
                    <el-option v-for="item in data1" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </div>

              <div class="flex flex-col gap-2">
                <el-form-item label="Power" prop="power">
                  <input v-model="power" type="number" required />
                </el-form-item>
              </div>

              <div class="flex flex-col gap-2">
                <el-form-item label="Connector Id" prop="connector_id">
                  <input v-model="connectorId" type="number" required />
                </el-form-item>
              </div>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
                <el-button type="primary" @click="socketSave">
                  {{ t('buttons.save') }}
                </el-button>
              </span>
            </template>
          </el-dialog>

          <div class="flex w-full mt-10">
            <div class="flex flex-col w-full">
              <el-form-item label="Investors" class="flex flex-row-reverse w-full">
                <!-- <div
                  @click="addInvestor = true"
                  class="flex p-4 rounded-lg items-center justify-center bg-slate-200 hover:bg-slate-300 cursor-pointer"
                >
                  <el-icon><Plus /></el-icon>
                </div> -->
              </el-form-item>

              <div v-if="ruleForm.station_investor.investor" class="flex gap-4 items-center w-full">
                <div class="my-1 gap-2 flex">
                  <div class="inline-block gap-2 p-2 bg-slate-200 rounded-xl">
                    <div class="flex gap-4 items-center">
                      <div class="flex gap-2 font-semibold">
                        <span>{{ ruleForm.station_investor.investor }}</span> /
                        <span>{{ ruleForm.station_investor.investor_expense }}</span>
                      </div>

                      <div class="flex">
                        <el-button class="cursor-pointer" type="info" @click="addInvestor = true">
                          <el-icon size="16" color="#fff">
                            <Edit />
                          </el-icon>
                        </el-button>
                        <el-button class="cursor-pointer" type="danger" @click="investorDelete()">
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

            <div class="flex flex-col w-full mb-5">
              <el-form-item label="Referns point" class="flex flex-row-reverse w-full" prop="reference_point_names">
                <div
                  @click="addPoint = true"
                  class="flex p-4 rounded-lg items-center justify-center bg-slate-200 hover:bg-slate-300 cursor-pointer"
                >
                  <el-icon><Plus /></el-icon>
                </div>
              </el-form-item>

              <div v-if="pointArray.length !== 0" class="flex gap-4 items-center w-full">
                <div class="my-1 gap-2 flex">
                  <div v-for="item in pointArray" :key="item" class="inline-block gap-2 p-2 bg-slate-200 rounded-xl">
                    <div class="flex gap-4 items-center font-semibold">
                      <span>{{ item }}</span>

                      <div class="flex">
                        <el-button class="cursor-pointer" type="danger" @click="pointDelete(item)">
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
            <div v-for="(item, index) in image" :key="index" class="flex relative">
              <img class="w-[10rem] h-[10rem] ml-2 mb-2 rounded-md mr-2" :src="item.image" alt="" />
              <el-button
                class="cursor-pointer absolute top-2 left-2 w-[2px]"
                type="danger"
                @click="imageDelete(item.id)"
              >
                <el-icon size="14" color="#fff">
                  <Delete />
                </el-icon>
              </el-button>
            </div>

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

          <el-dialog v-model="editPrice" title="Price Form" width="25%" align-center>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <el-form-item label="From" class="flex flex-row-reverse w-full" prop="start_time">
                  <input
                    v-model="startTime"
                    type="time"
                    id="appt"
                    name="appt"
                    min="09:00"
                    max="18:00"
                    required
                    class="w-full rounded-md"
                  />
                </el-form-item>
              </div>
              <div class="flex flex-col gap-2">
                <el-form-item label="To" class="flex flex-row-reverse w-full" prop="end_time">
                  <input
                    v-model="endTime"
                    type="time"
                    id="appt"
                    name="appt"
                    min="09:00"
                    max="18:00"
                    required
                    class="w-full rounded-md"
                  />
                </el-form-item>
              </div>

              <div class="flex flex-col gap-2">
                <el-form-item label="Price Cost" class="flex flex-row-reverse w-full" prop="price">
                  <input v-model="price" type="number" required class="w-full rounded-md" />
                </el-form-item>
              </div>

              <div class="flex flex-col gap-2">
                <label>Currency</label>
                <el-select v-model="currency" class="w-full" size="large">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
                <el-button type="primary" @click="dynamicPriceEdit">
                  {{ t('buttons.save') }}
                </el-button>
              </span>
            </template>
          </el-dialog>
          <el-dialog v-model="editSocket" title="Price Form" width="25%" align-center>
            <div class="flex flex-col">
              <div class="flex flex-col gap-2">
                <el-form-item label="Plug Type" prop="station_cost.rent_type">
                  <el-select
                    v-model="socketType"
                    class="my-2 w-full rounded-md"
                    size="large"
                    placeholder="Select"
                    prop="rent_type"
                  >
                    <el-option v-for="item in sockets" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="flex flex-col gap-2">
                <el-form-item label="Connector Type" prop="connector_type_id">
                  <el-select v-model="connectorType" class="my-2 w-full rounded-md" size="large" placeholder="Select">
                    <el-option v-for="item in data1" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </div>

              <div class="flex flex-col gap-2">
                <el-form-item label="Power" prop="power">
                  <input v-model="power" class="my-2 w-full rounded-md" size="large" type="number" required />
                </el-form-item>
              </div>

              <div class="flex flex-col gap-2">
                <el-form-item label="Connector Id" prop="connector_id">
                  <input v-model="connectorId" class="my-2 w-full rounded-md" size="large" type="number" required />
                </el-form-item>
              </div>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
                <el-button type="primary" @click="socketEditModal">
                  {{ t('buttons.save') }}
                </el-button>
              </span>
            </template>
          </el-dialog>
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
  width: 10rem !important;
  height: 10rem !important;
  margin-bottom: 0 !important;
}
.el-upload--picture-card {
  width: 10rem !important;
  height: 10rem !important;
  margin-bottom: 0 !important;
}

.el-upload-list__item-thumbnail {
  width: 10rem !important;
  height: 10rem !important;
  margin-bottom: 0 !important;
}

.is-ready {
  width: 10rem !important;
  height: 10rem !important;
  margin-bottom: 0 !important;
}
</style>
