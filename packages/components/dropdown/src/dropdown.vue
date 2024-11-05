<template>
  <div :class="['n-dropdown', disabled && 'is-disabled']">
    <NTooltip
      :visible="visible"
      transition="n-zoom-in-top"
      :gpu-acceleration="false"
      :trigger="trigger"
      :placement="placement"
      :pure="true"
      :popper-class="popperClass"
      :popper-options="popperOptions"
      :disabled="disabled"
    >
      <slot name="default"></slot>
      <template #content>
        <slot name="content"></slot>
      </template>
    </NTooltip>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, watch } from 'vue'
import { NTooltip } from '@/components'
import { dropdownProps, dropdownEmit } from './dropdown'
import { NDROPDOWN_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NDropdown'
})

const props = defineProps(dropdownProps)
const emit = defineEmits(dropdownEmit)

const visible = ref()

watch(visible, (val) => {
  emit('visibleChange', val)
})

const handleClick = (e: Event) => {
  emit('click', e)
}

provide(NDROPDOWN_INJECTION_KEY, {
  handleClick
})
</script>
