<template>
  <n-rate v-model="allowHalf" allow-half :character="RiHeartFill" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RiHeartFill } from '@remixicon/vue'

const allowHalf = ref(3)
</script>
