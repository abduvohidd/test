<template>
  <div>
    <h1 class="text-[24px]">{{ t('carsMakes.carEdit') }}</h1>

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

        <el-form-item :label="t('carsMakes.carTable.logo')" class="flex flex-col items-start">
          <el-upload
            action=""
            ref="upload"
            class="upload-demo"
            list-type="picture-card"
            v-model="ruleForm.image"
            multiple
            :limit="1"
            :auto-upload="false"
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
import 'vue3-toastify/dist/index.css'
import type { FormInstance, FormRules } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { UploadProps, UploadRawFile, UploadUserFile, genFileId, type UploadInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const editModal = ref(false)
const upload = ref<UploadInstance>()
const route = useRoute()
const router = useRouter()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

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
}))

const getDataEdit = async () => {
  try {
    const response = await apiClient.get(`/dashboard/car-brands/${route.params.id}/`)
    ruleForm.name = response.data.name
    ruleForm.image = response.data.image
  } catch (err) {
    console.log(err)
  }
}

const editData = async () => {
  try {
    const formData = new FormData()
    formData.append('name', ruleForm.name)
    if (ruleForm.image instanceof File) {
      formData.append('image', ruleForm.image)
    }
    const response = await apiClient.put(`/dashboard/car-brands/${route.params.id}/`, formData)
    ruleForm.name = ''
    ruleForm.image = ''
    editModal.value = false

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
}

const close = () => {
  router.push('/car-makes')
}

onMounted(() => {
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
