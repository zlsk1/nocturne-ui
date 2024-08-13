import { inject } from 'vue'
import { FORMITEM_INJECTION_KEY, FORM_INJECTION_KEY } from '../constants'

export const useFormItemId = () => {
  const formItemContext = inject(FORMITEM_INJECTION_KEY, undefined)

  return formItemContext?.labelId
}
export const useForm = () => {
  const formItem = inject(FORMITEM_INJECTION_KEY, undefined)!
  const form = inject(FORM_INJECTION_KEY, undefined)!

  return { formItem, form }
}
