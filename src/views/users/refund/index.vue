<template>
  <div>
    <h1 class="text-4xl m-0 mb-2">{{ t('refundsList.refundTitle') }}</h1>

    <div class="w-full justify-between flex mt-10">
      <div class="demo-input-size w-[15%]">
        <el-input
          v-model="search"
          @input="searchUser(search)"
          class="w-50 m-2"
          :placeholder="t('refundsList.refundSearch')"
          :prefix-icon="Search"
        />
      </div>

      <el-dropdown>
        <el-button class="!bg-green-500 !text-white">
          {{ t('refundsList.refundTable.status') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="textUser('')">{{ t('refundsList.statusFiler.all') }}</el-dropdown-item>
            <el-dropdown-item @click="textUser('&is_paid=true')">{{
              t('refundsList.statusFiler.paid')
            }}</el-dropdown-item>
            <el-dropdown-item @click="textUser('&is_paid=false')">{{
              t('refundsList.statusFiler.notPaid')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-table :data="data" border style="width: 100%" class="mt-16 mx-auto">
      <el-table-column :label="t('refundsList.refundTable.name')" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.user.first_name }}</span>
          <span style="margin-left: 10px">{{ scope.row.user.last_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('refundsList.refundTable.phone')" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.user.phone_number }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="t('refundsList.refundTable.refund')" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('refundsList.refundTable.date')" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('refundsList.refundTable.card')" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.card_number }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('refundsList.refundTable.status')" class="w-[180px]">
        <template #default="scope">
          <el-tag class="ml-2" v-if="scope.row.is_paid" style="margin-left: 10px" type="success">
            {{ t('refundsList.statusFiler.paid') }}
          </el-tag>
          <el-tag
            class="ml-2 cursor-pointer"
            @click="postClick(scope.row.id)"
            v-if="!scope.row.is_paid"
            style="margin-left: 10px"
            type="danger"
          >
            {{ t('refundsList.statusFiler.notPaid') }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="postStatus" :title="t('refundsList.refundTable.status')" width="25%" align-center>
      <span>{{ t('refundsList.refundTable.change') }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
          <el-button @click="postData" class="!bg-green-500 !text-white">
            {{ t('buttons.save') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
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
import { ref, onMounted, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ArrowDown } from '@element-plus/icons-vue'
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
const postStatus = ref(false)
const postId = ref('')
let pageOne = 1
let savedPage = currentPage.value

const getData = async (page: number) => {
  try {
    const response = await apiClient.get(`/dashboard/refunds/?page=${page}&page_size=${pageSize.value}`)
    data.value = response.data.data
    count.value = response.data.count
    totalItem.value = response.data.count
  } catch (err) {
    console.log(err)
  }
}

const searchUser = async (search: string) => {
  try {
    let url = '/dashboard/refunds/'

    if (search && search.trim() !== '') {
      url += `?user_username=${search}`
    }

    if (!search && search.trim() === '') {
      getData(savedPage)
    }
    const response = await apiClient.get(url)
    data.value = response.data.data

    count.value = response.data.count
    totalItem.value = response.data.count
  } catch (err) {
    console.error(err)
  } finally {
    // loading.value = false
  }
}

const textUser = async (text: string) => {
  try {
    let url = '/dashboard/refunds/'

    if (text && text.trim() !== '') {
      url += `?${text}`
    }
    const response = await apiClient.get(url)
    data.value = response.data.data
    count.value = response.data.count
    totalItem.value = response.data.count
  } catch (err) {
    console.error(err)
  } finally {
    // loading.value = false
  }
}

const postData = async () => {
  try {
    const response = await apiClient.put(`/dashboard/refunds/${postId.value}/`, {
      is_paid: true,
    })
    postStatus.value = false
    getData(savedPage)
    toast.success('Success to Paid', {
      autoClose: 3000,
    })
  } catch (err) {
    console.log(err)
  }
}

const postClick = async (id: string) => {
  postId.value = id
  postStatus.value = true
}

const close = () => {
  postStatus.value = false
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
