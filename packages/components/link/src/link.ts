export const linkProps = {
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', ''],
    default: ''
  },
  href: String,
  target: {
    type: String,
    default: '_self'
  },
  underline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: String
} as const
