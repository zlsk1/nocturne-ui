import {
  Arrayable,
  ensureArray,
  isString,
  isUndefined
} from '@nocturne-ui/utils'

export function getPathValue<T = any>(
  record?: Record<string, any>,
  path?: Arrayable<string>
): T | null {
  if (!record) return null
  if (!path) {
    return record as unknown as T
  }

  const pathList = ensureArray(path)

  let current = record

  for (const prop of pathList) {
    if (!current) {
      return null
    }

    current = current[prop]
  }

  return current as T
}

export const pxToNumber = (value?: string | number) => {
  if (isUndefined(value)) return 0
  return isString(value) ? Number(value.replace('px', '')) : value
}
