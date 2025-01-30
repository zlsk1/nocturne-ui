<template>
  <n-carousel :autoplay="false">
    <n-carousel-item v-for="item in 4" :key="item">
      <div class="item--inner">
        {{ item }}
      </div>
    </n-carousel-item>
  </n-carousel>
</template>

<style>
.item--inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--n-fill-color-darker);
  color: var(--n-text-color-primary);
}
</style>
