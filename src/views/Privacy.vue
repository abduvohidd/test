<template>
  <div>
    <div class="flex justify-center p-4">
      <span class="font-bold">{{ data?.title }}</span>
    </div>
    <div class="p-4">
      <span v-html="data?.content"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'
import axios from 'axios'
import apiClient from '@/utils/axios'
import 'vue3-toastify/dist/index.css'

axios.defaults.baseURL = 'https://api.voltautouz.uz/api/'

const { t } = useI18n()
const data = ref()
const id = ref(0)
const route = useRoute()

const getData = async () => {
  try {
    const response = await axios.get(`/user/privacy-policy/?language=${route.params.language}`)
    data.value = response.data.data
    id.value = response.data.data.id
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getData()
  console.log(route)
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
