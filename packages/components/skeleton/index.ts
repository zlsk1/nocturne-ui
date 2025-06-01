import { withInstall } from '@nocturne-ui/utils'
import Skeleton from './src/skeleton.vue'
import SkeletonItem from './src/skeleton-item.vue'

export * from './src/skeleton'
export * from './src/skeleton-item'

export const NSkeleton = withInstall(Skeleton)
export const NSkeletonItem = withInstall(SkeletonItem)
export default NSkeleton
