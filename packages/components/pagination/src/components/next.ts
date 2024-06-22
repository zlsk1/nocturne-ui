import type { ExtractPropTypes } from 'vue'

export const nextProps = {
  nextText: String,
  nextIcon: {
    type: String,
    default: 'arrow-right'
  }
} as const

export type NextProps = ExtractPropTypes<typeof nextProps>
