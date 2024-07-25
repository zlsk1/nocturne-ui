import { definePropType, isString, isNil } from '@/utils'
import { componentSizes } from '@/constants'
import { useTooltipContentProps } from '@/components/tooltip'

import type { ComputedRef, ExtractPropTypes, InjectionKey } from 'vue'
import type ColorPicker from './color-picker.vue'

export const colorPickerProps = {
  modelValue: {
    type: String,
    default: '#000'
  },
  id: String,
  showAlpha: Boolean,
  colorFormat: String,
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    values: componentSizes
  },
  popperClass: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: undefined
  },
  tabindex: {
    type: definePropType<string | number>([String, Number]),
    default: 0
  },
  teleported: useTooltipContentProps.teleported,
  predefine: {
    type: definePropType<string[]>(Array)
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  showText: {
    type: Boolean,
    default: false
  }
} as const

export const colorPickerEmits = {
  'update:modelValue': (val: string | null) => isString(val) || isNil(val),
  'change': (val: string | null) => isString(val) || isNil(val),
  activeChange: (val: string | null) => isString(val) || isNil(val),
  focus: (event: FocusEvent) => event instanceof FocusEvent,
  blur: (event: FocusEvent) => event instanceof FocusEvent
}

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerEmits = typeof colorPickerEmits
export type ColorPickerInstance = InstanceType<typeof ColorPicker>

export interface ColorPickerContext {
  currentColor: ComputedRef<string>
}

export const colorPickerContextKey: InjectionKey<ColorPickerContext> = Symbol(
  'colorPickerContextKey'
)
