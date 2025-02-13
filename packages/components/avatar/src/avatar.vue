<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@/composables'
import NIcon from '@/components/icon'
import { avatarEmits, avatarProps } from './avatar'

defineOptions({
  name: 'NAvatar'
})

const props = defineProps(avatarProps)
const emit = defineEmits(avatarEmits)

const ns = useNamespace('avatar')

const isError = ref(false)

const sizeIsNumber = computed(() => {
  return typeof props.size === 'number'
})

const avatarCls = computed(() => [
  ns.b(),
  ns.m(typeof props.size !== 'number' ? props.size : ''),
  ns.m(props.shape)
])

watch(
  () => props.src,
  () => (isError.value = !isError.value)
)

const onError = (evt: Event) => {
  isError.value = true
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
      v-if="src && !isError"
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
