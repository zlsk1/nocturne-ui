import { definePropType, isNil, isString } from '@nocturne-ui/utils'
import { ComponentSize, componentSizes } from '@nocturne-ui/constants'
import { useTooltipContentProps } from '@nocturne-ui/components/tooltip'
import type ColorPicker from './color-picker.vue'
import type { ComputedRef, ExtractPropTypes, InjectionKey } from 'vue'

export const colorPickerProps = {
  modelValue: {
    type: String
  },
  id: String,
  showAlpha: Boolean,
  colorFormat: String,
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: definePropType<ComponentSize>(String),
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
  change: (val: string | null) => isString(val) || isNil(val),
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
