import { noop } from 'lodash'

// 事件触发源与绑定源是否相同
export const useSameTarget = (handler?: (e: MouseEvent) => void) => {
  if (!handler) {
    return { onClick: noop, onMousedown: noop, onMouseup: noop }
  }

  let isSameMDTarget = false
  let isSameMUTarget = false

  function onMousedown(e: MouseEvent) {
    isSameMUTarget = e.target === e.currentTarget
  }

  function onMouseup(e: MouseEvent) {
    isSameMDTarget = e.target === e.currentTarget
  }

  function onClick(e: MouseEvent) {
    if (isSameMUTarget && isSameMDTarget) {
      handler?.(e)
    }
    isSameMDTarget = false
    isSameMUTarget = false
  }
  return { onMousedown, onMouseup, onClick }
}
