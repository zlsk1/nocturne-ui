import { definePropType } from '@/utils'
import type { ExtractPropTypes } from 'vue'

export const iconProps = {
  size: {
    type: definePropType<string | number>([String, Number])
  },
  color: String
}

export type IconProps = ExtractPropTypes<typeof iconProps>
