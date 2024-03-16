export const countdownProps = {
  value: {
    type: [Number, Object],
    default: 0
  },
  title: String,
  suffixIcon: String,
  prefixIcon: String,
  valueStyle: [String, Object],
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
}

export const countdownEmits = [
  'change',
  'finsh'
]
