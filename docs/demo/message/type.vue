<template>
  <n-space>
    <n-button @click="NMessage.success('it is a message')">success</n-button>
    <n-button @click="NMessage.info('it is a message')">info</n-button>
    <n-button @click="NMessage.warning('it is a message')">warning</n-button>
    <n-button @click="NMessage.error('it is a message')">error</n-button>
  </n-space>
</template>

<script lang="ts" setup>
import { NMessage } from 'nocturne-ui'
</script>
