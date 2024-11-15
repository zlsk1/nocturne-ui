import form from './src/form.vue'
import formItem from './src/form-item.vue'
import { withInstall } from '@/utils'

export * from './src/form'
export * from './src/composables/use-form-item'
export const NForm = withInstall(form)
export const NFormItem = withInstall(formItem)
