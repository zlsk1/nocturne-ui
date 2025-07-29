import { definePropType, isBoolean, isNumber } from '@nocturne-ui/utils'
import { placements } from '@popperjs/core'
import Tour from './tour'
import TourStep from './tour-step'
import { Gap } from './use-target'
import type { CSSProperties, ExtractPropTypes } from 'vue'

export const nTourProps = {
  current: {
    type: Number
  },
  open: {
    type: Boolean,
    default: true
  },
  gap: {
    type: definePropType<Gap>(Object),
    default: { offset: 6, radius: 2 }
  },
  scrollIntoViewOptions: {
    type: definePropType<boolean | ScrollIntoViewOptions>([Boolean, Object]),
    default: true
  },
  mask: {
    type: Boolean,
    default: true
  },
  animated: {
    type: definePropType<boolean | { placeholder: boolean }>([Boolean, Object]),
    default: true
  },
  zIndex: {
    type: Number
  }
} as const

export const nTourEmit = {
  'update:current': (current: number) => isNumber(current),
  'update:open': (opened: boolean) => isBoolean(opened),
  close: (e: Event) => e instanceof Event,
  finish: () => Boolean,
  change: (current: number) => isNumber(current)
}

export const nTourStepProps = {
  title: {
    type: String
  },
  description: {
    type: String
  },
  target: {
    type: definePropType<HTMLElement>(Object)
  },
  mask: {
    type: definePropType<boolean | { style?: CSSProperties; color?: string }>([
      Boolean,
      Object
    ]),
    default: true
  },
  arrow: {
    type: Boolean,
    default: true
  },
  placement: {
    type: String,
    values: placements
  },
  scrollIntoViewOptions: {
    type: definePropType<boolean | ScrollIntoViewOptions>([Boolean, Object])
  }
} as const

export type NTourProps = ExtractPropTypes<typeof nTourProps>
export type NTourInstance = InstanceType<typeof Tour>
export type NTourEmit = typeof nTourEmit

export type NTourStepProps = ExtractPropTypes<typeof nTourStepProps>
export type NTourStepInstance = InstanceType<typeof TourStep>
