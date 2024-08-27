<script setup>
import { ref, watch, onMounted } from 'vue'
import TheHeader from '@/components/layouts/TheHeader.vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserOutlined,
  ApiOutlined,
  IdcardOutlined,
  CarOutlined,
  SafetyCertificateOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons-vue'
import apiClient from '@/utils/axios'

const route = useRoute()

const value1 = ref(true)
const selectedKeys = ref([route.name])
const collapsed = ref(false)
const { t, locale } = useI18n()
const data = ref([])
// const dev = ref('dev')
// const prod = ref('prod')

// const test = (e) => {
//   if (e === true) {
//     localStorage.setItem('url', prod.value)
//     console.log(localStorage.getItem('url'))
//   } else {
//     localStorage.setItem('url', dev.value)
//     console.log(localStorage.getItem('url'))
//   }
// }

const getData = async () => {
  try {
    const response = await apiClient.get(`/user/me`)
    data.value = response.data.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getData()
})

const handleChange = (value) => {
  locale.value = value

  // if (value) {
  //   watch(locale, (value) => {
  //     localStorage.setItem('locale', value)
  //     console.log(value, locale.value);
  //   })
  // }
}
const options = ref([
  {
    value: 'en-US',
    label: 'English',
  },
  {
    value: 'ru-RU',
    label: 'Russian',
  },

  {
    value: 'uz-UZ',
    label: 'Uzbek',
  },
])
</script>

