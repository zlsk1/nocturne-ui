export const sliderProps = {
  modelValue: {
    type: [Number, Object],
    default: 0
  },
  step: {
    type: Number,
    default: 1
  },
  size: {
    type: String,
    values: ['large', 'default', 'small', ''],
    default: 'default'
  },
  showInput: {
    type: Boolean,
    default: false
  },
  debounce: {
    type: Number,
    default: 300
  }
}
