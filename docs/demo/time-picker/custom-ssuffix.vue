<template>
  <div style="max-width: 240px">
    <n-time-picker v-model="val" :suffix-icon="RiUserSmileFill" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { dayjs } from 'nocturne-ui'
import { RiUserSmileFill } from '@remixicon/vue'

const val = ref(dayjs())
</script>
