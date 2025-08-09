import { iconPropType } from '@nocturne-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const prevProps = {
  prevText: String,
  /**
   * @default LeftOutlined
   */
  prevIcon: {
    type: iconPropType
  }
} as const

export type PrevProps = ExtractPropTypes<typeof prevProps>
