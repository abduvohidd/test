<template>
  <div>
    <h1 class="text-[24px]">{{ t('socketsList.socketEdit') }}</h1>

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
        <el-form-item :label="t('socketsList.socketTable.type')" class="flex flex-col items-start">
          <el-input v-model="state.name" :placeholder="t('socketsList.socketTable.type')" class="!w-[350px]" />
        </el-form-item>

        <el-form-item :label="t('socketsList.socketTable.description')" class="flex flex-col items-start">
          <el-input
            v-model="state.description"
            :placeholder="t('socketsList.socketTable.description')"
            class="!w-[350px]"
          />
        </el-form-item>

        <div class="flex w-full gap-8 mx-auto">
          <el-form-item :label="t('socketsList.socketTable.icon')" class="flex flex-col items-start">
            <img class="w-[6rem] mr-5" v-if="typeof state.icon === 'string'" :src="state.icon" alt="socket image" />
            <el-upload
              action="#"
              v-model="state.icon"
              multiple
              list-type="picture-card"
              :limit="1"
              class="upload-demo"
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
            <img class="w-[6rem] mr-5" v-if="typeof state.image === 'string'" :src="state.image" alt="socket image" />
            <el-upload
              action="#"
              v-model="state.image"
              multiple
              list-type="picture-card"
              :limit="1"
              class="upload-demo"
              :auto-upload="false"
              ref="upload1"
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
        </div>
      </el-form>
      <div class="w-full flex justify-end">
        <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
        <el-button type="success" @click="editData(ruleFormRef)"> {{ t('buttons.save') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { type UploadInstance, type UploadProps, type UploadRawFile, genFileId } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const upload = ref<UploadInstance>()
const upload1 = ref<UploadInstance>()
const editModal = ref(false)
const emit = defineEmits(['submit'])
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

const getDataEdit = async () => {
  try {
    const response = await apiClient.get(`/dashboard/connector-type/${route.params.id}/`)
    state.name = response.data.name
    state.description = response.data.description
    state.icon = response.data.icon
    state.image = response.data.image
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
        formData.append('name', state.name)
        formData.append('description', state.description)
        if (state.icon instanceof File) {
          formData.append('icon', state.icon)
        }
        if (state.image instanceof File) {
          formData.append('image', state.image)
        }

        const response = await apiClient.put(`/dashboard/connector-type/${route.params.id}/`, formData)
        editModal.value = false
        state.icon = ''
        state.image = ''
        state.name = ''
        state.description = ''
        router.push('/sockets-list')
        const isImage = document.querySelectorAll('.is-ready')
        isImage.forEach((element: HTMLElement) => {
          if (element instanceof HTMLElement) {
            element.style.display = 'none'
          }
        })
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
  getDataEdit()
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
