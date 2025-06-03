<template>
  <div class="mb-4" style="width: 340px">
    <n-input v-model="val1">
      <template #prepend> https:// </template>
      <template #append> .com</template>
    </n-input>
  </div>
  <div style="width: 340px">
    <n-input model-value="Hangzhou">
      <template #prepend>
        <n-select v-model="province">
          <n-option label="Fujian" value="1" />
          <n-option label="Zhejiang" value="2" />
        </n-select>
      </template>
    </n-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val1 = ref('my site')
const province = ref('2')
</script>
