import { ExtractPropTypes } from 'vue'
import Collapse from './collapse.vue'
import { definePropType } from '@/utils'

export const collapseProps = {
  modelValue: definePropType<string | []>([String, Array]),
  accordion: {
    type: Boolean,
    default: false
  }
}

export const collapseEmits = {
  change: (val: string | number) => val
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseEmits = typeof collapseEmits
export type CollapseInstance = InstanceType<typeof Collapse>
