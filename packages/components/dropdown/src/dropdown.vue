<template>
  <div :class="[ns.b(), ns.is('disabled', disabled)]">
    <NTooltip
      v-model:visible="visible"
      :transition="`${ns.ns.value}-zoom-in-top`"
      :gpu-acceleration="false"
      :trigger="trigger"
      :placement="placement"
      :pure="true"
      :popper-class="popperClass"
      :popper-options="popperOptions"
      :disabled="disabled"
      :tabindex="tabindex"
      @before-show="handleShow"
      @close="handleClose"
    >
      <slot name="default" />
      <template #content>
        <slot name="content" />
      </template>
    </NTooltip>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, watch } from 'vue'
import { dropdownEmit, dropdownProps } from './dropdown'
import { NDROPDOWN_INJECTION_KEY } from './constants'
import { NTooltip } from '@/components'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NDropdown'
})

const props = defineProps(dropdownProps)
const emit = defineEmits(dropdownEmit)

const ns = useNamespace('dropdown')

const visible = ref(false)

watch(visible, (val) => {
  emit('visibleChange', val)
})

const handleClick = (e: Event) => {
  if (props.hideAfterClick) visible.value = true
  emit('click', e)
}

const handleShow = () => {
  visible.value = true
}

const handleClose = () => {
  visible.value = false
}

provide(NDROPDOWN_INJECTION_KEY, {
  handleClick
})
</script>
