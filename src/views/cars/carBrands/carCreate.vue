<template>
  <div>
    <h1 class="text-[24px]">{{ t('carsMakes.carCreate') }}</h1>

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
        <el-form-item :label="t('carsMakes.carTable.name')" prop="name">
          <el-input v-model="ruleForm.name" :placeholder="t('carsMakes.carTable.name')" class="!w-[30%]" />
        </el-form-item>

        <el-form-item :label="t('carsMakes.carTable.logo')" prop="logo" class="flex flex-col items-start">
          <el-upload
            v-model="ruleForm.image"
            action="#"
            multiple
            list-type="picture-card"
            :limit="1"
            class="upload-demo mt-2"
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
        </el-form-item>
      </el-form>
      <div class="w-full flex justify-end">
        <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
        <el-button @click="submitForm(ruleFormRef)" class="!bg-green-500 !text-white">
          {{ t('buttons.save') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import 'vue3-toastify/dist/index.css'
import type { FormInstance, FormRules } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { UploadProps, UploadRawFile, genFileId, type UploadInstance } from 'element-plus'
import { useRouter } from 'vue-router'

const upload = ref<UploadInstance>()

const { t } = useI18n()
const router = useRouter()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

interface RuleForm {
  name: string
  image: any
  is_from_user: any
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  image: '',
  is_from_user: false,
})

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleFile = (event: any) => {
  ruleForm.image = event?.raw
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const rules = computed<FormRules<RuleForm>>(() => ({
  name: [{ required: true, message: t('carsMakes.name'), trigger: 'blur' }],
  // logo: [{ required: true, message: 'Please input Question text', trigger: 'blur' }],
}))

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const formData = new FormData()
        formData.append('name', ruleForm.name)
        formData.append('image', ruleForm.image)
        const response = await apiClient.post(`/dashboard/car-brands/`, formData)

        ruleForm.name = ''
        ruleForm.image = ''

        const isImage = document.querySelectorAll('.is-ready')
        isImage.forEach((element: HTMLElement) => {
          if (element instanceof HTMLElement) {
            element.style.display = 'none'
          }
        })

        router.push('/car-makes')
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const close = () => {
  ruleForm.name = ''
  ruleForm.image = null
  router.push('/car-makes')

  const isImage = document.querySelectorAll('.is-ready')
  isImage.forEach((element: HTMLElement) => {
    if (element instanceof HTMLElement) {
      element.style.display = 'none'
    }
  })
}
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
