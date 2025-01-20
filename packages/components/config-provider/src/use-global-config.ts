import { computed, getCurrentInstance, inject, provide, unref } from 'vue'
import {
  COMPONENT_SIZE_INJECTION_KEY,
  NAMESPACE_INJECTION_KEY,
  ZINDEX_INJECTION_KEY
} from '@/composables'
import { ConfigProviderProps } from '../src/props'
import { CONFIGPROVIDER_INJECT_KEY } from '../src/constants'

import type { App, MaybeRef } from 'vue'

export const useGlobalConfig = () => {
  const config = getCurrentInstance()
    ? inject(CONFIGPROVIDER_INJECT_KEY, null)
    : null

  return config
}

export const provideGlobalConfig = (
  config: MaybeRef<Partial<ConfigProviderProps>>,
  app?: App
) => {
  const _provide = app?.provide ?? (getCurrentInstance() ? provide : undefined)
  if (!_provide) return

  const oldConfig = getCurrentInstance() ? useGlobalConfig() : null

  const newConfig = computed(() => {
    const props = unref(config)

    if (!oldConfig) return props
    return Object.assign(oldConfig, props)
  })

  _provide(CONFIGPROVIDER_INJECT_KEY, newConfig)

  _provide(
    NAMESPACE_INJECTION_KEY,
    computed(() => newConfig.value.namespace)
  )
  _provide(
    ZINDEX_INJECTION_KEY,
    computed(() => newConfig.value.zIndex)
  )
  _provide(
    COMPONENT_SIZE_INJECTION_KEY,
    computed(() => newConfig.value.componentSize)
  )

  return newConfig
}
