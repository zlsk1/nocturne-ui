<script lang="ts" setup>
import { computed } from 'vue'
import { avatarEmits, avatarProps } from './avatar'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NAvatar'
})

const props = defineProps(avatarProps)
const emit = defineEmits(avatarEmits)

const ns = useNamespace('avatar')

const sizeIsNumber = computed(() => {
  return typeof props.size === 'number'
})

const avatarCls = computed(() => [
  ns.b(),
  ns.m(typeof props.size !== 'number' ? props.size : ''),
  ns.m(props.shape)
])

const onError = (evt: Event) => {
  emit('error', evt)
}
</script>

<template>
  <div
    :class="avatarCls"
    :style="{
      width: sizeIsNumber ? size + 'px' : '',
      height: sizeIsNumber ? size + 'px' : ''
    }"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      :class="ns.e('img')"
      :style="{ objectFit: fit }"
      @error="onError"
    />
    <n-icon v-else-if="icon" :class="ns.e('icon')">
      <component :is="icon" />
    </n-icon>
    <slot />
  </div>
</template>
