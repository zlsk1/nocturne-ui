<template>
  <n-space class="mb-4">
    <n-button loading type="primary">加载中</n-button>
    <n-button loading :loading-icon="Loading5" type="primary">加载中</n-button>
    <n-button loading :loading-icon="Loading4" type="primary">加载中</n-button>
  </n-space>
  <n-space>
    <n-button :loading="isloading" type="primary" @click="click"
      >加载中</n-button
    >
  </n-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  RiLoader4Line as Loading4,
  RiLoader5Line as Loading5
} from '@remixicon/vue'

const isloading = ref(false)

const click = () => {
  isloading.value = true
  setTimeout(() => (isloading.value = false), 1000)
}
</script>
