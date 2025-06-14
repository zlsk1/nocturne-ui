<template>
  <n-space>
    <n-button
      @click="
        NNotification.success({
          content: 'it is a notify',
          placement: 'top-right'
        })
      "
    >
      TopRight
    </n-button>
    <n-button
      @click="
        NNotification.success({
          content: 'it is a notify',
          placement: 'top-left'
        })
      "
    >
      TopLeft
    </n-button>
    <n-button
      @click="
        NNotification.success({
          content: 'it is a notify',
          placement: 'bottom-right'
        })
      "
    >
      BottomRight
    </n-button>
    <n-button
      @click="
        NNotification.success({
          content: 'it is a notify',
          placement: 'bottom-left'
        })
      "
    >
      BottomLeft
    </n-button>
  </n-space>
</template>

<script lang="ts" setup>
import { NNotification } from 'nocturne-ui'
</script>
