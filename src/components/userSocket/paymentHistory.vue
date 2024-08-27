<template>
  <div>
    <el-table :data="props.data1" border style="width: 100%" class="mt-5">
      <el-table-column prop="transaction_id" label="Transaction Id" width="350">
        <template #default="scope">
          {{ scope.row.transaction_id }}
        </template>
      </el-table-column>
      <el-table-column prop="transaction_type" label="Transaction Type" width="350">
        <template #default="scope">
          {{ scope.row.transaction_type }}
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="Amount" width="350">
        <template #default="scope">
          {{ scope.row.amount }}
          {{ scope.row.currency }}
        </template> </el-table-column
      ><el-table-column prop="status" label="Status" width="350">
        <template #default="scope">
          {{ scope.row.status }}
        </template> </el-table-column
      ><el-table-column prop="date" label="Created Date" width="350">
        <template #default="scope">
          {{ scope.row.created_time }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data1: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e1e1e1;
  border: 4px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;
}

.no-scrollbar::-webkit-scrollbar {
  width: 16px;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scroll-margin-block-start: 0;
}
</style>
