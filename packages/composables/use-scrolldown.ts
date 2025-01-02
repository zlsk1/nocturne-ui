import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import type { Ref } from 'vue'

export const useScrollDown = (
  target: Ref<HTMLElement>,
  mode: 'vertical' | 'horizontal' = 'vertical'
) => {
  let container: HTMLElement | null
  const rect = ref<number>(0)
  const state = reactive({
    isDown: false,
    isUp: false
  })

  watch(
    () => target.value?.getBoundingClientRect(),
    ({ width, height }) => {
      rect.value = mode === 'vertical' ? height : width
    }
  )

  const onScroll = (e: Event) => {
    const elTarget = e.target as HTMLElement
    const scrollDistance =
      mode === 'vertical' ? elTarget.scrollTop : elTarget.scrollLeft
    const containerRect =
      mode === 'vertical'
        ? container?.getBoundingClientRect().height!
        : container?.getBoundingClientRect().width!

    if (scrollDistance >= rect.value - containerRect) {
      state.isDown = true
    } else {
      state.isDown = false
    }

    if (scrollDistance >= 0) {
      state.isUp = false
    } else {
      state.isUp = true
    }
  }

  const handleScroll = useThrottleFn(onScroll, 10)

  onMounted(() => {
    container = target.value.parentElement
    container?.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => window.removeEventListener('scroll', handleScroll))

  return {
    state
  }
}
