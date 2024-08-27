<template>
  <div>
    <h1 class="text-4xl m-0 mb-2">{{ t('faq.title') }}</h1>

    <div class="w-full justify-end flex mt-10">
      <el-button @click="postStatus = true" class="!bg-green-500 !text-white">{{ t('faq.faqCreate.title') }}</el-button>
    </div>

    <el-tabs tab-position="left" class="demo-tabs mt-12">
      <el-tab-pane :label="t('faq.eng')">
        <div class="demo-collapse">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item
              v-for="item in data.filter((item) => item.language === 'english')"
              :key="item.id"
              :title="item.question_text"
              :name="item.id"
            >
              <div class="flex justify-between mt-2">
                {{ item.answer_text }}

                <div class="flex gap-4">
                  <Edit
                    @click="editFaqModal(item.id)"
                    class="cursor-pointer"
                    color="black"
                    style="width: 1.5em; height: 1.5em"
                  />
                  <Delete
                    @click="deleteFaqModal(item.id)"
                    class="cursor-pointer"
                    color="red"
                    style="width: 1.5em; height: 1.5em"
                  />
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="t('faq.ru')">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
            v-for="item in data.filter((item) => item.language === 'russian')"
            :key="item.id"
            :title="item.question_text"
            :name="item.id"
          >
            <div class="flex justify-between mt-2">
              {{ item.answer_text }}

              <div class="flex gap-4">
                <Edit
                  @click="editFaqModal(item.id)"
                  class="cursor-pointer"
                  color="black"
                  style="width: 1.5em; height: 1.5em"
                />
                <Delete
                  @click="deleteFaqModal(item.id)"
                  class="cursor-pointer"
                  color="red"
                  style="width: 1.5em; height: 1.5em"
                />
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane :label="t('faq.uz')">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
            v-for="item in data.filter((item) => item.language === 'uzbek')"
            :key="item.id"
            :title="item.question_text"
            :name="item.id"
          >
            <div class="flex justify-between mt-2">
              {{ item.answer_text }}

              <div class="flex gap-4">
                <Edit
                  @click="editFaqModal(item.id)"
                  class="cursor-pointer"
                  color="black"
                  style="width: 1.5em; height: 1.5em"
                />
                <Delete
                  @click="deleteFaqModal(item.id)"
                  class="cursor-pointer"
                  color="red"
                  style="width: 1.5em; height: 1.5em"
                />
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      v-model="postStatus"
      :title="t('faq.faqCreate.title')"
      width="25%"
      align-center
      :before-close="handleClose"
    >
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
        <el-form-item :label="t('faq.faqCreate.question')" prop="question">
          <el-input v-model="ruleForm.question" />
        </el-form-item>
        <el-form-item :label="t('faq.faqCreate.answer')" prop="answer">
          <el-input v-model="ruleForm.answer" type="textarea" />
        </el-form-item>
        <el-form-item :label="t('faq.faqCreate.language')" prop="language">
          <el-select v-model="ruleForm.language">
            <el-option label="Uzbek" value="uzbek" />
            <el-option label="Russian" value="russian" />
            <el-option label="English" value="english" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close(ruleFormRef)">{{ t('buttons.cancel') }}</el-button>
          <el-button @click="submitForm(ruleFormRef)" class="!bg-green-500 !text-white">
            {{ t('buttons.save') }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="deleteFaq" :title="t('faq.deleteTitle')" width="25%" align-center>
      <span>{{ t('faq.deleteDescription') }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close(ruleFormRef)">{{ t('buttons.cancel') }}</el-button>
          <el-button @click="deleteData" type="danger"> {{ t('buttons.delete') }} </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog :before-close="handleClose" v-model="editFaq" :title="t('faq.editTitle')" width="25%" align-center>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        :size="formSize"
        label-width="120px"
        label-position="top"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item :label="t('faq.faqCreate.question')" prop="question">
          <el-input v-model="ruleForm.question" />
        </el-form-item>
        <el-form-item :label="t('faq.faqCreate.answer')" prop="answer">
          <el-input v-model="ruleForm.answer" type="textarea" />
        </el-form-item>
        <el-form-item :label="t('faq.faqCreate.language')" prop="language">
          <el-select default-first-option v-model="ruleForm.language" placeholder="Language">
            <el-option label="Uzbek" value="uzbek" />
            <el-option label="Russian" value="russian" />
            <el-option label="English" value="english" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close(ruleFormRef)">{{ t('buttons.cancel') }}</el-button>
          <el-button @click="editData(ruleFormRef)" class="!bg-green-500 !text-white">
            {{ t('buttons.save') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Delete, Edit } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { ElMessageBox } from 'element-plus'

const { t } = useI18n()
const data = ref([])
const postStatus = ref(false)
const deleteFaq = ref(false)
const modalId = ref()
const editId = ref()
const editFaq = ref(false)
const activeNames = ref(['1'])
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  question: '',
  answer: '',
  language: '',
})

interface RuleForm {
  question: string
  answer: string
  language: string
}

const rules = computed<FormRules<RuleForm>>(() => ({
  question: [{ required: true, message: t('faq.rules.question'), trigger: 'blur' }],
  answer: [{ required: true, message: t('faq.rules.answer'), trigger: 'blur' }],
  language: [
    {
      required: true,
      message: t('faq.rules.language'),
      trigger: 'change',
    },
  ],
}))

const handleClose = (done: () => void) => {
  ElMessageBox.confirm(t('faq.message'))
    .then(() => {
      done()
      console.log(done())
    })
    .catch(() => {
      // catch error
    })
}

const getData = async () => {
  try {
    const response = await apiClient.get(`/user/faq/`)
    data.value = response.data.data
  } catch (err) {
    console.log(err)
  }
}

const deleteData = async () => {
  try {
    const response = await apiClient.delete(`/user/faq/${modalId.value}/`)
    deleteFaq.value = false
    getData()
    toast.success(t('faq.delete'), {
      autoClose: 3000,
    })
  } catch (err) {
    console.log(err)
  }
}

const deleteFaqModal = (id: number) => {
  modalId.value = id
  deleteFaq.value = true
}

const editData = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const response = await apiClient.put(`/user/faq/${editId.value}/`, {
          question_text: ruleForm.question,
          answer_text: ruleForm.answer,
          language: ruleForm.language,
        })
        editFaq.value = false
        ruleForm.question = ''
        ruleForm.answer = ''
        ruleForm.language = ''
        getData()
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const getDataEdit = async () => {
  try {
    const response = await apiClient.get(`/user/faq/${editId.value}/`)
    ruleForm.question = response.data.question_text
    ruleForm.answer = response.data.answer_text
    ruleForm.language = response.data.language
  } catch (err) {
    console.log(err)
  }
}

const editFaqModal = async (id: number) => {
  editId.value = id
  getDataEdit()
  editFaq.value = true
}

const close = (formEl: FormInstance | undefined) => {
  postStatus.value = false
  deleteFaq.value = false
  editFaq.value = false
  ruleForm.question = ''
  ruleForm.answer = ''
  ruleForm.language = ''
  if (!formEl) return
  formEl.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const response = await apiClient.post(`/user/faq/`, {
          question_text: ruleForm.question,
          answer_text: ruleForm.answer,
          language: ruleForm.language,
        })

        ruleForm.question = ''
        ruleForm.answer = ''
        ruleForm.language = null
        postStatus.value = false
        getData()
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

onMounted(() => {
  getData()
})
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

label {
  flex-direction: row-reverse !important;
  gap: 4px;
}

.el-form-item__content {
  justify-content: end !important;
}
</style>
