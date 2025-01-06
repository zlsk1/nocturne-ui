import { inject } from 'vue'
import { useId } from '@/composables'
import { FORMITEM_INJECTION_KEY, FORM_INJECTION_KEY } from '../constants'

export const useFormItem = () => {
  const formItem = inject(FORMITEM_INJECTION_KEY, undefined)
  const form = inject(FORM_INJECTION_KEY, undefined)
  const id = useId()

  return {
    formItemId: formItem?.labelId || id.value,
    formItemDisabled: formItem?.disabled || form?.disabled,
    formItemSize: formItem?.size || form?.size
  }
}
export const useForm = () => {
  const formItem = inject(FORMITEM_INJECTION_KEY, undefined)!
  const form = inject(FORM_INJECTION_KEY, undefined)!

  return { formItem, form }
}
