import { RiArrowLeftWideFill as ArrowLeftWide } from '@remixicon/vue'
import { iconPropType } from '@/utils'
import type { ExtractPropTypes } from 'vue'

export const prevProps = {
  prevText: String,
  prevIcon: {
    type: iconPropType,
    default: ArrowLeftWide
  }
} as const

export type PrevProps = ExtractPropTypes<typeof prevProps>
