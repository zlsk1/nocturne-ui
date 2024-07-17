<script lang="ts" setup>
import { provide, nextTick, toRefs, reactive } from 'vue'
import { radioGroupProps, radioGroupEmits } from './radio-group'
import { RADIOGROUP_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NRadioGroup'
})

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

const changeGroup = (val: string | number | boolean) => {
  emit('update:modelValue', val)
  nextTick(() => emit('change', val))
}

provide(
  RADIOGROUP_INJECTION_KEY,
  reactive({
    ...toRefs(props),
    changeGroup
  })
)
</script>

<template>
  <div
    class="n-radio-group"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/radio-group.scss';
</style>
