<template>
  <div style="width: 240px" class="mb-4">
    <n-input v-model="errorField" status="error" />
  </div>
  <div style="width: 240px" class="mb-4">
    <n-input v-model="warningField" status="warning" />
  </div>
  <div style="width: 240px" class="mb-4">
    <n-input
      v-model="errorField"
      status="error"
      :prefix-icon="RiErrorWarningLine"
    />
  </div>
  <div style="width: 240px">
    <n-input
      v-model="warningField"
      status="warning"
      :prefix-icon="RiErrorWarningLine"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RiErrorWarningLine } from '@remixicon/vue'

const errorField = ref('error')
const warningField = ref('warning')
</script>
