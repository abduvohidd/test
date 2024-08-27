<template>
  <div>
    <h1 class="text-4xl m-0 mb-2">{{ t('agreements.agreementTitle') }}</h1>

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
      <router-link :to="{ name: 'agreement-create' }">
        <el-button class="!bg-green-500 !text-white">{{ t('agreements.agreementCreate') }}</el-button>
      </router-link>
    </div>

    <div class="flex flex-col w-full mt-16 mx-auto">
      <div class="border flex w-full items-center py-2">
        <div class="w-[33%] flex justify-center font-bold">
          <span>{{ t('agreements.agreementTable.title') }}</span>
        </div>
        <div class="w-[33%] flex justify-center font-bold">
          <span>{{ t('agreements.agreementTable.language') }}</span>
        </div>

        <div class="w-[33%] flex justify-center font-bold">
          <span>{{ t('agreements.agreementTable.actions') }}</span>
        </div>
      </div>
      <div v-if="data?.data?.data?.id" class="border flex w-full items-center py-2">
        <div class="w-[33%] flex justify-center">
          <span>{{ data?.data?.data?.title }}</span>
        </div>
        <div class="w-[33%] flex justify-center">
          <span>{{ data?.data?.data?.language }}</span>
        </div>

        <div class="w-[33%] flex justify-center gap-2">
          <div>
            <router-link :to="{ name: 'agreement-edit', params: { id: data?.data?.data?.id } }">
              <el-button size="small" class="m-1">{{ t('buttons.edit') }}</el-button>
            </router-link>
          </div>
          <el-button size="small" class="m-1" type="danger" @click="deleteBtn(data?.data?.data?.id)">{{
            t('buttons.delete')
          }}</el-button>
        </div>
      </div>
    </div>

    <el-dialog v-model="deleteModal" :title="t('agreements.deletePolicy')" width="25%" align-center>
      <span>{{ t('agreements.deleteDescription') }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteModal = false">{{ t('buttons.cancel') }}</el-button>
          <el-button type="danger" @click="deleteData">
            {{ t('buttons.delete') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { usePrivacy, usePrivacyDelete } from '@/compositions/Privacy'

const { data, isLoading, isError, error, updatefilters } = usePrivacy()
const { updatedelete } = usePrivacyDelete()
const { t } = useI18n()
const deleteModal = ref(false)
const deleteId = ref('')

const handleCommand = (command: any) => {
  updatefilters(command)
  console.log(isLoading)
}

const deleteData = async () => {
  try {
    updatedelete(deleteId.value)
    // const response = await apiClient.delete(`/user/privacy-policy/${deleteId.value}/`)
    deleteModal.value = false
    toast.success(t('agreements.deletePolicy'), {
      autoClose: 3000,
    })
  } catch (err) {
    console.log(err)
  }
}

const deleteBtn = async (id: string) => {
  deleteId.value = id
  deleteModal.value = true
  console.log(id)
}
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
