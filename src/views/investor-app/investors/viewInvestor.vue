<template>
  <div>
    <div class="w-full bg-[#f7f7f7] rounded-xl px-12 py-8">
      <!-- <h1 class="font-bold text-3xl">Investor View</h1> -->

      <div class="flex gap-4">
        <el-card class="w-full">
          <div class="flex justify-between flex-col gap-4">
            <h2 class="text-xl">Umumiy investitsiya</h2>
            <p class="font-bold text-xl text-green-500">
              {{ Number(data.total_current_investment?.toFixed(0)).toLocaleString() }} UZS
            </p>
          </div>
        </el-card>
        <el-card class="w-full">
          <div class="flex justify-between flex-col gap-4">
            <h2 class="text-xl">Qaytarib olingan investitsiya</h2>
            <p class="font-bold text-xl text-green-500">
              {{ Number(data.total_removed_investment?.toFixed(0)).toLocaleString() }} UZS
            </p>
          </div>
        </el-card>
        <el-card class="w-full">
          <div class="flex justify-between flex-col gap-4">
            <h2 class="text-xl">Foyda</h2>
            <p class="font-bold text-xl text-green-500">
              {{ Number(data.total_profit?.toFixed(0)).toLocaleString() }} UZS
            </p>
          </div>
        </el-card>
        <el-card class="w-full">
          <div class="flex justify-between flex-col gap-4">
            <h2 class="text-xl">Qo'shilgan investitsiya</h2>
            <p class="font-bold text-xl text-green-500">
              {{ Number(data.total_added_investment?.toFixed(0)).toLocaleString() }} UZS
            </p>
          </div>
        </el-card>
        <el-card class="w-full">
          <div class="flex justify-between flex-col gap-4">
            <h2 class="text-xl">Ayrilgan investitsiya</h2>
            <p class="font-bold text-xl text-green-500">
              {{ Number(data.total_revenue?.toFixed(0)).toLocaleString() }} UZS
            </p>
          </div>
        </el-card>
      </div>

      <div class="mt-10">
        <div class="flex gap-4 w-full">
          <div class="gap-2 flex flex-col w-[25%] h-[15rem] overflow-y-scroll no-scrollbar">
            <div
              class="m-0 border flex items-center justify-center border-green-500 hover:bg-green-500 hover:text-white p-4 cursor-pointer"
              v-for="item in data.stations"
              :key="item.id"
              @click="test(item.id)"
            >
              <h1 class="m-0">{{ item.name }}</h1>
            </div>
          </div>
          <div class="flex flex-col w-full gap-4">
            <!-- <div class="relative w-full">
              <table
                v-if="yes"
                v-for="item in data.stations"
                :key="item.id"
                :class="investorId === item.id ? 'flex flex-col justify-between' : 'hidden'"
                class="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <thead class="text-xs text-gray-100 uppercase bg-slate-100 border dark:text-gray-800">
                  <tr class="flex justify-between items-center w-full">
                    <th class="py-3 w-full">Status</th>
                    <th class="py-3 w-full">Address</th>
                    <th class="py-3 w-full">Charging count</th>
                    <th class="py-3 w-full">Comission</th>
                    <th class="py-3 w-full">Electricity expenses</th>
                    <th class="py-3 w-full">Profit</th>
                    <th class="py-3 w-full">Rent cost</th>
                    <th class="py-3 w-full">Revenue</th>
                  </tr>
                </thead>
                <tbody class="text-gray-800 border-b dark:bg-white w-full">
                  <tr class="w-full flex items-center justify-between">
                    <th class="py-3 w-full">
                      <el-tag v-if="item.status === 'Disconnected'" type="danger">{{ item.status }}</el-tag>
                      <el-tag v-else type="success">{{ item.status }}</el-tag>
                    </th>
                    <th scope="col" class="py-3 w-full">
                      <a :href="`https://www.google.com/maps?q=${item.lat},${item.long}`">
                        <el-tooltip :content="item.address" placement="top">
                          <el-button
                            ><el-icon><Location /></el-icon>
                          </el-button>
                        </el-tooltip>
                      </a>
                    </th>
                    <th class="py-3 w-full">
                      {{ item.total_charged_cars_count }}
                    </th>
                    <th class="py-3 w-full">
                      {{ Number(item.expenses?.total_comission.toFixed(0)).toLocaleString() }}
                      UZS
                    </th>

                    <th class="py-3 w-full">
                      {{ Number(item.expenses?.total_electricity_expenses.toFixed(0)).toLocaleString() }}UZS
                    </th>
                    <th class="py-3 w-full">{{ Number(item.total_profit.toFixed(0)).toLocaleString() }} UZS</th>
                    <th class="py-3 w-full">{{ Number(item.rent_cost.toFixed(0)).toLocaleString() }} UZS</th>
                    <th class="py-3 w-full">{{ Number(item.total_revenue.toFixed(0)).toLocaleString() }} UZS</th>
                  </tr>
                </tbody>
              </table>
            </div> -->

            <div v-if="yes">
              <div class="flex justify-between gap-8 w-full">
                <el-tabs v-model="activeName" class="demo-tabs w-full" @tab-click="handleClick">
                  <el-tab-pane label="Added Investment" name="first">
                    <div>
                      <table class="w-full mt-5 text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-100 uppercase bg-slate-100 border dark:text-gray-800">
                          <tr class="flex justify-between items-center w-full">
                            <th class="py-3 w-full">Amount</th>
                            <th class="py-3 w-full">Description</th>
                            <th class="py-3 w-full">Date</th>
                            <th class="py-3 w-full">Type</th>
                          </tr>
                        </thead>
                        <tbody
                          v-for="item in data2.added_investments"
                          class="text-gray-800 border-b dark:bg-white w-full"
                        >
                          <tr class="w-full flex items-center justify-between text-center">
                            <td class="py-3 w-full">
                              {{ item.amount }}
                            </td>
                            <td class="py-3 w-full">
                              {{ item.description }}
                            </td>
                            <td class="py-3 w-full">
                              {{ item.created_time }}
                            </td>
                            <td class="py-3 w-full">
                              <el-tag type="success">
                                {{ item.type }}
                              </el-tag>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- <div v-else>Ro'yxat bo'sh.</div> -->
                  </el-tab-pane>
                  <el-tab-pane label="Removed Investment" name="second">
                    <div>
                      <table class="w-full mt-5 text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-100 uppercase dark:bg-slate-100 border dark:text-gray-800">
                          <tr class="flex justify-between items-center w-full">
                            <th class="py-3 w-full">Amount</th>
                            <th class="py-3 w-full">Description</th>
                            <th class="py-3 w-full">Date</th>
                            <th class="py-3 w-full">Type</th>
                          </tr>
                        </thead>
                        <tbody
                          v-for="item in data2.removed_investments"
                          class="text-gray-800 border-b dark:bg-white w-full"
                        >
                          <tr class="w-full flex items-center justify-between text-center">
                            <td class="py-3 w-full">
                              {{ item.amount }}
                            </td>
                            <td class="py-3 w-full">
                              {{ item.description }}
                            </td>
                            <td class="py-3 w-full">
                              {{ item.created_time }}
                            </td>
                            <td class="py-3 w-full">
                              <el-tag type="danger">
                                {{ item.type }}
                              </el-tag>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Taken Profit" name="three">
                    <div class="flex justify-center items-center mt-10">Not Data</div>
                  </el-tab-pane>
                </el-tabs>

                <div class="flex gap-4">
                  <el-button type="success" @click="addInvestment()">Add</el-button>
                  <el-button type="success" @click="addInvestment1()">Remove</el-button>
                  <el-button type="success" @click="addInvestment2()">Profit</el-button>
                </div>
              </div>

              <el-dialog v-model="addModal" title="Investment added" width="25%" align-center>
                <div class="flex flex-col gap-2">
                  <label>Amount</label>
                  <el-input v-model="input" class="w-full" placeholder="Please amount" />
                </div>
                <div class="flex flex-col gap-2 mt-5">
                  <label>Description</label>
                  <el-input v-model="desc" type="textarea" />
                </div>

                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
                    <el-button type="success" @click="addData">
                      {{ t('buttons.save') }}
                    </el-button>
                  </span>
                </template>
              </el-dialog>
              <el-dialog v-model="addModal1" title="Investment remove" width="25%" align-center>
                <div class="flex flex-col gap-2">
                  <label>Amount</label>
                  <el-input v-model="input" class="w-full" placeholder="Please amount" />
                </div>
                <div class="flex flex-col gap-2 mt-5">
                  <label>Description</label>
                  <el-input v-model="desc" type="textarea" />
                </div>

                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
                    <el-button type="success" @click="addData1">
                      {{ t('buttons.save') }}
                    </el-button>
                  </span>
                </template>
              </el-dialog>
              <el-dialog v-model="addModal2" title="Investment profit" width="25%" align-center>
                <div class="flex flex-col gap-2">
                  <label>Amount</label>
                  <el-input v-model="input" class="w-full" placeholder="Please amount" />
                </div>
                <div class="flex flex-col gap-2 mt-5">
                  <label>Description</label>
                  <el-input v-model="desc" type="textarea" />
                </div>

                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
                    <el-button type="success" @click="addData2">
                      {{ t('buttons.save') }}
                    </el-button>
                  </span>
                </template>
              </el-dialog>
            </div>

            <div v-else><el-empty description="Not Data" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowRight, Location } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
