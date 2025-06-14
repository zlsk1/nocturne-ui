<template>
  <n-space size="large" class="mb-4">
    <n-badge value="10" type="primary">
      <RiGithubFill />
    </n-badge>
    <n-badge value="10" type="success">
      <RiGithubFill />
    </n-badge>
    <n-badge value="10" type="warning">
      <RiGithubFill />
    </n-badge>
    <n-badge value="10" type="info">
      <RiGithubFill />
    </n-badge>
    <n-badge value="10" type="danger">
      <RiGithubFill />
    </n-badge>
  </n-space>
  <n-badge value="10" type="danger" dot>
    <RiGithubFill />
  </n-badge>
</template>

<script lang="ts" setup>
import { RiGithubFill } from '@remixicon/vue'
</script>
