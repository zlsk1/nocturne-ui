import type { InjectionKey, Ref } from 'vue'
import type { ConfigProviderProps } from './props'

export const CONFIGPROVIDER_INJECT_KEY: InjectionKey<
  Ref<Partial<ConfigProviderProps>>
> = Symbol('config-provider')
