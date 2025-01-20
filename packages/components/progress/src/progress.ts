import { definePropType } from '@/utils'
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
  /**
   * @description whether to loop animation
   */
  loop: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'line',
    values: ['line', 'circle']
  },
  color: {
    type: String,
    default: '#0080ff'
  },
  height: {
    type: Number,
    default: 10
  },
  /**
   * @description circle progress radius
   */
  radius: {
    type: Number,
    default: 40
  },
  strokeWidth: {
    type: Number,
    default: 6
  },
  text: {
    type: Boolean,
    default: false
  },
  strokeLineCap: {
    type: definePropType<'butt' | 'round' | 'square'>(String),
    default: 'round'
  }
} as const

export type ProgressProps = ExtractPropTypes<typeof progressProps>
export type ProgressInstance = InstanceType<typeof progress>
