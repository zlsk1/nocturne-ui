import {
  definePropType,
  iconPropType,
  isBoolean,
  isClient
} from '@nocturne-ui/utils'
import { RiArrowUpDoubleLine, RiCloseLine, RiMagicLine } from '@remixicon/vue'
import { TooltipProps } from '@nocturne-ui/components/tooltip'
import FloatButton from './float-button'
import FloatButtonGroup from './float-button-group'
import BackTop from './back-top'
import type { ExtractPropTypes } from 'vue'

export const floatButtonProps = {
  icon: {
    type: iconPropType,
    default: RiMagicLine
  },
  description: String,
  shape: {
    type: definePropType<'circle' | 'square'>(String),
    default: 'circle'
  },
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', ''],
    default: ''
  },
  tooltip: {
    type: definePropType<TooltipProps>(Object)
  },
  buttonType: {
    type: definePropType<'button' | 'submit' | 'reset'>(String),
    default: 'button'
  }
} as const

export const floatButtonEmit = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export const floatButtonGroupProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String,
    values: ['top', 'left', 'bottom', 'right'],
    default: 'top'
  },
  closeIcon: {
    type: iconPropType,
    default: RiCloseLine
  },
  trigger: {
    type: definePropType<'hover' | 'click'>(String),
    default: 'hover'
  },
  ...floatButtonProps
} as const

export const floatButtonGroupEmit = {
  'update:modelValue': (value: boolean) => isBoolean(value),
  open: (value: boolean) => isBoolean(value)
}

export const backTopProps = {
  ...floatButtonProps,
  target: {
    type: definePropType<() => HTMLElement | Window>(Function),
    default: isClient ? () => window : undefined
  },
  icon: {
    type: iconPropType,
    default: RiArrowUpDoubleLine
  },
  offset: {
    type: Number,
    default: 160
  }
} as const

export const backTopEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type FloatButtonProps = ExtractPropTypes<typeof floatButtonProps>
export type FloatButtonEmits = ExtractPropTypes<typeof floatButtonEmit>

export type FloatButtonGroupProps = ExtractPropTypes<
  typeof floatButtonGroupProps
>
export type FloatButtonGroupEmits = ExtractPropTypes<
  typeof floatButtonGroupEmit
>

export type BackTopProps = ExtractPropTypes<typeof backTopProps>
export type BackTopEmits = typeof backTopEmits

export type FloatButtonInstace = InstanceType<typeof FloatButton>
export type FloatButtonGroupInstace = InstanceType<typeof FloatButtonGroup>
export type BackTopInstace = InstanceType<typeof BackTop>
