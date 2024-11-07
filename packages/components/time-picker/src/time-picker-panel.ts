import { definePropType } from '@/utils'
import TimePickerPanel from './time-picker-panel.vue'
import { isObject } from 'lodash'
import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'
import type { TooltipInstance } from '@/components'

export const timePickerPanelProps = {
  currentTime: {
    type: definePropType<Dayjs>(Object),
    required: true
  },
  tooltipRef: {
    type: definePropType<TooltipInstance>(Object)
  },
  showSecond: {
    type: Boolean,
    default: true
  }
} as const

export const timePickerPanelEmit = {
  change: (val: Dayjs) => isObject(val)
}

export type TimePickerPanelProps = ExtractPropTypes<typeof timePickerPanelProps>
export type NTimePickerPanel = InstanceType<typeof TimePickerPanel>
