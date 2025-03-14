import { getCurrentInstance, ref, watch } from 'vue'
import { useZIndex } from '@nocturne-ui/composables'
import type { DialogEmits, DialogProps } from './dialog'
import type { SetupContext } from 'vue'

export const useDialog = (props: DialogProps) => {
  const instance = getCurrentInstance()!
  const emit = instance.emit as SetupContext<DialogEmits>['emit']

  const { nextZIndex } = useZIndex()

  const shouldRender = ref(false)
  const zIndex = ref(props.zIndex ?? nextZIndex())

  const onLeave = () => {
    if (props.destroyOnClose) {
      shouldRender.value = false
      emit('close')
    }
  }

  const clickMaskerToClose = () => {
    if (props.clickMaskerToClose) {
      emit('update:modelValue', false)
    }
  }

  const handleCancel = (e: MouseEvent) => {
    emit('update:modelValue', false)
    emit('cancel', e)
  }

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        zIndex.value++
        shouldRender.value = true
      }
    },
    { immediate: true }
  )

  return {
    shouldRender,
    zIndex,
    onLeave,
    clickMaskerToClose,
    handleCancel
  }
}
