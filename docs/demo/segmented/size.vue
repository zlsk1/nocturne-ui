<template>
  <div class="mb-4">
    <n-segmented
      v-model="active"
      size="large"
      :options="options"
      @change="handleChange"
    />
  </div>
  <div class="mb-4">
    <n-segmented v-model="active" :options="options" @change="handleChange" />
  </div>
  <div>
    <n-segmented
      v-model="active"
      size="small"
      :options="options"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { SegmentedOption } from 'nocturne-ui'

const active = ref(1)
const options = ref<SegmentedOption[]>([
  { value: 1, label: 'apple' },
  { value: 2, label: 'lemon' },
  { value: 3, label: 'mango' },
  { value: 4, label: 'melon' }
])

const handleChange = (val: string | number) => {
  console.log(val)
}
</script>
