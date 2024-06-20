<script lang="ts" setup>
import { ref } from 'vue'
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
  FrProgress,
  FrSelect,
  FrOption,
  FrIcon,
  FrTooltip,
  FrTag,
  FrSlider
} from '@/components'

const val = ref(20)
</script>

<template>
  <div class="container">
    <FrSlider
      v-model="val"
      style="width: 200px;"
      :format-value-fn="(val: number) => val / 10"
      disabled
      @change="(val) => console.log(val)"
    ></FrSlider>
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

.frpoppppper {
  padding: 100px;
}
</style>
