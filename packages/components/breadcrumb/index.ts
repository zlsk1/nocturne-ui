import Breadcrumb from './src/breadcrumb'
import BreadcrumbItem from './src/breadcrumb-item'
import { withInstall } from '@/utils'

export * from './src/breadcrumb'
export * from './src/breadcrumb-item'

export const NBreadcrumb = withInstall(Breadcrumb)
export const NBreadcrumbItem = withInstall(BreadcrumbItem)
