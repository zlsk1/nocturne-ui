<script lang="ts" setup>
import { computed, inject, nextTick, ref } from 'vue'
import { useNamespace } from '@/composables'
import { useFormItem } from '@/components/form'
import { radioEmits, radioProps } from './radio'
import { RADIOGROUP_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NRadio'
})

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

const ns = useNamespace('radio')
const { formItemDisabled, formItemSize } = useFormItem()

const groupRef = inject(RADIOGROUP_INJECTION_KEY, undefined)!

const focus = ref(false)
const radioRef = ref<HTMLInputElement>()

const isGroup = computed(() => !!radioRef.value)

const actualValue = computed(() => {
  if (props.value) {
    return props.value
  }
  return props.label
})

const modelValue = computed({
  get() {
    return isGroup.value ? groupRef?.modelValue : props.modelValue
  },
  set(val) {
    if (isGroup.value) {
      groupRef.changeGroup(val)
    } else {
      emit && emit('update:modelValue', val as string | number | boolean)
    }
    radioRef.value!.checked = props.modelValue === actualValue.value
  }
})

const actualdisabled = computed(() => {
  return formItemDisabled || groupRef?.disabled || props.disabled
})

const actualSize = computed(() => {
  return formItemSize || groupRef?.size || props.size
})

const commonCls = computed(() => [
  ns.is('checked', modelValue.value === actualValue.value),
  ns.is('disabled', actualdisabled.value)
])

const radioCls = computed(() => [
  ns.b(),
  ns.m(actualSize.value),
  ns.is('focus', focus.value),
  ...commonCls.value
])

const handleChange = () => {
  nextTick(() => emit('change', modelValue.value as string | number | boolean))
}
</script>

<template>
  <label :class="radioCls">
    <span :class="[ns.e('input'), ...commonCls]">
      <input
        ref="radioRef"
        v-model="modelValue"
        :value="actualValue"
        type="radio"
        :disabled="disabled"
        :class="ns.e('original')"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
      <span :class="ns.e('inner')" />
    </span>
    <span v-if="$slots.default" :class="ns.e('label')"><slot /></span>
    <span v-else :class="ns.e('label')">{{ label }}</span>
  </label>
</template>
