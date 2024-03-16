<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const value = ref(Date.now() + 1000 * 3600 * 7)
const value2 = ref(dayjs().add(1, 'month').startOf('month'))
</script>

<template>
  <div class="container">
    <fr-countdown :value="value2" format="DD [days] HH:mm:ss">
      countdown
      <fr-icon icon="info"></fr-icon>
    </fr-countdown>
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
