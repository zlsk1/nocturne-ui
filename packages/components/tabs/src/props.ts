import {
  definePropType,
  isNumber,
  isString,
  isUndefined
} from '@nocturne-ui/utils'
import type { ExtractPropTypes, VNode } from 'vue'
import type { ClassType } from '@nocturne-ui/components/popper'

export type TabType = {
  label: string
  value: string | number
  node: VNode
  disabled: boolean
  closeable: boolean
}

export const tabsProps = {
  modelValue: {
    type: definePropType<string | number>([String, Number])
  },
  position: {
    type: String,
    values: ['top', 'bottom', 'left', 'right'],
    default: 'top'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  popperClass: {
    type: definePropType<ClassType>([String, Array, Object])
  },
  type: {
    type: String,
    values: ['line', 'card', 'editable-card', '']
  },
  size: {
    type: String,
    values: ['large', 'default', 'small', '']
  }
} as const

export const tabsEmits = {
  'update:modelValue': (value: string | number) =>
    isString(value) || isNumber(value),
  change: (value: string | number) => isString(value) || isNumber(value),
  click: (value: string | number) => isString(value) || isNumber(value),
  edit: (type: 'add' | 'del', value?: string | number) =>
    isString(type) && (isString(value) || isUndefined(value))
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabsEmits = typeof tabsEmits
