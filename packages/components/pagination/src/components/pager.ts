import type { ExtractPropTypes } from 'vue'
import { isNumber } from '@/utils'

export const pagerProps = {
  maxPages: {
    type: Number,
    default: 7
  }
} as const

export const pagerEmits = {
  changePage: (val: number) => isNumber(val)
}

export type PagerEmits = typeof pagerEmits
export type PagerProps = ExtractPropTypes<typeof pagerProps>
