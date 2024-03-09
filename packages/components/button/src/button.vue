<script setup>
import { useSlots } from 'vue'
import { buttonProps, buttonEmits } from './index'

defineOptions({
  name: 'FrButton'
})

defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const slots = useSlots()

const handleClick = e => {
  emit('click', e)
}
</script>

<template>
  <div @click="handleClick">
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
        <fr-icon
          icon="loading"
          class="fr-icon"
        >
        </fr-icon>
      </template>
      <template v-else-if="icon">
        <fr-icon
          :icon="icon"
          class="fr-icon"
        >
        </fr-icon>
      </template>
      <span v-if="slots.default">
        <slot></slot>
      </span>
    </button>
  </div>
</template>

<style>
@import '@/theme-chalk/base.scss';
@import '@/theme-chalk/button.scss';
</style>.
