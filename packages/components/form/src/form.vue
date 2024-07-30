<template>
  <div class="n-form">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue'
import { formProps, formEmit } from './form'
import { FORM_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NForm'
})

const props = defineProps(formProps)
const emit = defineEmits(formEmit)

const validate = () => {

}

const reset = () => {
  emit('update:model', {})
}

provide(FORM_INJECTION_KEY, {
  formData: props.model,
  formRules: props.rules
})

defineExpose({
  validate,
  reset
})
</script>

<style lang="scss" scoped>
@use '@/theme-chalk/src/form.scss'
</style>
