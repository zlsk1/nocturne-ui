<template>
  <div :class="['n-dropdown', disabled && 'is-disabled']">
    <NTooltip
      transition="n-zoom-in-top"
      :gpu-acceleration="false"
      :trigger="trigger"
      :placement="placement"
      :pure="true"
      :popper-style="{paddingLeft: 0, paddingRight: 0}"
      :popper-class="popperClass"
      :popper-options="popperOptions"
      :disabled="disabled"
      @onOpen="onOpen"
      @onClose="onClose"
    >
      <slot name="default"></slot>
      <template #content>
        <slot name="content"></slot>
      </template>
    </NTooltip>
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { NTooltip } from '@/components'
import { dropdownProps, dropdownEmit } from './dropdown'
import { NDROPDOWN_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NDropdown'
})

const props = defineProps(dropdownProps)
const emit = defineEmits(dropdownEmit)

const onOpen = () => {
  emit('visibleChange', true)
}

const onClose = () => {
  emit('visibleChange', false)
}

const handleClick = (e: Event) => {
  emit('click', e)
}

provide(NDROPDOWN_INJECTION_KEY, {
  handleClick
})
</script>
