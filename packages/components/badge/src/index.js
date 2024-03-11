export const badgeProps = {
  value: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', ''],
    default: ''
  },
  dot: {
    type: Boolean,
    default: false
  },
  hidden: {
    type: Boolean,
    default: false
  },
  max: Number
}
