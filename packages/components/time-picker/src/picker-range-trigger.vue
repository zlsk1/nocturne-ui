<template>
  <div
    ref="wrapperRef"
    :class="[ns.b('range'), ns.is('focused', isFocused)]"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot name="prefix" />
    <input
      ref="startRef"
      :class="ns.b('input')"
      type="text"
      :value="modelValue && modelValue[0]"
      @input="handleStartInput"
      @change="handleStartChange"
    />
    <slot name="separator">
      <n-icon size="24" style="margin-right: 8px">
        <RiArrowRightLine />
      </n-icon>
    </slot>
    <input
      ref="endRef"
      :class="ns.b('input')"
      type="text"
      :value="modelValue && modelValue[1]"
      @input="handleEndInput"
      @change="handleEndChange"
    />
    <slot name="suffix" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useFocusController, useNamespace } from '@nocturne-ui/composables'
import { RiArrowRightLine } from '@remixicon/vue'
import NIcon from '@nocturne-ui/components/icon'
import { pickerRangeTriggerProps } from './props/picker-range-trigger'

const ns = useNamespace('picker')

const emit = defineEmits([
  'click',
  'mouseenter',
  'mouseleave',
  'startInput',
  'endInput',
  'focus',
  'blur',
  'startChange',
  'endChange'
])
defineProps(pickerRangeTriggerProps)

const startRef = ref<HTMLInputElement>()
const endRef = ref<HTMLInputElement>()
const activeRef = ref<HTMLInputElement>()

const status = ref(0)

const { wrapperRef, isFocused } = useFocusController(startRef)

const handleClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (startRef.value?.contains(target)) {
    activeRef.value = startRef.value
    status.value = 0
  } else if (endRef.value?.contains(target)) {
    activeRef.value = endRef.value
    status.value = 1
  } else {
    activeRef.value = startRef.value
    status.value = 0
  }

  emit('click', e)
}

const handleMouseEnter = (e: MouseEvent) => {
  emit('mouseenter', e)
}

const handleMouseLeave = (e: MouseEvent) => {
  emit('mouseleave', e)
}

const handleStartInput = (e: Event) => {
  emit('startInput', e)
}

const handleEndInput = (e: Event) => {
  emit('endInput', e)
}

const handleStartChange = (e: Event) => {
  emit('startChange', e)
}

const handleEndChange = (e: Event) => {
  emit('endChange', e)
}

defineExpose({
  activeRef,
  status
})
</script>
