import { get, set } from 'lodash'

export const getProp = (
  target: Record<string, any>,
  key: string,
  defaultValue?: any
) => {
  return {
    get value() {
      return get(target, key, defaultValue)
    },
    set value(val: any) {
      set(target, key, val)
    }
  }
}
