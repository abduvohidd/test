<template>
  <div>
    <h1 class="text-4xl m-0 mb-2">{{ t('reviewsList.reviewTitle') }}</h1>

    <div class="w-full justify-between flex mt-10">
      <div class="demo-input-size w-[15%]">
        <el-input
          v-model="search"
          class="w-50 m-2"
          :placeholder="t('reviewsList.reviewSearch')"
          :prefix-icon="Search"
        />
      </div>
    </div>

    <el-table :data="filterData" border style="width: 100%" class="mt-16 mx-auto">
      <el-table-column :label="t('reviewsList.reviewTable.customer')" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.user.first_name }}</span>
          <span style="margin-left: 10px">{{ scope.row.user.last_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('reviewsList.reviewTable.phone')" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.user.phone_number }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="t('reviewsList.reviewTable.comment')" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.comment }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Rating" class="w-[180px]">
        <template #default="scope">
          <div class="flex items-center gap-2">
            <span style="margin-left: 10px">{{ scope.row.rating }}</span>
            <el-icon color="green" size="18"><Star /></el-icon>
          </div>
        </template>
      </el-table-column>

      <el-table-column :label="t('reviewsList.reviewTable.date')" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      background
      layout="prev, pager, next, sizes"
      :total="count"
      class="mt-10 flex justify-end"
      @next-click="getData((pageOne += 1))"
      @prev-click="getData((pageOne -= 1))"
      @change="getData(currentPage)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Search, Star } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const { t } = useI18n()
const data = ref([])
const search = ref('')
const totalItem = ref()
const dPage = ref(1)
const count = ref()
const currentPage = ref(1)
const pageSize = ref(10)
let pageOne = 1
let savedPage = currentPage.value

const filterData = computed(() => {
  return data.value.filter((item) =>
    item.user.first_name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  )
})

const getData = async (page: number) => {
  try {
    const response = await apiClient.get(`/dashboard/app-reviews/?page=${page}&page_size=${pageSize.value}`)
    data.value = response.data.data
    count.value = response.data.count
    totalItem.value = response.data.count
  } catch (err) {
    console.log(err)
  }
}

watch(currentPage, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    getData(newValue)
    savedPage = newValue // Update the saved page when it changes
  }
})

onMounted(() => {
  getData(savedPage)
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
