<template>
  <div>
    <h1 class="text-[24px]">Edit Blog</h1>

    <div class="border rounded-md p-4 mt-10">
      <el-form
        ref="ruleFormRef"
        label-width="120px"
        class="demo-ruleForm"
        :rules="rules"
        :model="state"
        status-icon
        label-position="top"
      >
        <el-form-item prop="title" label="Blog title" class="flex flex-col items-start">
          <el-input v-model="state.title" placeholder="title" class="!w-[350px]" />
        </el-form-item>

        <el-form-item prop="text" label="Blog text" class="flex flex-col items-start">
          <el-input v-model="state.text" placeholder="text" class="!w-[350px]" />
        </el-form-item>

        <el-form-item label="Image" class="flex flex-col items-start">
          <img
            class="w-[10rem] h-[10rem] mr-2"
            v-if="typeof state.image === 'string'"
            :src="state.image"
            alt="nearby image"
          />
          <el-upload
            action="#"
            v-model="state.image"
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
  title: '',
  text: '',
  image: null,
})

interface RuleForm {
  title: string
  text: string
  image: string
}

const rules = computed<FormRules<RuleForm>>(() => ({
  title: [{ required: true, message: t('nearbyList.inputName'), trigger: 'blur' }],
}))

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleFile = (event: any) => {
  state.image = event?.raw
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const getDataEdit = async () => {
  try {
    const response = await apiClient.get(`https://api.voltautouz.uz/api/blog/${route.params.id}/`)
    state.title = response.data.title
    state.text = response.data.text
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
        formData.append('title', state.title)
        formData.append('text', state.text)
        if (state.image instanceof File) {
          formData.append('image', state.image)
        }
        const response = await apiClient.patch(`https://api.voltautouz.uz/api/blog/${route.params.id}/`, formData)
        state.image = ''
        state.title = ''
        state.text = ''
        const isImage = document.querySelectorAll('.is-ready')
        isImage.forEach((element: HTMLElement) => {
          if (element instanceof HTMLElement) {
            element.style.display = 'none'
          }
        })
        router.push('/blog-list')
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const close = () => {
  router.push('/blog-list')
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
