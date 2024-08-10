<template>
  <div class="mb-4">
    <n-button loading type="primary">加载中</n-button>
    <n-button loading :loading-icon="Loading5" type="primary">加载中</n-button>
    <n-button loading :loading-icon="Loading4" type="primary">加载中</n-button>
  </div>
  <div>
    <n-button :loading="isloading" type="primary" @click="click">加载中</n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  RiLoader5Line as Loading5,
  RiLoader4Line as Loading4,
} from '@remixicon/vue'

const isloading = ref(false)

const click = () => {
  isloading.value = true
  setTimeout(() => isloading.value = false, 3000)
}
</script>