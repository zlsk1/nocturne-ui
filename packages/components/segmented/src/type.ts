import { definePropType, isNumber, isString } from '@/utils'
import { componentSizes } from '@/constants'
import segmented from './segmented'
import type { Component, ExtractPropTypes } from 'vue'
import type { ComponentSize } from '@/constants'

export type SegmentedOption = {
  value: string | number
  label?: string
  disabled?: boolean
  icon?: Component
}

export const segmentedProps = {
  modelValue: {
    type: definePropType<string | number>([String, Number])
  },
  options: {
    type: definePropType<SegmentedOption[]>(Array)
  },
  size: {
    type: definePropType<ComponentSize>(String),
    values: componentSizes
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  id: {
    type: String
  },
  /**
   * @description a11y
   */
  ariaLabel: {
    type: String,
    default: 'segmented'
  },
  vertical: {
    type: Boolean,
    default: false
  }
} as const

export const segmentedEmits = {
  'update:modelValue': (value: string | number) =>
    isString(value) || isNumber(value),
  change: (value: string | number) => isString(value) || isNumber(value)
}

export type SegmentedProps = ExtractPropTypes<typeof segmentedProps>
export type SegmentedEmits = typeof segmentedEmits
export type SegmentedInstance = InstanceType<typeof segmented>
