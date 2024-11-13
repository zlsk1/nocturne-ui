import { timeUnits } from '../constants'

import type { Timelist } from '../type'
import type { Dayjs } from 'dayjs'

export const usePickPanel = (timelist: Timelist) => {
  const getAvailableTime = (date: Dayjs) => {
    let result = date

    timeUnits.forEach(type => {
      const availableValue: number[] = []
      timelist[type].forEach(time => {
        if (time.value && !time.disabled) availableValue.push(time.value)
      })

      if (availableValue?.length && !availableValue.includes(result[type]())) {
        const pos = availableValue.length - 1
        result = result[type](availableValue[pos]!) as unknown as Dayjs
      }
    })

    return result
  }

  return {
    getAvailableTime
  }
}
