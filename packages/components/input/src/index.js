export const inputProps = {
  // values: ['text', 'textarea', 'password', 'button', 'checkbox', 'file', 'number', 'radio']
  // 等原生input类型
  type: {
    type: String,
    default: 'text'
  },
  size: {
    type: String,
    value: ['large', 'default', 'small', '']
  },
  modelValue: [String, Number],
  placeholder: String,
  disabled: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  tableindex: [String, Number],
  maxlength: [String, Number],
  minlength: [String, Number],
  max: [String, Number],
  min: [String, Number],
  suffixIcon: String,
  prefixIcon: String
}

export const inputEmits = [
  'update:modelValue',
  'update:type'
]
