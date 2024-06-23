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

const bg = ['	https://cdn.pixabay.com/photo/2023/02/01/21/40/pink-7761356_640.png', 'https://cdn.pixabay.com/photo/2023/08/22/16/02/chrysanthemum-8206709_640.jpg', '	https://cdn.pixabay.com/photo/2024/02/06/03/09/envelope-8555766_640.jpg']
</script>

<template>
  <div class="container" style="width: 600px;">
    <FrCarousel :height="300" indicator-shape="round">
      <FrCarouselItem
        v-for="item in bg"
        :key="item"
      >
        <img
          :src="item"
          style="width: 100%; height: 300px;"
        >
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
