import { computed, inject, ref, toRaw } from 'vue'
import { isEqual } from 'lodash'
import { useFormItem } from '@/components/form'
import { isArray, isBoolean, isNil, isObject, isPropAbsent } from '@/utils'
import { checkboxGroupContextKey } from '../constants'

import type { ComponentInternalInstance } from 'vue'
import type { CheckboxProps } from '../checkbox'
import type { CheckboxModel } from '../composables'

export const useCheckboxStatus = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots'],
  { model }: Pick<CheckboxModel, 'model'>
) => {
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  const { formItemSize } = useFormItem()
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

  const checkboxButtonSize = computed(
    () => formItemSize.value || checkboxGroup?.size?.value
  )
  const checkboxSize = computed(
    () => formItemSize.value || checkboxGroup?.size?.value
  )

  const hasOwnLabel = computed<boolean>(() => {
    return !!slots.default || !isPropAbsent(actualValue.value)
  })

  const buttonType = computed(() => checkboxGroup?.buttonType?.value)

  return {
    checkboxButtonSize,
    isChecked,
    isFocused,
    checkboxSize,
    hasOwnLabel,
    actualValue,
    buttonType
  }
}

export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>
