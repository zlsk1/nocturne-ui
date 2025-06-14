import type { ExtractPropTypes } from 'vue'

export const totalProps = {
  total: {
    type: Number,
    default: 1000
  }
} as const

export type TotalProps = ExtractPropTypes<typeof totalProps>
