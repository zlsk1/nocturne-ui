import { computed, inject } from 'vue'
import { isUndefined } from '@/utils'
import { checkboxGroupContextKey } from '../src/constants'

import type { CheckboxModel, CheckboxStatus } from '../composables'
import type { CheckboxProps } from '../src/checkbox'

export const useCheckboxDisabled = ({
  model,
  isChecked,
  disabled
}: Pick<CheckboxModel, 'model'> & Pick<CheckboxStatus, 'isChecked'> & Pick<CheckboxProps, 'disabled'>) => {
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)

  const isLimitDisabled = computed(() => {
    const max = checkboxGroup?.max?.value
    const min = checkboxGroup?.min?.value
    return (
      (!isUndefined(max) && model.value.length >= max && !isChecked.value) ||
      (!isUndefined(min) && model.value.length <= min && isChecked.value)
    )
  })

  const isDisabled = computed(() => checkboxGroup?.disabled.value || disabled || isLimitDisabled.value)

  return {
    isDisabled,
    isLimitDisabled
  }
}

export type CheckboxDisabled = ReturnType<typeof useCheckboxDisabled>
