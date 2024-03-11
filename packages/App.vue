<script setup>
import { ref } from 'vue'

const tags = ref([
  { name: 'Tag 1', type: 'primary' },
  { name: 'Tag 2', type: 'success' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 4', type: 'warning' },
  { name: 'Tag 5', type: 'danger' }
])

const value = ref('')

const handleClose = (index) => {
  tags.value.splice(index, 1)
}

const handleBlur = () => {
  if (!value.value) return
  tags.value.push({ name: value.value, type: 'primary' })
  value.value = ''
}
</script>

<template>
  <div class="container">
    <fr-tag
      v-for="(item, index) in tags"
      :key="index"
      :type="item.type"
      round
      size="small"
      effect="dark"
      closable
      border
      @close="handleClose(index)"
    >
      {{ item.name }}
    </fr-tag>
    <fr-input
      v-model="value"
      style="width: 90px"
      size="small"
      placeholder="new tag"
      @blur="handleBlur"
    ></fr-input>
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
