import { InjectionKey } from 'vue'
import type { FloatButtonGroupProps } from './props'

export type FloatButtonGroupContext = {
  shape: FloatButtonGroupProps['shape']
}

export const FloatButtonGroupContextKey: InjectionKey<FloatButtonGroupContext> =
  Symbol('FloatButtonGroup')
