import { onUnmounted } from 'vue'

export function useTimeout() {
  let timeout: number

  const cancelTimeout = () => window.clearTimeout(timeout)

  const registerTimeout = (fn: (...args: any[]) => any, delay: number) => {
    cancelTimeout()
    timeout = window.setTimeout(fn, delay)
  }

  onUnmounted(() => cancelTimeout())

  return {
    registerTimeout,
    cancelTimeout
  }
}
