<script lang="ts" setup>
import { nextTick, provide, reactive, toRefs } from 'vue'
import { useFormItem } from '@/components/form'
import { useNamespace } from '@/composables'
import { radioGroupEmits, radioGroupProps } from './radio-group'
import { RADIOGROUP_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NRadioGroup'
})

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

const ns = useNamespace('radio-group')

const { formItemId } = useFormItem()

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
  <div :id="formItemId" :class="ns.b()">
    <slot />
  </div>
</template>
