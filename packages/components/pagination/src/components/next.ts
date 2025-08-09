import { iconPropType } from '@nocturne-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const nextProps = {
  nextText: String,
  /**
   * @default RightOutlined
   */
  nextIcon: {
    type: iconPropType
  }
} as const

export type NextProps = ExtractPropTypes<typeof nextProps>
