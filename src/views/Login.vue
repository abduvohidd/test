<script setup>
import { ref, reactive, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { VueTelInput } from 'vue-tel-input'
import axios from 'axios'
import 'vue3-toastify/dist/index.css'

axios.defaults.baseURL = 'https://api.voltautouz.uz/api/'

const router = useRouter()
const showPassword = ref(false)

const state = reactive({
  phone_number: '',
  password: '',
  error: null,
  loading: false,
})

const toggleShow = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = async () => {
  state.loading = true
  try {
    await axios
      .post('/dashboard/admin-login/', {
        phone_number: state.phone_number.replaceAll(' ', ''),
        password: state.password,
      })
      .then((res) => {
        localStorage.setItem('access', res.data.data.access)
        localStorage.setItem('refresh', res.data.data.refresh)
        localStorage.setItem('isLoggedIn', true)
        router.push('/dashboard')
      })
  } catch (error) {
    localStorage.setItem('isLoggedIn', false)
    console.log(error)
    state.error = error.response.data.message
    toast.error(state.error || 'The requested resource was not found on this server.', {
      autoClose: 3000,
    })
    setTimeout(function () {
      state.error = false
    }, 3000)
  } finally {
    state.loading = false
  }
}

watchEffect(() => {
  localStorage.getItem('access')
  localStorage.getItem('refresh')
})
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-[#eae9e5] bg-login">
    <div class="w-[50%] h-screen">
      <img src="/src/assets/plus-1.webp" alt="" class="h-full object-cover w-full" />
    </div>
    <div class="w-[50%] h-screen flex justify-center items-center bg-[#eae9e5]">
      <div class="max-w-md w-[50%]">
        <img src="/src/assets/logo2.png" alt="login" class="mx-auto" />

        <form class="space-y-4 mt-10 flex flex-col gap-4" @submit.prevent="handleSubmit">
          <div class="relative text-gray-400">
            <vue-tel-input
              v-model="state.phone_number"
              :autoFormat="true"
              :inputOptions="{
                showDialCode: true,
                maxlength: 17,
                valid: false,
                required: true,
                type: 'tel',
                autocomplete: 'on',
                autofocus: true,
              }"
              :dropdownOptions="{
                showFlags: true,
              }"
              :onlyCountries="['UZ']"
              class="!border-gray-300 !focus:outline-none !focus:ring-green-500 !focus:border-green-500"
            ></vue-tel-input>
          </div>

          <div class="relative text-gray-700">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              id="password"
              name="password"
              v-if="showPassword"
              v-model="state.password"
              type="text"
              autocomplete="current-password"
              required
              class="w-full py-3 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
              placeholder="Password"
            />
            <input
              id="password"
              name="password"
              v-else
              v-model="state.password"
              type="password"
              autocomplete="current-password"
              required
              class="w-full py-3 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
              placeholder="Password"
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

          <div>
            <button
              type="submit"
              v-if="!state.loading"
              class="group mb-6 relative w-full flex justify-center py-4 px-6 border border-transparent font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-green-500"
            >
              Log in
            </button>
            <button
              disabled
              v-else
              class="group mb-6 relative w-full flex justify-center py-4 px-6 border border-transparent font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-green-500"
            >
              Loading...
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
