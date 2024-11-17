import { computed, inject, ref, toRaw } from 'vue'
import { isEqual } from 'lodash'
import { checkboxGroupContextKey } from '../src/constants'

import type { ComponentInternalInstance } from 'vue'
import type { CheckboxProps } from '../src/checkbox'
import type { CheckboxModel } from '../composables'
import { isArray, isBoolean, isNil, isObject, isPropAbsent } from '@/utils'

export const useCheckboxStatus = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots'],
  { model }: Pick<CheckboxModel, 'model'>
) => {
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  const isFocused = ref(false)
  const actualValue = computed(() => {
    if (!isPropAbsent(props.value)) {
      return props.value
    }
    return props.label
  })
  const isChecked = computed<boolean>(() => {
    const value = model.value
    if (isBoolean(value)) {
      return value
    } else if (isArray(value)) {
      if (isObject(actualValue.value)) {
        return value.map(toRaw).some((o) => isEqual(o, actualValue.value))
      } else {
        return value.map(toRaw).includes(actualValue.value as never)
      }
    } else if (!isNil(value)) {
      return value === props.trueValue
    } else {
      return !!value
    }
  })

  const checkboxButtonSize = computed(() => checkboxGroup?.size?.value)
  const checkboxSize = computed(() => checkboxGroup?.size?.value)

  const hasOwnLabel = computed<boolean>(() => {
    return !!slots.default || !isPropAbsent(actualValue.value)
  })

  return {
    checkboxButtonSize,
    isChecked,
    isFocused,
    checkboxSize,
    hasOwnLabel,
    actualValue
  }
}

export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>
