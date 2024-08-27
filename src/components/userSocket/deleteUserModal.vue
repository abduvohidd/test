<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import 'vue3-toastify/dist/index.css'
import router from '@/router'

const { t } = useI18n()
const emit = defineEmits(['update:delete'])

const props = defineProps({
  modalDelete: {
    type: Boolean,
    default: false,
  },
  modalDeleteId: {
    type: String,
    default: '',
  },
})

const deleteData = async () => {
  try {
    const response = await apiClient.delete(`/dashboard/users/${props.modalDeleteId}/`)
    close()
    router.push('/user-list')
    toast.success(response.data.message, {
      autoClose: 3000,
    })
  } catch (err) {
    console.log(err)
  }
}

const close = async () => {
  emit('update:delete', false)
}
</script>

<template>
  <div>
    <el-dialog v-model="props.modalDelete" :title="t('usersList.userDelete.deleteTitle')" width="25%" align-center>
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

<style lang="scss" scoped></style>
