<template>
  <n-button @click="onClick"> use message </n-button>
</template>

<script lang="ts" setup>
import { NMessage } from 'nocturne-ui'

const onClick = () => {
  NMessage.success({ message: 'it is a message', grouping: true })
}
</script>
