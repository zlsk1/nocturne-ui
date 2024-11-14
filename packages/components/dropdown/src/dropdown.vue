<template>
  <div :class="[ns.b(), ns.is('disabled', disabled)]">
    <NTooltip
      :visible="visible"
      :transition="`${ns.ns.value}-zoom-in-top`"
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
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NDropdown'
})

const props = defineProps(dropdownProps)
const emit = defineEmits(dropdownEmit)

const ns = useNamespace('dropdown')

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
