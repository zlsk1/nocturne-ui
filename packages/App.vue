<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import {
  FrInputNumber,
  FrInput,
  FrLink,
  FrMessage,
  FrButton,
  FrPagination,
  FrRadio,
  FrRadioGroup,
  FrCountdown,
  FrProgress
} from '@/components'
const x = ref(50)
</script>

<template>
  <div class="container">
    <FrProgress
      style="width: 500px;"
      :percentage="x"
      :height="20"
      animation
      @click="nextTick(() => x +=10)"
    >
      {{ x + '%' }}
      <template #inner>
        {{ x + '%' }}
      </template>
    </FrProgress>
  </div>
</template>

<style>
html, body {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* background-color: #141414; */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
