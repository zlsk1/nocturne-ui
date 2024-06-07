import { definePropType } from '@/utils'

import type { ExtractPropTypes, StyleValue, Component } from 'vue'

export const iconProps = {
  icon: {
    type: definePropType<string | Component>(String),
    required: true
  },
  // 图标类名
  className: definePropType<StyleValue>([String, Array])
}

export type IconProps = ExtractPropTypes<typeof iconProps>
