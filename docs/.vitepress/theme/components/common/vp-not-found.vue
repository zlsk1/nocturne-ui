<template>
  <div class="not-found-container">
    <div>
      <p>404</p>
      <n-button type="primary" plain @click="goBack">返回上一页面</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const goBack = () => {
  if (window.history) {
    history.go(-1)
  }
}
</script>

<style lang="scss" scoped>
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 55px);

  > div {
    text-align: center;

    > p {
      margin-bottom: 10px;
    }
  }
}
</style>
