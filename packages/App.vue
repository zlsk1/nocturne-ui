<script setup>
import { ref } from 'vue'
const radio = ref(3)

const change = e => {
  console.log(e)
}
</script>

<template>
  <div class="container">
    <div>
      <fr-radio-group
        v-model="radio"
        size="large"
        @change="change"
      >
        <fr-radio
          :label="3"
        >
          333
        </fr-radio>
        <fr-radio
          :value="6"
        >
          666
        </fr-radio>
        <fr-radio
          :value="9"
        >
          999
        </fr-radio>
      </fr-radio-group>
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
