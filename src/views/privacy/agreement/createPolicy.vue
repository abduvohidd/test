<template>
  <div>
    <h1 class="text-[24px]">{{ t('agreements.agreementCreate') }}</h1>

    <div class="border rounded-md p-4 mt-10">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
        label-position="top"
      >
        <div class="flex w-full gap-4">
          <el-form-item :label="t('agreements.agreementTable.title')" prop="title" class="w-[50%]">
            <el-input v-model="ruleForm.title" :placeholder="t('agreements.agreementTable.title')" />
          </el-form-item>
          <el-form-item :label="t('agreements.agreementTable.language')" prop="language" class="w-[50%]">
            <el-select v-model="ruleForm.language" :placeholder="t('agreements.agreementTable.language')">
              <el-option label="Uzbek" value="uzbek" />
              <el-option label="Russian" value="russian" />
              <el-option label="English" value="english" />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item :label="t('agreements.agreementTable.content')" prop="content" class="mt-5">
          <!-- <Editor v-model="ruleForm.content" editorStyle="height: 320px" /> -->
          <el-input v-model="ruleForm.content" type="textarea" :placeholder="t('agreements.agreementTable.content')" />
        </el-form-item>

        <el-form-item class="mt-16">
          <el-button @click="close" type="info">{{ t('buttons.cancel') }}</el-button>

          <el-button class="!bg-green-500 !text-white" @click="submitForm(ruleFormRef)">
            {{ t('buttons.save') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import apiClient from '@/utils/axios'
import Editor from 'primevue/editor'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const router = useRouter()
const data = ref([])
const { t } = useI18n()
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  title: '',
  language: '',
  content: '',
})

interface RuleForm {
  title: string
  language: string
  content: string
}

const rules = computed<FormRules<RuleForm>>(() => ({
  title: [{ required: true, message: t('agreements.rules.title'), trigger: 'blur' }],
  language: [
    {
      required: true,
      message: t('agreements.rules.language'),
      trigger: 'change',
    },
  ],
  content: [
    {
      required: true,
      message: t('agreements.rules.content'),
      trigger: 'blur',
    },
  ],
}))

const getData = async () => {
  try {
    const response = await apiClient.get(`/user/me`)
    data.value = response.data.data
  } catch (err) {
    console.log(err)
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const response = await apiClient.post(`/user/privacy-policy/`, {
          title: ruleForm.title,
          language: ruleForm.language,
          content: ruleForm.content,
        })
        if (response.status === 200 || response.status === 201) {
          router.push('/agreement')

          ruleForm.title = ''
          ruleForm.language = ''
          ruleForm.content = ''
        }
      } catch (err) {
        toast.error(t('agreement.error'), {
          autoClose: 3000,
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const close = () => {
  router.push('/agreement')
}

onMounted(() => {
  getData()
})
</script>

<style>
.p-editor-container {
  width: 100%;
}
label {
  flex-direction: row-reverse !important;
  gap: 4px;
}

.el-form-item__content {
  justify-content: end !important;
}
</style>
