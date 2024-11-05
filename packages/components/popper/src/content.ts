import { placements } from '@popperjs/core'
import { definePropType } from '@/utils'

import type { ExtractPropTypes, StyleValue } from 'vue'
import type { Options, Placement } from '@popperjs/core'
import type { Measurable } from './constants'
import type Content from './content.vue'

export type ClassObjectType = Record<string, boolean>
export type ClassType = string | ClassObjectType | ClassType[]

const POSITIONING_STRATEGIES = ['fixed', 'absolute'] as const

export interface CreatePopperInstanceParams {
  referenceEl: Measurable
  popperContentEl: HTMLElement
  arrowEl: HTMLElement | undefined
}

export const popperCoreConfigProps = {
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: definePropType<Placement[]>(Array),
    default: undefined
  },
  /**
   * @description use transform: translate3d or inset to positioning, transition would be effect
   */
  gpuAcceleration: {
    type: Boolean,
    default: true
  },
  /**
   * @description offset of the Tooltip
   */
  offset: {
    type: Number,
    default: 12
  },
  /**
   * @description position of Tooltip
   */
  placement: {
    type: String,
    values: placements,
    default: 'bottom'
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => { return {} }
  },
  strategy: {
    type: String,
    values: POSITIONING_STRATEGIES,
    default: 'absolute'
  }
} as const

export type PopperCoreConfigProps = ExtractPropTypes<
  typeof popperCoreConfigProps
>

export const popperContentProps = {
  ...popperCoreConfigProps,
  id: String,
  style: {
    type: definePropType<StyleValue>([String, Array, Object])
  },
  className: {
    type: definePropType<ClassType>([String, Array, Object])
  },
  effect: {
    type: String,
    default: 'light'
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether padding: 0
   */
  pure: Boolean,
  focusOnShow: {
    type: Boolean,
    default: false
  },
  trapping: {
    type: Boolean,
    default: false
  },
  popperClass: {
    type: definePropType<ClassType>([String, Array, Object])
  },
  popperStyle: {
    type: definePropType<StyleValue>([String, Array, Object])
  },
  referenceEl: {
    type: definePropType<HTMLElement>(Object)
  },
  triggerTargetEl: {
    type: definePropType<HTMLElement>(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  ariaLabel: {
    type: String,
    default: ''
  },
  virtualTriggering: Boolean,
  zIndex: Number
}

export type PopperContentProps = ExtractPropTypes<typeof popperContentProps>

export const popperContentEmits = {
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  focus: () => true,
  blur: () => true,
  close: () => true
}

export type PopperContentEmits = typeof popperContentEmits

export type PopperContentInstance = InstanceType<typeof Content>
