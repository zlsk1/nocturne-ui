import { computed, inject } from 'vue'
import { isUndefined } from '@/utils'
import { useFormItem } from '@/components/form'
import { checkboxGroupContextKey } from '../constants'

import type { CheckboxModel, CheckboxStatus } from '../composables'
import type { CheckboxProps } from '../checkbox'

export const useCheckboxDisabled = ({
  model,
  isChecked,
  disabled
}: Pick<CheckboxModel, 'model'> &
  Pick<CheckboxStatus, 'isChecked'> &
  Pick<CheckboxProps, 'disabled'>) => {
  const { formItemDisabled } = useFormItem()
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)

  const isLimitDisabled = computed(() => {
    const max = checkboxGroup?.max?.value
    const min = checkboxGroup?.min?.value
    return (
      (!isUndefined(max) && model.value.length >= max && !isChecked.value) ||
      (!isUndefined(min) && model.value.length <= min && isChecked.value)
    )
  })

  const isDisabled = computed(
    () =>
      checkboxGroup?.disabled.value ||
      disabled ||
      formItemDisabled.value ||
      isLimitDisabled.value
  )

  return {
    isDisabled,
    isLimitDisabled
  }
}

export type CheckboxDisabled = ReturnType<typeof useCheckboxDisabled>
