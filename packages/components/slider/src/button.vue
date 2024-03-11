<script setup>
const handleMouseDown = e => {
  console.log(e.clientX)
}

</script>

<template>
  <div class="fr-slider__button" @mousedown="handleMouseDown"></div>
</template>

<style>
@import '@/theme-chalk/slider.scss';
</style>
