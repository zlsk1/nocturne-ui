import { ExtractPropTypes } from 'vue'
import { definePropType } from '@nocturne-ui/utils'
import collapseItem from './collapse-item.vue'

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
