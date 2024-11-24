import { computed, getCurrentInstance, inject, unref } from 'vue'
import { useGetOverRidesNamesapce } from './use-namespace'
import type { ComputedRef, InjectionKey, MaybeRef } from 'vue'
import { isClient } from '@/utils'

export type idInjectionContext = {
  prefix: number
  suffix: number
}

export const ID_INJECTION_KEY: InjectionKey<idInjectionContext> = Symbol('id')

const initialId = {
  prefix: Math.floor(Math.random() * 10000),
  suffix: 0
}

export const useId = (overrides?: MaybeRef<string>): ComputedRef<string> => {
  const injection =
    unref(overrides) || getCurrentInstance()
      ? inject(ID_INJECTION_KEY, initialId)
      : initialId

  if (!isClient && injection === initialId) {
    console.warn(
      `ID_INJECTION_KEY, if you are in SSR enviroment, make sure to provide a id provider by: 
        app.provide(ID_INJECTION_KEY, {
          prefix: number
          suffix: number
        })
      `
    )
  }
  const namespace = useGetOverRidesNamesapce()

  const id = computed(() => {
    return `${namespace.value}-id--${injection.prefix}--${injection.suffix++}`
  })

  return id
}
