import { isNumber } from '@/utils'
import type { ExtractPropTypes } from 'vue'

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
