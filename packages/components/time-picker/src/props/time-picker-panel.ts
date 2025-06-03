import { isArray, isObject } from 'lodash'
import { definePropType, isBoolean, isString } from '@nocturne-ui/utils'
import TimePickerPanel from '../time-picker-panel.vue'
import { pickerPropsBase } from './picker'
import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'
import type { TimeUnits } from '../constants'
import type { Disabled, PickerMethods } from '../types'

export const timePickerPanelProps = {
  calculatedValue: {
    type: definePropType<Dayjs>(Object),
    required: true
  },
  userInput: {
    type: definePropType<string | undefined>([String, undefined])
  },
  visible: {
    type: Boolean
  },
  showSecond: {
    type: Boolean,
    default: true
  },
  step: {
    type: definePropType<Record<`${TimeUnits}Step`, 1>>(Object),
    default: {
      hourStep: 1,
      minuteStep: 1,
      secondStep: 1
    }
  },
  disabled: {
    type: definePropType<Disabled>(Object)
  },
  blurPicker: {
    type: definePropType<() => Promise<void> | undefined>(Function)
  },
  ...pickerPropsBase
} as const

export const timePickerPanelEmit = {
  change: (val: Dayjs | Date | string, now: boolean = false) =>
    isObject(val) || isString(val) || isBoolean(now),
  pick: (val: Dayjs) => isObject(val),
  setPickerMethods: <T extends keyof PickerMethods>(
    val: [T, PickerMethods[T]]
  ) => isArray(val)
}

export type TimePickerPanelProps = ExtractPropTypes<typeof timePickerPanelProps>
export type TimePickerPanelEmit = typeof timePickerPanelEmit
export type NTimePickerPanel = InstanceType<typeof TimePickerPanel>
