<script setup>
import { ref } from 'vue'

const value = ref('hello')
</script>

<template>
  <div class="container">
    <div>
      <fr-button
        type="warning"
        plain
      >
        warning
        <fr-icon icon="loading" class="fr-icon--left"></fr-icon>
      </fr-button>
      <fr-input
        v-model="value"
        style="width: 240px"
        type="password"
        show-password
        clearable
        maxlength="100"
        show-limit
        placeholder="please input"
        suffix-icon="upload"
      >
        <template #prefix>
          <fr-icon icon="share"></fr-icon>
        </template>
      </fr-input>
    </div>
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
