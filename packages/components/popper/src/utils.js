import { unrefElement } from '@vueuse/core'

export const buildPopperOptions = (
  props,
  modifiers
) => {
  const { placement, strategy, popperOptions } = props
  const options = {
    placement,
    strategy,
    ...popperOptions,
    modifiers: [...genModifiers(props), ...modifiers]
  }

  deriveExtraModifiers(options, popperOptions?.modifiers)
  return options
}

export const unwrapMeasurableEl = ($el) => unrefElement($el)

function genModifiers (options) {
  const { offset, gpuAcceleration, fallbackPlacements } = options
  return [
    {
      name: 'offset',
      options: {
        offset: [0, offset ?? 12]
      }
    },
    {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: 'flip',
      options: {
        padding: 5,
        fallbackPlacements
      }
    },
    {
      name: 'computeStyles',
      options: {
        gpuAcceleration
      }
    }
  ]
}

function deriveExtraModifiers (
  options,
  modifiers
) {
  if (modifiers) {
    options.modifiers = [...options.modifiers, ...(modifiers ?? [])]
  }
}
