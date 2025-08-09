import { isObject } from 'lodash'
import {
  definePropType,
  iconPropType,
  isBoolean,
  isString
} from '@nocturne-ui/utils'
import Picker from '../picker.vue'

import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'
import type { ComponentSize } from '@nocturne-ui/constants'
import type {
  GetDisabledHour,
  GetDisabledMinute,
  GetDisabledSecond
} from '../types'
import type { PopperCoreConfigProps } from '@nocturne-ui/components/popper'

export const pickerPropsBase = {
  /**
   * @description format displayed value
   */
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  defaultValue: {
    type: definePropType<Dayjs>([Object])
  }
} as const

export const pickerProps = {
  modelValue: {
    type: definePropType<Dayjs | string>([Object, String])
  },
  placeholder: {
    type: String
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
  /**
   * @default ClockCircleOutlined
   */
  suffixIcon: {
    type: iconPropType
  },
  /**
   * @default CloseCircleFilled
   */
  clearIcon: {
    type: iconPropType
  },
  disabled: {
    type: Boolean,
    default: false
  },
  popperClass: {
    type: String
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
  popperOptions: {
    type: definePropType<PopperCoreConfigProps['popperOptions']>(Object),
    default: () => ({})
  },
  ...pickerPropsBase
} as const

export const pickerEmit = {
  'update:modelValue': (val: Dayjs | string) => isString(val) || isObject(val),
  change: (val: Dayjs | string, timeStr: string) =>
    (isString(val) || isObject(val)) && isString(timeStr),
  'visible-change': (visible: boolean) => isBoolean(visible),
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent
}

export type PickerProps = ExtractPropTypes<typeof pickerProps>
export type PickerEmit = typeof pickerEmit
export type PickerInstance = InstanceType<typeof Picker>
