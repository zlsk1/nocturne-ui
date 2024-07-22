<template>
  <div @click.stop="switchTheme">
    <ClientOnly>
      <n-switch :before-change="beforeChange" v-model="darkMode">
        <template #active-action-icon>
          <Moon class="dark-icon" size="18"></Moon>
        </template>
        <template #inactive-action-icon>
          <Sun size="18"></Sun>
        </template>
      </n-switch>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { isDark, toggleDark } from '../../composables'
import {
  RiMoonFill as Moon,
  RiSunFill as Sun,
} from '@remixicon/vue';

const darkMode = ref(isDark.value)

watch(
  () => darkMode.value,
  () => {
    toggleDark()
  }
)
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

<style lang="scss" scoped>
:deep(.n-switch) {
  --n-switch-on-color: #333;
}
:deep(.n-switch__wrap) {
  .n-switch__action {
    .dark-icon {
      color: #ccc;
      border-radius: 50%;
      background-color: var(--n-switch-on-color);
      flex-shrink: 0;
    }
  }
}
</style>