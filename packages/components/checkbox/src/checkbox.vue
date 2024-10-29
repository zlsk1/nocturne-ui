<script lang="ts" setup>
import { useSlots } from 'vue'
import { checkboxProps, checkboxEmits } from './checkbox'
import { useCheckbox } from '../composables'

defineOptions({
  name: 'NCheckbox'
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
  handleChange,
  onClickRoot
} = useCheckbox(props, slots)
</script>

<template>
  <label
    :class="[
      'n-checkbox',
      `n-checkbox--${size}`,
      {
        'is-disabled': disabled || isDisabled,
        'is-checked': isChecked,
      }
    ]"
    :style="{ color: textColor }"
    @click="onClickRoot"
  >
    <span
      :class="[
        'n-checkbox__input',
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
        class="n-checkbox__original"
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
        class="n-checkbox__original"
        @change="handleChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @click.stop
      >
      <span class="n-checkbox__inner"></span>
    </span>
    <span class="n-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
