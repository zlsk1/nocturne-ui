import { computed, getCurrentInstance, inject, ref } from 'vue'
import { isArray, isUndefined } from '@/utils'
import { checkboxGroupContextKey } from '../src/constants'

import type { CheckboxProps } from '../src/checkbox'

export const useCheckboxModel = (props: CheckboxProps) => {
  const selfModel = ref<unknown>(false)
  const { emit } = getCurrentInstance()!
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  const isGroup = computed(() => isUndefined(checkboxGroup) === false)
  const isLimitExceeded = ref(false)
  const model = computed<any>({
    get() {
      return isGroup.value
        ? checkboxGroup?.modelValue?.value
        : (props.modelValue ?? selfModel.value)
    },

    set(val: unknown) {
      if (isGroup.value && isArray(val)) {
        isLimitExceeded.value =
          checkboxGroup?.max?.value !== undefined &&
          val.length > checkboxGroup?.max.value &&
          val.length > model.value.length
        isLimitExceeded.value === false && checkboxGroup?.changeEvent?.(val)
      } else {
        emit('update:modelValue', val)
        selfModel.value = val
      }
    }
  })

  return {
    model,
    isGroup,
    isLimitExceeded
  }
}

export type CheckboxModel = ReturnType<typeof useCheckboxModel>
