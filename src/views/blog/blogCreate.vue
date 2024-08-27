<template>
  <div>
    <h1 class="text-[24px]">Create Blog</h1>

    <div class="border rounded-md p-4 mt-10">
      <el-form
        ref="ruleFormRef"
        :model="state"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
        label-position="top"
      >
        <el-form-item prop="name1" label="Blog title" class="flex flex-col items-start">
          <el-input v-model="state.title1" placeholder="title" class="!w-[350px]" />
        </el-form-item>
        <el-form-item prop="name1" label="Blog text" class="flex flex-col items-start">
          <el-input v-model="state.text1" placeholder="text" class="!w-[350px]" />
        </el-form-item>

        <el-form-item label="Image" class="flex flex-col items-start">
          <el-upload
            v-model="state.image1"
            action="#"
            multiple
            list-type="picture-card"
            :limit="1"
            class="upload-demo mt-2"
            :auto-upload="false"
            ref="upload"
            :on-change="handleFile"
            :on-preview="handlePictureCardPreview"
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
        <el-button type="success" @click="postData(ruleFormRef)"> {{ t('buttons.save') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import { Plus } from '@element-plus/icons-vue'
import { UploadProps, UploadRawFile, genFileId, type UploadInstance } from 'element-plus'
import 'vue3-toastify/dist/index.css'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
const { t } = useI18n()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const upload = ref<UploadInstance>()
const dialogFormVisible = ref(false)
const router = useRouter()

const ruleFormRef = ref<FormInstance>()
const state = reactive<RuleForm>({
  title1: '',
  text1: '',
  image1: null,
})
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

interface RuleForm {
  title1: string
  text1: string
  image1: string
}

const rules = computed<FormRules<RuleForm>>(() => ({
  title1: [{ required: true, message: t('nearbyList.inputName'), trigger: 'blur' }],
}))

const handleFile = (event: any) => {
  state.image1 = event?.raw
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const postData = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const formData = new FormData()
        formData.append('image', state.image1)
        formData.append('title', state.title1)
        formData.append('text', state.text1)
        const response = await apiClient.post(`https://api.voltautouz.uz/api/blog/`, formData)
        dialogFormVisible.value = false
        dialogImageUrl.value = null
        dialogVisible.value = false
        state.image1 = null
        state.title1 = ''
        state.text1 = ''
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
  state.image1 = ''
  state.title1 = ''
  state.text1 = ''
  router.push('/blog-list')
}
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
