<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="container">
    <fr-statistic
      :value="54188"
      suffix-icon="user"
    >
      statistic
      <fr-icon icon="upload"></fr-icon>
    </fr-statistic>
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
