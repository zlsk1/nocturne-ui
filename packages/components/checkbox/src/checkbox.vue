<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { useCheckbox } from '../composables'
import { checkboxEmits, checkboxProps } from './checkbox'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NCheckbox'
})

const props = defineProps(checkboxProps)
defineEmits(checkboxEmits)
const slots = useSlots()

const ns = useNamespace('checkbox')

const {
  isChecked,
  checkboxSize,
  isDisabled,
  isFocused,
  model,
  actualValue,
  handleChange,
  onClickRoot
} = useCheckbox(props, slots)

const commonCls = computed(() => [
  ns.is('disabled', props.disabled || isDisabled.value),
  ns.is('checked', isChecked.value)
])

const checkboxCls = computed(() => [
  ns.b(),
  ns.m(checkboxSize.value || props.size),
  ...commonCls.value
])

const checkboxInputCls = computed(() => [
  ns.e('input'),
  ns.is('indeterminate', props.indeterminate),
  ...commonCls.value
])
</script>

<template>
  <label
    :class="checkboxCls"
    :style="{ color: textColor }"
    @click="onClickRoot"
  >
    <span :class="checkboxInputCls">
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
        :class="ns.e('original')"
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
        :class="ns.e('original')"
        @change="handleChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @click.stop
      />
      <span :class="ns.e('inner')" />
    </span>
    <span :class="ns.e('label')">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
