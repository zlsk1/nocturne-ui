import dayjs, { type Dayjs } from 'dayjs'

export const parseDate = (date: string | Dayjs, format: string | undefined) => {
  const day = dayjs.isDayjs(date)
    ? date
    : format
      ? dayjs(date, format)
      : dayjs(date)

  return day
}

export const leftPad = (value: string | number, length: number, fill = '0') => {
  let current = String(value)

  if (current.length < length) {
    current = `${fill}${current}`
  }

  return current
}
