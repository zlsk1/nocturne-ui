export const timelineProps = {
  timestamp: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', ''],
    default: ''
  },
  hollow: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  hideTimestamp: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String,
    values: ['bottom', 'top'],
    default: 'bottom'
  },
  size: {
    type: String,
    values: ['normal', 'large'],
    default: 'normal'
  },
  color: {
    type: String,
    default: ''
  },
  icon: String
}
