import { get, set } from 'lodash'
import type { Arrayable } from './typescript'

export const getProp = <T = any>(
  target: Record<string, any>,
  key: Arrayable<string>,
  defaultValue?: any
): { value: T } => {
  return {
    get value() {
      return get(target, key, defaultValue)
    },
    set value(val: any) {
      set(target, key, val)
    }
  }
}
