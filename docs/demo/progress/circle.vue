<template>
  <div class="demo-progress">
    <n-progress :percentage="20" type="circle" />
    <n-progress :percentage="20" color="#60ca2b" type="circle" />
    <n-progress :percentage="20" color="#ff8a0d" type="circle" />
    <n-progress :percentage="20" color="#838383" type="circle" />
    <n-progress :percentage="20" color="#f46262" type="circle" />
  </div>
</template>

<style lang="scss" scoped>
.demo-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  > div {
    padding: 0 2em;
  }
}
</style>
