import type { ExtractPropTypes, PropType } from 'vue'

type Value<T> = T[keyof T]

export const definePropType = <T>(val: any): PropType<T> => val

export type ExtractPropType<T extends object> = Value<
  ExtractPropTypes<{
    key: T
  }>
>
