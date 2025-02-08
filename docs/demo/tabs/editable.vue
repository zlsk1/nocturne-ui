<template>
  <n-tabs v-model="activeTab" type="editable-card" @edit="handleEdit">
    <n-tab-pane
      v-for="(item, index) in tabs"
      :key="`${item}-${index}`"
      :label="item.label"
      closeable
    >
      {{ item.label }}
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeTab = ref('1')

const tabs = ref([
  {
    label: 'Tab-1'
  },
  {
    label: 'Tab-2'
  },
  {
    label: 'Tab-3'
  },
  {
    label: 'Tab-4'
  }
])

const handleEdit = (type: 'add' | 'del', label?: string) => {
  if (type === 'add') {
    tabs.value.push({
      label: 'NewTab'
    })
  } else if (type === 'del') {
    tabs.value = tabs.value.filter((item) => item.label !== label)
  }
}
</script>
