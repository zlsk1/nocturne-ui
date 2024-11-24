import { unref } from 'vue'
import { useTimeout } from './use-timeout'
import type { ExtractPropTypes, ToRefs } from 'vue'

export const useDelayedToggleOptions = {
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  }
} as const

export type UseDelayedToggleOptions = {
  open: (event?: Event) => void
  close: (event?: Event) => void
} & ToRefs<ExtractPropTypes<typeof useDelayedToggleOptions>>

export const useDelayedToggle = ({
  showAfter,
  hideAfter,
  autoClose,
  open,
  close
}: UseDelayedToggleOptions) => {
  const { registerTimeout } = useTimeout()
  const {
    registerTimeout: registerTimeoutForAutoClose,
    cancelTimeout: cancelTimeoutForAutoClose
  } = useTimeout()

  const onOpen = (e?: Event) => {
    registerTimeout(() => {
      open(e)

      const auto = unref(autoClose)
      if (auto > 0) {
        registerTimeoutForAutoClose(() => {
          close(e)
        }, auto)
      }
    }, unref(showAfter))
  }

  const onClose = (e?: Event) => {
    cancelTimeoutForAutoClose()

    registerTimeout(() => {
      close(e)
    }, unref(hideAfter))
  }

  return {
    onOpen,
    onClose
  }
}
