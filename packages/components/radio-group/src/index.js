export const radioGroupProps = {
  modelValue: {
    type: Object,
    default: []
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
