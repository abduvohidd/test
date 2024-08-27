<template>
  <div>
    <h1 class="text-[24px]">{{ t('socketsList.socketCreate') }}</h1>

    <div class="border rounded-md p-4 mt-10">
      <el-form
        ref="ruleFormRef"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        :rules="rules"
        :model="state"
        status-icon
        label-position="top"
      >
        <el-form-item prop="name" :label="t('socketsList.socketTable.type')" class="flex flex-col items-start">
          <el-input v-model="state.name" :placeholder="t('socketsList.socketTable.type')" class="!w-[350px]" />
        </el-form-item>

        <el-form-item
          prop="description"
          :label="t('socketsList.socketTable.description')"
          class="flex flex-col items-start"
        >
          <el-input
            v-model="state.description"
            :placeholder="t('socketsList.socketTable.description')"
            class="!w-[350px]"
          />
        </el-form-item>

        <el-form-item :label="t('socketsList.socketTable.icon')" class="flex flex-col items-start">
          <el-upload
            v-model="state.icon"
            action="#"
            multiple
            list-type="picture-card"
            :limit="1"
            class="upload-demo mt-2"
            :auto-upload="false"
            ref="upload"
            :on-preview="handlePictureCardPreview"
            :on-change="handleFileChange"
            :on-exceed="handleExceed"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>

        <el-form-item :label="t('socketsList.socketTable.photo')" class="flex flex-col items-start">
          <el-upload
            v-model="state.image"
            action="#"
            multiple
            list-type="picture-card"
            :limit="1"
            class="upload-demo mt-2"
            :auto-upload="false"
            ref="upload"
            :on-preview="handlePictureCardPreview1"
            :on-change="handleFileChange1"
            :on-exceed="handleExceed1"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisible1">
            <img w-full :src="dialogImageUrl1" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
      </el-form>
      <div class="w-full flex justify-end">
        <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
        <el-button type="success" @click="postData(ruleFormRef)"> {{ t('buttons.save') }}</el-button>
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
import { type UploadInstance, type UploadProps, type UploadRawFile, genFileId } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
const emit = defineEmits(['submit'])

import { useRouter } from 'vue-router'

const router = useRouter()
const data = ref([])
const { t } = useI18n()
const upload = ref<UploadInstance>()
const upload1 = ref<UploadInstance>()
const ruleFormRef = ref<FormInstance>()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const dialogImageUrl1 = ref('')
const dialogVisible1 = ref(false)

const state = reactive({
  name: '',
  description: '',
  icon: null,
  image: null,
})

interface RuleForm {
  name: string
  description: string
  icon: string
  image: string
}

const rules = computed<FormRules<RuleForm>>(() => ({
  name: [{ required: true, message: t('socketsList.inputName'), trigger: 'blur' }],
  description: [
    {
      required: true,
      message: t('socketsList.inputDescription'),
      trigger: 'change',
    },
  ],
}))

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handlePictureCardPreview1: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl1.value = uploadFile.url!
  dialogVisible1.value = true
}

const handleFileChange = (event: any) => {
  state.icon = event?.raw
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const handleFileChange1 = (event: any) => {
  state.image = event?.raw
}

const handleExceed1: UploadProps['onExceed'] = (files) => {
  upload1.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload1.value!.handleStart(file)
}

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/connector-type/`)
    data.value = response.data.data
  } catch (err) {
    console.log(err)
  }
}

const postData = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const formData = new FormData()
        formData.append('name', state.name)
        formData.append('description', state.description)
        formData.append('icon', state.icon)
        formData.append('image', state.image)
        const response = await apiClient.post(`/dashboard/connector-type/`, formData)
        router.push('/sockets-list')
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const close = () => {
  router.push('/sockets-list')
}

onMounted(() => {
  getData()
})
</script>

<style>
.el-pagination.is-background .el-pager li.is-active {
  background: rgb(34 197 94) !important;
}
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-upload-list__item-actions {
  width: 5vw !important;
  height: 5vw !important;
}
.el-upload--picture-card {
  width: 5vw !important;
  height: 5vw !important;
}

.el-upload-list__item-thumbnail {
  width: 5vw !important;
  height: 5vw !important;
}
.is-ready {
  width: 5vw !important;
  height: 5vw !important;
}
</style>
