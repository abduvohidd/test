<template>
  <el-input
    v-model="search"
    @input="onSearch"
    class="w-50 m-2"
    :placeholder="t('stationsList.stationSearch')"
    :prefix-icon="Search"
  />
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const search = ref('')
const emit = defineEmits(['search'])

const onSearch = () => {
  emit('search', search.value)
}
</script>
