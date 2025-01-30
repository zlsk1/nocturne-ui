<template>
  <n-popconfirm
    title="确定删除吗"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <n-button>Delete</n-button>
    <template #icon>
      <n-icon color="#f46262" size="18">
        <RiErrorWarningLine />
      </n-icon>
    </template>
  </n-popconfirm>
</template>

<script lang="ts" setup>
import { RiErrorWarningLine } from '@remixicon/vue'
const handleConfirm = () => {
  console.log('confirm')
}
const handleCancel = () => {
  console.log('cancel')
}
</script>
