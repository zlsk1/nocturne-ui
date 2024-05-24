export const composeEventHandlers = (
  theirsHandler,
  oursHandler,
  { checkForDefaultPrevented = true } = {}
) => {
  const handleEvent = (event) => {
    const shouldPrevent = theirsHandler?.(event)

    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler?.(event)
    }
  }
  return handleEvent
}
