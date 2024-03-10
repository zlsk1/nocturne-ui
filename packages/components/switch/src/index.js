export const switchProps = {
  modelValue: [Boolean, String, Number],
  size: {
    type: String,
    values: ['large', 'default', 'small', '']
  },
  width: [String, Number],
  activeText: String,
  inactiveText: String,
  inactiveValue: [Boolean, String, Number],
  activeValue: [Boolean, String, Number],
  disabled: {
    type: Boolean,
    default: false
  },
  tabindex: [String, Number]
}

export const switchEmits = [
  'change'
]
