<template>
  <div :class="[ns.b(), ns.is('disabled', disabled)]">
    <n-tooltip
      v-model:visible="visible"
      :transition="`${ns.ns.value}-zoom-in-top`"
      :gpu-acceleration="false"
      :trigger="trigger"
      :placement="placement"
      pure
      :persistent="persistent"
      :popper-class="[popperClass!, `${ns.ns.value}-dropdown-popper`]"
      :popper-options="popperOptions"
      :disabled="disabled"
      :offset="6"
      :hide-after="10"
      :show-arrow="showArrow"
      @before-show="handleShow"
      @close="handleClose"
    >
      <slot name="default" />
      <template #content>
        <ul :class="ns.m('content')">
          <slot name="content" />
        </ul>
      </template>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, watch } from 'vue'
import NTooltip from '@nocturne-ui/components/tooltip'
import { useNamespace } from '@nocturne-ui/composables'
import { dropdownEmit, dropdownProps } from './dropdown'
import { NDROPDOWN_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NDropdown'
})

const props = defineProps(dropdownProps)
const emit = defineEmits(dropdownEmit)

const ns = useNamespace('dropdown')

const visible = ref(false)
const selected = ref<undefined | string>(undefined)

watch(visible, (val) => {
  emit('visibleChange', val)
})

const handleClick = (e: MouseEvent, label: string) => {
  if (props.hideAfterClick) visible.value = false
  if (props.selectable) {
    selected.value = label
  }
  emit('click', e, label)
}

const handleShow = () => {
  visible.value = true
}

const handleClose = () => {
  visible.value = false
}

provide(NDROPDOWN_INJECTION_KEY, {
  selected,
  handleClick
})
</script>
