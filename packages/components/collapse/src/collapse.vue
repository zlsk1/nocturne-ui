<script setup>
import { provide, ref } from 'vue'
import { collapseProps, collapseEmits } from './index'

defineOptions({
  name: 'FrCollapse'
})

const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const activelist = ref([])

const changeEvent = (e) => {
  if (!props.accordion) {
    if (!activelist.value.includes(e)) activelist.value.push(e)
    else {
      activelist.value.splice(activelist.value.indexOf(e), 1)
    }
  } else {
    activelist.value = [e]
  }
  emit('change', activelist.value)
}

provide('collapse', {
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
