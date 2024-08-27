<template>
  <div>
    <div>
      <h1 class="text-4xl m-0 mb-2">{{ t('investorList.investorTitle') }}</h1>
    </div>

    <div class="w-full justify-between flex mt-10">
      <div class="flex gap-[2rem] items-center">
        <div class="demo-input-size w-[30%]">
          <el-input
            v-model="search"
            @input="searchUser(search)"
            class="w-50 m-2"
            placeholder="Search full name"
            :prefix-icon="Search"
          />
        </div>
        <el-date-picker
          v-model="value"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :size="size"
          @change="dateFilter(value)"
        />
      </div>

      <router-link :to="{ name: 'investor-create' }">
        <el-button class="!bg-green-500 !text-white">{{ t('investorList.investorCreate') }}</el-button>
      </router-link>
    </div>

    <el-table
      :data="data"
      border
      style="width: 100%"
      class="mt-16 cursor-pointer"
      @current-change="handleCurrentChange"
    >
      <el-table-column fixed label="Full Name" width="180">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.first_name }} {{ scope.row.last_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('investorList.investorTable.phone')" width="180">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.phone_number }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('investorList.investorTable.email')" width="200">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Investment" width="160">
        <template #default="scope">
          <span style="margin-left: 10px"
            >{{ Number(scope.row.current_investment_amount.toFixed(0)).toLocaleString() }} UZS</span
          >
        </template>
      </el-table-column>
      <el-table-column label="Investment stations" width="180" class="text-center">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.total_stations_count }} </span>
        </template>
      </el-table-column>
      <el-table-column label="Revenue" width="180">
        <template #default="scope">
          <span style="margin-left: 10px" class="">
            {{ Number(scope.row.revenue.toFixed(0)).toLocaleString() }}
            UZS</span
          >
        </template>
      </el-table-column>
      <el-table-column label="Expenses" width="180">
        <template #default="scope">
          <span>
            <el-popover placement="top-start" :width="200" trigger="hover">
              <template #reference>
                <el-button class="m-2"
                  >{{ Number(scope.row.expenses.total_expenses.toFixed(0)).toLocaleString() }} UZS</el-button
                >
              </template>

              <template #default>
                <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
                  <div class="flex flex-col gap-2">
                    <span
                      >Comission:
                      {{ Number(scope.row.expenses.comission.toFixed(0)).toLocaleString() }}
                      UZS
                    </span>
                    <span
                      >Electricity:
                      {{ Number(scope.row.expenses.electricity_expenses.toFixed(0)).toLocaleString() }}
                      UZS
                    </span>

                    <span
                      >Rent:
                      {{ Number(scope.row.expenses.total_rent.toFixed(0)).toLocaleString() }}
                      UZS</span
                    >
                  </div>
                </div>
              </template>
            </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Profit" width="180">
        <template #default="scope">
          <span style="margin-left: 10px" class="">
            {{ Number(scope.row.profit.toFixed(0)).toLocaleString() }}
            UZS</span
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="165" :label="t('investorList.investorTable.actions')">
        <template #default="scope">
          <el-dropdown>
            <el-button class="!bg-green-500 !text-white">
              {{ t('investorList.investorTable.action') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <router-link :to="{ name: 'investor-edit', params: { id: scope.row.id } }">
                  <el-button size="small" class="m-1">{{ t('buttons.edit') }}</el-button>
                </router-link>
                <el-button size="small" class="m-1" type="danger" @click="deleteBtn(scope.row.id)">{{
                  t('buttons.delete')
                }}</el-button>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="centerDialogVisible" title="Investor delete" width="25%" align-center>
      <span>Are you sure you want to delete this investor?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
          <el-button type="danger" @click="deleteData">
            {{ t('buttons.delete') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
const size = ref<'default' | 'large' | 'small'>('default')
import { ArrowDown } from '@element-plus/icons-vue'
const value1 = ref('')
const data = ref([])
const { t } = useI18n()
const deleteId = ref('')
const search = ref('')
import dayjs from 'dayjs'
// import router from '@/router'
const centerDialogVisible = ref(false)
const value = ref()
const currentRow = ref()

import { useRouter } from 'vue-router'
const router = useRouter()

const handleCurrentChange = (val: User | undefined) => {
  router.push({ name: 'investor-view', params: { id: val?.id } })
}

const dateFilter = async (date: any) => {
  console.log(date)

  try {
    let url = '/dashboard/station-investor/'

    if (date) {
      url += `?start_date=${date[0]}&end_date=${date[1]}`
    }

    const response = await apiClient.get(url)
    data.value = response.data
  } catch (err) {
    console.error(err)
  }
}

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/station-investor/`)
    data.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const searchUser = async (search: string) => {
  try {
    let url = '/dashboard/station-investor/'

    if (search && search.trim() !== '') {
      url += `?search=${search}`
    }

    const response = await apiClient.get(url)
    data.value = response.data
  } catch (err) {
    console.error(err)
  }
}

const deleteBtn = async (id: string) => {
  deleteId.value = id
  centerDialogVisible.value = true
}

const close = () => {
  centerDialogVisible.value = false
}

const deleteData = async () => {
  try {
    const response = await apiClient.delete(`/dashboard/station-investor/${deleteId.value}/`)
    centerDialogVisible.value = false
    getData()
    toast.success('Delete Investor', {
      autoClose: 3000,
    })
  } catch (err) {
    console.log(err)
  }
}

interface User {
  id: string
  name: string
  phone: string
  email: string
  organization: number
  balance: number
  station_count: string
  profit: number
}

onMounted(() => {
  getData()
})
</script>

<style>
.el-pagination.is-background .el-pager li.is-active {
  background: rgb(34 197 94) !important;
}
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
