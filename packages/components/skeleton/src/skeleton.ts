import { ExtractPropTypes } from 'vue'
import Skeleton from './skeleton.vue'

export const skeletonProps = {
  loading: {
    type: Boolean,
    default: true
  },
  animated: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 3
  }
} as const

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
export type SkeletonInstance = InstanceType<typeof Skeleton>
