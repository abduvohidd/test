<template>
  <el-dropdown>
    <el-button type="info">
      {{ buttonText }}<el-icon class="el-icon--right"><ArrowDown /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="onSelect('')">{{ allText }}</el-dropdown-item>
        <el-dropdown-item v-for="(item, index) in options" :key="index" @click="onSelect(item.value)">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

// Define a type for the dropdown options
interface Option {
  value: string
  label: string
}

const props = defineProps<{
  buttonText: string
  allText: string
  options: Option[]
}>()

const emit = defineEmits(['select'])

const onSelect = (value: string) => {
  emit('select', value)
}
</script>
