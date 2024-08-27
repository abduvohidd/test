<template>
  <div>
    <div class="w-full bg-[#f7f7f7] rounded-xl px-12 py-8">
      <h1 class="font-bold text-3xl">Investor Create</h1>

      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/investors' }">Investors List</el-breadcrumb-item>
        <el-breadcrumb-item>Add Investor </el-breadcrumb-item>
      </el-breadcrumb>

      <div class="mt-10">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          label-position="top"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <div class="flex gap-4 w-full">
            <el-form-item label="Email" prop="email" class="w-[100%]">
              <el-input v-model="ruleForm.email" placeholder="investor@gmil.com" />
            </el-form-item>
            <el-form-item label="Username" prop="username" class="w-[100%]">
              <el-input v-model="ruleForm.username" placeholder="username" />
            </el-form-item>
          </div>

          <div class="flex gap-4 w-full mt-5">
            <el-form-item label="First Name" prop="first_name" class="w-[100%]">
              <el-input v-model="ruleForm.first_name" placeholder="first name" />
            </el-form-item>
            <el-form-item label="Last Name" prop="last_name" class="w-[100%]">
              <el-input v-model="ruleForm.last_name" placeholder="last name" />
            </el-form-item>
          </div>
          <div class="flex gap-4 w-full mt-5">
            <el-form-item label="Phone Number" prop="phone_number" class="w-[100%]">
              <!-- <el-input v-model="ruleForm.phone_number" :formatter="(value) => value.replace(/^\+998|\D/g, '')" /> -->
              <vue-tel-input
                v-model="ruleForm.phone_number"
                :autoFormat="true"
                :inputOptions="{
                  showDialCode: true,
                  maxlength: 17,
                  required: true,
                  type: 'tel',
                  autocomplete: 'on',
                  autofocus: true,
                }"
                :dropdownOptions="{
                  showFlags: true,
                }"
                :onlyCountries="['UZ']"
                class="!border-gray-300 w-[100%] h-[2rem] !focus:outline-none !focus:ring-green-500 !focus:border-green-500"
              ></vue-tel-input>
            </el-form-item>
            <el-form-item label="Password" prop="password" class="w-[100%]">
              <el-input v-model="ruleForm.password" placeholder="password" />
            </el-form-item>
          </div>

          <div class="flex justify-end mt-5 gap-4">
            <router-link :to="{ path: '/investors' }">
              <el-button class="cursor-pointer"> Close </el-button>
            </router-link>
            <el-button type="primary" @click="submitForm(ruleFormRef)"> Create </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import apiClient from '@/utils/axios'
import { VueTelInput } from 'vue-tel-input'
import router from '@/router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
interface RuleForm {
  email: string
  username: string
  first_name: string
  last_name: string
  phone_number: string
  password: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  email: '',
  username: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  password: '',
})

const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: 'Please input username', trigger: 'blur' }],
  first_name: [{ required: true, message: 'Please input First name', trigger: 'blur' }],
  last_name: [{ required: true, message: 'Please input Last name', trigger: 'blur' }],
  phone_number: [
    { required: true, message: 'Please input Phone number', trigger: 'blur' },
    { min: 17, max: 17, message: 'Length should be 17', trigger: 'blur' },
  ],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const response = await apiClient.post(`/dashboard/station-investor/`, {
          email: ruleForm.email,
          username: ruleForm.username,
          first_name: ruleForm.first_name,
          last_name: ruleForm.last_name,
          phone_number: ruleForm.phone_number.replaceAll(' ', ''),
          password: ruleForm.password,
        })
        router.push('/investors')
      } catch (err) {
        console.log(err)
        toast.error(err.message, {
          autoClose: 3000,
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   formEl.resetFields()
// }
</script>

<style lang="scss" scoped></style>
