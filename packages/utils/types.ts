export const isUndefined = (val: any): val is undefined => val === undefined
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export const isNumber = (val: any): val is number => typeof val === 'number'
export const isFunction = (val: any): val is Function => typeof val === 'function'
export const isString = (val: any): val is string => typeof val === 'string'
export const isNil = (val: any): val is undefined | null => val == null
export const isArray = (val: any): val is [] => Array.isArray(val)
export const isEqual = (val: any, other: any): boolean => Object.is(val, other)
export const isObject = (val: any): val is Record<any, any> => val instanceof Object && !Array.isArray(val)
export const isClient = (): boolean => typeof (window) !== 'undefined'

export const isElement = (e: any): e is Element => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}

export const isPropAbsent = (prop: any): prop is null | undefined => {
  return isNil(prop)
}
