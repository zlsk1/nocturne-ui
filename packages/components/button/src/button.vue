<script lang="ts" setup>
import { useSlots, computed } from 'vue'
import { buttonProps, buttonEmits } from './button'
import { useNamespace } from '@/composables'
import { NIcon } from '@/components'

defineOptions({
  name: 'NButton'
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const ns = useNamespace('button')

const slots = useSlots()

const buttonCls = computed(() => [
  ns.b(),
  ns.b('wrapper'),
  ns.m(props.type),
  ns.m(props.size),
  ns.is('round', props.round),
  ns.is('plain', props.plain),
  ns.is('circle', props.circle),
  ns.is('disabled', props.disabled),
  ns.is('loading', props.loading),
  ns.is('text', props.text)
])

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <button
    :class="buttonCls"
    @click="handleClick"
  >
    <template v-if="loading">
      <n-icon
        :class="[
          ns.is('loading-icon', loading),
        ]"
      >
        <component :is="loadingIcon" size="14"></component>
      </n-icon>
    </template>
    <n-icon v-else-if="icon">
      <component :is="icon" size="14"></component>
    </n-icon>
    <span v-if="slots.default">
      <slot></slot>
    </span>
  </button>
</template>
