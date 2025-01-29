<template>
  <div class="mb-4">
    <n-select
      v-model="val"
      style="max-width: 260px"
      placeholder="Please select"
      disabled
    >
      <n-option
        v-for="item in 4"
        :key="item"
        :value="item"
        :label="`option${item}`"
      />
    </n-select>
  </div>
  <div>
    <n-select
      v-model="val"
      style="max-width: 260px"
      placeholder="Please select"
    >
      <n-option
        v-for="item in 4"
        :key="item"
        :value="item"
        :label="`option${item}`"
        :disabled="item === 2"
      />
    </n-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref()
</script>
