import Alert from './alert.vue'

const types = ['success', 'warning', 'info', 'error'] as const
const effect = ['light', 'dark'] as const

export const alertProps = {
  title: String,
  closable: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    values: types,
    default: 'info'
  },
  effect: {
    type: String,
    values: effect,
    default: 'light'
  },
  center: {
    type: Boolean,
    default: false
  },
  showIcon: {
    type: Boolean,
    default: false
  },
  description: String,
  closeText: String
} as const

export const alertEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type AlertEmits = typeof alertEmits

export type AlertInstance = InstanceType<typeof Alert>
