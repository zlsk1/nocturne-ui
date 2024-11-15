import progress from './progress.vue'
import type { ExtractPropTypes } from 'vue'
import { definePropType } from '@/utils'

export const progressProps = {
  percentage: {
    type: Number,
    default: 0,
    required: true
  },
  animation: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'line',
    values: ['line', 'round']
  },
  color: {
    type: definePropType<string>([String]),
    default: '#409eff'
  },
  animationDuration: {
    type: Number,
    default: 1000
  },
  height: {
    type: Number,
    default: 10
  },
  animationFn: {
    type: Function,
    default: undefined
  }
} as const

export type ProgressProps = ExtractPropTypes<typeof progressProps>
export type ProgressInstance = InstanceType<typeof progress>
