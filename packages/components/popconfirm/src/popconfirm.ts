import { QuestionCircleFilled } from '@ant-design/icons-vue'
import { iconPropType } from '@nocturne-ui/utils'
import popconfirm from './popconfirm.vue'

import type { ExtractPropTypes } from 'vue'

export const popconfirmProps = {
  title: String,
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  /**
   * @default QuestionCircleFilled
   */
  icon: {
    type: iconPropType
  }
}

export const popconfirmEmit = {
  confirm: () => true,
  cancel: () => true
}

export type PopconfirmInstance = InstanceType<typeof popconfirm>
export type PopconfirmProps = ExtractPropTypes<typeof popconfirmProps>
export type PopconfirmEmit = typeof popconfirmEmit
