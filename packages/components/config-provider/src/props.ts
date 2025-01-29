import { componentSizes } from '@/constants'
import { zhCn } from '@/locale'
import type { ExtractPropTypes } from 'vue'

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
  },
  locale: {
    type: Object,
    default: zhCn
  }
} as const

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
