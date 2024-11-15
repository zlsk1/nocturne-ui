import { getCurrentInstance, inject, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'

export const defualtComponentsSize = ''

export const COMPONENT_SIZE_INJECTION_KEY: InjectionKey<
  Ref<string | undefined>
> = Symbol('component-size')

export const useComponentSize = (sizeOverrides?: string) => {
  const size =
    sizeOverrides || getCurrentInstance()
      ? inject(COMPONENT_SIZE_INJECTION_KEY, ref(defualtComponentsSize))
      : ref(defualtComponentsSize)

  return size
}
