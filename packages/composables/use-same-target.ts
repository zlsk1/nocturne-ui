import { NOOP } from '@vue/shared'

// 事件触发源与绑定源是否相同的相关行为
export const useSameTarget = (handler?: (e: MouseEvent) => void) => {
  if (!handler) {
    return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP }
  }

  let isSameMdTarget = false
  let isSameMUTarget = false

  function onMousedown(e: MouseEvent) {
    isSameMUTarget = e.target === e.currentTarget
  }

  function onMouseup(e: MouseEvent) {
    isSameMdTarget = e.target === e.currentTarget
  }

  function onClick(e: MouseEvent) {
    if (isSameMUTarget && isSameMdTarget) {
      handler?.(e)
    }
    isSameMdTarget = false
    isSameMUTarget = false
  }
  return { onMousedown, onMouseup, onClick }
}
