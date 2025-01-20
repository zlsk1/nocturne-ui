<script lang="ts" setup>
import { computed, nextTick, provide, toRefs } from 'vue'
import { useFormItem } from '@/components/form'
import { useNamespace } from '@/composables'
import { checkboxGroupContextKey } from './constants'
import { checkboxGroupEmits, checkboxGroupProps } from './checkbox-group'
import type { CheckboxGroupValueType } from './checkbox-group'

defineOptions({
  name: 'NCheckboxGroup'
})

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkboxGroupEmits)

const ns = useNamespace('checkbox')

const { formItemId } = useFormItem()

const changeEvent = async (value: CheckboxGroupValueType) => {
  emit('update:modelValue', value)
  await nextTick()
  emit('change', value)
}

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(val: CheckboxGroupValueType) {
    changeEvent(val)
  }
})

provide(checkboxGroupContextKey, {
  ...toRefs(props),
  modelValue,
  changeEvent
})
</script>

<template>
  <div :id="formItemId" ref="groupRef" :class="ns.b('group')">
    <slot />
  </div>
</template>
