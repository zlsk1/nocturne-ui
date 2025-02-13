import { definePropType, iconPropType } from '@/utils'
import statistic from './statistic.vue'
import type { ExtractPropTypes, StyleValue } from 'vue'
import type { Dayjs } from 'dayjs'

export const statisticProps = {
  value: {
    type: definePropType<number | Dayjs>([Number, Object]),
    default: 0
  },
  title: String,
  suffixIcon: iconPropType,
  prefixIcon: iconPropType,
  precision: {
    type: Number,
    default: 0
  },
  valueStyle: {
    type: definePropType<StyleValue>([String, Object, Array])
  },
  formatter:
    definePropType<(value: number | Dayjs) => number | Dayjs>(Function),
  /**
   * @description 千分位分隔符
   */
  groupSeparator: {
    type: String,
    default: ','
  }
} as const

export type StatisticProps = ExtractPropTypes<typeof statisticProps>
export type StatisticInstance = InstanceType<typeof statistic>
