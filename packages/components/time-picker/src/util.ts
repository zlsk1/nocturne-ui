import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

export const formatter = (time: Dayjs, valueFormat: string | undefined) => {
  if (!valueFormat) return dayjs(time).toDate()
  else return dayjs(time, valueFormat).format(valueFormat)
}

export const parseDate = (date: string | number | Date | Dayjs | undefined, format: string | undefined) => {
  if (dayjs.isDayjs(date)) {
    return date
  }
  else if (dayjs(date, format).isValid()) {
    return dayjs(date, format)
  }
  return dayjs(undefined)
}
