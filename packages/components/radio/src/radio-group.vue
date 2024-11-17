<script lang="ts" setup>
import { nextTick, provide, reactive, toRefs } from 'vue'
import { radioGroupEmits, radioGroupProps } from './radio-group'
import { RADIOGROUP_INJECTION_KEY } from './constants'
import { useFormItemId } from '@/components/form'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NRadioGroup'
})

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

const ns = useNamespace('radio-group')

const formId = useFormItemId()

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
  <div :id="formId" :class="ns.b()">
    <slot />
  </div>
</template>
