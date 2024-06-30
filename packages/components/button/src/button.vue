<script lang="ts" setup>
import { useSlots } from 'vue'
import { buttonProps, buttonEmits } from './button'
import { RiLoaderLine } from '@remixicon/vue'

defineOptions({
  name: 'FrButton'
})

defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const slots = useSlots()

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <div class="fr-button-wrapper" @click="handleClick">
    <button
      :class="[
        'fr-button',
        type ? 'fr-button--' + type : '',
        size ? 'fr-button--' + size : '',
        {
          'is-round': round,
          'is-plain': plain,
          'is-circle': circle,
          'is-disabled': disabled,
        }
      ]"
    >
      <template v-if="loading">
        <component
          :is="RiLoaderLine"
          class="fr-icon"
          size="14"
        ></component>
      </template>
      <template v-else-if="icon">
        <component
          :is="icon"
          class="fr-icon"
          size="14"
        ></component>
      </template>
      <span v-if="slots.default">
        <slot></slot>
      </span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/base.scss';
@use '@/theme-chalk/button.scss';
</style>.
