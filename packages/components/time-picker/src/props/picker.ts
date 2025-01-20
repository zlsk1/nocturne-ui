import {
  RiCloseCircleLine as CloseCircle,
  RiTimeFill as Time
} from '@remixicon/vue'
import { isObject } from 'lodash'
import {
  definePropType,
  iconPropType,
  isBoolean,
  isNumber,
  isString
} from '@/utils'
import Picker from '../picker.vue'

import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'
import type { ComponentSize } from '@/constants'
import type {
  GetDisabledHour,
  GetDisabledMinute,
  GetDisabledSecond
} from '../type'
import type {
  PopperContentProps,
  PopperCoreConfigProps
} from '@/components/popper'

export const pickerPropsBase = {
  /**
   * @description format displayed value
   */
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  defaultValue: {
    type: Date
  }
} as const

export const pickerProps = {
  modelValue: {
    type: definePropType<number | string | Dayjs | Date>([
      Number,
      String,
      Date,
      Object
    ]),
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择时间'
  },
  tabindex: {
    type: definePropType<string | number>([String, Number])
  },
  id: {
    type: String
  },
  name: String,
  readonly: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: iconPropType,
    default: Time
  },
  clearIcon: {
    type: iconPropType,
    default: CloseCircle
  },
  disabled: {
    type: Boolean,
    default: false
  },
  popperClass: {
    type: definePropType<PopperContentProps['popperClass']>([
      String,
      Array,
      Object
    ])
  },
  transition: {
    type: String,
    default: 'n-zoom-in-top'
  },
  size: {
    type: definePropType<ComponentSize>(String),
    default: ''
  },
  hourStep: {
    type: Number,
    default: 1
  },
  minuteStep: {
    type: Number,
    default: 1
  },
  secondStep: {
    type: Number,
    default: 1
  },
  disabledHours: {
    type: definePropType<GetDisabledHour>(Function)
  },
  disabledMinutes: {
    type: definePropType<GetDisabledMinute>(Function)
  },
  disabledSeconds: {
    type: definePropType<GetDisabledSecond>(Function)
  },
  /**
   * @description format modelValue
   */
  valueFormat: String,
  popperOptions: {
    type: definePropType<PopperCoreConfigProps['popperOptions']>(Object),
    default: () => {
      return {}
    }
  },
  ...pickerPropsBase
} as const

export const pickerEmit = {
  'update:modelValue': (val: PickerProps['modelValue']) =>
    isString(val) || isNumber(val) || isObject(val),
  change: (val: PickerProps['modelValue']) =>
    isString(val) || isNumber(val) || isObject(val),
  'visible-change': (visible: boolean) => isBoolean(visible)
}

export type PickerProps = ExtractPropTypes<typeof pickerProps>
export type PickerEmit = typeof pickerEmit
export type PickerInstance = InstanceType<typeof Picker>
