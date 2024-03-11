export const checkboxProps = {
  modelValue: [String, Number, Boolean],
  value: [String, Number, Boolean, Object],
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    values: ['large', 'default', 'small', '']
  },
  checked: {
    type: Boolean,
    default: false
  },
  indeterminate: {
    type: Boolean,
    default: false
  }
}

export const checkboxEmits = [
  'change',
  'update:modelValue'
]
