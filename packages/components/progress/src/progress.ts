import progress from './progress.vue'
import type { ExtractPropTypes } from 'vue'

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
    type: String,
    default: '#409eff'
  }
} as const

export const progressEmits = {
  destroy: () => true
}

export type ProgressProps = ExtractPropTypes<typeof progressProps>
export type ProgressEmits = typeof progressEmits
export type ProgressInstance = InstanceType<typeof progress>
