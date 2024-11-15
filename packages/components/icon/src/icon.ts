import type { ExtractPropTypes } from 'vue'
import { definePropType } from '@/utils'

export const iconProps = {
  size: {
    type: definePropType<string | number>([String, Number])
  },
  color: String
}

export type IconProps = ExtractPropTypes<typeof iconProps>
