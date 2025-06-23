import { definePropType } from '@nocturne-ui/utils'
import Empty from './empty.vue'
import type { CSSProperties, ExtractPropTypes } from 'vue'

export const emptyProps = {
  description: String,
  image: String,
  imageStyle: {
    type: definePropType<CSSProperties>(Object)
  }
} as const

export type EmptyProps = ExtractPropTypes<typeof emptyProps>
export type EmptyInstance = InstanceType<typeof Empty>
