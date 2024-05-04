<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="container">
    <FrProgress :percentage="50">
      <div style="display: flex;align-items: center;">
        50%
        <FrIcon icon="warning" style="color:#e6a23c"></FrIcon>
      </div>
    </FrProgress>
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
