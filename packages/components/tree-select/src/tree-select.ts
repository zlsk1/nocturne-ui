import { definePropType } from '@nocturne-ui/utils'

export type TreeItem = {
  label: string
  id: string | number
  children?: TreeItem[]
}

export const treeSelectProps = {
  data: definePropType<TreeItem[]>(Array)
} as const
