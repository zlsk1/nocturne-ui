<script setup>
import FrMessage from '@/components/message/src/method.js'
import FrButton from '@/components/button/src/button.vue'

const click = () => {
  FrMessage({
    message: 'hello',
    showClose: true,
    type: 'warning'
  })
}
</script>

<template>
  <div class="container">
    <fr-button type="primary" @click="click">
      Show Message
    </fr-button>
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
