<template>
  <div>
    <h1 class="text-4xl m-0 mb-2">{{ t('nearbyList.nearbyTitle') }}</h1>

    <div class="w-full justify-between flex mt-10">
      <div class="demo-input-size w-[15%]">
        <el-input v-model="search" class="w-50 m-2" :placeholder="t('nearbyList.nearbySearch')" :prefix-icon="Search" />
      </div>

      <router-link :to="{ name: 'nearby-create' }">
        <el-button class="!bg-green-500 !text-white">{{ t('nearbyList.nearbyCreate') }}</el-button>
      </router-link>
    </div>

    <el-table :data="filterData" border style="width: 100%" class="mt-16 mx-auto">
      <el-table-column :label="t('nearbyList.nearbyTable.icon')" class="w-[180px]">
        <template #default="scope">
          <img style="margin-left: 10px" class="!w-[3rem] !h-[3rem]" :src="scope.row.logo" alt="icon" />
        </template>
      </el-table-column>

      <el-table-column :label="t('nearbyList.nearbyTable.place')" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="t('nearbyList.nearbyTable.actions')">
        <template #default="scope">
          <el-dropdown>
            <el-button class="!bg-green-500 !text-white">
              {{ t('nearbyList.nearbyTable.action') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <router-link :to="{ name: 'nearby-edit', params: { id: scope.row.id } }">
                  <el-button size="small" class="m-1">{{ t('buttons.edit') }}</el-button>
                </router-link>
                <el-button size="small" class="m-1" type="danger" @click="deleteBtn(scope.row.id)">{{
                  t('buttons.delete')
                }}</el-button>
                <router-link :to="{ name: 'nearby-view', params: { id: scope.row.id } }">
                  <el-button size="small" class="m-1" type="info">{{ t('buttons.view') }}</el-button>
                </router-link>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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

    <el-dialog v-model="deleteModal" title="Nearby List delete" width="25%" align-center>
      <span>{{ t('usersList.userDelete.deleteParagraph') }}</span>
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
import { ref, onMounted, watch, watchEffect, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const { t } = useI18n()
const search = ref('')
const data = ref([])
const deleteModal = ref(false)
const deleteId = ref('')

let pageOne = 1
const currentPage = ref(1)
let savedPage = currentPage.value
const pageSize = ref(10)
const dPage = ref(1)
const count = ref()
const totalItem = ref()

const filterData = computed(() => {
  return data.value.filter((item) => item.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
})

const getData = async (page: number) => {
  try {
    dPage.value = page - 1
    const response = await apiClient.get(`/dashboard/nearby-places/?page=${page}&page_size=${pageSize.value}`)
    data.value = response.data.data
    count.value = response.data.count
    totalItem.value = response.data.count
  } catch (err) {
    console.log(err)
  }
}

const deleteBtn = async (id: string) => {
  deleteId.value = id
  deleteModal.value = true
}

const deleteData = async () => {
  try {
    const response = await apiClient.delete(`/dashboard/nearby-places/${deleteId.value}/`)
    deleteModal.value = false
    getData(pageOne)

    toast.success('Delete nearby place', {
      autoClose: 3000,
    })
  } catch (err) {
    console.log(err)
  }
}

const close = () => {
  deleteModal.value = false
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

.el-upload-list__item-actions {
  width: 10rem !important;
  height: 10rem !important;
}
.el-upload--picture-card {
  width: 10rem !important;
  height: 10rem !important;
}

.el-upload-list__item-thumbnail {
  width: 10rem !important;
  height: 10rem !important;
}
.is-ready {
  width: 10rem !important;
  height: 10rem !important;
}
</style>
