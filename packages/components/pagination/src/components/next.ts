import { RiArrowRightWideFill as ArrowRightWide } from '@remixicon/vue'
import type { ExtractPropTypes } from 'vue'
import { iconPropType } from '@/utils'

export const nextProps = {
  nextText: String,
  nextIcon: {
    type: iconPropType,
    default: ArrowRightWide
  }
} as const

export type NextProps = ExtractPropTypes<typeof nextProps>
