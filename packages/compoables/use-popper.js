import { computed, onBeforeUnmount, ref, shallowRef, unref, watch } from 'vue'
import { createPopper } from '@popperjs/core'

export const usePopper = (
  referenceElementRef,
  popperElementRef,
  opts
) => {
  const stateUpdater = {
    name: 'updateState',
    enabled: true,
    phase: 'write',
    fn: ({ state }) => {
      const derivedState = deriveState(state)

      Object.assign(states.value, derivedState)
    },
    requires: ['computeStyles']
  }

  const options = computed(() => {
    const { onFirstUpdate, placement, strategy, modifiers } = unref(opts)

    return {
      onFirstUpdate,
      placement: placement || 'bottom',
      strategy: strategy || 'absolute',
      modifiers: [
        ...(modifiers || []),
        stateUpdater,
        { name: 'applyStyles', enabled: false }
      ]
    }
  })

  const instanceRef = shallowRef()
  const states = ref({
    styles: {
      popper: {
        position: unref(options).strategy,
        left: '0',
        top: '0'
      },
      arrow: {
        position: 'absolute'
      }
    },
    attributes: {}
  })

  const destroy = () => {
    if (!instanceRef.value) return

    instanceRef.value.destroy()
    instanceRef.value = undefined
  }

  watch(
    options,
    (newOptions) => {
      const instance = unref(instanceRef)
      if (instance) {
        instance.setOptions(newOptions)
      }
    },
    {
      deep: true
    }
  )

  watch(
    [referenceElementRef, popperElementRef],
    ([referenceElement, popperElement]) => {
      destroy()
      if (!referenceElement || !popperElement) return

      instanceRef.value = createPopper(
        referenceElement,
        popperElement,
        unref(options)
      )
    }
  )

  onBeforeUnmount(() => {
    destroy()
  })

  return {
    state: computed(() => ({ ...(unref(instanceRef)?.state || {}) })),
    styles: computed(() => unref(states).styles),
    attributes: computed(() => unref(states).attributes),
    update: () => unref(instanceRef)?.update(),
    forceUpdate: () => unref(instanceRef)?.forceUpdate(),
    // Preventing end users from modifying the instance.
    instanceRef: computed(() => unref(instanceRef))
  }
}

function deriveState (state) {
  const elements = Object.keys(state.elements)
  const attributes = {}
  const styles = {}

  for (const ele of elements) {
    attributes[ele] = state.attributes[ele]
    styles[ele] = state.styles[ele] || {}
  }

  return {
    styles,
    attributes
  }
}
