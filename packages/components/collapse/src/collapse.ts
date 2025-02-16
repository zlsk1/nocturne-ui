import { ExtractPropTypes } from 'vue'
import {
  definePropType,
  isArray,
  isNumber,
  isString,
  isUndefined
} from '@nocturne-ui/utils'
import Collapse from './collapse.vue'

export const collapseProps = {
  modelValue: definePropType<string | string[] | number[]>([String, Array]),
  accordion: {
    type: Boolean,
    default: false
  }
}

export const collapseEmits = {
  change: (val: string | number | undefined) =>
    isNumber(val) || isString(val) || isUndefined(val),
  'update:modelValue': (val: string | string[] | number[]) =>
    isString(val) || isArray(val)
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseEmits = typeof collapseEmits
export type CollapseInstance = InstanceType<typeof Collapse>
