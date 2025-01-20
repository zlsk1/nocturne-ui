<template>
  <div class="page-container">
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="main">
        <div>
          <h1 class="title">
            <span>NocturneUI</span>
          </h1>
          <h3 class="sub-title">一个由 TypeScirpt 编写的 vue3 组件库</h3>
        </div>
        <n-button
          round
          type="primary"
          @click="router.go('zh-CN/guide/nocturne-ui.html')"
          >快速开始</n-button
        >
        <n-button round @click="router.go('zh-CN/components/button.html')"
          >浏览组件</n-button
        >
        <div class="color-picker">
          <span class="mr-4">应用主题色</span
          ><n-color-picker
            v-model="themeColor"
            showText
            :predefine="['#0080ff', '#9eff64']"
          ></n-color-picker>
        </div>
      </div>
    </div>
    <div class="snow">
      <div
        v-for="item in 32"
        :key="item"
        class="dot"
        :style="{
          transform: 'translate(var(--translateX), -10px) scale(var(--scale))',
          opacity: filterminnum(() => (Math.random() * 10) / 10, 0.3),
          animationDuration: filterminnum(() => getRandomNumber(20), 12) + 's',
          animationDelay: -filterminnum(() => getRandomNumber(10), 1) + 's'
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

const themeColor = ref('#0080ff')

const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max)
}

const filterminnum = (get: () => number, min: number) => {
  let val = get()

  if (val < min) {
    val = filterminnum(get, min)
  }

  return val
}

onMounted(() => {
  document.querySelectorAll('.dot').forEach((item) => {
    const translateX = getRandomNumber(100)
    const translateY = getRandomNumber(100)
    const translate60 = translateX - filterminnum(() => getRandomNumber(10), 4)
    const translateX100 =
      translateX + filterminnum(() => getRandomNumber(10), 4)
    ;(item as HTMLElement).style.setProperty('--translateX', translateX + 'vw')
    ;(item as HTMLElement).style.setProperty('--translateY', translateY + 'vh')
    ;(item as HTMLElement).style.setProperty(
      '--translateX-60',
      translate60 + 'vw'
    )
    ;(item as HTMLElement).style.setProperty(
      '--translateX-100',
      translateX100 + 'vw'
    )
    ;(item as HTMLElement).style.setProperty(
      '--scale',
      String(filterminnum(() => Math.random(), 0.4))
    )
  })
})
</script>

<style lang="scss" scoped>
html:not(.dark) {
  .page-container {
    color: #333;
  }
}
.page-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  @mixin bg {
    background: linear-gradient(236deg, rgba(49, 55, 53, 0) 0%, #33373f 100%);
  }
  @include bg;
  .nav {
    @include bg;
  }
  .main {
    margin: auto;
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
  h1,
  h3 {
    margin: 0px;
  }

  .snow {
    position: absolute;
    inset: 0;
    filter: drop-shadow(0 0 10px #fff);
    overflow: hidden;
    .dot {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--n-text-color-regular);
      animation: falling linear infinite;

      @keyframes falling {
        60% {
          transform: translate(var(--translateX-60), 60vh) scale(var(--scale));
        }
        100% {
          transform: translate(var(--translateX-100), 100vh) scale(var(--scale));
        }
      }
    }
  }
}
</style>
