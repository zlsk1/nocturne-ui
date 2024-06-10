import { isClient } from '@vueuse/core'

export const setTimer = (fn: () => void) => {
  isClient
    ? window.requestAnimationFrame(fn)
    : setTimeout(fn, 16) as unknown as number
}

export const cancelTimer = (handle: number) => {
  isClient
    ? window.cancelAnimationFrame(handle)
    : clearTimeout(handle)
}
