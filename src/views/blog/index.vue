<template>
  <div>
    <h1 class="text-4xl m-0 mb-2">Blog</h1>

    <div class="w-full justify-between flex mt-10">
      <div class="demo-input-size w-[15%]">
        <el-input v-model="search" class="w-50 m-2" placeholder="Blog search" :prefix-icon="Search" />
      </div>

      <router-link :to="{ name: 'blog-create' }">
        <el-button class="!bg-green-500 !text-white">Create blog</el-button>
      </router-link>
    </div>

    <el-table :data="filterData" border style="width: 100%" class="mt-16 mx-auto">
      <el-table-column label="Title" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Text" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.text }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Create Date" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.updated_time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Image" class="w-[180px]">
        <template #default="scope">
          <img :src="scope.row.image" alt="blog image" class="!w-[3rem] !h-[3rem]" />
        </template>
      </el-table-column>

      <el-table-column :label="t('carsMakes.carTable.actions')">
        <template #default="scope">
          <el-dropdown>
            <el-button class="!bg-green-500 !text-white">
              {{ t('carsMakes.carTable.action') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <router-link :to="{ name: 'blog-edit', params: { id: scope.row.id } }">
                  <el-button size="small" class="m-1">{{ t('buttons.edit') }}</el-button>
                </router-link>

                <el-button @click="deleteBtn(scope.row.id)" size="small" class="m-1" type="danger">{{
                  t('buttons.delete')
                }}</el-button>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="deleteModal" title="Delete Blog" width="25%" align-center>
      <span>Are you sure you want to delete the blog? </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
          <el-button type="danger" @click="deleteData">
            {{ t('buttons.delete') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const { t } = useI18n()
const search = ref('')
const data = ref([])
const deleteModal = ref(false)
const deleteId = ref('')

const filterData = computed(() => {
  return data.value.filter((item) => item.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
})

const getData = async () => {
  try {
    const response = await apiClient.get(`https://api.voltautouz.uz/api/blog/`)
    data.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const deleteBtn = async (id: string) => {
  deleteId.value = id
  deleteModal.value = true
}

const deleteData = async () => {
  try {
    const response = await apiClient.delete(`https://api.voltautouz.uz/api/blog/${deleteId.value}/`)
    deleteModal.value = false
    getData()
    toast.success('Delete blog', {
      autoClose: 3000,
    })
  } catch (err) {
    console.log(err)
  }
}

const close = () => {
  deleteModal.value = false
}

onMounted(() => {
  getData()
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
</style>
