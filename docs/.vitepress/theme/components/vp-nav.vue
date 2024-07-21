<template>
  <div class="nav-container">
    <div class="nav-wrapper">
      <a href="">Nocturne-ui</a>
      <div class="content">
        <nav class="nav-link">
          <a v-for="(item, index) in theme.nav" :key="item.text" :href="item.link" :class="{ 'actived': actived(theme.nav[index].link) }">{{ item.text }}</a>
        </nav>
        <div @click.stop="switchTheme">
          <n-switch @change="beforeChange" v-model="darkMode">
            <template #active-action-icon>
              <Moon></Moon>
            </template>
            <template #inactive-action-icon>
              <Sun></Sun>
            </template>
          </n-switch>
        </div>
        <a href="https://github.com/zlsk1/nocturne-ui" class="link-github" title="github" target="_blank">
          <Github></Github>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'
import {
  RiGithubFill as Github,
  RiMoonLine as Moon,
  RiSunLine as Sun,
} from '@remixicon/vue';
import { isDark, toggleDark } from '../composables'

const { theme } = useData()
const route = useRoute()

const darkMode = ref(isDark.value)

watch(
  () => darkMode.value,
  () => {
    toggleDark()
  }
)

const actived = (link: string) => {
  const slpitlink = link.split('/')
  const joinlink = [slpitlink[1], slpitlink[2]].join('/')
  
  return route.path.includes(joinlink)
}

let resolveFn: (value: boolean | PromiseLike<boolean>) => void

const switchTheme = (event: MouseEvent) => {
  const isAppearanceTransition =
    document.startViewTransition &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!isAppearanceTransition || !event) {
    resolveFn(true)
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    resolveFn(true)
    await nextTick()
  })
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      }
    )
  })
}

const beforeChange = (): Promise<boolean> => {
  return new Promise((resolve) => {
    resolveFn = resolve
  })
}
</script>