import { tryOnScopeDispose } from '@vueuse/core'

export function useTimeout() {
  let timeout: number

  const cancelTimeout = () => window.clearTimeout(timeout)

  const registerTimeout = (fn: (...args: any[]) => any, delay: number) => {
    cancelTimeout()
    timeout = window.setTimeout(fn, delay)
  }

  // in component, equal onUnmounted(() => cancelTimeout())
  tryOnScopeDispose(() => cancelTimeout())

  return {
    registerTimeout,
    cancelTimeout
  }
}
