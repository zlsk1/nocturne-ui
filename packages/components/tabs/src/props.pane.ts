import { ExtractPropTypes } from 'vue'
import { definePropType } from '@nocturne-ui/utils'

export const tabPaneProps = {
  label: String,
  value: {
    type: definePropType<string | number>([String, Number])
  },
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description only for editable-card while type is editable-card
   */
  closeable: {
    type: Boolean,
    default: true
  }
} as const

export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>
