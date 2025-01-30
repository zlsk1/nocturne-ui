<template>
  <div class="demo-progress">
    <n-progress :percentage="20" />
    <n-progress :percentage="20" color="#60ca2b" />
    <n-progress :percentage="20" color="#ff8a0d" />
    <n-progress :percentage="20" color="#838383" />
    <n-progress :percentage="20" color="#f46262" />
  </div>
</template>

<style lang="scss" scoped>
.demo-progress {
  max-width: 600px;
  > div {
    &:not(:last-child) {
      margin-bottom: 2em;
    }
  }
}
</style>
