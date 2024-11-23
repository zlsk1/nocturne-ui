import { nextTick, ref } from 'vue'

export type CompositionType = {
  emit?: ((event: 'compositionstart', evt: CompositionEvent) => void) &
    ((event: 'compositionupdate', evt: CompositionEvent) => void) &
    ((event: 'compositionend', evt: CompositionEvent) => void)
  afterComposition: (event: CompositionEvent) => void
}

export const useComposition = ({ emit, afterComposition }: CompositionType) => {
  const isComposed = ref(false)

  const handleCompositionStart = (event: CompositionEvent) => {
    emit?.('compositionstart', event)
    isComposed.value = true
  }

  const hadnleCompositionEnd = (event: CompositionEvent) => {
    emit?.('compositionend', event)
    isComposed.value = isComposed.value ? false : true
    nextTick(() => afterComposition(event))
  }

  const handleCompositionUpdate = (event: CompositionEvent) => {
    emit?.('compositionupdate', event)
  }

  return {
    isComposed,

    handleCompositionStart,
    hadnleCompositionEnd,
    handleCompositionUpdate
  }
}
