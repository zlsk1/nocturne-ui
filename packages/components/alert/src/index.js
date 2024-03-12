export const alertProps = {
  title: String,
  closable: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    values: ['success', 'warning', 'info', 'error'],
    default: 'info'
  },
  effect: {
    type: String,
    values: ['light', 'dark'],
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
}

export const alertEmits = [
  'close'
]
