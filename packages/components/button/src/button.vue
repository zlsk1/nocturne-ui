<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import NIcon from '@nocturne-ui/components/icon'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { buttonEmits, buttonProps } from './button'

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
  ns.is('text', props.text),
  ns.is('icon', props.icon !== '' && !slots.default)
])

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <button :class="buttonCls" @click="handleClick">
    <n-icon
      v-if="loading"
      size="14"
      :class="ns.is('loading', loading && !loadingIcon)"
    >
      <component :is="loadingIcon || LoadingOutlined" />
    </n-icon>
    <n-icon v-else-if="icon" size="14">
      <component :is="icon" />
    </n-icon>
    <span v-if="slots.default">
      <slot />
    </span>
  </button>
</template>
