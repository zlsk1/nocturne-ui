import { inject } from 'vue'
import { FORMITEM_INJECTION_KEY } from '../constants'

export const useFormItemId = () => {
  const { labelId } = inject(FORMITEM_INJECTION_KEY, undefined)!
  return labelId
}
