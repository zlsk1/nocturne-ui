import { definePropType, isNumber } from '@/utils'
import Countdown from './countdown.vue'
import type { ExtractPropTypes, StyleValue } from 'vue'
import type { Dayjs } from 'dayjs'

export const countdownProps = {
  value: {
    type: definePropType<number | Dayjs>([Number, Object]),
    default: 0
  },
  title: String,
  suffixIcon: String,
  prefixIcon: String,
  valueStyle: {
    type: definePropType<StyleValue>([String, Object, Array])
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
} as const

export const countdownEmits = {
  finish: () => true,
  change: (value: number) => isNumber(value)
}

export type CountdownProps = ExtractPropTypes<typeof countdownProps>
export type CountdownEmits = typeof countdownEmits
export type CountdownInstance = InstanceType<typeof Countdown>
