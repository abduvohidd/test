<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  count: {
    type: Number,
    required: true,
  },
})

let currentPage = ref(1)

const emit = defineEmits('pogination')

const computedTotalItem = computed(() => Math.ceil(props?.count / 10))

const onClickHandler = (page) => {
  emit('pogination', page)
}
</script>

<template>
  <div class="pogination" v-if="props?.count">
    <vue-awesome-paginate
      :total-items="computedTotalItem"
      :items-per-page="1"
      v-model="currentPage"
      :on-click="onClickHandler"
    />
  </div>
</template>

<style>
.pogination {
  display: flex;
  justify-content: center;
}

.pagination-container {
  margin-top: 5px;
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 30px;
  width: 30px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #6de47d;
  border: 1px solid rgb(217, 217, 217);
  color: white;
}

.paginate-buttons:hover {
  background-color: rgb(7, 185, 4);
}

.active-page {
  background-color: #06bd03;
  border: 1px solid #09cb16;
  color: white;
}

.active-page:hover {
  background-color: rgb(7, 185, 4);
}
</style>
