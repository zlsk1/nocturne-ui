export const radioGroupProps = {
  modelValue: {
    type: [Number, String, Boolean],
    default: undefined
  },
  size: {
    type: String,
    values: ['large', 'default', 'small', '']
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export const radioGroupEmits = [
  'update:modelValue',
  'change'
]
