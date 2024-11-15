import type { ExtractPropTypes } from 'vue'
import { componentSizes } from '@/constants'

export const configProviderProps = {
  namespace: {
    type: String,
    default: 'n'
  },
  zIndex: Number,
  componentSize: {
    type: String,
    values: componentSizes,
    default: ''
  }
} as const

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
