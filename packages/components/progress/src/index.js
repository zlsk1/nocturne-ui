export const progressProps = {
  percentage: {
    type: Number,
    default: 0,
    required: true
  },
  animation: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'line',
    values: ['line', 'round']
  },
  color: {
    type: String,
    default: '#409eff'
  }
}

export const progressEmits = {
  destroy: () => true
}
