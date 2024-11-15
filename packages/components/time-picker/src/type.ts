import type { TimeUnits } from './constants'
import type { Dayjs } from 'dayjs'

export type GetDisabledHour = () => number[]

export type GetDisabledMinute = (hour: number) => number[]

export type GetDisabledSecond = (hour: number, minute: number) => number[]

export type Disabled = {
  disabledHours?: GetDisabledHour
  disabledMinutes?: GetDisabledMinute
  disabledSeconds?: GetDisabledSecond
}

export type TimelistItem = {
  value: number
  disabled: boolean
}

export type Timelist = Record<TimeUnits, TimelistItem[]>

export type PickerMethods = {
  getDefaultValue: () => Dayjs
  getAvailableValue: (date: Dayjs) => Dayjs
}
