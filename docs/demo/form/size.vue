<template>
  <div class="mb-4">
    <n-radio-group v-model="currentSize">
      <n-radio-button
        v-for="size in sizes"
        :key="size"
        :value="size"
        :label="size"
      />
    </n-radio-group>
  </div>
  <n-form :model="formData" :size="currentSize" style="max-width: 400px">
    <n-form-item label="Username">
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Password">
      <n-input v-model="formData.passward" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize } from 'nocturne-ui'

const currentSize = ref<ComponentSize>('large')
const sizes = ref(['large', 'default', 'small'])

const formData = reactive({
  username: '',
  passward: ''
})
</script>
