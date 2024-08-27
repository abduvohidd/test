<template>
  <div>
    <el-dialog class="2xl:!w-[20%] !w-[30%]" align-center v-model="dialogFormVisible" title="Create Socket">
      <el-form :model="state">
        <el-form-item label="Name" class="flex flex-col items-start">
          <el-input v-model="state.name1" placeholder="Place name" class="!w-[350px]" />
        </el-form-item>

        <el-form-item label="Description" class="flex flex-col items-start">
          <el-input v-model="state.description1" placeholder="Place name" class="!w-[350px]" />
        </el-form-item>

        <el-form-item label="Logo" class="flex flex-col items-start">
          <el-upload
            v-model="state.icon1"
            action="#"
            multiple
            list-type="picture-card"
            :limit="1"
            class="upload-demo mt-2"
            :auto-upload="false"
            ref="upload"
            :on-change="handleFileChange"
            :on-exceed="handleExceed"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
          <el-button type="primary" @click="postData"> {{ t('buttons.save') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'

const dialogFormVisible = ref(true)
</script>

<style scoped></style>
