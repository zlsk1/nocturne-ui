<script lang="ts" setup>
import { onMounted, provide, ref } from 'vue'
import { useNamespace } from '@/composables'
import { isString } from '@/utils'
import { collapseEmits, collapseProps } from './collapse'
import { COLLAPSE_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NCollapse'
})

const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const ns = useNamespace('collapse')

const activelist = ref<string[] | number[]>([])

const changeEvent = (val: string | number | undefined) => {
  if (!activelist.value.includes(val as never)) {
    if (!props.accordion) activelist.value.push(val as never)
    else activelist.value = [val as never]
  } else activelist.value.splice(activelist.value.indexOf(val as never), 1)
  emit('change', val)
}

const onUpdate = (val: string | string[] | number[]) => {
  emit('update:modelValue', val)
}

onMounted(() => {
  if (props.modelValue) {
    if (isString(props.modelValue)) {
      activelist.value.push(props.modelValue as never)
    } else {
      activelist.value = props.modelValue
    }
  }
})

provide(COLLAPSE_INJECTION_KEY, {
  changeEvent,
  onUpdate,
  activelist
})
</script>

<template>
  <div :class="ns.b()">
    <slot />
  </div>
</template>
