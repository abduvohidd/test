<template>
  <div>
    <el-table :data="stations" border style="width: 100%" class="mt-16 mx-auto">
      <el-table-column :label="t('stationsList.stationTable.stationName')" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="t('stationsList.stationTable.location')" class="w-[180px]">
        <template #default="scope">
          <a :href="`https://www.google.com/maps?q=${scope.row.latitude},${scope.row.longitude}`">
            <el-tooltip :content="scope.row.address" placement="top">
              <el-button
                ><el-icon><Location /></el-icon>
              </el-button>
            </el-tooltip>
          </a>
        </template>
      </el-table-column>

      <el-table-column :label="t('stationsList.stationTable.power')" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.power }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="t('stationsList.stationTable.rating')" class="w-[180px]">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.average_rating }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="t('stationsList.stationTable.status')" class="w-[180px]">
        <template #default="scope">
          <span v-if="scope.row.status === 'available'" class="text-green-500 font-bold" style="margin-left: 10px">{{
            scope.row.status
          }}</span>
          <span
            v-else-if="scope.row.status === 'NotWorking'"
            class="text-red-500 font-bold"
            style="margin-left: 10px"
            >{{ scope.row.status }}</span
          >
        </template>
      </el-table-column>

      <el-table-column :label="t('stationsList.stationTable.action')">
        <template #default="scope">
          <el-dropdown>
            <el-button class="!bg-green-500 !text-white">
              {{ t('stationsList.stationTable.action') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <router-link :to="{ name: 'station-edit', params: { id: scope.row.id } }">
                  <el-button size="small" class="m-1" type="info">{{ t('buttons.edit') }}</el-button>
                </router-link>
                <router-link :to="{ name: 'station-view', params: { id: scope.row.id } }">
                  <el-button size="small" class="m-1">{{ t('buttons.view') }}</el-button>
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

    <el-dialog v-model="centerDialogVisible" title="Station delete" width="25%" align-center>
      <span>{{ t('usersList.userDelete.deleteParagraph') }}</span>
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
import { ref, watch, onMounted } from 'vue'
import { ArrowDown, Location } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { defineProps } from 'vue'

const props = defineProps({
  stations: Array,
})
const { t } = useI18n()
const deleteId = ref('')
const centerDialogVisible = ref(false)
const isLoading = ref(true)

const getData = async () => {
  try {
    const url = `/station/list/`
    const response = await apiClient.get(url)
  } catch (err) {
    console.error(err)
  }
}

const deleteData = async () => {
  try {
    const response = await apiClient.delete(`/dashboard/station/${deleteId.value}/`)
    centerDialogVisible.value = false
    if (response) {
      isLoading.value = false
    }
    getData()
    toast.success('Delete station', {
      autoClose: 3000,
    })
  } catch (err) {
    console.log(err)
  }
}

const deleteBtn = async (id: string) => {
  deleteId.value = id
  centerDialogVisible.value = true
}

const close = () => {
  centerDialogVisible.value = false
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
</style>
