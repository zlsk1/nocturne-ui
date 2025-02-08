<template>
  <div>
    <n-segmented
      v-model="active"
      vertical
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
