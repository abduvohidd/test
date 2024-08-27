<template>
  <div>
    <h1 class="text-4xl m-0 mb-2">{{ t('stationsList.stationTitle') }}</h1>

    <div class="w-full justify-between flex mt-10">
      <div class="demo-input-size w-[15%]">
        <SearchInput @search="searchUser" />
      </div>

      <div class="flex gap-2">
        <!-- <StatusDropdown
          :button-text="'Vendor'"
          :all-text="t('stationsList.stationStatusTab.statusAll')"
          :options="vendorOptions"
          @select="vendorStatus"
        /> -->
        <StatusDropdown
          :button-text="t('stationsList.stationStatusTab.statusTitle')"
          :all-text="t('stationsList.stationStatusTab.statusAll')"
          :options="statusOptions"
          @select="stationStatus"
        />
        <router-link :to="{ name: 'station-create' }">
          <el-button class="!bg-green-500 !text-white">{{ t('stationsList.stationCreate') }}</el-button>
        </router-link>
      </div>
    </div>

    <Loading v-if="isLoading" />
    <StationTable :stations="data" v-else />

    <el-pagination
      v-if="!isLoading"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      background
      layout="prev, pager, next, sizes"
      :total="count"
      class="mt-10 flex justify-end"
      @prev-click="handlePageChange(currentPage - 1)"
      @next-click="handlePageChange(currentPage + 1)"
      @change="handlePageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import SearchInput from '../../../components/station/stationSearch.vue'
import StatusDropdown from '../../../components/station/stationDropdown.vue'
import StationTable from '../../../components/station/stationTable.vue'
import Loading from '../../../components/Loading.vue'

const { t } = useI18n()
const data = ref([])
const count = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)
const vendor = ref('&vendor=pulseev')
const status = ref('')
const search = ref('')
const isLoading = ref(true)

const vendorOptions = ref([{ value: 'vendor=pulseev', label: 'Pulse Ev' }])
const statusOptions = ref([
  { value: 'is_available=true', label: t('stationsList.stationStatusTab.statusWork') },
  { value: 'is_available=false', label: t('stationsList.stationStatusTab.statusOutWork') },
])

const getData = async (page: number) => {
  try {
    const queryParams = [search.value ? `search=${search.value}` : '', vendor.value, status.value]
      .filter(Boolean)
      .join('&')

    const url = queryParams
      ? `/station/list/?page=${page}&page_size=${pageSize.value}&${queryParams}`
      : `/station/list/?page=${page}&page_size=${pageSize.value}`

    const response = await apiClient.get(url)
    data.value = response.data.data
    count.value = response.data.count

    if (response) {
      isLoading.value = false
    }
  } catch (err) {
    console.error(err)
  }
}

const searchUser = (searchTerm: string) => {
  search.value = searchTerm.trim()
  currentPage.value = 1
  getData(currentPage.value)
}

const stationStatus = (selectedStatus: string) => {
  status.value = selectedStatus.trim()
  currentPage.value = 1
  getData(currentPage.value)
}

const vendorStatus = (selectedVendor: string) => {
  vendor.value = selectedVendor.trim()
  currentPage.value = 1
  getData(currentPage.value)
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  getData(page)
}

onMounted(() => {
  getData(currentPage.value)
})

watch([search, vendor, status], () => {
  currentPage.value = 1
  getData(currentPage.value)
})
</script>

<style scoped>
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
