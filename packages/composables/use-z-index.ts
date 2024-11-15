import { computed, getCurrentInstance, inject, ref, unref } from 'vue'

import type { InjectionKey, Ref } from 'vue'

const defaultZIndex = 2000
const zIndex = ref(0)

export const ZINDEX_INJECTION_KEY: InjectionKey<Ref<number | undefined>> =
  Symbol('zIndex')

export const useZIndex = (zIndexOverrides?: Ref<number>) => {
  const injection =
    zIndexOverrides || getCurrentInstance()
      ? inject(ZINDEX_INJECTION_KEY, undefined)
      : undefined

  const initialZIndex = computed(() => unref(injection) || defaultZIndex)
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value)

  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  }
}
