export const buttonProps = {
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'error', 'text', ''],
    default: ''
  },
  size: {
    type: String,
    values: ['large', 'default', 'small', ''],
    default: ''
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
  }
}

export const buttonEmits = [
  'click'
]
