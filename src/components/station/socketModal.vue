<template>
  <div>
    <div class="flex w-full">
      <div class="flex flex-col w-full">
        <el-form-item label="Add Socket" class="flex flex-row-reverse w-full">
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
              <div v-for="item1 in data" :key="item1.id">
                <span
                  v-if="item.connector_type_id === item1?.id"
                  :class="item.connector_type_id === item1?.id ? 'block' : 'hidden'"
                >
                  {{ item1.name }}
                </span>
              </div>
            </div>
            <div class="flex gap-2 p-2 bg-slate-300 rounded-xl">
              <div class="flex gap-4">
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

    <el-dialog v-model="addSocket" title="Price Form" width="20%" align-center>
      <div class="flex flex-col">
        <div class="flex flex-col gap-2">
          <el-form-item label="Plug Type" class="flex flex-row-reverse w-full" prop="station_cost.rent_type">
            <el-select v-model="socketType" class="my-2 w-full" placeholder="Select" prop="rent_type" size="large">
              <el-option v-for="item in sockets" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </div>
        <div class="flex flex-col gap-2">
          <el-form-item label="Connector Type" class="flex flex-row-reverse w-full" prop="connector_type_id">
            <el-select v-model="connectorType" class="my-2 w-full" placeholder="Select" size="large">
              <el-option v-for="item in data" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </div>

        <div class="flex flex-col gap-2">
          <el-form-item label="Power" prop="power">
            <input v-model="power" class="w-full rounded-md" type="number" required />
          </el-form-item>
        </div>

        <div class="flex flex-col gap-2">
          <el-form-item label="Connector Id" prop="connector_id">
            <input v-model="connectorId" class="w-full rounded-md" type="number" required />
          </el-form-item>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
          <el-button type="primary" @click="socketSave"> {{ t('buttons.save') }} </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="editSocket" title="Price Form" width="20%" align-center>
      <div class="flex flex-col">
        <div class="flex flex-col gap-2">
          <el-form-item label="Plug Type" prop="station_cost.rent_type">
            <el-select v-model="socketType" class="my-2 w-full" size="large" placeholder="Select" prop="rent_type">
              <el-option v-for="item in sockets" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </div>
        <div class="flex flex-col gap-2">
          <el-form-item label="Connector Type" prop="connector_type_id">
            <el-select v-model="connectorType" class="my-2 w-full" size="large" placeholder="Select">
              <el-option v-for="item in data" :key="item.id" :label="item.name" :value="item.id" />
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
          <el-button type="primary" @click="socketEditModal"> {{ t('buttons.save') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { Location, Edit, Delete, Plus } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'

import { useSocketStore } from '../../stores/priceStore.js'

const socketStore = useSocketStore()

const power = ref(0)
const connectorId = ref(0)
const socketType = ref('')
const connectorType = ref('')
const editSocket = ref(false)
const addSocket = ref(false)
const indexSoccket = ref()
const socketArray = ref([])
const { t } = useI18n()
const data = ref([])

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/connector-type/`)
    data.value = response.data.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getData()
})

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

const close = () => {
  addSocket.value = false
  editSocket.value = false
  socketType.value = ''
  connectorType.value = ''
  connectorId.value = null
  power.value = null
}

const socketSave = () => {
  socketArray.value.push({
    plug_type: socketType.value,
    connector_type_id: connectorType.value,
    connector_id: connectorId.value,
    power: power.value,
  })

  socketStore.setSocket(socketArray.value)
  // ruleForm.sockets = socketArray.value
  addSocket.value = false
  editSocket.value = false
  socketType.value = ''
  connectorType.value = ''
  connectorId.value = null
  power.value = null
}

const socketDelete = (item) => {
  const index = socketArray.value.indexOf(item)
  if (index !== -1) {
    socketArray.value.splice(index, 1)
  }
}

const socketEdit = (item) => {
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

    // Optionally, you can also close the dialog after editing
    editSocket.value = false
  }
}
</script>

<style scoped></style>
