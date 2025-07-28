import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  watchEffect
} from 'vue'
import { isFunction } from '@nocturne-ui/utils'
import type { ComputedRef, Ref } from 'vue'
import type { NTourStepProps } from './props'

export interface Gap {
  offset?: number
  radius?: number
}

export interface PosInfo {
  left: number
  top: number
  height: number
  width: number
  radius: number
}

function isInViewPort(element: HTMLElement) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  const { top, right, bottom, left } = element.getBoundingClientRect()

  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight
}

export default function useTarget(
  target: Ref<NTourStepProps['target']>,
  open: Ref<boolean>,
  gap?: Ref<Gap>,
  scrollIntoViewOptions?: Ref<boolean | ScrollIntoViewOptions>
): [Ref<PosInfo>, Ref<HTMLElement>] {
  // We trade `undefined` as not get target by function yet.
  // `null` as empty target.
  const targetElement = ref<HTMLElement | null>(null)

  const posInfo = ref<PosInfo | null>(null)

  const mergedPosInfo = computed(() => {
    if (!posInfo.value) {
      return posInfo.value
    }

    const gapOffset = gap?.value?.offset || 6
    const gapRadius = gap?.value?.radius || 2

    return {
      left: posInfo.value.left - gapOffset,
      top: posInfo.value.top - gapOffset,
      width: posInfo.value.width + gapOffset * 2,
      height: posInfo.value.height + gapOffset * 2,
      radius: gapRadius
    }
  })

  const updatePos = () => {
    if (!open.value) {
      posInfo.value = null
      return
    }
    if (targetElement.value) {
      // Exist target element. We should scroll and get target position
      if (
        !isInViewPort(targetElement.value) &&
        open.value &&
        scrollIntoViewOptions
      ) {
        targetElement.value.scrollIntoView(scrollIntoViewOptions.value)
      }

      const { left, top, width, height } =
        targetElement.value.getBoundingClientRect()
      const nextPosInfo: PosInfo = { left, top, width, height, radius: 0 }
      if (JSON.stringify(posInfo.value) !== JSON.stringify(nextPosInfo)) {
        posInfo.value = nextPosInfo
      }
    } else {
      // Not exist target which means we just show in center
      posInfo.value = null
    }
  }

  watchEffect(
    () => {
      const nextElement = isFunction(target.value)
        ? (target.value as any)()
        : target.value

      targetElement.value = nextElement || null
    },
    { flush: 'post' }
  )

  onMounted(() => {
    watch(
      [open, targetElement],
      () => {
        updatePos()
      },
      { flush: 'post', immediate: true }
    )
    window.addEventListener('resize', updatePos)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updatePos)
  })

  return [
    mergedPosInfo as ComputedRef<PosInfo>,
    targetElement as Ref<HTMLElement>
  ]
}
