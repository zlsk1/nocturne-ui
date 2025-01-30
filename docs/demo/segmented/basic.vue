<template>
  <n-segmented
    v-model="active"
    :options="[
      { value: 1, label: 'apple' },
      { value: 2, label: 'lemon' },
      { value: 3, label: 'mongo' }
    ]"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)

const handleChange = (val: string | number) => {
  console.log(val)
}
</script>
