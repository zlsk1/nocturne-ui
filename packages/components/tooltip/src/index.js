export const tooltipProps = {
  content: String,
  placement: {
    type: String,
    values: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
    default: 'bottom'
  },
  effect: {
    type: String,
    values: ['dark', 'light'],
    default: 'dark'
  },
  trigger: {
    type: String,
    values: ['hover', 'click'],
    default: 'hover'
  }
}
