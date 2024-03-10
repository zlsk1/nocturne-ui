export const inputNumberProps = {
  modelValue: {
    type: Number
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
  precision: Number
}

export const inputNumberEmits = [
  'update:modelValue',
  'blur',
  'focus'
]
