export const inputNumberProps = {
  modelValue: {
    type: Number
  },
  size: {
    type: String,
    value: ['large', 'default', 'small', '']
  },
  placeholder: String,
  max: {
    type: Number,
    default: Infinity
  },
  min: {
    type: Number,
    default: -Infinity
  },
  step: {
    type: Number,
    default: 1
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  precision: Number,
  controls: {
    type: Boolean,
    default: true
  }
}

export const inputNumberEmits = [
  'update:modelValue',
  'blur',
  'focus',
  'change'
]
