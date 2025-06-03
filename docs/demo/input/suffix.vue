<template>
  <div class="mb-4" style="width: 260px">
    <n-input v-model="val1" :prefix-icon="RiEmotionHappyLine" />
  </div>
  <div style="width: 260px">
    <n-input v-model="val2" :suffix-icon="RiMoneyCnyCircleLine" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RiEmotionHappyLine, RiMoneyCnyCircleLine } from '@remixicon/vue'

const val1 = ref('')
const val2 = ref('')
</script>
