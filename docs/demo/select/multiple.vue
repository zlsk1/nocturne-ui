<template>
  <div>
    <n-select v-model="val" style="max-width: 240px" multiple>
      <n-option
        v-for="item in 4"
        :key="item"
        :value="item"
        :label="`Option${item}`"
      />
    </n-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref([1, 3])
</script>
