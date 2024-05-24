export const popperCoreConfigProps = {
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: Array,
    default: undefined
  },
  gpuAcceleration: {
    type: Boolean,
    default: true
  },
  /**
   * @description offset of the Tooltip
   */
  offset: {
    type: Number,
    default: 12
  },
  /**
   * @description position of Tooltip
   */
  placement: {
    type: String,
    default: 'bottom'
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions: {},
  strategy: {
    type: String,
    default: 'absolute'
  }
}

export const popperContentProps = {
  ...popperCoreConfigProps,
  id: String,
  style: {
    type: [String, Array, Object]
  },
  className: {
    type: [String, Array, Object]
  },
  effect: {
    type: String,
    default: 'dark'
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: true
  },
  pure: Boolean,
  focusOnShow: {
    type: Boolean,
    default: false
  },
  trapping: {
    type: Boolean,
    default: false
  },
  popperClass: {
    type: [String, Array, Object]
  },
  popperStyle: {
    type: [String, Array, Object]
  },
  referenceEl: {
    type: Object
  },
  triggerTargetEl: {
    type: Object
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  ariaLabel: {
    type: String,
    default: ''
  },
  virtualTriggering: Boolean,
  zIndex: Number
}

export const popperContentEmits = {
  mouseenter: (evt) => evt,
  mouseleave: (evt) => evt,
  focus: () => true,
  blur: () => true,
  close: () => true
}
