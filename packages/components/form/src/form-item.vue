<template>
  <div :class="[ns.b(), labelPosition === 'top' ? ns.m('top') : '']">
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
    <div :class="ns.e('content')">
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
  toRef
} from 'vue'
import Schema from 'async-validator'
import { clone } from 'lodash'
import { useId, useNamespace } from '@/composables'
import { getProp, isString, isUndefined } from '@/utils'
import { FORMITEM_INJECTION_KEY, FORM_INJECTION_KEY } from './constants'
import { formItemProps } from './form-item'
import type { RuleItem } from 'async-validator'
import type { NFormItemInjectionContext, RuleItemWithTrigger } from './types'

defineOptions({
  name: 'NFormItem'
})

const props = defineProps(formItemProps)

const ns = useNamespace('form-item')

const formContext = inject(FORM_INJECTION_KEY, undefined)!

const invalidMessage = ref('')
const labelRef = ref<HTMLElement | null>(null)
const validateStatus = ref<boolean>(true)

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

const widthDiff = computed(() => formContext.maxLabelWidth - labelWidth.value)

const labelPosition = computed(
  () => props.labelPosition ?? formContext.labelPosition
)

const propWidth = computed(() => {
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
      width: propWidth.value,
      marginRight: `${widthDiff.value}px`
    }
  } else if (labelPosition.value === 'right') {
    return {
      width: propWidth.value,
      marginLeft: `${widthDiff.value}px`
    }
  }
  return {
    width: propWidth.value
  }
})

const actualDisabled = computed(() => formContext.disabled || props.disabled)

const required = computed(() => {
  if (!formContext.rules || isUndefined(props.prop)) {
    return false
  }
  if (
    formContext.rules[props.prop].required ||
    formContext.rules[props.prop].some(
      (ruleItem: RuleItem) => ruleItem.required
    )
  ) {
    return true
  }

  return false
})

const validate: NFormItemInjectionContext['validate'] = async (callback) => {
  if (isUndefined(props.prop)) return
  const rules = filterRules(formContext.rules?.[props.prop])

  if (rules.length === 0) {
    callback?.(true)
    return true
  }

  return handleValidate(rules)
    .then(() => {
      formContext.emit('validate', props.prop!, true, '')
      callback?.(true)
      handleSuccessStatus()
    })
    .catch((err) => {
      callback?.(false, err.fields)

      handleFailStatus(err.fields[props.prop!][0].message)

      formContext.emit(
        'validate',
        props.prop!,
        true,
        err.fields[props.prop!][0].message
      )
      return Promise.reject(err.fields)
    })
}

const handleValidate = async (rules: RuleItem[]): Promise<boolean> => {
  const key = props.prop!
  const validator = new Schema({ [key]: rules })
  return validator
    .validate({ [key]: formItemValue.value }, { firstFields: true })
    .then(() => {
      return true
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const resetField = async () => {
  if (!formContext.model || !props.prop) return

  const value = getProp(formContext.model, props.prop)
  value.value = clone(initialValue)
  await nextTick()

  invalidMessage.value = ''
  validateStatus.value = true
}

const filterRules = (rules: RuleItemWithTrigger[]): RuleItem[] => {
  return (
    rules
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ trigger, ...rule }) => rule)
  )
}

const handleFailStatus = (message: string) => {
  invalidMessage.value = message
  validateStatus.value = false
}

const handleSuccessStatus = () => {
  invalidMessage.value = ''
  validateStatus.value = true
}

const clearValidate = () => {
  handleSuccessStatus()
}

onMounted(() => {
  formContext.addField(formItemContext)
  initialValue = clone(formItemValue.value)
})

const formItemContext = reactive({
  disabled: toRef(props, 'disabled'),
  prop: toRef(props, 'prop'),
  size: toRef(props, 'size'),
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
  ...props,
  validate,
  resetField,
  clearValidate
})
</script>
