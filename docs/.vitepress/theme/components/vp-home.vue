<template>
  <div class="page-container">
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="main">
        <div class="text-center">
          <div>
            <h1 class="title">
              <span>Nocturne UI</span>
            </h1>
            <h3 class="sub-title">一个 Vue3 组件库</h3>
          </div>
          <div>
            <n-button
              round
              type="primary"
              @click="router.go('zh-CN/guide/nocturne-ui.html')"
              >快速开始</n-button
            >
            <n-button round @click="router.go('zh-CN/components/button.html')"
              >浏览组件</n-button
            >
          </div>
        </div>
        <VpFeatures class="mt-18" :features="features" />
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
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
import VpFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'
import type { DefaultTheme } from 'vitepress/theme'

interface Feature {
  icon?: DefaultTheme.FeatureIcon
  title: string
  details: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}

const router = useRouter()

const features: Feature[] = [
  {
    title: 'TypeScript',
    details: '支持TypeScript，提供完善的类型约束',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>language-typescript</title><path fill="#3178c6" d="M3,3H21V21H3V3M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86M13,11.25H8V12.75H9.5V20H11.25V12.75H13V11.25Z" /></svg>'
  },
  {
    title: '自定义主题',
    details: '样式由scss编写而成，更改默认的scss变量即可实现自定义主题',
    icon: '🪄'
  },
  {
    title: '全局配置',
    details: '提供ConfigProvider组件轻松定义全局属性',
    icon: '⚙️'
  },
  {
    title: '暗黑模式',
    details: '内置暗黑模式，可以动态切换',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(173,184,194,1)"><path d="M9.8216 2.23796C9.29417 3.38265 9 4.65697 9 6C9 10.9706 13.0294 15 18 15C19.343 15 20.6174 14.7058 21.762 14.1784C20.7678 18.6537 16.7747 22 12 22C6.47715 22 2 17.5228 2 12C2 7.22532 5.3463 3.23221 9.8216 2.23796ZM18.1642 2.29104L19 2.5V3.5L18.1642 3.70896C17.4476 3.8881 16.8881 4.4476 16.709 5.16417L16.5 6H15.5L15.291 5.16417C15.1119 4.4476 14.5524 3.8881 13.8358 3.70896L13 3.5V2.5L13.8358 2.29104C14.5524 2.1119 15.1119 1.5524 15.291 0.835829L15.5 0H16.5L16.709 0.835829C16.8881 1.5524 17.4476 2.1119 18.1642 2.29104ZM23.1642 7.29104L24 7.5V8.5L23.1642 8.70896C22.4476 8.8881 21.8881 9.4476 21.709 10.1642L21.5 11H20.5L20.291 10.1642C20.1119 9.4476 19.5524 8.8881 18.8358 8.70896L18 8.5V7.5L18.8358 7.29104C19.5524 7.1119 20.1119 6.5524 20.291 5.83583L20.5 5H21.5L21.709 5.83583C21.8881 6.5524 22.4476 7.1119 23.1642 7.29104Z"></path></svg>'
  }
]

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

const renderDot = () => {
  document.querySelectorAll('.dot').forEach((item) => {
    const translateX = getRandomNumber(100)
    const translateY = getRandomNumber(100)
    const translate60 = translateX - filterminnum(() => getRandomNumber(10), 4)
    const translateX100 =
      translateX + filterminnum(() => getRandomNumber(10), 4)
    ;(item as HTMLElement).style.setProperty('--translateX', `${translateX}vw`)
    ;(item as HTMLElement).style.setProperty('--translateY', `${translateY}vh`)
    ;(item as HTMLElement).style.setProperty(
      '--translateX-60',
      `${translate60}vw`
    )
    ;(item as HTMLElement).style.setProperty(
      '--translateX-100',
      `${translateX100}vw`
    )
    ;(item as HTMLElement).style.setProperty(
      '--scale',
      String(filterminnum(() => Math.random(), 0.4))
    )
  })
}

onMounted(() => {
  renderDot()
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
    max-width: 1440px;
    margin: auto;
    z-index: 2;
    .title {
      font-size: 42px;
    }
    .sub-title {
      padding: 10px 0 20px 0;
      font-size: 22px;
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

:deep(.VPFeature) {
  .title {
    margin: 0;
  }
  .details {
    margin-top: 0;
  }
}
</style>
