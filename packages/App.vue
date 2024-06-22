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
  FrSlider,
  FrCarousel,
  FrCarouselItem
} from '@/components'

const val = ref(0)

const format = val => val / 10
</script>

<template>
  <div class="container">
    <FrSlider
      v-model="val"
      :min="-1000"
      :max="2220"
      style="width: 400px;"
      :format-value-fn="format"
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
