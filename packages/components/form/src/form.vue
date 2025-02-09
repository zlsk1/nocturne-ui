<template>
  <div ref="formRef" :class="[ns.b(), ns.is('inline', inline)]">
    <slot name="default" />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, ref, toRefs } from 'vue'
import { isEqual } from 'lodash'
import { useNamespace } from '@/composables'
import { isUndefined } from '@/utils'
import { formEmit, formProps } from './form'
import { FORM_INJECTION_KEY } from './constants'

import type {
  FormItemProp,
  FormValidateCallback,
  NFormItemInjectionContext
} from './types'
import type { ValidateFieldsError } from 'async-validator'
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

const validate = (callback?: FormValidateCallback): Promise<boolean> =>
  handleValidate(callback)

const handleValidate = async (
  callback?: FormValidateCallback,
  props?: Arrayable<FormItemProp>
): Promise<boolean> => {
  let validateErrors: ValidateFieldsError = {}
  if (props) {
    for (const prop of props) {
      const field = fields.value.find((field) => isEqual(field.prop, prop))
      try {
        if (!isUndefined(field)) {
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
    for (const field of fields.value) {
      try {
        if (!isUndefined(field)) {
          await field.validate()
        }
      } catch (error) {
        validateErrors = {
          ...validateErrors,
          ...(error as ValidateFieldsError)
        }
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

const clearValidate = (props: FormItemProp) => {
  const field = fields.value.find((field) => isEqual(field.prop, props))
  if (field === undefined) return
  field.clearValidate()
}

const validateField = (props: FormItemProp, callback?: FormValidateCallback) =>
  handleValidate(callback, props)

const scrollToField = (prop: string, options?: ScrollIntoViewOptions) => {
  const field = fields.value.find((field) => field.prop === prop)
  formRef.value?.querySelector(`#${field?.labelId}`)?.scrollIntoView(options)
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
