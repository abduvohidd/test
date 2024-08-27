<template>
  <header class="flex justify-between border-2 border-[#00a85a] rounded-md sm:justify-end">
    <Menu as="div" class="relative">
      <MenuButton class="flex items-center space-x-2 px-2 py-2 text-sm focus:outline-none">
        <MenuOutlined :style="{ fontSize: '12px ', color: '#07DC1D' }" />
      </MenuButton>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="origin-top-right top-[50px] z-40 absolute right-0 w-52 shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
        >
          <MenuItem v-slot="{ active }">
            <div :class="[active ? 'white' : '', 'block px-4 py-2 text-sm ']">
              <div class="flex flex-col gap-2 py-1">
                <div class="flex gap-2 items-center">
                  <h1 class="uppercase">{{ data?.first_name }} {{ data?.last_name }}</h1>
                </div>

                <div class="flex justify-between items-center">
                  Phone:
                  <p class="m-0 text-[#07DC1D]">{{ number }}</p>
                </div>

                <div class="flex justify-between items-center">
                  Balance:
                  <p class="m-0 text-[#07DC1D]">
                    {{ Number(data?.balance?.toFixed(0)).toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <div
              @click="logout"
              :class="[active ? 'bg-red-500 text-white' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer']"
            >
              {{ t('auth.logout') }}
            </div>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </header>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { MenuOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { UserFilled, Phone } from '@element-plus/icons-vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import Loading from '@/components/Loading.vue'
import apiClient from '@/utils/axios'
import { useI18n } from 'vue-i18n'
axios.defaults.baseURL = 'https://api.voltautouz.uz/api/'
const router = useRouter()
const { t } = useI18n()
const loading = ref(false)
const number = ref()
const data = ref([])
const logout = async () => {
  try {
    localStorage.setItem('isLoggedIn', false)
    router.push('/login')
    const refreshToken = localStorage.getItem('refresh')
    const accessToken = localStorage.getItem('access')

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    await axios.post(
      '/dashboard/admin-logout/',
      {
        refresh: refreshToken,
      },
      config
    )

    localStorage.removeItem('refresh')
    localStorage.removeItem('access')
  } catch (error) {
    localStorage.setItem('isLoggedIn', true)
  }
}

const getData = async () => {
  try {
    const response = await apiClient.get(`/user/me`)
    data.value = response.data.data
    number.value = response.data.data?.phone_number.replace(/^(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3-$4-$5')
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getData()
})
</script>

<style></style>
