<script lang="ts" setup>
import { provide, ref } from 'vue'
import { collapseProps, collapseEmits } from './collapse'
import { COLLAPSE_INJECTION_KEY } from '@/components/collapse/src/constants'

defineOptions({
  name: 'FrCollapse'
})

const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const activelist = ref<string[] | number[]>([])

const changeEvent = (val: string | number) => {
  if (!activelist.value.includes(val as never)) {
    if (!props.accordion) activelist.value.push(val as never)
    else activelist.value = [val as never]
  }
  else activelist.value.splice(activelist.value.indexOf(val as never), 1)
  emit('change', val)
}

provide(COLLAPSE_INJECTION_KEY, {
  changeEvent,
  activelist
})
</script>

<template>
  <div
    :class="[
      'fr-collapse'
    ]"
  >
    <slot></slot>
  </div>
</template>

<style>
@import '@/theme-chalk/collapse.scss';
</style>
