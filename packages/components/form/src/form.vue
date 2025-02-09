<template>
  <div ref="formRef" :class="ns.b()">
    <slot name="default" />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, ref, toRef } from 'vue'
import { useNamespace } from '@/composables'
import { isArray, isNil, isUndefined } from '@/utils'
import { formEmit, formProps } from './form'
import { FORM_INJECTION_KEY } from './constants'

import type { FormValidateCallback, NFormItemInjectionContext } from './types'
import type { ValidateFieldsError } from 'async-validator'
import type { FormItemProps } from './form-item'
import type { Arrayable } from '@/utils'
import type { Ref } from 'vue'

defineOptions({
  name: 'NForm'
})

const props = defineProps(formProps)
const emit = defineEmits(formEmit)

const ns = useNamespace('form')

const fields: Ref<NFormItemInjectionContext[]> = ref([])
const formRef = ref<HTMLElement | null>(null)

const maxLabelWidth = computed(() => {
  if (fields.value.length === 0) return 0

  return fields.value
    .filter((v) => v.labelWidth ?? 0)
    .map((v) => v.labelWidth)
    .reduce((prev, next) => {
      const max = Math.max(prev, next)
      return max
    })
})

const validate = (callback?: FormValidateCallback): Promise<boolean> =>
  handleValidate(
    fields.value.map((field) => field.prop),
    callback
  )

const handleValidate = async (
  props: Arrayable<FormItemProps['prop']>,
  callback?: FormValidateCallback
): Promise<boolean> => {
  let validateErrors: ValidateFieldsError = {}
  if (isArray(props)) {
    for (const prop of props) {
      const field = fields.value.find((field) => field.prop === prop)
      try {
        if (!isNil(field)) {
          await field.validate()
        }
      } catch (field) {
        validateErrors = {
          ...validateErrors,
          ...(field as ValidateFieldsError)
        }
      }
    }
  } else {
    try {
      const field = fields.value.find((field) => field.prop === props)
      if (!isUndefined(field)) await field.validate()
    } catch (fields) {
      validateErrors = {
        ...validateErrors,
        ...(fields as ValidateFieldsError)
      }
    }
  }

  if (Object.keys(validateErrors).length === 0) {
    callback?.(true)
    return true
  } else {
    callback?.(false, validateErrors)
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

const clearValidate = (props: Arrayable<FormItemProps['prop']>) => {
  if (isArray(props)) {
    for (const prop of props) {
      const field = fields.value.find((field) => field.prop === prop)
      if (!isNil(field)) {
        field.clearValidate()
      }
    }
    return
  }

  const field = fields.value.find((field) => field.prop === props)
  if (field === undefined) return
  field.clearValidate()
}

const validateField = (
  props: Arrayable<FormItemProps['prop']>,
  callback?: FormValidateCallback
) => handleValidate(props, callback)

const scrollToField = (prop: string, options: ScrollIntoViewOptions) => {
  const field = fields.value.find((field) => field.prop === prop)
  formRef.value?.querySelector(`#${field?.labelId}`)?.scrollIntoView(options)
}

provide(
  FORM_INJECTION_KEY,
  reactive({
    size: toRef(props, 'size'),
    model: toRef(props, 'model'),
    rules: toRef(props, 'rules'),
    requiredMark: toRef(props, 'requiredMark'),
    disabled: toRef(props, 'disabled'),
    labelWidth: toRef(props, 'labelWidth'),
    labelPosition: toRef(props, 'labelPosition'),
    emit,
    addField,
    maxLabelWidth
  })
)

defineExpose({
  validate,
  /**
   * @description Reset all fields in the form, remove validation result
   */
  resetField,
  /**
   * @description Clear validation result of the specified field
   */
  clearValidate,
  /**
   * @description Validate the specified field
   */
  validateField,
  /**
   * @description Scroll to the specified field, if the field is not unique,
   * scroll to the first field
   */
  scrollToField
})
</script>
