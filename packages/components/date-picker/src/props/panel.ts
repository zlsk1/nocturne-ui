import { definePropType } from '@/utils'
import { Dayjs } from 'dayjs'
import { ExtractPropTypes } from 'vue'

export const panelProps = {
  date: {
    type: definePropType<Dayjs>(Object)
  },
  showWeekNumber: {
    type: Boolean,
    default: false
  },
  minDate: {
    type: definePropType<Dayjs>(Object)
  },
  maxDate: {
    type: definePropType<Dayjs>(Object)
  },
  selectionMode: {
    type: String,
    default: 'day'
  },
  rangeState: {
    type: Object,
    default: () => ({
      endDate: null,
      selecting: false
    })
  },
  disabledDate: {
    type: Function
  },
  parsedValue: {
    type: definePropType<Dayjs | Dayjs[]>([Array, Object])
  }
} as const

export type PanelProps = ExtractPropTypes<typeof panelProps>
