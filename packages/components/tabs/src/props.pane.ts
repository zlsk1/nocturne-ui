import { ExtractPropTypes } from 'vue'

export const tabPaneProps = {
  label: String,
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
