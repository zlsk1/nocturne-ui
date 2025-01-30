<template>
  <n-button @click="NNotification.success('this is a notify')">
    Use Notification
  </n-button>
</template>

<script lang="ts" setup>
import { NNotification } from 'nocturne-ui'
</script>
