<template>
  <div class="badges">
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
  </div>
  <n-badge value="10" type="danger" dot>
    <RiGithubFill />
  </n-badge>
</template>

<script lang="ts" setup>
import { RiGithubFill } from '@remixicon/vue'
</script>

<style lang="scss">
.badges {
  margin-bottom: 1em;
  > div {
    margin-right: 2em;
  }

  svg {
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      color: #0080ff;
    }
  }
}
</style>
