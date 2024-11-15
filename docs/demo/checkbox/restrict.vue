<template>
  <div>
    <n-checkbox-group v-model="checkedCountries" :max="3" :min="1">
      <n-checkbox
        v-for="name in countries"
        :key="name"
        :value="name"
        :label="name"
      />
    </n-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const countries = ['China', 'Germany', 'Russia', 'America']
const checkedCountries = ref(['China'])
</script>
