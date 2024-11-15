import statistic from './statistic.vue'
import type { ExtractPropTypes, StyleValue } from 'vue'
import type { Dayjs } from 'dayjs'
import { definePropType } from '@/utils'

export const statisticProps = {
  value: {
    type: definePropType<number | Dayjs>([Number, Object]),
    default: 0
  },
  title: String,
  suffixIcon: String,
  prefixIcon: String,
  precision: {
    type: Number,
    default: 0
  },
  valueStyle: {
    type: definePropType<StyleValue>([String, Object, Array])
  },
  formatter: Function
} as const

export type StatisticProps = ExtractPropTypes<typeof statisticProps>
export type StatisticInstance = InstanceType<typeof statistic>
