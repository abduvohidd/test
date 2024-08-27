<template>
  <div>
    <h1 class="text-4xl m-0 mb-2">{{ t('socketsList.socketTitle') }}</h1>

    <div class="w-full justify-between flex mt-10">
      <div class="demo-input-size w-[15%]">
        <el-input
          v-model="search"
          class="w-50 m-2"
          :placeholder="t('socketsList.socketSearch')"
          :prefix-icon="Search"
        />
      </div>

      <router-link :to="{ name: 'socket-create' }">
        <el-button class="!bg-green-500 !text-white">{{ t('socketsList.socketCreate') }}</el-button>
      </router-link>
    </div>

    <el-table :data="filterData" border style="width: 100%" class="mt-16 mx-auto">
      <el-table-column :label="t('socketsList.socketTable.icon')" class="w-[180px]">
        <template #default="scope">
          <img style="margin-left: 10px" class="!w-[3rem] !h-[3rem]" :src="scope.row.icon" alt="ico" />
        </template>
      </el-table-column>

      <el-table-column :label="t('socketsList.socketTable.type')" class="w-[200px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="t('socketsList.socketTable.icon')" class="w-[180px]">
        <template #default="scope">
          <img style="margin-left: 10px" class="!w-[3rem] !h-[3rem]" :src="scope.row.image" alt="img" />
        </template>
      </el-table-column>

      <el-table-column :label="t('socketsList.socketTable.action')">
        <template #default="scope">
          <el-dropdown>
            <el-button class="el-dropdown-link !bg-green-500 !text-white">
              {{ t('socketsList.socketTable.action') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <router-link :to="{ name: 'socket-edit', params: { id: scope.row.id } }">
                  <el-button size="small" class="m-1">{{ t('buttons.edit') }}</el-button>
                </router-link>

                <el-button size="small" class="m-1" type="danger" @click="deleteBtn(scope.row.id)">{{
                  t('buttons.delete')
                }}</el-button>
                <router-link :to="{ name: 'socket-view', params: { id: scope.row.id } }">
                  <el-button size="small" class="m-1" type="info">{{ t('buttons.view') }}</el-button>
                </router-link>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="deleteModal" :title="t('socketsList.deleteTitle')" width="25%" align-center>
      <span>{{ t('socketsList.deleteDescription') }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{ t('buttons.cancel') }}</el-button>
          <el-button type="danger" @click="deleteData"> {{ t('buttons.delete') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { ArrowDown } from '@element-plus/icons-vue'

const emit = defineEmits(['submit'])
const data = ref([])
const { t } = useI18n()
const search = ref('')
const deleteModal = ref(false)
const deleteId = ref('')

const filterData = computed(() => {
  return data.value.filter((item) => item.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
})

const getData = async () => {
  try {
    const response = await apiClient.get(`/dashboard/connector-type/`)
    data.value = response.data.data
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
    const response = await apiClient.delete(`/dashboard/connector-type/${deleteId.value}/`)
    deleteModal.value = false
    getData()
    toast.success('Delete socket', {
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
.el-upload-list__item-actions {
  width: 5vw !important;
  height: 5vw !important;
}
.el-upload--picture-card {
  width: 5vw !important;
  height: 5vw !important;
}

.el-upload-list__item-thumbnail {
  width: 5vw !important;
  height: 5vw !important;
}
.is-ready {
  width: 5vw !important;
  height: 5vw !important;
}
</style>
