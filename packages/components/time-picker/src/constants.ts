import type { InjectionKey, Ref } from 'vue'

export const timeUnits = ['hour', 'minute', 'second'] as const
export type TimeUnits = typeof timeUnits[number]

export type TimePickerContext = {
}

export const TIMEPICKER_INJECTION_KEY: InjectionKey<TimePickerContext> = Symbol('n-time-picker')
