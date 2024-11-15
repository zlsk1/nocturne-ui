import type { TimeUnits } from '../constants'
import type { Disabled } from '../type'

export const getTimelist = (
  step: Record<TimeUnits, number>,
  disabled?: Disabled
) => {
  const createlist = (
    count: number,
    type: TimeUnits,
    getDisabled?: (...args: []) => any
  ) => {
    const times: { value: number; disabled: boolean }[] = []
    const userDisableds = getDisabled?.()

    for (let i = 0; i < count; i++) {
      const remainder = i % step[type]

      if (remainder === 0) {
        const item =
          !userDisableds || userDisableds.length === 0
            ? {
                value: i,
                disabled: false
              }
            : {
                value: i,
                disabled: !!userDisableds.includes(i)
              }

        times.push(item)
      }
    }
    return times
  }
  const getHourlist = () =>
    createlist(24, 'hour', () => disabled?.disabledHours?.())

  const getMinutelist = (hour: number) =>
    createlist(60, 'minute', () => disabled?.disabledMinutes?.(hour))

  const getSecondlist = (hour: number, minute: number) =>
    createlist(60, 'second', () => disabled?.disabledSeconds?.(hour, minute))

  return {
    getHourlist,
    getMinutelist,
    getSecondlist
  }
}
