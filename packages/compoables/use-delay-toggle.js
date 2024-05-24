import { unref } from 'vue'
import { useTimeout } from '@/compoables'

export const useDelayedToggleProps = {
  /**
   * @description delay of appearance, in millisecond
   */
  showAfter: {
    type: Number,
    default: 0
  },
  /**
   * @description delay of disappear, in millisecond
   */
  hideAfter: {
    type: Number,
    default: 200
  },
  /**
   * @description disappear automatically, in millisecond
   */
  autoClose: {
    type: Number,
    default: 0
  }
}

export const useDelayedToggle = ({
  showAfter,
  hideAfter,
  autoClose,
  open,
  close
}) => {
  const { registerTimeout } = useTimeout()
  const {
    registerTimeout: registerTimeoutForAutoClose,
    cancelTimeout: cancelTimeoutForAutoClose
  } = useTimeout()

  const onOpen = (event) => {
    registerTimeout(() => {
      open(event)

      const _autoClose = unref(autoClose)
      if (typeof (_autoClose) === 'number' && _autoClose > 0) {
        registerTimeoutForAutoClose(() => {
          close(event)
        }, _autoClose)
      }
    }, unref(showAfter))
  }

  const onClose = (event) => {
    cancelTimeoutForAutoClose()

    registerTimeout(() => {
      close(event)
    }, unref(hideAfter))
  }

  return {
    onOpen,
    onClose
  }
}
