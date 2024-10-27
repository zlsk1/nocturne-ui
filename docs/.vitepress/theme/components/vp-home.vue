<template>
  <div class="page-container">
    <div class="main">
      <div>
        <h1 class="title">
          <span>NocturneUI</span>
        </h1>
        <h3 class="sub-title">
          一个由typescirpt编写的vue3组件库
        </h3>
      </div>
      <n-button round type="primary" @click="router.go('zh-CN/guide/install.html')">快速开始</n-button>
      <n-button round @click="router.go('zh-CN/components/button.html')">浏览组件</n-button>
      <div class="color-picker">
        应用主题色<n-color-picker v-model="themeColor" showText :predefine="['#409eff', '#9eff64']"></n-color-picker>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

const themeColor = ref('#409eff')
</script>

<style lang="scss" scoped>
html:not(.dark) {
  .page-container {
    color: #000;
  }
}
.page-container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .main {
    text-align: center;
    z-index: 2;
    .title {
      font-size: 42px;
    }
    .sub-title {
      padding: 10px 0 20px 0;
      font-size: 22px;
    }
    .color-picker {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px 0;
    }
  }
  h1, h3 {
    margin: 0px;
  }
  .bg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    background-image: linear-gradient(-45deg, #a947e1 50%, #3375b9 50%);
    filter: blur(100px);
    transform: translate(-50%, -50%);
    z-index: 1;
  }
}
</style>