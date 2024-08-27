<template>
  <div>
    <div class="flex w-full gap-8">
      <div class="w-[100%] flex 2xl:flex-row justify-between bg-slate-50 border rounded-2xl p-8">
        <div class="flex flex-col w-full">
          <div class="flex justify-between items-center w-full">
            <h1 class="2xl:text-4xl text-xl font-bold">
              {{ t('usersList.information.userTitle') }}
            </h1>

            <div class="flex gap-2">
              <el-button type="info" @click="modal = !modal">{{ t('buttons.edit') }}</el-button>
              <el-button type="danger" @click="modalDelete = !modalDelete">{{ t('buttons.delete') }}</el-button>
            </div>
          </div>

          <div class="mt-5">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="Overview" name="first">
                <InformationUser :data="data" />
              </el-tab-pane>
              <el-tab-pane label="Charging History" name="second">
                <ChargingHistory :chartHistory="chartHistoryData" />
              </el-tab-pane>
              <el-tab-pane label="Payment History" name="three">
                <PaymentHistory :data1="data1" />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <EditUserModal :modalEdit="modal" @update:modalEdit="modal = $event" :modalEditId="route.params.id" />
        <DeleteUserModal
          :modalDelete="modalDelete"
          @update:delete="modalDelete = $event"
          :modalDeleteId="route.params.id"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'
import router from '@/router'
import ChargingHistory from '@/components/userSocket/chargingHistory.vue'
import PaymentHistory from '@/components/userSocket/paymentHistory.vue'
import InformationUser from '@/components/userSocket/informationUser.vue'
import EditUserModal from '@/components/userSocket/editUserModal.vue'
import DeleteUserModal from '@/components/userSocket/deleteUserModal.vue'
import 'vue3-toastify/dist/index.css'

const modal = ref(false)
const modalDelete = ref(false)
const activeName = ref('first')
const { t } = useI18n()
const route = useRoute()
const data = ref([])
const data1 = ref([])
const chartHistoryData = ref([])

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/users/${route.params.id}/`)
    data.value = response.data.data
  } catch (err) {
    console.log(err)
  }
}

const getDataPayment = async () => {
  try {
    const response = await apiClient.get(`/dashboard/users/${route.params.id}/payment-transactions/`)
    data1.value = response.data.data
  } catch (err) {
    console.log(err)
  }
}
const getDataCharging = async () => {
  try {
    const response = await apiClient.get(`/dashboard/users/${route.params.id}/charging-history/`)
    chartHistoryData.value = response.data.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getData()
  getDataPayment()
  getDataCharging()
})
</script>

<style scoped></style>
