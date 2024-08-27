<template>
  <div>
    <h1 class="text-4xl m-0 mb-2">List of stations owned by the investor</h1>

    <div class="w-full justify-between flex mt-10">
      <div class="flex gap-[2rem] items-center">
        <div class="demo-input-size w-[30%]">
          <el-input v-model="search" class="w-50 m-2" placeholder="Search station name" :prefix-icon="Search" />
        </div>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :size="size"
        />
      </div>
      <el-dropdown>
        <el-button class="!bg-green-500 !text-white">
          {{ t('refundsList.refundTable.status') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>{{ t('refundsList.statusFiler.all') }}</el-dropdown-item>
            <el-dropdown-item>Working</el-dropdown-item>
            <el-dropdown-item>Not working</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="mt-16">
      <el-table :data="filterData" border style="width: 100%" class="mt-16 mx-auto">
        <el-table-column label=" Station name" class="w-[180px]">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Station address" class="w-[180px]">
          <template #default="scope">
            <a :href="`https://www.google.com/maps?q=${scope.row.latitude},${scope.row.longitude}`">
              <el-tooltip :content="scope.row.address" placement="top">
                <el-button
                  ><el-icon><Location /></el-icon>
                </el-button>
              </el-tooltip>
            </a>
          </template>
        </el-table-column>
        <el-table-column label="Station status" class="w-[180px]">
          <template #default="scope">
            <span style="margin-left: 10px" class="text-green-500 font-bold">{{ scope.row.email }} </span>
          </template>
        </el-table-column>
        <el-table-column label="Total Revenue" class="w-[180px]">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.organization.toLocaleString() }} UZS</span>
          </template>
        </el-table-column>
        <el-table-column label="Total energy" class="w-[180px]">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.balance }} KW</span>
          </template>
        </el-table-column>
        <el-table-column label="Expenses" class="w-[180px]">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.station_count.toLocaleString() }} UZS</span>
          </template>
        </el-table-column>
        <el-table-column label="Profit" class="w-[180px]">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.profit.toLocaleString() }} UZS</span>
          </template>
        </el-table-column>
        <el-table-column label="Charged cars count" class="w-[180px]">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.car }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column :label="t('investorList.investorTable.actions')">
          <el-dropdown>
            <el-button class="!bg-green-500 !text-white">
              {{ t('investorList.investorTable.action') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu #default="scope">
                <el-button size="small" class="m-1">{{ t('buttons.edit') }}</el-button>
                <el-button size="small" class="m-1" type="danger">{{ t('buttons.delete') }}</el-button>
                <el-button size="small" class="m-1" type="info">{{ t('buttons.view') }}</el-button>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Search, Location, ArrowDown } from '@element-plus/icons-vue'
import { markRaw } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
const size = ref<'default' | 'large' | 'small'>('default')

const value1 = ref('')

const { t } = useI18n()
const search = ref('')

const filterData = computed(() => {
  return tableData.filter((item) => item.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
})

interface User {
  name: string
  address: string
  latitude: string
  longitude: string
  email: string
  organization: number
  balance: number
  station_count: number
  profit: number
  car: number
}

const handleClick = () => {
  // eslint-disable-next-line no-alert
  alert('button click')
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  ElMessageBox.confirm('It will permanently delete the file. Continue?', 'Warning', {
    type: 'warning',
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
    icon: markRaw(Delete),
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

const tableData: User[] = [
  {
    name: 'IT Park 120 KW charger',
    address: 'IT Park',
    latitude: '41.341640',
    longitude: '69.336861',
    email: 'working',
    organization: 250000,
    balance: 220,
    station_count: 60000,
    profit: 4000,
    car: 50,
  },
]
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
