<template>
  <div class="mb-4">
    <n-badge :max="10" :value="11" :hidden="hidden">
      <RiWechatFill />
    </n-badge>
  </div>
  <n-button type="primary" @click="hidden = !hidden">
    {{ hidden ? 'show badge' : 'hide badge' }}
  </n-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RiWechatFill } from '@remixicon/vue'

const hidden = ref(false)
</script>
