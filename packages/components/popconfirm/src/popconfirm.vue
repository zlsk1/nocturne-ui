<template>
  <n-popover ref="popoverRef" trigger="click" :popper-class="ns.b()">
    <template #reference>
      <slot />
    </template>
    <template #default>
      <div :class="[ns.e('title'), ns.is('icon', showIcon)]">
        <Quesition v-if="!$slots.icon && showIcon" size="16" color="#f0bb40" />
        <slot v-else name="icon" />
        <p>{{ title }}</p>
      </div>
      <div :class="ns.e('btns')">
        <n-button text size="small" @click="cancel">
          {{ cancelText }}
        </n-button>
        <n-button type="primary" size="small" @click="confirm">
          {{ confirmText }}
        </n-button>
      </div>
    </template>
  </n-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RiQuestionFill as Quesition } from '@remixicon/vue'
import { popconfirmEmit, popconfirmProps } from './popconfirm'
import type { PopoverInstance } from '@/components'
import { NButton, NPopover } from '@/components'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NPopconfirm'
})

defineProps(popconfirmProps)
const emit = defineEmits(popconfirmEmit)

const ns = useNamespace('popconfirm')

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
