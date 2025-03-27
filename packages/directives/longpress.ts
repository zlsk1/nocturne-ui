import { isFunction } from '@nocturne-ui/utils'
import type { ObjectDirective } from 'vue'

interface LongPressOptions {
  duration?: number
  interval?: number
  handler: (...args: any[]) => unknown
}

const LONGPRESS_DURATION = 700
const LONGPRESS_INTERVAL = 100

export const vLongPress: ObjectDirective<
  HTMLElement,
  LongPressOptions | LongPressOptions['handler']
> = {
  beforeMount(el, binding) {
    let pressTimer: ReturnType<typeof setTimeout> | null = null
    let intervalTimer: ReturnType<typeof setInterval> | null = null

    const { duration = LONGPRESS_DURATION, interval = LONGPRESS_INTERVAL } =
      isFunction(binding.value) ? {} : binding.value

    const handler = isFunction(binding.value)
      ? binding.value
      : binding.value?.handler

    const clearFn = () => {
      if (pressTimer) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
      if (intervalTimer) {
        clearInterval(intervalTimer)
        intervalTimer = null
      }
    }

    const handleStart = () => {
      clearFn()
      handler()

      document.addEventListener('mouseup', () => clearFn(), {
        once: true
      })

      pressTimer = setTimeout(() => {
        intervalTimer = setInterval(() => {
          handler()
        }, interval)
      }, duration)
    }

    el.addEventListener('mousedown', handleStart)
    el.addEventListener('touchstart', handleStart)
  }
}
