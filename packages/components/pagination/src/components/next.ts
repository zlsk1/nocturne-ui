import { RiArrowRightWideFill as ArrowRightWide } from '@remixicon/vue'
import { iconPropType } from '@/utils'
import type { ExtractPropTypes } from 'vue'

export const nextProps = {
  nextText: String,
  nextIcon: {
    type: iconPropType,
    default: ArrowRightWide
  }
} as const

export type NextProps = ExtractPropTypes<typeof nextProps>
