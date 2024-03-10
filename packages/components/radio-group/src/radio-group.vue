<script setup>
import { ref, provide, nextTick, toRefs } from 'vue'
import { radioGroupProps, radioGroupEmits } from './index'

defineOptions({
  name: 'FrRadioGroup'
})

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

const groupRef = ref()

const changeGroup = val => {
  emit('update:modelValue', val)
  nextTick(() => emit('change', val))
}

provide(
  'groupRef',
  ref({
    changeGroup,
    ...toRefs(props)
  })
)
</script>

<template>
  <div
    ref="groupRef"
    class="fr-radio-group"
  >
    <slot></slot>
  </div>
</template>

<style>
@import '@/theme-chalk/radio-group.scss';
</style>
