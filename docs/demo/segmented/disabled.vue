<template>
  <div class="mb-4">
    <n-segmented
      v-model="active1"
      disabled
      :options="options1"
      @change="handleChange"
    />
  </div>
  <div>
    <n-segmented v-model="active2" :options="options2" @change="handleChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { SegmentedOption } from 'nocturne-ui'

const active1 = ref(1)
const options1 = ref<SegmentedOption[]>([
  { value: 1, label: 'apple' },
  { value: 2, label: 'lemon' },
  { value: 3, label: 'mango' },
  { value: 4, label: 'melon' }
])

const active2 = ref(1)
const options2 = ref<SegmentedOption[]>([
  { value: 1, label: 'apple' },
  { value: 2, label: 'lemon', disabled: true },
  { value: 3, label: 'mango' },
  { value: 4, label: 'melon' }
])

const handleChange = (val: string | number) => {
  console.log(val)
}
</script>
