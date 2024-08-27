<template>
  <div>
    <h1 class="text-[24px]">{{ t('nearbyList.nearbyEditTitle') }}</h1>

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
        <el-form-item prop="name" :label="t('nearbyList.nearbyTable.place')" class="flex flex-col items-start">
          <el-input v-model="state.name" :placeholder="t('nearbyList.nearbyTable.place')" class="!w-[350px]" />
        </el-form-item>

        <el-form-item :label="t('nearbyList.nearbyTable.icon')" class="flex flex-col items-start">
          <img
            class="w-[10rem] h-[10rem] mr-2"
            v-if="typeof state.logo === 'string'"
            :src="state.logo"
            alt="nearby image"
          />
          <el-upload
            action="#"
            v-model="state.logo"
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
import { Plus } from '@element-plus/icons-vue'
import { UploadProps, UploadRawFile, genFileId, type UploadInstance } from 'element-plus'
import 'vue3-toastify/dist/index.css'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const upload = ref<UploadInstance>()
const state = reactive({
  name: '',
  logo: null,
})

interface RuleForm {
  name: string
  logo: string
}

const rules = computed<FormRules<RuleForm>>(() => ({
  name: [{ required: true, message: t('nearbyList.inputName'), trigger: 'blur' }],
}))

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleFile = (event: any) => {
  state.logo = event?.raw
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const getDataEdit = async () => {
  try {
    const response = await apiClient.get(`/dashboard/nearby-places/${route.params.id}/`)
    state.name = response.data.name
    state.logo = response.data.logo
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
        if (state.logo instanceof File) {
          formData.append('logo', state.logo)
        }
        const response = await apiClient.put(`/dashboard/nearby-places/${route.params.id}/`, formData)
        state.logo = ''
        state.name = ''
        const isImage = document.querySelectorAll('.is-ready')
        isImage.forEach((element: HTMLElement) => {
          if (element instanceof HTMLElement) {
            element.style.display = 'none'
          }
        })
        router.push('/nearby-list')
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const close = () => {
  router.push('/nearby-list')
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
