<template>
  <div class="mb-4">
    <n-color-picker v-model="value1" @change="onChange" />
  </div>
  <n-space size="large">
    <n-color-picker v-model="value2" size="large" />
    <n-color-picker v-model="value3" size="default" />
    <n-color-picker v-model="value4" size="small" />
  </n-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useCssVar } from '@vueuse/core'

const primaryColor = useCssVar('--n-color-primary', document.documentElement)
const successColor = useCssVar('--n-color-success', document.documentElement)
const warningColor = useCssVar('--n-color-warning', document.documentElement)
const errorColor = useCssVar('--n-color-error', document.documentElement)

const value1 = ref(primaryColor.value)
const value2 = ref(successColor.value)
const value3 = ref(warningColor.value)
const value4 = ref(errorColor.value)

const onChange = (value: string) => {
  console.log(value)
}
</script>
