import { isArray } from '@/utils'
import { useCheckboxDisabled } from './use-checkbox-disabled'
import { useCheckboxEvent } from './use-checkbox-event'
import { useCheckboxModel } from './use-checkbox-model'
import { useCheckboxStatus } from './use-checkbox-status'
import type { ComponentInternalInstance } from 'vue'

import type { CheckboxProps } from '../src/checkbox'

export const useCheckbox = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots']
) => {
  const { model, isLimitExceeded } = useCheckboxModel(props)
  const {
    isFocused,
    isChecked,
    checkboxButtonSize,
    checkboxSize,
    hasOwnLabel,
    actualValue
  } = useCheckboxStatus(props, slots, { model })
  const { isDisabled } = useCheckboxDisabled({
    model,
    isChecked,
    disabled: props.disabled
  })
  const { handleChange, onClickRoot } = useCheckboxEvent(props, {
    model,
    isLimitExceeded,
    hasOwnLabel,
    isDisabled
  })

  const setStoreValue = () => {
    function addToStore() {
      if (
        isArray(model.value) &&
        !model.value.includes(actualValue.value as never)
      ) {
        model.value.push(actualValue.value as never)
      } else {
        model.value = props.trueValue ?? true
      }
    }
    props.checked && addToStore()
  }

  setStoreValue()

  return {
    isChecked,
    isDisabled,
    isFocused,
    checkboxButtonSize,
    checkboxSize,
    hasOwnLabel,
    model,
    actualValue,
    handleChange,
    onClickRoot
  }
}
