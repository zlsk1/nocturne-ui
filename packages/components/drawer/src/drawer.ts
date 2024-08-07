import type { ExtractPropTypes } from 'vue'
import { definePropType, isBoolean } from '@/utils'
import drawer from './drawer.vue'

export const drawerPlacement = ['top', 'bottom', 'left', 'right']

export const drawerProps = {
  modelValue: Boolean,
  placement: {
    type: String,
    values: drawerPlacement,
    default: 'right'
  },
  size: {
    type: definePropType<string | number>([String, Number])
  },
  maskerClass: String,
  masker: {
    type: Boolean,
    default: true
  },
  clickMaskerToClose: {
    type: Boolean,
    default: true
  },
  beforeClose: {
    type: definePropType<(success: () => void) => void>(Function)
  },
  zIndex: {
    type: definePropType<string | number>([String, Number])
  },
  showClose: {
    type: Boolean,
    default: true
  }
}

export const drawerEmits = {
  'update:modelValue': (val: boolean) => isBoolean(val),
  open: () => true,
  close: () => true
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
export type DrawerEmit = typeof drawerEmits
export type DrawerInstance = InstanceType<typeof drawer>
