export const tagProps = {
  size: {
    type: String,
    values: ['large', 'default', 'small', '']
  },
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', ''],
    default: ''
  },
  round: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  effect: {
    type: String,
    values: ['dark', 'light', 'plain'],
    default: 'light'
  },
  // transition: {
  //   type: Boolean,
  //   default: true
  // },
  border: {
    type: Boolean,
    default: false
  },
  color: String
}

export const tagEmits = [
  'close',
  'click'
]
