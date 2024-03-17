<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="container">
    <fr-tooltip
      content="there is the fr-tooltip"
      placement="bottom-end"
    >
      <fr-button type="primary" plain>
        show tooltip
      </fr-button>
    </fr-tooltip>
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
