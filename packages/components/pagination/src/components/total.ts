import type { ExtractPropTypes } from 'vue'

export const totalProps = {
  total: Number
} as const

export type TotalProps = ExtractPropTypes<typeof totalProps>
