export const checkboxGroupProps = {
  modelValue: Object,
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    values: ['large', 'default', 'small', '']
  }
}

export const checkboxGroupEmits = [
  'change',
  'update:modelValue'
]
