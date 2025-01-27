import { ExtractPropTypes } from 'vue'

export const tabItemProps = {
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

export type TabItemProps = ExtractPropTypes<typeof tabItemProps>
