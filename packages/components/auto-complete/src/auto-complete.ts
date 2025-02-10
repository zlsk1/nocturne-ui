import { Placement } from '@popperjs/core'
import { definePropType, isNumber, isString } from '@/utils'
import { ComponentSize } from '@/constants'
import AutoComplete from './auto-complete.vue'
import type { ClassType } from '@/components/popper'
import type { CSSProperties, ExtractPropTypes } from 'vue'

export type AutoCompleteOptionType = {
  label: string
  value: string | number
}

export const autoCompleteProps = {
  modelValue: {
    type: definePropType<string | number>([String, Number])
  },
  placeholder: {
    type: String
  },
  options: {
    type: definePropType<AutoCompleteOptionType[]>(Array)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  showArrow: {
    type: Boolean,
    default: false
  },
  popperClass: {
    type: definePropType<ClassType>([String, Array, Object]),
    default: ''
  },
  popperStyle: {
    type: definePropType<CSSProperties>(Object)
  },
  placement: {
    type: definePropType<Placement>(String),
    default: 'bottom'
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  afterBlur: {
    type: Function
  },
  filterOption: {
    type: definePropType<boolean | ((val: string) => AutoCompleteOptionType[])>(
      [Function, Boolean]
    ),
    default: false
  },
  defaultActiveFirstOption: {
    type: Boolean,
    default: true
  },
  defaultOption: {
    type: Boolean,
    default: true
  },
  size: {
    type: definePropType<ComponentSize>(String)
  }
} as const

export const autoCompleteEmits = {
  'update:modelValue': (value: string | number) =>
    isString(value) || isNumber(value),
  change: (value: string | number) => isString(value) || isNumber(value),
  search: (value: string) => isString(value),
  select: (value: string | number) => isString(value) || isNumber(value),
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent
}

export type AutoCompleteProps = ExtractPropTypes<typeof autoCompleteProps>
export type AutoCompleteEmits = typeof autoCompleteEmits
export type AutoCompleteInstance = InstanceType<typeof AutoComplete>
