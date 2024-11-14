<template>
  <div :class="ns.b()">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, toRefs, reactive, computed, ref, type Ref } from 'vue'
import { formProps, formEmit } from './form'
import { FORM_INJECTION_KEY } from './constants'
import { useNamespace } from '@/composables'

import type { NFormItemInjectionContext, Callback } from './types'
import type { ValidateFieldsError } from 'async-validator'
import type { FormItemProps } from './form-item'

defineOptions({
  name: 'NForm'
})

const props = defineProps(formProps)
const emit = defineEmits(formEmit)

const ns = useNamespace('form')

const fields: Ref<NFormItemInjectionContext[]> = ref([])

const maxLabelWidth = computed(() => {
  if (fields.value.length === 0) return 0

  return fields.value
    .map(v => v.labelWidth)
    .reduce((prev, next) => {
      const max = Math.max(prev, next)
      return max
    })
})

const validate = (callback: Callback): Promise<boolean> => handleValidate(callback)

const handleValidate = async(callback: Callback): Promise<boolean> => {
  let validateErrors: ValidateFieldsError = {}
  for (const field of fields.value) {
    try {
      await field.validate()
    }
    catch (field) {
      validateErrors = {
        ...validateErrors,
        ...field as ValidateFieldsError
      }
    }
  }

  if (Object.keys(validateErrors).length === 0) {
    callback(true)
    return true
  }
  else {
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
  const field = fields.value.find(field => field.prop === prop)
  if (field === undefined) return
  field.clearField()
}

provide(FORM_INJECTION_KEY,
  reactive({
    ...toRefs(props),
    addField,
    maxLabelWidth
  }))

defineExpose({
  validate,
  resetField,
  clearField
})
</script>
