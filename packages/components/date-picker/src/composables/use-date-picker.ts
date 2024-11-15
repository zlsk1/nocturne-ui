import dayjs from 'dayjs'

export const useDatePicker = () => {
  const nowDay = dayjs().day()
  const nowMonth = dayjs().month()
  const nowDayInMonth = dayjs(nowMonth).daysInMonth()

  return {}
}
