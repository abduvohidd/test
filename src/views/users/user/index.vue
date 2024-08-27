<template>
  <div>
    <div class="w-full justify-between flex">
      <h1 class="text-4xl m-0 mb-2">{{ t('usersList.userTitle') }}</h1>
      <div class="flex gap-2">
        <!-- <el-button type="success">Export</el-button> -->
      </div>
    </div>

    <div class="bg-slate-100 w-full p-8 rounded-lg gap-4 flex mx-auto mt-5">
      <div class="bg-white p-4 w-full h-28 rounded-lg relative border-[2px]">
        <h1 class="font-bold text-xl">Total Users</h1>

        <span class="text-green-500 font-bold absolute bottom-5 right-5 text-2xl">{{ stats?.total_users }}</span>
      </div>
      <div class="bg-white p-4 w-full h-28 rounded-lg relative border-[2px]">
        <h1 class="font-bold text-xl">Active Users</h1>

        <span class="text-green-500 font-bold absolute bottom-5 right-5 text-2xl">{{ stats?.total_users }}</span>
      </div>
      <div class="bg-white p-4 w-full h-28 rounded-lg relative border-[2px]">
        <h1 class="font-bold text-xl">Admin Users</h1>

        <span class="text-green-500 font-bold absolute bottom-5 right-5 text-2xl">{{ stats?.total_users }}</span>
      </div>
    </div>

    <div class="mt-10 flex items-center w-full justify-end">
      <!-- <h1 class="font-bold text-base">All Users (250)</h1> -->

      <div class="demo-input-size w-[20%]">
        <el-input
          v-model="search"
          @input="searchUser(search)"
          class="w-60 m-2"
          :placeholder="t('usersList.userSearch')"
          :prefix-icon="Search"
        />
      </div>
    </div>

    <div class="mt-5">
      <el-tabs v-model="activeName" type="card" @tab-click="rol">
        <el-tab-pane label="All" name="first">
          <el-table :data="data" border style="width: 100%" class="mx-auto">
            <el-table-column :label="t('usersList.userTable.name')" class="w-[180px]">
              <template #default="scope">
                <h1 class="font-bold">{{ scope.row.first_name }} {{ scope.row.last_name }}</h1>
              </template>
            </el-table-column>
            <el-table-column :label="t('usersList.userTable.phone')" class="w-[180px]">
              <template #default="scope">
                <h1 class="font-bold">{{ scope.row.phone_number }}</h1>
              </template>
            </el-table-column>
            <el-table-column :label="t('usersList.userTable.id')" class="w-[180px]">
              <template #default="scope">
                <span style="margin-left: 10px" class="!text-blue-500 font-bold"
                  >{{ scope.row.charging_amount }} Sum</span
                >
              </template>
            </el-table-column>
            <el-table-column :label="t('usersList.userTable.total')" class="w-[180px]">
              <template #default="scope">
                <span style="margin-left: 10px" class="!text-blue-500 font-bold">{{ scope.row.balance }} Sum</span>
              </template>
            </el-table-column>
            <el-table-column label="User Type" width="100">
              <template #default="scope">
                <el-tag class="font-bold" type="warning"> {{ scope.row.user_role }} </el-tag>
              </template>
            </el-table-column>

            <el-table-column :label="t('usersList.userTable.actions')" width="160">
              <template #default="scope">
                <el-dropdown trigger="hover">
                  <el-button class="el-dropdown-link !bg-green-500 !text-white">
                    {{ t('usersList.userTable.action') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <router-link :to="{ name: 'user-view', params: { id: scope.row.id } }">
                        <el-button size="small" class="m-1">{{ t('buttons.view') }}</el-button>
                      </router-link>
                      <el-button @click="resetPasswordModal(scope.row.id)" size="small" class="m-1" type="info">{{
                        t('buttons.reset')
                      }}</el-button>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            background
            layout="prev, pager, next, sizes"
            :total="count"
            class="mt-10 flex justify-end"
            @next-click="getData((pageOne += 1), role)"
            @prev-click="getData((pageOne -= 1), role)"
            @change="getData(currentPage, role)"
          />
        </el-tab-pane>
        <el-tab-pane label="Admin" name="second">
          <el-table :data="data" border style="width: 100%" class="mx-auto">
            <el-table-column :label="t('usersList.userTable.name')" class="w-[180px]">
              <template #default="scope">
                <h1 class="font-bold">{{ scope.row.first_name }} {{ scope.row.last_name }}</h1>
              </template>
            </el-table-column>
            <el-table-column :label="t('usersList.userTable.phone')" class="w-[180px]">
              <template #default="scope">
                <h1 class="font-bold">{{ scope.row.phone_number }}</h1>
              </template>
            </el-table-column>
            <el-table-column :label="t('usersList.userTable.id')" class="w-[180px]">
              <template #default="scope">
                <span style="margin-left: 10px" class="!text-blue-500 font-bold"
                  >{{ scope.row.charging_amount }} Sum</span
                >
              </template>
            </el-table-column>

            <el-table-column :label="t('usersList.userTable.total')" class="w-[180px]">
              <template #default="scope">
                <span style="margin-left: 10px" class="!text-blue-500 font-bold">{{ scope.row.balance }} Sum</span>
              </template>
            </el-table-column>
            <el-table-column label="User Type" width="100">
              <template #default="scope">
                <el-tag class="font-bold" type="warning"> {{ scope.row.user_role }} </el-tag>
              </template>
            </el-table-column>

            <el-table-column :label="t('usersList.userTable.actions')" width="160">
              <template #default="scope">
                <el-dropdown trigger="hover">
                  <el-button class="el-dropdown-link !bg-green-500 !text-white">
                    {{ t('usersList.userTable.action') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <router-link :to="{ name: 'user-view', params: { id: scope.row.id } }">
                        <el-button size="small" class="m-1">{{ t('buttons.view') }}</el-button>
                      </router-link>
                      <el-button @click="resetPasswordModal(scope.row.id)" size="small" class="m-1" type="info">{{
                        t('buttons.reset')
                      }}</el-button>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            background
            layout="prev, pager, next, sizes"
            :total="count"
            class="mt-10 flex justify-end"
            @next-click="getData((pageOne += 1), role)"
            @prev-click="getData((pageOne -= 1), role)"
            @change="getData(currentPage, role)"
          />
        </el-tab-pane>
      </el-tabs>
    </div>

    <Modal :modal="modal" @update:modal="modal = $event" :modalId="modalId" />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import apiClient from '@/utils/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import Modal from '@/components/userSocket/Modal.vue'

const modal = ref(false)
const activeName = ref('first')
const role = ref('ordinary')
const { t } = useI18n()
const data = ref([])
const stats = ref([])
let pageOne = 1
const currentPage = ref(1)
const pageSize = ref(10)
const dPage = ref(1)
const count = ref()
const search = ref('')
const modalId = ref('')
const totalItem = ref()
const getData = async (page, role) => {
  try {
    dPage.value = page - 1
    const response = await apiClient.get(`/dashboard/users/?page=${page}&page_size=${pageSize.value}&user_role=${role}`)
    data.value = response.data.data.users
    stats.value = response.data.data.stats
    count.value = response.data.count
    totalItem.value = response.data.count
  } catch (err) {
    console.log(err)
  }
}
const resetPasswordModal = async (id) => {
  modalId.value = id
  modal.value = !modal.value
}

const rol = async (e) => {
  if (e.props.name === 'first') {
    role.value = 'ordinary'
    getData(pageOne, role.value)
  } else if (e.props.name === 'second') {
    role.value = 'admin'
    getData(pageOne, role.value)
  }
}

const searchUser = async (search) => {
  try {
    let url = '/dashboard/users/'

    if (search && search.trim() !== '') {
      url += `?search=${search}`
    }
    if (!search && search.trim() === '') {
      getData(pageOne, role.value)
    }
    const response = await apiClient.get(url)
    data.value = response.data.data.users

    count.value = response.data.count
    totalItem.value = response.data.count
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  getData(pageOne, role.value)
})
</script>

<style>
.el-form-item__label {
  justify-content: start !important;
}
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
.el-tabs--card > .el-tabs__header {
  border-bottom: 0px;
}
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-bottom: 1px solid #e4e7ed;
}
</style>
