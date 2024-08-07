import dialog from './dialog.vue'
import { definePropType, isBoolean } from '@/utils'
import { iconProps } from '@/components/icon'
import type { ExtractPropTypes, VNode } from 'vue'

export const dialogProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  title: String,
  content: {
    type: definePropType<string | VNode>([String, Object])
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  showConfirm: {
    type: Boolean,
    default: true
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  width: {
    type: definePropType<string | number>([String, Number])
  },
  offsetTop: {
    type: definePropType<string | number>([String, Number]),
    default: '16vh'
  },
  callback: {
    type: definePropType<(action: 'confirm' | 'cancel') => void>(Function)
  },
  beforeClose: {
    type: definePropType<(success: () => void) => void>(Function)
  },
  clickMaskerToClose: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  closeIcon: definePropType<typeof iconProps>(iconProps),
  center: {
    type: Boolean,
    default: false
  },
  transition: {
    type: String,
    default: 'n-dialog-fade'
  },
  maskerClass: {
    type: String,
    default: ''
  },
  masker: {
    type: Boolean,
    default: true
  },
  customClass: {
    type: String,
    default: ''
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  }
}

export const dialogEmits = {
  'update:modelValue': (val: boolean) => isBoolean(val),
  open: () => true,
  close: () => true
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
export type DialogEmits = typeof dialogEmits
export type DialogInstance = InstanceType<typeof dialog>
