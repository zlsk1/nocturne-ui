<template>
  <n-button @click="NMessage.success('this is a message')">success</n-button>
  <n-button @click="NMessage.info('this is a message')">info</n-button>
  <n-button @click="NMessage.warning('this is a message')">warning</n-button>
  <n-button @click="NMessage.error('this is a message')">error</n-button>
</template>

<script lang="ts" setup>
import { NMessage } from 'nocturne-ui'
</script>
