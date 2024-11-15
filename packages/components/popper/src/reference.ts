import type { Measurable } from './constants'
import type Trigger from './reference.vue'
import { definePropType } from '@/utils'

export const popperReferenceProps = {
  virtualRef: {
    type: definePropType<Measurable>(Object)
  },
  virtualTriggering: Boolean,
  onClick: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onMouseenter: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onMouseleave: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onKeydown: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onFocus: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onBlur: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onContextmenu: {
    type: definePropType<(e: Event) => void>(Function)
  },
  id: String,
  open: Boolean
} as const

export type PopperTriggerProps = typeof popperReferenceProps

export type PopperTriggerInstance = InstanceType<typeof Trigger>
