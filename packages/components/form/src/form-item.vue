<template>
  <div class="n-form-item" @click="validate">
    <div
      v-if="label"
      class="n-form-item__label"
    >
      <label :for="labelId">{{ label }}</label>
    </div>
    <div class="n-form-item__content">
      <slot></slot>
      <transition name="n-fade-in">
        <div v-if="invalidText" class="n-form-item__error">{{ invalidText }}</div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, provide, ref } from 'vue'
import { FORM_INJECTION_KEY, FORMITEM_INJECTION_KEY } from './constants'
import { formItemProps } from './form-item'
import { useId } from '@/composables'

defineOptions({
  name: 'NFormItem'
})

const props = defineProps(formItemProps)

const { formData, formRules } = inject(FORM_INJECTION_KEY, undefined)!

const invalidText = ref('')

const labelId = useId().value

const validate = () => {
}

provide(FORMITEM_INJECTION_KEY, {
  labelId
})
</script>

<style lang="scss" scoped>
@use '@/theme-chalk/src/form-item.scss'
</style>
