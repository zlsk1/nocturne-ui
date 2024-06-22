import type { ExtractPropTypes } from 'vue'

export const prevProps = {
  prevText: String,
  prevIcon: {
    type: String,
    default: 'arrow-left'
  }
} as const

export type PrevProps = ExtractPropTypes<typeof prevProps>
