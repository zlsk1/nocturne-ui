<script setup>
import SliderButton from './button.vue'

defineOptions({
  name: 'FrSlider'
})
</script>

<template>
  <div
    :class="[
      'fr-slider'
    ]"
  >
    <div
      :class="[
        'fr-slider__track'
      ]"
    >
      <div
        :class="[
          'fr-slider__bar'
        ]"
      ></div>
      <SliderButton></SliderButton>
    </div>
  </div>
</template>

<style>
@import '@/theme-chalk/slider.scss';
</style>
