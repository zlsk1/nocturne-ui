import { tryOnScopeDispose } from '@vueuse/core'

export function useTimeout () {
  let timeoutHandle

  const registerTimeout = (fn, delay) => {
    cancelTimeout()
    timeoutHandle = window.setTimeout(fn, delay)
  }
  const cancelTimeout = () => window.clearTimeout(timeoutHandle)

  tryOnScopeDispose(() => cancelTimeout())

  return {
    registerTimeout,
    cancelTimeout
  }
}
