<template>
  <div class="mb-4">
    <n-checkbox-group v-model="list">
      <n-checkbox value="choosen 1" label="choosen 1" />
      <n-checkbox value="choosen 2" label="choosen 2" />
      <n-checkbox value="choosen 3" label="choosen 3" disabled />
      <n-checkbox value="choosen 4" label="choosen 4" />
    </n-checkbox-group>
  </div>
  <div class="flex">
    <n-checkbox
      v-model="checkAll"
      :indeterminate="indeterminate"
      label="check-all"
      @change="handleCheckAll"
    />
    <n-checkbox-group
      v-model="checkedNames"
      class="ml-4"
      @change="handleChange"
    >
      <n-checkbox
        v-for="name in names"
        :key="name"
        :value="name"
        :label="name"
      />
    </n-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref(['choosen 1', 'choosen 2'])

const checkAll = ref(false)
const indeterminate = ref(true)
const names = ['Yasuo', 'Aatrox', 'Vladimir']
const checkedNames = ref(['Yasuo'])

const handleCheckAll = (val: boolean) => {
  checkedNames.value = val ? names : []
  indeterminate.value = false
}

const handleChange = (val: string[]) => {
  const count = val.length
  checkAll.value = count === names.length
  indeterminate.value = count > 0 && count < names.length
}
</script>
