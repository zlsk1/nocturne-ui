import { inject } from 'vue'
import { FORMITEM_INJECTION_KEY, FORM_INJECTION_KEY } from '../constants'

export const useFormItemId = () => {
  const { labelId } = inject(FORMITEM_INJECTION_KEY, undefined)!
  return labelId
}
export const useForm = () => {
  const formItem = inject(FORMITEM_INJECTION_KEY, undefined)!
  const form = inject(FORM_INJECTION_KEY, undefined)!

  return { formItem, form }
}
