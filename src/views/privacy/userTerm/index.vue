<template>
  <div>
    <div>
      <h1 class="text-4xl m-0 mb-2">{{ t('terms.termTitle') }}</h1>
    </div>

    <div class="w-full justify-end flex mt-10 gap-4">
      <el-dropdown @command="handleCommand">
        <el-button class="!bg-green-500 !text-white">
          {{ t('terms.language') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="uzbek">{{ t('terms.uzbek') }}</el-dropdown-item>
            <el-dropdown-item command="russian">{{ t('terms.russian') }}</el-dropdown-item>
            <el-dropdown-item command="english">{{ t('terms.english') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <router-link :to="{ name: 'userTerm-create' }">
        <el-button class="!bg-green-500 !text-white">{{ t('terms.termCreate') }}</el-button>
      </router-link>
    </div>

    <div class="flex flex-col w-full mt-16 mx-auto">
      <div class="border flex w-full items-center py-2">
        <div class="w-[33%] flex justify-center font-bold">
          <span>{{ t('terms.termTable.title') }}</span>
        </div>
        <div class="w-[33%] flex justify-center font-bold">
          <span>{{ t('terms.termTable.language') }}</span>
        </div>

        <div class="w-[33%] flex justify-center font-bold">
          <span>{{ t('terms.termTable.actions') }}</span>
        </div>
      </div>
      <div v-if="data?.id" class="border flex w-full items-center py-2">
        <div class="w-[33%] flex justify-center">
          <span>{{ data?.title }}</span>
        </div>
        <div class="w-[33%] flex justify-center">
          <span>{{ data?.language }}</span>
        </div>

        <div class="w-[33%] flex justify-center gap-2">
          <div>
            <router-link :to="{ name: 'userTerm-edit', params: { id: id } }">
              <el-button size="small" class="m-1">{{ t('buttons.edit') }}</el-button>
            </router-link>
          </div>
          <el-button size="small" class="m-1" type="danger" @click="deleteBtn(data?.id)">{{
            t('buttons.delete')
          }}</el-button>
        </div>
      </div>
    </div>

    <el-dialog v-model="deleteModal" :title="t('terms.deleteTitle')" width="25%" align-center>
      <span>{{ t('terms.deleteDescription') }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteModal = false">{{ t('buttons.cancel') }}</el-button>
          <el-button type="danger" @click="deleteData"> {{ t('buttons.delete') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const { t } = useI18n()
const data = ref()
const deleteModal = ref(false)
const deleteId = ref('')
const value = ref('uzbek')
const id = ref(0)

const getData = async (value: any) => {
  try {
    const response = await apiClient.get(`/user/terms-and-conditions/?language=${value}`)
    data.value = response.data.data
    id.value = response.data.data.id
    console.log(id.value)
  } catch (err) {
    console.log(err)
  }
}

const handleCommand = (command: string | number | object) => {
  getData(command)
}

const deleteData = async () => {
  try {
    const response = await apiClient.delete(`/user/terms-and-conditions/${deleteId.value}/`)
    deleteModal.value = false
    getData(value.value)
    toast.success(t('terms.deleteTitle'), {
      autoClose: 3000,
    })
  } catch (err) {
    console.log(err)
  }
}

const deleteBtn = async (id: string) => {
  deleteId.value = id
  deleteModal.value = true
}

onMounted(() => {
  getData(value.value)
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
