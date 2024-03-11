<script setup>
import { ref } from 'vue'

const checklist = ref(['option1'])
const list = ref(['option1', 'option2', 'option3', 'option4'])
const checked = ref(false)
const indeterminate = ref(true)

const handleChange = val => {
  const length = val.length
  checked.value = length === list.value.length
  indeterminate.value = length > 0 && length < list.value.length
}

const checkAll = val => {
  checklist.value = val ? list.value : []
  indeterminate.value = false
}
</script>

<template>
  <div class="container">
    <div>
      <fr-checkbox
        v-model="checked"
        :indeterminate="indeterminate"
        @change="checkAll"
      >
        checkAll
      </fr-checkbox>
      <fr-checkbox-group v-model="checklist" @change="handleChange">
        <fr-checkbox
          v-for="item in list"
          :key="item"
          :value="item"
        >
          {{ item }}
        </fr-checkbox>
      </fr-checkbox-group>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
}
</style>
