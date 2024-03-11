<script setup>
import { nextTick, provide, toRefs, ref } from 'vue'

import { checkboxGroupProps, checkboxGroupEmits } from './index'

defineOptions({
  name: 'FrCheckboxGroup'
})

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkboxGroupEmits)

const groupRef = ref(null)

const changeEvent = val => {
  emit('update:modelValue', val)
  nextTick(() => emit('change', val))
}

provide(
  'groupRef',
  ref({
    ...toRefs(props),
    changeEvent
  })
)
</script>

<template>
  <div ref="groupRef" class="fr-checkbox-group">
    <slot></slot>
  </div>
</template>
