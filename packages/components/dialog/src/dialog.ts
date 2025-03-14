import { definePropType, iconPropType, isBoolean } from '@nocturne-ui/utils'
import dialog from './dialog.vue'
import type { ExtractPropTypes } from 'vue'

export const dialogProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  title: String,
  content: String,
  confirmText: {
    type: String
  },
  cancelText: {
    type: String
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
  clickMaskerToClose: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  closeIcon: {
    type: iconPropType
  },
  center: {
    type: Boolean,
    default: false
  },
  transition: {
    type: String
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
  },
  confirmLoading: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: Number
  }
} as const

export const dialogEmits = {
  'update:modelValue': (val: boolean) => isBoolean(val),
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  confirm: (e: MouseEvent) => e instanceof MouseEvent,
  cancel: (e: MouseEvent) => e instanceof MouseEvent
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
export type DialogEmits = typeof dialogEmits
export type DialogInstance = InstanceType<typeof dialog>
