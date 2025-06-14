<template>
  <n-space>
    <n-select v-model="base" style="width: 140px">
      <n-option
        v-for="item in 4"
        :key="item"
        :value="item"
        :label="`Option${item}`"
      />
    </n-select>
    <n-select v-model="disabled" style="width: 140px" disabled>
      <n-option
        v-for="item in 4"
        :key="item"
        :value="item"
        :label="`Option${item}`"
      />
    </n-select>
    <n-select v-model="loading" style="width: 140px" loading>
      <n-option
        v-for="item in 4"
        :key="item"
        :value="item"
        :label="`Option${item}`"
      />
    </n-select>
    <n-select v-model="clearable" style="width: 140px" clear-value>
      <n-option
        v-for="item in 4"
        :key="item"
        :value="item"
        :label="`Option${item}`"
      />
    </n-select>
  </n-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const base = ref(1)
const disabled = ref(1)
const loading = ref(1)
const clearable = ref(1)
</script>