<template>
  <a-layout class="h-full w-full fixed">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="h-auto no-scrollbar overflow-x-hidden !bg-[#060B26]"
    >
      <div>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" class="!bg-[#060B26]" mode="inline">
          <div class="logo cursor-pointer" :class="!collapsed ? 'w-40 mx-auto' : 'w-20 h-12  mt-5 mx-auto'">
            <router-link v-slot="{ href, navigate, route }" to="/dashboard" custom>
              <a :href="href">
                <img src="/src/assets/logo2.png" alt="Volt Auto picture" />
              </a>
            </router-link>
          </div>

          <router-link v-slot="{ href, navigate, route }" to="/dashboard" custom>
            <a-menu-item :key="route.name">
              <a class="flex items-center" :href="href" @click="navigate">
                <HomeOutlined :style="{ fontSize: '20px' }" />
                <span class="text-[14px]">{{ t('sidebar.dashboard') }}</span>
              </a>
            </a-menu-item>
          </router-link>

          <!-- <a-sub-menu key="sub1">
            <template #title>
              <div class="flex items-center">
                <IdcardOutlined :style="{ fontSize: '20px' }" />
                <span>{{ t('sidebar.investor') }}</span>
              </div>
            </template>
            <router-link v-slot="{ href, navigate, route }" :to="{ name: 'investor-list' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate">{{
                t('sidebar.investorList')
              }}</a-menu-item>
            </router-link>
            <router-link v-slot="{ href, navigate, route }" to="/investor-app/investor-billing" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate">
                {{ t('sidebar.investorBilling') }}</a-menu-item
              >
            </router-link>
            <router-link v-slot="{ href, navigate, route }" to="/investor-app/investor-live" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate"> Investor Live</a-menu-item>
            </router-link>
          </a-sub-menu> -->

          <a-sub-menu key="sub2">
            <template #title>
              <div class="flex items-center">
                <UserOutlined :style="{ fontSize: '20px' }" />
                <span>{{ t('sidebar.user') }}</span>
              </div>
            </template>

            <router-link v-slot="{ href, navigate, route }" :to="{ name: 'user-list' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate">
                {{ t('sidebar.userList') }}
              </a-menu-item>
            </router-link>

            <!-- <router-link v-slot="{ href, navigate }" :to="{ name: 'user-list' }" custom> -->
            <!-- <a-menu-item :key="route.name">{{ t('sidebar.adminList') }} </a-menu-item> -->
            <!-- </router-link> -->
          </a-sub-menu>

          <a-sub-menu key="sub3">
            <template #title>
              <div class="flex items-center">
                <ApiOutlined :style="{ fontSize: '20px' }" />
                <span>{{ t('sidebar.stations') }}</span>
              </div>
            </template>
            <router-link v-slot="{ href, navigate, route }" :to="{ name: 'station-list' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate">{{
                t('sidebar.stationsList')
              }}</a-menu-item>
            </router-link>
            <router-link v-slot="{ href, navigate, route }" :to="{ name: 'sockets-list' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate">{{ t('sidebar.socketsList') }}</a-menu-item>
            </router-link>

            <router-link v-slot="{ href, navigate, route }" :to="{ name: 'nearby-list' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate">{{ t('sidebar.nearbyList') }}</a-menu-item>
            </router-link>

            <router-link v-slot="{ href, navigate, route }" :to="{ name: 'problems-list' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate">{{ t('sidebar.problems') }}</a-menu-item>
            </router-link>
            <router-link v-slot="{ href, navigate, route }" :to="{ name: 'refund-list' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate"> {{ t('sidebar.refundList') }}</a-menu-item>
            </router-link>
            <router-link v-slot="{ href, navigate, route }" :to="{ name: 'rewiew-list' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate">
                {{ t('sidebar.rewiewsList') }}
              </a-menu-item>
            </router-link>
          </a-sub-menu>

          <a-sub-menu key="sub4">
            <template #title>
              <div class="flex items-center">
                <CarOutlined :style="{ fontSize: '20px' }" />
                <span>{{ t('sidebar.car') }}</span>
              </div>
            </template>
            <router-link v-slot="{ href, navigate, route }" :to="{ name: 'car-models-list' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate">{{ t('sidebar.model') }}</a-menu-item>
            </router-link>
            <router-link v-slot="{ href, navigate, route }" :to="{ name: 'car-makes-list' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate">{{ t('sidebar.make') }} </a-menu-item>
            </router-link>
            <router-link v-slot="{ href, navigate, route }" :to="{ name: 'faq-list' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate"> FAQ </a-menu-item>
            </router-link>

            <!-- <router-link v-slot="{ href, navigate, route }" :to="{ name: 'blog-list' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate"> Blog </a-menu-item>
            </router-link> -->
          </a-sub-menu>

          <!-- v-if="data.is_superuser" -->
          <a-sub-menu key="sub5">
            <template #title>
              <div class="flex items-center">
                <SafetyCertificateOutlined :style="{ fontSize: '20px' }" />
                <span>{{ t('sidebar.privacy') }}</span>
              </div>
            </template>
            <router-link v-slot="{ href, navigate, route }" :to="{ name: 'privacy-policy-agreemnt' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate">{{ t('sidebar.privacy') }}</a-menu-item>
            </router-link>

            <router-link v-slot="{ href, navigate, route }" :to="{ name: 'userTerm-list' }" custom>
              <a-menu-item :key="route.name" :href="href" @click="navigate">{{ t('sidebar.userTerm') }} </a-menu-item>
            </router-link>
          </a-sub-menu>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #060b26; padding: 0px 25px" class="flex justify-between items-center">
        <DoubleRightOutlined
          :style="{ fontSize: '20px', color: '#00a85a' }"
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <DoubleLeftOutlined
          :style="{ fontSize: '20px ', color: '#00a85a' }"
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />

        <div class="flex items-center gap-4 justify-center">
          <el-switch
            v-if="data.is_superuser"
            v-model="value1"
            @change="test($event)"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          />
          <el-dropdown>
            <el-button>
              <img src="/src/assets/lang.png" alt="" class="w-[28px]" />
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  @click="handleChange(item.value)"
                  v-model:value="locale"
                  v-for="item in options"
                  :key="item"
                  >{{ item.label }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <TheHeader />
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ padding: '24px', minHeight: '280px' }"
        class="overflow-y-scroll no-scrollbarr"
        :class="{ 'dark:bg-[#060B26]': flag, 'bg-white': !flag }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>

<style>
aside {
  max-width: 250px !important;
  min-width: 250px !important;
}
.ant-layout-sider-collapsed {
  max-width: 80px !important;
  min-width: 80px !important;
}
.no-scrollbar::-webkit-scrollbar-thumb {
  background-color: #060b26;
  border: 4px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;
}

.no-scrollbar::-webkit-scrollbar {
  width: 16px;
}

.no-scrollbarr {
  -ms-overflow-style: none;
  /* scrollbar-width: thin; */
  /* margin: inherit; */
  scroll-margin-block-start: 0;
}

.no-scrollbarr::-webkit-scrollbar-thumb {
  background-color: #e1e1e1;
  border: 4px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;
}

.no-scrollbarr::-webkit-scrollbar {
  width: 16px;
}

.no-scrollbarr {
  -ms-overflow-style: none;
  /* scrollbar-width: thin; */
  /* margin: inherit; */
  scroll-margin-block-start: 0;
}
</style>

<style scoped>
.el-tooltip__trigger {
  padding: 0.5rem;
  border: 2px solid #00a85a !important;
  background: transparent !important;
}
</style>
