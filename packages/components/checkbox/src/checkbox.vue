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
    <span v-if="$slots.default || label" :class="ns.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { useCheckbox } from './composables'
import { checkboxEmits, checkboxProps } from './checkbox'

defineOptions({
  name: 'NCheckbox'
})

const props = defineProps(checkboxProps)
defineEmits(checkboxEmits)
const slots = useSlots()

const ns = useNamespace('checkbox')

const {
  isChecked,
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

const checkboxCls = computed(() => [ns.b(), ...commonCls.value])

const checkboxInputCls = computed(() => [
  ns.e('input'),
  ns.is('indeterminate', props.indeterminate),
  ...commonCls.value
])
</script>
