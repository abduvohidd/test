<template>
  <div>
    <h1 class="text-[24px]">{{ t('carsModels.carEdit') }}</h1>
    <div class="border rounded-md p-4 mt-10">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        label-position="top"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item :label="t('carsModels.carTable.name')" prop="name">
          <el-input v-model="ruleForm.name" :placeholder="t('carsModels.carTable.name')" class="!w-[30%]" />
        </el-form-item>

        <el-form-item :label="t('carsModels.carTable.brand')" prop="car_brand">
          <el-select v-model="ruleForm.car_brand" class="!w-[30%]" :placeholder="t('carsModels.carTable.brand')">
            <el-option v-for="item in data1" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item :label="t('carsMakes.carTable.logo')" class="flex flex-col items-start">
          <el-upload
            action="#"
            v-model="ruleForm.image"
            multiple
            list-type="picture-card"
            :limit="1"
            class="upload-demo"
            :auto-upload="false"
            ref="upload"
            :on-preview="handlePictureCardPreview"
            :on-change="handleFile"
            :on-exceed="handleExceed"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>

          <img class="w-[10rem] ml-5" :src="ruleForm.image" alt="" />
        </el-form-item>
      </el-form>
      <div class="w-full flex justify-end">
        <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
        <el-button type="success" @click="editData(ruleFormRef)"> {{ t('buttons.save') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import type { FormInstance, FormRules } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { UploadProps, UploadRawFile, genFileId, type UploadInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const data1 = ref([])
const upload = ref<UploadInstance>()
const route = useRoute()
const router = useRouter()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  image: '',
  car_brand: '',
})
interface RuleForm {
  name: string
  image: any
  car_brand: string
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const rules = computed<FormRules<RuleForm>>(() => ({
  name: [{ required: true, message: t('carsModels.rules.name'), trigger: 'blur' }],
  car_brand: [{ required: true, message: t('carsModels.rules.brand'), trigger: 'change' }],
}))

const handleFile = (event: any) => {
  ruleForm.image = event?.raw
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const getData1 = async () => {
  try {
    const response = await apiClient.get(`/dashboard/car-brands/`)
    data1.value = response.data.data
  } catch (err) {
    console.log(err)
  }
}

const getDataEdit = async () => {
  try {
    const response = await apiClient.get(`/dashboard/car-model/${route.params.id}/`)
    ruleForm.name = response.data.name
    ruleForm.image = response.data.image
    ruleForm.car_brand = response.data.car_brand
  } catch (err) {
    console.log(err)
  }
}

const editData = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const formData = new FormData()
        formData.append('name', ruleForm.name)
        if (ruleForm.image instanceof File) {
          formData.append('image', ruleForm.image)
        }
        formData.append('car_brand', ruleForm.car_brand)

        const response = await apiClient.put(`/dashboard/car-model/${route.params.id}/`, formData)
        router.push('/car-models')
        ruleForm.name = ''
        ruleForm.image = ''
        ruleForm.car_brand = ''
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const close = () => {
  router.push('/car-models')
}

onMounted(() => {
  getData1()
  getDataEdit()
})
</script>

<style>
.el-form-item__content {
  justify-content: flex-start !important;
}
.el-upload-list__item-actions {
  width: 10rem !important;
  height: 10rem !important;
}
.el-upload--picture-card {
  width: 10rem !important;
  height: 10rem !important;
}

.el-upload-list__item-thumbnail {
  width: 10rem !important;
  height: 10rem !important;
}
.is-ready {
  width: 10rem !important;
  height: 10rem !important;
}
</style>
