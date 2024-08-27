<template>
  <div>
    <h1 class="text-[24px]">{{ t('terms.termEdit') }}</h1>
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
        <div class="flex w-full gap-4">
          <el-form-item :label="t('terms.termTable.title')" prop="title" class="w-[50%]">
            <el-input v-model="state.title" :placeholder="t('terms.termTable.title')" />
          </el-form-item>
          <el-form-item :label="t('terms.termTable.language')" prop="language" class="w-[50%]">
            <el-select default-first-option v-model="state.language" :placeholder="t('terms.termTable.language')">
              <el-option label="Uzbek" value="uzbek" />
              <el-option label="Russian" value="russian" />
              <el-option label="English" value="english" />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item :label="t('terms.termTable.content')" prop="content" class="mt-5">
          <!-- <Editor v-model="state.content" editorStyle="height: 320px"> </Editor> -->
          <el-input v-model="state.content" type="textarea" :placeholder="t('terms.termTable.content')" />
        </el-form-item>

        <el-form-item class="mt-16">
          <el-button @click="close" type="info">{{ t('buttons.cancel') }}</el-button>
          <el-button class="!bg-green-500 !text-white" @click="editData(ruleFormRef)">
            {{ t('buttons.edit') }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watchEffect, computed } from 'vue'
import apiClient from '@/utils/axios'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import 'vue3-toastify/dist/index.css'
import type { FormInstance, FormRules } from 'element-plus'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import Editor from 'primevue/editor'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const state = reactive<RuleForm>({
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
  title: [{ required: true, message: t('terms.rules.title'), trigger: 'blur' }],
  language: [
    {
      required: true,
      message: t('terms.rules.language'),
      trigger: 'change',
    },
  ],
  content: [
    {
      required: true,
      message: t('terms.rules.content'),
      trigger: 'blur',
    },
  ],
}))

const getData = async () => {
  try {
    const response = await apiClient.get(`/user/terms-and-conditions/${route.params.id}/`)
    state.title = response.data.title
    state.language = response.data.language
    state.content = response.data.content
  } catch (err) {
    console.log(err)
  }
}

const editData = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const response = await apiClient.put(`/user/terms-and-conditions/${route.params.id}/`, state)
        state.title = ''
        state.language = ''
        state.content = ''
        getData()
        router.push('/userTerm')
      } catch (err) {
        toast.error(t('terms.error'), {
          autoClose: 3000,
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const close = () => {
  router.push('/userTerm')
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
