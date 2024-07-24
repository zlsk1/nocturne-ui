import colorPicker from "./color-picker.vue"
import { componentSizes } from "@/constants"
import { isString } from "@/utils"
import type { ExtractPropTypes } from "vue"

export const colorPickerProps = {
  modelValue: String,
  size: {
    type: String,
    values: componentSizes,
    default: ''
  },
}

export const colorPickerEmit = {
  'update:modelValue': (val: string) => isString(val)
}

export type ColorPickProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerEmit = typeof colorPickerEmit
export type ColorPickInstance = InstanceType<typeof colorPicker>