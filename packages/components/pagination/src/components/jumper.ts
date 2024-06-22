import type { ExtractPropTypes } from 'vue'

export const jumperProps = {
  jumperText: String,
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type JumperProps = ExtractPropTypes<typeof jumperProps>
