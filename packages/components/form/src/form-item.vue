<template>
  <div :class="['n-form-item', labelPosition === 'top' ? 'n-form-item--top' : '']">
    <div
      v-if="label"
      ref="labelRef"
      class="n-form-item__label"
      :style="labelStyle"
    >
      <label :for="labelId">{{ label }}</label>
    </div>
    <div class="n-form-item__content">
      <slot></slot>
      <transition name="n-zoom-in-top">
        <div v-if="invalidMessage" class="n-form-item__error">{{ invalidMessage }}</div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, provide, ref, onMounted, nextTick, computed, reactive, toRefs } from 'vue'
import { FORM_INJECTION_KEY, FORMITEM_INJECTION_KEY } from './constants'
import { formItemProps } from './form-item'
import { useId } from '@/composables'
import { getProp, isString } from '@/utils'
import Schema from 'async-validator'
import { clone } from 'lodash'

import type { RuleItem } from 'async-validator'
import type { RuleItemWithTrigger, NFormItemInjectionContext } from './types'

defineOptions({
  name: 'NFormItem'
})

const props = defineProps(formItemProps)

const formContext = inject(FORM_INJECTION_KEY, undefined)!

const invalidMessage = ref('')
const labelRef = ref<HTMLElement>()

let initialValue: any = null
const labelId = useId().value

const formItemValue = computed(() => {
  if (!props.prop || !formContext.model) {
    return
  }
  return getProp(formContext.model, props.prop).value
})

const labelWidth = computed(() => labelRef.value?.getBoundingClientRect().width!)

const widthDiff = computed(() => formContext.maxLabelWidth - labelWidth.value)

const labelPosition = computed(() => formContext.labelPosition || props.labelPosition)

const propWidth = computed(() => {
  if (formContext.labelWidth) {
    if (isString(formContext.labelWidth)) {
      return formContext.labelWidth
    }
    else {
      return formContext.labelWidth + 'px'
    }
  }
  else if (props.labelWidth) {
    if (isString(props.labelWidth)) {
      return props.labelWidth
    }
    else {
      return props.labelWidth + 'px'
    }
  }
  return ''
})

const labelStyle = computed(() => {
  if (labelPosition.value === 'left') {
    return {
      width: propWidth.value,
      marginLeft: widthDiff.value + 'px'
    }
  }
  else if (labelPosition.value === 'right') {
    return {
      width: propWidth.value,
      marginRight: widthDiff.value + 'px'
    }
  }
  return {
    width: propWidth.value
  }
})

onMounted(() => {
  if (props.prop) {
    formContext.addField(formItemContext)
    initialValue = clone(formItemValue.value)
  }
})

const validate: NFormItemInjectionContext['validate'] = async(callback) => {
  const rules = filterRules(formContext.rules?.[props.prop!])

  if (rules.length === 0) {
    callback?.(true)
    return true
  }

  return handleValidate(rules)
    .then(() => {
      callback?.(true)
      handleSuccessStatus()
    })
    .catch(err => {
      callback?.(false, err.fields)
      handleFailStatus(err.fields[props.prop!][0].message)
      console.warn(err.fields)
      return Promise.reject(err.fields)
    })
}

const handleValidate = async(rules: RuleItem[]): Promise<boolean> => {
  const key = props.prop!
  const validator = new Schema({ [key]: rules })
  return validator
    .validate({ [key]: formItemValue.value }, { firstFields: true })
    .then(() => {
      return true
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

const resetField = async() => {
  if (!formContext.model || !props.prop) return

  const value = getProp(formContext.model, props.prop)
  value.value = clone(initialValue)
  await nextTick()

  invalidMessage.value = ''
}

const filterRules = (rules: RuleItemWithTrigger[]): RuleItem[] => {
  return rules
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ trigger, ...rule }) => rule)
}

const handleFailStatus = (message: string) => {
  invalidMessage.value = message
}

const handleSuccessStatus = () => {
  invalidMessage.value = ''
}

const clearField = () => {
  handleSuccessStatus()
}

const formItemContext = reactive({
  ...toRefs(props),
  labelId,
  labelWidth,
  validate,
  resetField,
  clearField
})

provide(FORMITEM_INJECTION_KEY, formItemContext)

defineExpose({
  ...props,
  validate,
  resetField,
  clearField
})
</script>
