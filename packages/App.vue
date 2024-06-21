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

const val = ref(20)

const list = ['#e8e8e8', '#000', '#409eff', '#666', '#ccc']
</script>

<template>
  <div class="container">
    <FrCarousel
      style="width: 800px"
      height="200"
      indicator-shape="round"
      hide-indicator
      @change="(val) => console.log(val)"
    >
      <template #prev>
        <FrButton type="warning">
          previous slide
        </FrButton>
      </template>
      <template #next>
        <FrButton type="primary">
          previous next
        </FrButton>
      </template>
      <FrCarouselItem v-for="(item, index) in list" :key="index">
        <div :style="{width: '800px', height: '200px', backgroundColor: item}">
          {{ index }}
        </div>
      </FrCarouselItem>
    </FrCarousel>
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
