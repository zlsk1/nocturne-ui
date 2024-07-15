<script lang="ts" setup>
import { useSlots } from 'vue'
import { checkboxProps, checkboxEmits } from './checkbox'
import { useCheckbox } from '../composables'

defineOptions({
  name: 'FrCheckbox'
})

const props = defineProps(checkboxProps)
defineEmits(checkboxEmits)
const slots = useSlots()

const {
  isChecked,
  isDisabled,
  isFocused,
  model,
  actualValue,
  handleChange
} = useCheckbox(props, slots)
</script>

<template>
  <label
    :class="[
      'fr-checkbox',
      `fr-checkbox--${size || 'default'}`,
      {
        'is-disabled': disabled || isDisabled,
        'is-checked': isChecked,
      }
    ]"
  >
    <span
      :class="[
        'fr-checkbox__input',
        {
          'is-disabled': disabled || isDisabled,
          'is-checked': isChecked,
          'is-indeterminate': indeterminate
        }
      ]"
    >
      <input
        v-if="trueValue || falseValue"
        v-model="model"
        :value="actualValue"
        :indeterminate="indeterminate"
        :name="name"
        :tabindex="tabindex"
        :disabled="isDisabled"
        :true-value="trueValue"
        :false-value="falseValue"
        type="checkbox"
        class="fr-checkbox__original"
        @change="handleChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @click.stop
      >
      <input
        v-else
        v-model="model"
        :value="actualValue"
        :indeterminate="indeterminate"
        :name="name"
        :tabindex="tabindex"
        :disabled="isDisabled"
        type="checkbox"
        class="fr-checkbox__original"
        @change="handleChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @click.stop
      >
      <span class="fr-checkbox__inner"></span>
    </span>
    <span class="fr-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/checkbox.scss';
</style>
