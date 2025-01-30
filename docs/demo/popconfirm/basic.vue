<template>
  <n-popconfirm
    title="确定删除吗"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <n-button>Delete</n-button>
  </n-popconfirm>
</template>

<script lang="ts" setup>
const handleConfirm = () => {
  console.log('confirm')
}
const handleCancel = () => {
  console.log('cancel')
}
</script>
