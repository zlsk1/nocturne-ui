<template>
  <div
    ref="formItemRef"
    :class="[ns.b(), labelPosition === 'top' ? ns.m('top') : '']"
  >
    <div
      v-if="label"
      ref="labelRef"
      :class="[
        ns.e('label'),
        ns.is('mark', required && formContext.requiredMark)
      ]"
      :style="labelStyle"
    >
      <label :for="labelId">{{ label }}</label>
    </div>
    <div
      :class="ns.e('content')"
      :style="{
        marginLeft: !label ? `${formContext.maximumLabelWidth}px` : ''
      }"
    >
      <slot />
      <transition :name="`${ns.ns.value}-zoom-in-top`">
        <div v-if="invalidMessage" :class="ns.e('error')">
          {{ invalidMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  inject,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  toRefs
} from 'vue'
import Schema from 'async-validator'
import { castArray, clone } from 'lodash'
import { useId, useNamespace } from '@/composables'
import { getProp, isArray, isString, isUndefined } from '@/utils'
import { FORMITEM_INJECTION_KEY, FORM_INJECTION_KEY } from './constants'
import { formItemProps } from './form-item'
import type { Arrayable } from '@/utils'
import type { RuleItem } from 'async-validator'
import type {
  FormItemRule,
  FormValidateFailure,
  NFormItemInjectionContext,
  TriggerType
} from './types'

defineOptions({
  name: 'NFormItem'
})

const props = defineProps(formItemProps)

const ns = useNamespace('form-item')

const formContext = inject(FORM_INJECTION_KEY, undefined)!

const invalidMessage = ref('')
const labelRef = ref<HTMLElement | null>(null)
const validateStatus = ref<boolean>(true)
const formItemRef = ref<HTMLDivElement | null>(null)

let initialValue: any = null
const labelId = useId().value

const formItemValue = computed(() => {
  if (!props.prop || !formContext.model) {
    return
  }
  return getProp(formContext.model, props.prop).value
})

const labelWidth = computed(
  () => labelRef.value?.getBoundingClientRect().width!
)

const widthDiff = computed(
  () => formContext.maximumLabelWidth - labelWidth.value
)

const labelPosition = computed(
  () => props.labelPosition ?? formContext.labelPosition
)

const formItemWidth = computed(() => {
  if (formContext.labelWidth) {
    if (isString(formContext.labelWidth)) {
      return formContext.labelWidth
    }
    return `${formContext.labelWidth}px`
  } else if (props.labelWidth) {
    if (isString(props.labelWidth)) {
      return props.labelWidth
    }
    return `${props.labelWidth}px`
  }
  return ''
})

const labelStyle = computed(() => {
  if (labelPosition.value === 'left') {
    return {
      width: formItemWidth.value,
      marginRight: `${widthDiff.value}px`
    }
  } else if (labelPosition.value === 'right') {
    return {
      width: formItemWidth.value,
      marginLeft: `${widthDiff.value}px`
    }
  }
  return {
    width: formItemWidth.value
  }
})

const actualDisabled = computed(() => formContext.disabled || props.disabled)

const required = computed(() => {
  if (!formContext.rules || isUndefined(props.prop)) {
    return false
  }
  if (
    props.required ||
    getProp<FormItemRule[]>(formContext.rules, propString.value).value.some(
      (v) => v.required
    )
  ) {
    return true
  }

  return false
})

const propString = computed(() => {
  if (!props.prop) return ''
  return isString(props.prop) ? props.prop : props.prop.join('.')
})

const validate: NFormItemInjectionContext['validate'] = async (
  trigger,
  callback
) => {
  if (isUndefined(props.prop) || isUndefined(formContext.rules)) return false
  const rules = filterRules(
    trigger,
    getProp<Arrayable<FormItemRule>>(formContext.rules, props.prop).value
  )

  if (rules.length === 0) {
    callback?.(true)
    return true
  }

  return handleValidate(rules)
    .then(() => {
      callback?.(true)

      return true
    })
    .catch((err) => {
      callback?.(false, err.fields)

      return Promise.reject(err.fields)
    })
}

const handleValidate = async (rules: RuleItem[]): Promise<boolean> => {
  const key = propString.value

  const validator = new Schema({ [key]: rules })

  return validator
    .validate({ [key]: formItemValue.value }, { firstFields: true })
    .then(() => {
      handleSuccessStatus()
      return true
    })
    .catch((err: FormValidateFailure) => {
      handleFailStatus(err)
      return Promise.reject(err)
    })
}

const resetField = () => {
  if (!formContext.model || !props.prop) return

  const value = getProp(formContext.model, props.prop)
  value.value = clone(initialValue)

  nextTick(() => {
    invalidMessage.value = ''
    validateStatus.value = true
  })
}

const filterRules = (
  trigger: string = 'blur',
  rules: Arrayable<FormItemRule>
): RuleItem[] => {
  return (
    castArray(rules)
      .filter((rule) => {
        if (!trigger || !rule.trigger) return true
        if (isArray(rule.trigger)) {
          return rule.trigger.includes(trigger as TriggerType)
        } else {
          return rule.trigger === trigger
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ trigger, ...rule }) => rule)
  )
}

const handleFailStatus = (err: FormValidateFailure) => {
  const { errors, fields } = err
  if (!errors || !fields) {
    console.error(err)
  }
  invalidMessage.value = errors
    ? (errors?.[0].message ?? `${props.prop} is required`)
    : ''
  validateStatus.value = false
  formContext?.emit('validate', props.prop!, false, invalidMessage.value)
}

const handleSuccessStatus = () => {
  invalidMessage.value = ''
  validateStatus.value = true
  formContext?.emit('validate', props.prop!, true, '')
}

const clearValidate = () => {
  handleSuccessStatus()
}

onMounted(() => {
  formContext.addField(formItemContext)
  initialValue = clone(formItemValue.value)
})

const formItemContext = reactive({
  ...toRefs(props),
  $el: computed(() => formItemRef.value),
  labelId,
  labelWidth,
  actualDisabled,
  validateStatus,
  validate,
  resetField,
  clearValidate
})

provide(FORMITEM_INJECTION_KEY, formItemContext)

defineExpose({
  validate,
  resetField,
  clearValidate
})
</script>
