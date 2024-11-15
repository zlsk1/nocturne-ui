<template>
  <div class="n-date-picker--panel">
    <div class="n-date__header">
      <div class="n-date__header__left">
        <ArrowLeftDouble size="18" />
        <ArrowLeft size="18" />
      </div>
      <div class="n-date__header__view">
        <button class="n-date-year-btn">2024年</button>
        <button class="n-date-month-btn">11月</button>
      </div>
      <div class="n-date__header__right">
        <ArrowRight size="18" />
        <ArrowRightDouble size="18" />
      </div>
    </div>
    <div class="n-date__content">
      <table class="n-date__table">
        <thead class="n-date__table__header">
          <tr>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
            <th>日</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, key) in rows" :key="key" class="n-date__table__row">
            <td
              v-for="(cell, _key) in row"
              :key="_key"
              class="n-date__table__cell"
            >
              <span>
                {{ cell.text }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="n-date--external__btn">
      <button>今天</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
  RiArrowLeftSLine as ArrowLeft,
  RiArrowLeftDoubleFill as ArrowLeftDouble,
  RiArrowRightSLine as ArrowRight,
  RiArrowRightDoubleFill as ArrowRightDouble
} from '@remixicon/vue'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { panelProps } from './props/panel'

import type { Dayjs } from 'dayjs'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

defineOptions({
  name: 'NDatePickerPanel'
})

const props = defineProps(panelProps)

const firstDayOfWeek = (props.date || (dayjs() as any)).$locale().weekStart || 7

const tableDatas = ref([[], [], [], [], [], []])

const startDate = computed(() => {
  const startDayOfMonth = (props.date || dayjs()).startOf('month')
  return startDayOfMonth.subtract(startDayOfMonth.day() || 7, 'day')
})
const offsetDay = computed(() =>
  firstDayOfWeek > 3 ? 7 - firstDayOfWeek : -firstDayOfWeek
)
const rows = computed(() => {
  // TODO: refactory rows / getCellClasses
  const startOfMonth = (props.date || dayjs()).startOf('month')
  const startOfMonthDay = startOfMonth.day() || 7 // day of first day
  const dateCountOfMonth = startOfMonth.daysInMonth()
  const dateCountOfLastMonth = startOfMonth.subtract(1, 'month').daysInMonth()

  const offset = offsetDay.value
  const rows_ = tableDatas.value
  let count = 1

  const selectedDate: Dayjs[] = []

  const calNow = dayjs().locale('zh-cn').startOf('day')

  for (let i = 0; i < 6; i++) {
    const row = rows_[i] as any

    if (props.showWeekNumber) {
      if (!row[0]) {
        row[0] = {
          type: 'week',
          text: startDate.value.add(i * 7 + 1, 'day').week()
        }
      }
    }

    for (let j = 0; j < 7; j++) {
      let cell = row[props.showWeekNumber ? j + 1 : j]
      if (!cell) {
        cell = {
          row: i,
          column: j,
          type: 'normal',
          inRange: false,
          start: false,
          end: false
        }
      }
      const index = i * 7 + j
      const calTime = startDate.value.add(index - offset, 'day')
      cell.type = 'normal'

      const calEndDate =
        props.rangeState.endDate ||
        props.maxDate ||
        (props.rangeState.selecting && props.minDate)

      cell.inRange =
        (props.minDate &&
          calTime.isSameOrAfter(props.minDate, 'day') &&
          calEndDate &&
          calTime.isSameOrBefore(calEndDate, 'day')) ||
        (props.minDate &&
          calTime.isSameOrBefore(props.minDate, 'day') &&
          calEndDate &&
          calTime.isSameOrAfter(calEndDate, 'day'))

      if (props.minDate?.isSameOrAfter(calEndDate)) {
        cell.start = calEndDate && calTime.isSame(calEndDate, 'day')
        cell.end = props.minDate && calTime.isSame(props.minDate, 'day')
      } else {
        cell.start = props.minDate && calTime.isSame(props.minDate, 'day')
        cell.end = calEndDate && calTime.isSame(calEndDate, 'day')
      }

      const isToday = calTime.isSame(calNow, 'day')

      if (isToday) {
        cell.type = 'today'
      }

      if (i >= 0 && i <= 1) {
        const numberOfDaysFromPreviousMonth =
          startOfMonthDay + offset < 0
            ? 7 + startOfMonthDay + offset
            : startOfMonthDay + offset

        if (j + i * 7 >= numberOfDaysFromPreviousMonth) {
          cell.text = count++
        } else {
          cell.text =
            dateCountOfLastMonth -
            (numberOfDaysFromPreviousMonth - (j % 7)) +
            1 +
            i * 7
          cell.type = 'prev-month'
        }
      } else {
        if (count <= dateCountOfMonth) {
          cell.text = count++
        } else {
          cell.text = count++ - dateCountOfMonth
          cell.type = 'next-month'
        }
      }

      const cellDate = calTime.toDate()
      cell.selected = selectedDate.find(
        (_) => _.valueOf() === calTime.valueOf()
      )
      cell.disabled = props.disabledDate && props.disabledDate(cellDate)
      // cell.customClass = props.cellClassName && props.cellClassName(cellDate)
      row[props.showWeekNumber ? j + 1 : j] = cell
    }

    if (props.selectionMode === 'week') {
      const start = props.showWeekNumber ? 1 : 0
      const end = props.showWeekNumber ? 7 : 6
      const isActive = isWeekActive(row[start + 1])
      row[start].inRange = isActive
      row[start].start = isActive
      row[end].inRange = isActive
      row[end].end = isActive
    }
  }
  return rows_
})

const isWeekActive = (cell: any) => {
  if (props.selectionMode !== 'week') return false
  let newDate = (props.date || dayjs()).startOf('day')

  if (cell.type === 'prev-month') {
    newDate = newDate.subtract(1, 'month')
  }

  if (cell.type === 'next-month') {
    newDate = newDate.add(1, 'month')
  }

  newDate = newDate.date(parseInt(cell.text, 10))

  if (props.parsedValue && !Array.isArray(props.parsedValue)) {
    const dayOffset = ((props.parsedValue.day() - firstDayOfWeek + 7) % 7) - 1
    const weekDate = props.parsedValue.subtract(dayOffset, 'day')
    return weekDate.isSame(newDate, 'day')
  }
  return false
}
</script>
