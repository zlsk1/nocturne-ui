import { RiArrowLeftWideFill as ArrowLeftWide } from '@remixicon/vue'
import type { ExtractPropTypes } from 'vue'
import { iconPropType } from '@/utils'

export const prevProps = {
  prevText: String,
  prevIcon: {
    type: iconPropType,
    default: ArrowLeftWide
  }
} as const

export type PrevProps = ExtractPropTypes<typeof prevProps>
