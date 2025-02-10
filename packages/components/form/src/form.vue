<template>
  <div ref="formRef" :class="[ns.b(), ns.is('inline', inline)]">
    <slot name="default" />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, ref, toRefs } from 'vue'
import { castArray } from 'lodash'
import { useNamespace } from '@/composables'
import { formEmit, formProps } from './form'
import { FORM_INJECTION_KEY } from './constants'

import type {
  FormClearValidate,
  FormItemProp,
  FormScrollToField,
  FormValidateCallback,
  FormValidateField,
  NFormInjectionContext,
  NFormItemInjectionContext
} from './types'
import type { ValidateFieldsError } from 'async-validator'
import type { Ref } from 'vue'

defineOptions({
  name: 'NForm'
})

const props = defineProps(formProps)
const emit = defineEmits(formEmit)

const ns = useNamespace('form')

const fields: Ref<NFormItemInjectionContext[]> = ref([])
const formRef = ref<HTMLElement | null>(null)

const maximumLabelWidth = computed(() => {
  if (fields.value.length === 0) return 0

  return fields.value
    .filter((v) => v.labelWidth ?? 0)
    .map((v) => v.labelWidth)
    .reduce((prev, next) => {
      const max = Math.max(prev, next)
      return max
    }, 0)
})

const filterFields = (
  fields: NFormItemInjectionContext[],
  props: FormItemProp
) => {
  const normalized = castArray<FormItemProp>(props)
  return normalized.length > 0
    ? fields.filter((field) => field.prop && normalized.includes(field.prop))
    : fields
}

const validate = (callback?: FormValidateCallback): Promise<boolean> =>
  validateField(undefined, callback)

const handleValidate = async (
  props?: FormItemProp,
  callback?: FormValidateCallback
): Promise<boolean> => {
  let validateErrors: ValidateFieldsError = {}

  const filteredFields = props
    ? filterFields(fields.value, props)
    : fields.value
  if (filteredFields.length === 0) return true

  for (const field of filteredFields) {
    try {
      await field.validate('')
    } catch (errors) {
      validateErrors = {
        ...validateErrors,
        ...(errors as ValidateFieldsError)
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

const addField: NFormInjectionContext['addField'] = (formItemContext) => {
  fields.value.push(formItemContext)
}

const clearValidate: FormClearValidate = (props = []) => {
  filterFields(fields.value, props).forEach((field) => field.clearValidate())
}

const validateField: FormValidateField = async (props = [], callback) => {
  try {
    const result = await handleValidate(props)
    if (result === true) {
      await callback?.(result)
    }
    return result
  } catch (e) {
    if (e instanceof Error) throw e

    const invalidFields = e as ValidateFieldsError

    await callback?.(false, invalidFields)
    return Promise.reject(invalidFields)
  }
}

const scrollToField: FormScrollToField = (prop, options) => {
  const field = filterFields(fields.value, prop)[0]
  if (field) {
    field.$el?.scrollIntoView(options)
  }
}

provide(
  FORM_INJECTION_KEY,
  reactive({
    maximumLabelWidth,
    ...toRefs(props),
    emit,
    addField
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
