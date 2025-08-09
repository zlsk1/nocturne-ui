import { definePropType, isNumber, isUndefined } from '@nocturne-ui/utils'
import Rate from './rate.vue'
import type { Component, ExtractPropTypes } from 'vue'

export const rateProps = {
  modelValue: {
    type: Number
  },
  /**
   * @description 自定义字符
   * @default StarFilled
   */
  character: {
    type: definePropType<string | Component>([String, Object])
  },
  readonly: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否允许半选
   */
  allowHalf: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否允许取消选择
   */
  allowClear: {
    type: Boolean,
    default: true
  },
  count: {
    type: Number,
    default: 5
  }
} as const

export const rateEmits = {
  'update:modelValue': (value: number) => isNumber(value),
  change: (value: number) => isNumber(value),
  hoverChange: (value: number | undefined) =>
    isNumber(value) || isUndefined(value),
  keydown: (event: KeyboardEvent) => event instanceof KeyboardEvent
}

export type RateProps = ExtractPropTypes<typeof rateProps>
export type RateEmits = typeof rateEmits
export type RateInstance = InstanceType<typeof Rate>
