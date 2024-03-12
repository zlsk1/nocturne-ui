export const messageProps = {
  type: {
    type: String,
    values: ['success', 'warning', 'info', 'error'],
    default: 'info'
  },
  message: {
    type: [String, Number],
    default: ''
  },
  duration: {
    type: Number,
    default: 3000
  },
  showClose: {
    type: Boolean,
    default: false
  },
  offset: {
    type: Number,
    default: 16
  },
  appendTo: [String, HTMLElement],
  onClose: Function,
  id: String
}

export const messageEmits = {
  destroy: () => true
}