// import type { TabsPaneContext } from 'element-plus'
import router from '@/router'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import apiClient from '@/utils/axios'
const { t } = useI18n()

const activeName = ref('first')
const data = ref([])
const data1 = ref([])
const data2 = ref([])
const route = useRoute()
const yes = ref(false)
const investorId = ref('')
const addModal = ref(false)
const addModal1 = ref(false)
const addModal2 = ref(false)
const input = ref('')
const desc = ref('')

const test = (id) => {
  investorId.value = id
  yes.value = true
  getData2(id)
}

const addInvestment = () => {
  addModal.value = true
}
const addInvestment1 = () => {
  addModal1.value = true
}
const addInvestment2 = () => {
  addModal2.value = true
}

const close = () => {
  addModal.value = false
  addModal1.value = false
  addModal2.value = false
}

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/station-investor/${route.params.id}/stations`)
    data.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const addData = async () => {
  try {
    const response = await apiClient.post(`/dashboard/station-investor/investment`, {
      amount: input.value,
      station: investorId.value,
      description: desc.value,
      type: 'investment_add',
    })
    getData()
    getData2(investorId.value)
    input.value = ''
    desc.value = ''
    addModal.value = false
  } catch (err) {
    console.log(err)
  }
}
const addData1 = async () => {
  try {
    const response = await apiClient.post(`/dashboard/station-investor/investment`, {
      amount: input.value,
      station: investorId.value,
      description: desc.value,
      type: 'investment_remove',
    })
    getData()
    getData2(investorId.value)
    input.value = ''
    desc.value = ''
    addModal1.value = false
  } catch (err) {
    console.log(err)
  }
}
const addData2 = async () => {
  try {
    const response = await apiClient.post(`/dashboard/station-investor/investment`, {
      amount: input.value,
      station: investorId.value,
      description: desc.value,
      type: 'investment_take_profit',
    })
    input.value = ''
    desc.value = ''
    addModal2.value = false
    getData()
    getData2(investorId.value)
  } catch (err) {
    console.log(err)
  }
}

const getData2 = async (id) => {
  try {
    const response = await apiClient.get(`/dashboard/station/${id}/investment-history`)
    data2.value = response.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getData()
})
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
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
.el-card.is-always-shadow {
  box-shadow: none !important;
}
</style>
