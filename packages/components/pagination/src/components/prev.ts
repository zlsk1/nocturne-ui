import { RiArrowLeftSLine } from '@remixicon/vue'
import { iconPropType } from '@nocturne-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const prevProps = {
  prevText: String,
  prevIcon: {
    type: iconPropType,
    default: RiArrowLeftSLine
  }
} as const

export type PrevProps = ExtractPropTypes<typeof prevProps>
