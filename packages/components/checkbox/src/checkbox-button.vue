<template>
  <label :class="checkboxButtonCls" @click="onClickRoot">
    <span style="display: none">
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
        @change="handleChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @click.stop
      />
      <input
        v-else
        v-model="model"
        :value="actualValue"
        :indeterminate="indeterminate"
        :name="name"
        :tabindex="tabindex"
        :disabled="isDisabled"
        type="checkbox"
        @change="handleChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @click.stop
      />
      <span :class="ns.e('inner')" />
    </span>
    <span v-if="$slots.default || label" :class="ns.e('label')">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { useCheckbox } from './composables'
import { checkboxButtonProps } from './checkbox-button'

defineOptions({
  name: 'NCheckboxButton'
})

const props = defineProps(checkboxButtonProps)
const slots = useSlots()

const ns = useNamespace('checkbox-button')

const {
  isChecked,
  checkboxSize,
  isDisabled,
  buttonType,
  model,
  isFocused,
  actualValue,
  onClickRoot,
  handleChange
} = useCheckbox(props, slots)

const commonCls = computed(() => [
  ns.is('disabled', props.disabled || isDisabled.value),
  ns.is('checked', isChecked.value)
])

const checkboxButtonCls = computed(() => [
  ns.b(),
  `${ns.ns.value}-button`,
  ns.m(checkboxSize.value || props.size),
  ns.m(buttonType.value),
  ...commonCls.value
])
</script>
