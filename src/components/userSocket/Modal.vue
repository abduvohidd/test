<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useI18n } from 'vue-i18n'

const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const passwordModal = ref(false)
const { t } = useI18n()

const toggleShow = () => {
  showPassword.value = !showPassword.value
}

const toggleShowConfirm = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value
}

const props = defineProps({
  modal: {
    type: Boolean,
    default: false,
  },
  modalId: {
    type: String,
    default: '',
  },
})

const state = reactive({
  password: '',
  passwordConfirm: '',
  error: null,
  loading: false,
})

const postPassword = async () => {
  try {
    const response = await apiClient.put(`/dashboard/users/${props.modalId}/change-password/`, {
      new_password: state.password,
      confirm_password: state.passwordConfirm,
    })
    close()
    toast.success(response.data.message, {
      autoClose: 3000,
    })
  } catch (err) {
    toast.error(err.message, {
      autoClose: 3000,
    })
    console.log(err)
  }
}

const emit = defineEmits(['update:modal'])

const close = async () => {
  passwordModal.value = false
  state.password = ''
  state.passwordConfirm = ''
  emit('update:modal', false)
}
</script>

<template>
  <div>
    <el-dialog width="25%" align-center v-model="props.modal">
      <el-form :model="state">
        <el-form-item :label="t('usersList.resetPassword.passwordLabel')" class="flex flex-col">
          <div class="relative text-gray-700 mx-auto w-full">
            <input
              id="password"
              name="password"
              v-if="showPassword"
              v-model="state.password"
              type="text"
              autocomplete="current-password"
              required
              class="w-full py-3 text-sm text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
              :placeholder="t('usersList.resetPassword.passwordPlaceholder')"
            />
            <input
              id="password"
              name="password"
              v-else
              v-model="state.password"
              type="password"
              autocomplete="current-password"
              required
              class="w-full py-3 text-sm text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
              :placeholder="t('usersList.resetPassword.passwordPlaceholder')"
            />
            <span class="absolute top-4 right-5" @click="toggleShow">
              <div id="hide1" v-if="showPassword" class="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                  />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>
              <div id="hide2" v-if="!showPassword" class="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-slash"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
                  />
                  <path
                    d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
                  />
                  <path
                    d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
                  />
                </svg>
              </div>
            </span>
          </div>
        </el-form-item>
        <el-form-item :label="t('usersList.resetPassword.confirmLabel')" class="flex flex-col">
          <div class="relative text-gray-700 mx-auto w-full">
            <input
              id="password"
              name="password"
              v-if="showPasswordConfirm"
              v-model="state.passwordConfirm"
              type="text"
              autocomplete="current-password"
              required
              class="w-full py-3 text-sm text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
              :placeholder="t('usersList.resetPassword.confirmPlaceholder')"
            />
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              v-else
              v-model="state.passwordConfirm"
              type="password"
              autocomplete="current-password"
              required
              class="w-full py-3 text-sm text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
              :placeholder="t('usersList.resetPassword.confirmPlaceholder')"
            />
            <span class="absolute top-4 right-5" @click="toggleShowConfirm">
              <div id="hide1" v-if="showPasswordConfirm" class="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                  />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>
              <div id="hide2" v-if="!showPasswordConfirm" class="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-slash"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
                  />
                  <path
                    d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
                  />
                  <path
                    d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
                  />
                </svg>
              </div>
            </span>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
          <el-button type="primary" @click="postPassword"> {{ t('buttons.save') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
