import { getCurrentInstance, onMounted, ref, shallowRef, watch } from 'vue'
import { useEventListener } from '@vueuse/core'
import type { ShallowRef } from 'vue'
import { isElement, isFunction } from '@/utils'

interface UseFocusControllerOptions {
  afterFocus?: () => void
  beforeBlur?: (event: FocusEvent) => boolean | undefined
  afterBlur?: () => void
}

export function useFocusController<T extends HTMLElement>(
  target: ShallowRef<T | undefined>,
  { afterFocus, beforeBlur, afterBlur }: UseFocusControllerOptions = {}
) {
  const instance = getCurrentInstance()!
  const { emit } = instance
  const wrapperRef = shallowRef<HTMLElement>()
  const isFocused = ref(false)

  const handleFocus = (event: FocusEvent) => {
    if (isFocused.value) return
    isFocused.value = true
    emit('focus', event)
    afterFocus?.()
  }

  const handleBlur = (event: FocusEvent) => {
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false
    if (
      cancelBlur ||
      (event.relatedTarget &&
        wrapperRef.value?.contains(event.relatedTarget as Node))
    )
      return

    isFocused.value = false
    emit('blur', event)
    afterBlur?.()
  }

  const handleClick = () => {
    target.value?.focus()
  }

  watch(wrapperRef, (el) => {
    if (el) {
      el.setAttribute('tabindex', '-1')
    }
  })

  useEventListener(wrapperRef, 'focus', handleFocus, true)
  useEventListener(wrapperRef, 'blur', handleBlur, true)
  useEventListener(wrapperRef, 'click', handleClick, true)

  // only for test
  if (process.env.NODE_ENV === 'test') {
    onMounted(() => {
      const targetEl = isElement(target.value)
        ? target.value
        : document.querySelector('input,textarea')

      if (targetEl) {
        useEventListener(targetEl, 'focus', handleFocus, true)
        useEventListener(targetEl, 'blur', handleBlur, true)
      }
    })
  }

  return {
    wrapperRef,
    isFocused,
    handleFocus,
    handleBlur
  }
}
