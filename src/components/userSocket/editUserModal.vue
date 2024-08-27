<script setup>
import { ref, onMounted, reactive } from 'vue'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useI18n } from 'vue-i18n'

const data = ref([])
const { t } = useI18n()
const emit = defineEmits(['update:modalEdit'])

const props = defineProps({
  modalEdit: {
    type: Boolean,
    default: false,
  },
  modalEditId: {
    type: String,
    default: '',
  },
})

const state = reactive({
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  birth_date: '',
})

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/users/${props.modalEditId}/`)
    data.value = response.data.data
    state.first_name = data.value.first_name
    state.last_name = data.value.last_name
    state.phone_number = data.value.phone_number
    state.email = data.value.email
    state.birth_date = data.value.birth_date
  } catch (err) {
    console.log(err)
  }
}

const editData = async () => {
  try {
    const response = await apiClient.put(`/dashboard/users/${props.modalEditId}/`, state)
    data.value = response.data.data
    close()
    toast.success(`${t('usersList.notify')}`, {
      autoClose: 3000,
    })
  } catch (err) {
    console.log(err)
  }
}

const close = async () => {
  emit('update:modalEdit', false)
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div>
    <el-dialog v-model="props.modalEdit" :title="t('usersList.userEdit.editTitle')" width="25%" align-center>
      <el-form label-position="top" label-width="100px" :model="state" style="max-width: 460px">
        <el-form-item :label="t('usersList.userEdit.firstName')">
          <el-input v-model="state.first_name" placeholder="Enter the first name" required />
        </el-form-item>
        <el-form-item :label="t('usersList.userEdit.lastName')">
          <el-input v-model="state.last_name" placeholder="Enter the last name" required />
        </el-form-item>
        <el-form-item :label="t('usersList.userEdit.phone')">
          <el-input v-model="state.phone_number" placeholder="Enter the phone" required />
        </el-form-item>

        <el-form-item :label="t('usersList.userEdit.email')">
          <el-input type="email" v-model="state.email" :placeholder="t('usersList.userEdit.email')" />
        </el-form-item>

        <el-form-item :label="t('usersList.userEdit.date')">
          <el-date-picker
            v-model="state.birth_date"
            type="date"
            label="Pick a date"
            :placeholder="t('usersList.userEdit.date')"
            style="width: 100%"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
          <el-button type="primary" @click="editData">
            {{ t('buttons.save') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
