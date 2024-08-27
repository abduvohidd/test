<template>
  <div>
    <h1 class="text-[24px]">{{ t('nearbyList.nearbyViewTitle') }}</h1>

    <div class="border rounded-md p-4 mt-10">
      <el-form :model="state">
        <el-form-item :label="t('nearbyList.nearbyTable.place')" class="flex flex-col items-start">
          <el-input v-model="state.name" disabled :placeholder="t('nearbyList.nearbyTable.place')" class="!w-[350px]" />
        </el-form-item>

        <el-form-item :label="t('nearbyList.nearbyTable.icon')" class="flex flex-col items-start mt-14">
          <div class="border p-4 rounded-lg flex justify-center mt-5">
            <img w-full :src="state.logo" alt="image" class="w-[50%] object-cover" />
          </div>
        </el-form-item>
      </el-form>
      <div class="w-full flex justify-end">
        <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { t } = useI18n()

const state = reactive({
  name: '',
  logo: null,
})

const getDataEdit = async () => {
  try {
    const response = await apiClient.get(`/dashboard/nearby-places/${route.params.id}/`)
    state.name = response.data.name
    state.logo = response.data.logo
  } catch (err) {
    console.log(err)
  }
}

const close = () => {
  router.push('/nearby-list')
}

onMounted(() => {
  getDataEdit()
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
