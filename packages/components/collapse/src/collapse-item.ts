import { ExtractPropTypes } from 'vue'
import collapseItem from './collapse-item.vue'
import { definePropType } from '@/utils'

export const collapseItemProps = {
  title: String,
  name: definePropType<string | number>([String, Number]),
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
export type CollapseItemInstance = InstanceType<typeof collapseItem>
