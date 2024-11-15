<template>
  <div :class="ns.b()">
    <slot name="default" />
  </div>
</template>

<script lang="ts" setup>
import { type Ref, computed, provide, reactive, ref, toRefs } from 'vue'
import { formEmit, formProps } from './form'
import { FORM_INJECTION_KEY } from './constants'

import type { Callback, NFormItemInjectionContext } from './types'
import type { ValidateFieldsError } from 'async-validator'
import type { FormItemProps } from './form-item'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NForm'
})

const props = defineProps(formProps)
defineEmits(formEmit)

const ns = useNamespace('form')

const fields: Ref<NFormItemInjectionContext[]> = ref([])

const maxLabelWidth = computed(() => {
  if (fields.value.length === 0) return 0

  return fields.value
    .map((v) => v.labelWidth)
    .reduce((prev, next) => {
      const max = Math.max(prev, next)
      return max
    })
})

const validate = (callback: Callback): Promise<boolean> =>
  handleValidate(callback)

const handleValidate = async (callback: Callback): Promise<boolean> => {
  let validateErrors: ValidateFieldsError = {}
  for (const field of fields.value) {
    try {
      await field.validate()
    } catch (field) {
      validateErrors = {
        ...validateErrors,
        ...(field as ValidateFieldsError)
      }
    }
  }

  if (Object.keys(validateErrors).length === 0) {
    callback(true)
    return true
  } else {
    callback(false, validateErrors)
    return Promise.reject(validateErrors)
  }
}

const resetField = () => {
  for (const field of fields.value) {
    field.resetField()
  }
}

const addField = (formItemContext: NFormItemInjectionContext) => {
  fields.value.push(formItemContext)
}

const clearField = (prop: FormItemProps['prop']) => {
  const field = fields.value.find((field) => field.prop === prop)
  if (field === undefined) return
  field.clearField()
}

provide(
  FORM_INJECTION_KEY,
  reactive({
    ...toRefs(props),
    addField,
    maxLabelWidth
  })
)

defineExpose({
  validate,
  resetField,
  clearField
})
</script>
