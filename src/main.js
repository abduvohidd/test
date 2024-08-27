import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
import router from '@/router'
import VueAwesomePaginate from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
import { VueQueryPlugin } from 'vue-query'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import CanvasJSChart from '@canvasjs/vue-charts'
import VueApexCharts from 'vue3-apexcharts'
import { createI18n } from 'vue-i18n'
import en from './lang/en.json'
import ru from './lang/ru.json'
import uz from './lang/uz.json'

import { createPinia } from 'pinia'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale'),
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    'en-US': en,
    'ru-RU': ru,
    'uz-UZ': uz,
  },
})

const globalOptions = {
  mode: 'auto',
}
const pinia = createPinia()

const app = createApp(App)
app.use(i18n)
app.use(VueTelInput, globalOptions)
app.use(CanvasJSChart)
app.use(ElementPlus)
app.use(VueApexCharts)
app.use(router)
app.use(pinia)
app.use(Antd)
app.use(PrimeVue)
app.use(VueAwesomePaginate)
app.use(VueQueryPlugin)
app.mount('#app')
