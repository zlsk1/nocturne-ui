export * from './dom'
export * from './props'
export * from './types'
export * from './install'
export * from './icon'
export * from './typescript'
export * from './raf'
export * from './object'
export * from './vnode'
export * from './easings'
export * from './scroll'
export * from './console'
export * from './array'
export * from './dynamic-css'

const hasOwnProperty = Object.prototype.hasOwnProperty

export const hasOwn = (
  o: object,
  key: string | symbol
): key is keyof typeof o => hasOwnProperty.call(o, key)

export const NOOP = () => {}
