export const radioProps = {
  modelValue: {
    type: [Number, String, Boolean],
    default: undefined
  },
  value: {
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
  },
  label: {
    type: [Number, String, Boolean],
    default: undefined
  }
}

export const radioEmits = [
  'change'
]
