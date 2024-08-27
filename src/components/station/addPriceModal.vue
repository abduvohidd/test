<template>
  <div>
    <div class="flex w-full">
      <div class="flex flex-col w-full">
        <el-form-item label="Add Price" class="flex flex-row-reverse w-full">
          <div
            @click="addPrice = true"
            class="flex p-4 rounded-lg items-center justify-center bg-slate-200 hover:bg-slate-300 cursor-pointer"
          >
            <el-icon><Plus /></el-icon>
          </div>
        </el-form-item>
        <div v-for="item in dynamicPriceArray" :key="item" class="flex gap-4 items-center w-full">
          <div class="my-1 gap-2 flex">
            <div class="flex gap-2 p-2 bg-slate-200 rounded-xl items-center font-semibold">
              <span>{{ item.start_time }}</span> /
              <span>{{ item.end_time }}</span>
            </div>
            <div class="flex gap-2 p-2 bg-slate-200 rounded-xl">
              <div class="flex items-center font-semibold gap-4">
                <div class="flex gap-2">
                  <span>{{ item.price }}</span> /
                  <span class="uppercase">{{ item.currency }}</span>
                </div>

                <div class="flex">
                  <el-button class="cursor-pointer" type="info" @click="priceEdit(item)">
                    <el-icon size="16" color="#fff">
                      <Edit />
                    </el-icon>
                  </el-button>
                  <el-button class="cursor-pointer" type="danger" @click="priceDelete(item)">
                    <el-icon size="16" color="#fff">
                      <Delete />
                    </el-icon>
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="addPrice" title="Price Form" width="20%" align-center>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <el-form-item label="From" class="flex flex-row-reverse w-full" prop="start_time">
            <input
              v-model="startTime"
              required
              id="appt-time"
              type="time"
              name="appt-time"
              step="2"
              class="w-full rounded-md"
            />
          </el-form-item>
        </div>
        <div class="flex flex-col gap-2">
          <el-form-item label="To" class="flex flex-row-reverse w-full" prop="end_time">
            <input
              v-model="endTime"
              id="appt-time"
              type="time"
              name="appt-time"
              step="2"
              required
              class="w-full rounded-md"
            />
          </el-form-item>
        </div>

        <div class="flex flex-col gap-2">
          <el-form-item label="Price Cost" class="flex flex-row-reverse w-full" prop="price">
            <input v-model="price" type="number" required class="w-full rounded-md" />
          </el-form-item>
        </div>

        <div class="flex flex-col gap-2">
          <label>Currency</label>
          <el-select v-model="currency" class="w-full" size="large">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
          <el-button type="primary" @click="dynamicPrice"> {{ t('buttons.save') }} </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="editPrice" title="Price Form" width="20%" align-center>
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-2">
          <el-form-item label="From" class="flex flex-row-reverse w-full" prop="start_time">
            <input
              v-model="startTime"
              type="time"
              id="appt"
              name="appt"
              min="09:00"
              max="18:00"
              required
              class="w-full rounded-md"
            />
          </el-form-item>
        </div>
        <div class="flex flex-col gap-2">
          <el-form-item label="To" class="flex flex-row-reverse w-full" prop="end_time">
            <input
              v-model="endTime"
              type="time"
              id="appt"
              name="appt"
              min="09:00"
              max="18:00"
              required
              class="w-full rounded-md"
            />
          </el-form-item>
        </div>

        <div class="flex flex-col gap-2">
          <el-form-item label="Price Cost" class="flex flex-row-reverse w-full" prop="price">
            <input v-model="price" type="number" required class="w-full rounded-md" />
          </el-form-item>
        </div>

        <div class="flex flex-col gap-2">
          <label>Currency</label>
          <el-select v-model="currency" class="w-full" size="large">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
          <el-button type="primary" @click="dynamicPriceEdit"> {{ t('buttons.save') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { usePriceStore } from '../../stores/priceStore.js'

const priceStore = usePriceStore()

const { t } = useI18n()
const dynamicPriceArray = ref([])
const addPrice = ref(false)
const editPrice = ref(false)
const startTime = ref('')
const endTime = ref('')
const currency = ref('')
const price = ref(null)
const indexPrice = ref()

const props = defineProps(['priceData'])

const options = [
  {
    value: 'uzs',
    label: 'uzs',
  },
  {
    value: 'usd',
    label: 'usd',
  },
  {
    value: 'ktz',
    label: 'ktz',
  },
  {
    value: 'kgs',
    label: 'kgs',
  },
  {
    value: 'rub',
    label: 'rub',
  },
  {
    value: 'somoni',
    label: 'somoni',
  },
  {
    value: 'manat',
    label: 'manat',
  },
]

const dynamicPrice = () => {
  dynamicPriceArray.value.push({
    start_time: startTime.value,
    end_time: endTime.value,
    price: price.value,
    currency: currency.value,
  })

  priceStore.setPrice(dynamicPriceArray.value)

  startTime.value = ''
  endTime.value = ''
  price.value = null
  currency.value = ''
  addPrice.value = false
  editPrice.value = false
}

const dynamicPriceEdit = () => {
  if (indexPrice.value !== -1) {
    dynamicPriceArray.value[indexPrice.value].start_time = startTime.value
    dynamicPriceArray.value[indexPrice.value].end_time = endTime.value
    dynamicPriceArray.value[indexPrice.value].price = price.value
    dynamicPriceArray.value[indexPrice.value].currency = currency.value

    editPrice.value = false
  }
}

const priceDelete = (item) => {
  const index = dynamicPriceArray.value.indexOf(item)
  if (index !== -1) {
    dynamicPriceArray.value.splice(index, 1)
  }
}

const priceEdit = (item) => {
  const index = dynamicPriceArray.value.indexOf(item)
  indexPrice.value = dynamicPriceArray.value.indexOf(item)
  if (index !== -1) {
    const selectedItem = dynamicPriceArray.value[index]

    startTime.value = selectedItem.start_time
    endTime.value = selectedItem.end_time
    price.value = selectedItem.price
    currency.value = selectedItem.currency
  }
  editPrice.value = true
}

const close = () => {
  addPrice.value = false
  editPrice.value = false
  startTime.value = ''
  endTime.value = ''
  price.value = null
  currency.value = ''
}
</script>

<style lang="scss" scoped></style>
