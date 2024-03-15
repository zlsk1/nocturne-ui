<script setup>
import { ref } from 'vue'

const img = ref('https://empty')

const onError = () => {
  img.value = 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
}
</script>

<template>
  <div class="container">
    <FrAvatar
      :size="100"
      shape="square"
      :src="img"
      fit="scale-down"
      @error="onError"
    ></FrAvatar>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
}
</style>
