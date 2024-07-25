<template>
  <n-popover
    ref="popoverRef"
    trigger="click"
    popper-class="n-popconfirm"
  >
    <template #reference>
      <slot></slot>
    </template>
    <template #default>
      <div
        :class="[
          'n-popconfirm__title',
          { 'is-icon': showIcon }
        ]"
      >
        <Quesition
          v-if="!$slots.icon && showIcon"
          size="16"
          color="#f0bb40"
        ></Quesition>
        <slot v-else name="icon"></slot>
        <p>{{ title }}</p>
      </div>
      <div class="n-popconfirm__btns">
        <n-button
          text
          size="small"
          @click="cancel"
        >
          {{ cancelText }}
        </n-button>
        <n-button
          type="primary"
          size="small"
          @click="confirm"
        >
          {{ confirmText }}
        </n-button>
      </div>
    </template>
  </n-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { popconfirmProps, popconfirmEmit } from './popconfirm'
import { NPopover, NButton } from '@/components'
import { RiQuestionFill as Quesition } from '@remixicon/vue'

import type { PopoverInstance } from '@/components'

defineOptions({
  name: 'NPopconfirm'
})

defineProps(popconfirmProps)
const emit = defineEmits(popconfirmEmit)

const popoverRef = ref<PopoverInstance>()

const cancel = () => {
  emit('cancel')
  popoverRef.value?.hide()
}

const confirm = () => {
  emit('confirm')
  popoverRef.value?.hide()
}
</script>

<style lang="scss">
@use '@/theme-chalk/src/popconfirm.scss'
</style>
