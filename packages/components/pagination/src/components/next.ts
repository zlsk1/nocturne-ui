import { RiArrowRightSLine } from '@remixicon/vue'
import { iconPropType } from '@nocturne-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const nextProps = {
  nextText: String,
  nextIcon: {
    type: iconPropType,
    default: RiArrowRightSLine
  }
} as const

export type NextProps = ExtractPropTypes<typeof nextProps>
