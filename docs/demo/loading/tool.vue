<template>
  <div ref="targetRef" class="w-[100px] h-[100px] relative" />
  <n-button @click="handleStart">Start loading</n-button>
  <n-button @click="handleCancle">Cancle loading</n-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NLoading } from 'nocturne-ui'
import type { LoadingIntance } from 'nocturne-ui/es/components/loading/src/loading'

let loading: LoadingIntance

const targetRef = ref<HTMLElement>()

const handleStart = () => {
  loading = NLoading.use({
    target: targetRef.value
  })
}

const handleCancle = () => {
  loading.close()
}
</script>
