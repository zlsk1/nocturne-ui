import { definePropType } from '@/utils'

import type { ExtractPropTypes, StyleValue } from 'vue'

export const iconProps = {
  size: {
    type: definePropType<string | number>([String, Number])
  },
  color: String,
  // 图标类名
  className: definePropType<StyleValue>([String, Array])
}

export type IconProps = ExtractPropTypes<typeof iconProps>
