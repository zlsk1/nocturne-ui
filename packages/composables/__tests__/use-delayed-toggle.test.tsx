import { ref } from 'vue'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { useDelayedToggle } from '../use-delayed-toggle'

describe('use-delayed-toggle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should open and close', () => {
    const open = vi.fn()
    const close = vi.fn()

    const { onOpen, onClose } = useDelayedToggle({
      showAfter: ref(0),
      hideAfter: ref(0),
      autoClose: ref(0),
      open,
      close
    })

    expect(open).toBeCalledTimes(0)
    expect(close).toBeCalledTimes(0)

    onOpen()
    vi.runAllTimers()
    expect(open).toBeCalledTimes(1)
    onClose()
    vi.runAllTimers()
    expect(open).toBeCalledTimes(1)
  })

  test('showAfter', () => {
    const open = vi.fn()
    const close = vi.fn()

    const { onOpen } = useDelayedToggle({
      showAfter: ref(100),
      hideAfter: ref(0),
      autoClose: ref(0),
      open,
      close
    })

    expect(open).toBeCalledTimes(0)
    expect(close).toBeCalledTimes(0)

    onOpen()
    vi.advanceTimersByTime(50)
    expect(open).toBeCalledTimes(0)
    vi.advanceTimersByTime(50)
    expect(open).toBeCalledTimes(1)

    vi.runAllTimers()
    expect(open).toBeCalledTimes(1)
  })

  test('hideAfter', () => {
    const open = vi.fn()
    const close = vi.fn()

    const { onClose } = useDelayedToggle({
      showAfter: ref(0),
      hideAfter: ref(100),
      autoClose: ref(0),
      open,
      close
    })

    expect(open).toBeCalledTimes(0)
    expect(close).toBeCalledTimes(0)

    onClose()
    vi.advanceTimersByTime(50)
    expect(close).toBeCalledTimes(0)
    vi.advanceTimersByTime(50)
    expect(close).toBeCalledTimes(1)

    vi.runAllTimers()
    expect(close).toBeCalledTimes(1)
  })

  test('show autoclose after apperance', () => {
    const open = vi.fn()
    const close = vi.fn()

    const { onOpen } = useDelayedToggle({
      showAfter: ref(0),
      hideAfter: ref(0),
      autoClose: ref(100),
      open,
      close
    })

    onOpen()
    vi.advanceTimersByTime(50)
    expect(close).toBeCalledTimes(0)
    vi.advanceTimersByTime(50)
    expect(close).toBeCalledTimes(1)

    vi.runAllTimers()
    expect(close).toBeCalledTimes(1)
  })

  test('set all options', () => {
    const open = vi.fn()
    const close = vi.fn()

    const { onOpen, onClose } = useDelayedToggle({
      showAfter: ref(100),
      hideAfter: ref(100),
      autoClose: ref(100),
      open,
      close
    })

    onOpen()
    vi.advanceTimersByTime(50)
    expect(open).toBeCalledTimes(0)

    onClose()
    vi.advanceTimersByTime(50)
    expect(open).toBeCalledTimes(0)
    expect(close).toBeCalledTimes(0)

    vi.runAllTimers()
    expect(open).toBeCalledTimes(0)
    expect(close).toBeCalledTimes(1)
  })
})
