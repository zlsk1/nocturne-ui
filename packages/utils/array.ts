import { isArray, isNil } from '.'
import type { Arrayable } from '.'

export const ensureArray = <T>(value: Arrayable<T>) => {
  if (isNil(value)) return []
  return isArray(value) ? value : [value]
}
