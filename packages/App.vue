<script setup>
import { ref } from 'vue'

const value = ref('hello')
const number = ref(1)
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
        type="text"
        maxlength="100"
        show-limit
        size="large"
        placeholder="please input"
      >
      </fr-input>
      <fr-input-number
        v-model="number"
        :max="10"
        :min="1"
        :step="3"
      ></fr-input-number>
      <fr-input
        v-model="value"
        style="width: 240px"
        type="password"
        size="large"
        placeholder="please input"
        show-password
        prefix-icon="edit"
      >
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
