<template>
  <n-popover ref="popoverRef" trigger="click" :popper-class="ns.b()">
    <template #reference>
      <slot />
    </template>
    <template #default>
      <div :class="[ns.e('title')]">
        <n-icon v-if="!$slots.icon && showIcon" size="16" color="#f0bb40">
          <component :is="icon" />
        </n-icon>
        <slot name="icon" />
        <p :class="ns.e('text')">{{ title }}</p>
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
import NButton from '@/components/button'
import NPopover from '@/components/popover'
import NIcon from '@/components/icon'
import { useNamespace } from '@/composables'
import { popconfirmEmit, popconfirmProps } from './popconfirm'
import type { PopoverInstance } from '@/components'

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
