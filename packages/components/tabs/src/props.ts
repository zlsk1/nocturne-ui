import { definePropType, isString, isUndefined } from '@/utils'
import type { ExtractPropTypes, VNode } from 'vue'
import type { ClassType } from '@/components/popper'

export type TabType = {
  label: string
  node: VNode
  disabled: boolean
  closeable: boolean
}

export const tabsProps = {
  modelValue: {
    type: String
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
  'update:modelValue': (label: string) => isString(label),
  change: (label: string) => isString(label),
  click: (label: string) => isString(label),
  edit: (type: 'add' | 'del', label?: string) =>
    isString(type) && (isString(label) || isUndefined(label))
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabsEmits = typeof tabsEmits
