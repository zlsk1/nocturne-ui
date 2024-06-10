import { isNumber } from '@/utils'

export const pagerProps = {
  maxPages: {
    type: Number,
    default: 7
  }
}

export const pagerEmits = {
  changePage: (val: number) => isNumber(val)
}
