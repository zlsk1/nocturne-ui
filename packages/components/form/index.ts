import { withInstall } from '@/utils'
import form from './src/form.vue'
import formItem from './src/form-item.vue'

export * from './src/form'
export * from './src/form-item'
export * from './src/composables/use-form-item'
export * from './src/types'
export const NForm = withInstall(form)
export const NFormItem = withInstall(formItem)
