<script lang="ts" setup>
import { provide, ref } from 'vue'
import { collapseEmits, collapseProps } from './collapse'
import { COLLAPSE_INJECTION_KEY } from './constants'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NCollapse'
})

const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const ns = useNamespace('collapse')

const activelist = ref<string[] | number[]>([])

const changeEvent = (val: string | number) => {
  if (!activelist.value.includes(val as never)) {
    if (!props.accordion) activelist.value.push(val as never)
    else activelist.value = [val as never]
  } else activelist.value.splice(activelist.value.indexOf(val as never), 1)
  emit('change', val)
}

provide(COLLAPSE_INJECTION_KEY, {
  changeEvent,
  activelist
})
</script>

<template>
  <div :class="ns.b()">
    <slot />
  </div>
</template>
