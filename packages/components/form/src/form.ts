import form from './form.vue'
import { isObject } from '@/utils'

import type { ExtractPropTypes } from 'vue'

export const formProps = {
  model: {
    type: Object,
    required: true
  },
  rules: Object
} as const

export const formEmit = {
  'update:model': (val: object) => isObject(val)
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormEmit = typeof formEmit
export type FormInstance = InstanceType<typeof form>
