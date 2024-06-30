<template>
  <transition
    v-if="transition"
    :name="transitionClass"
    appear
  >
    <span
      :class="[
        'fr-tag',
        type ? 'fr-tag--' + type : '',
        size ? 'fr-tag--' + size: '',
        effect ? 'fr-tag--' + effect: '',
        {
          'is-round': round,
          'is-closable': closable,
          'is-hit': border
        }
      ]"
      :style="{ backgroundColor: color }"
      @click="handleClick"
    >
      <span class="fr-tag__content">
        <slot></slot>
      </span>
      <fr-icon
        v-if="closable"
        icon="close"
        class-name="fr-tag__close"
        @click.stop="handleClose"
      >
      </fr-icon>
    </span>
  </transition>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <span
    v-else
    :class="[
      'fr-tag',
      type ? 'fr-tag--' + type : '',
      size ? 'fr-tag--' + size: '',
      effect ? 'fr-tag--' + effect: '',
      {
        'is-round': round,
        'is-closable': closable,
        'is-hit': border
      }
    ]"
    :style="{ backgroundColor: color }"
    @click="handleClick"
  >
    <span class="fr-tag__content">
      <slot></slot>
    </span>
    <fr-icon
      v-if="closable"
      icon="close"
      class-name="fr-tag__close"
      @click.stop="handleClose"
    >
    </fr-icon>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { tagProps, tagEmits } from './tag'
import { FrIcon } from '@/components'

defineOptions({
  name: 'FrTag'
})

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)

const transitionClass = computed(() => {
  return props.transition ? 'fr-flip' : ''
})

const handleClose = (e: Event) => emit('close', e)

const handleClick = (e: Event) => emit('click', e)
</script>

<style lang="scss" scoped>
@use '@/theme-chalk/common/transition.scss';
@use '@/theme-chalk/tag.scss';
</style>
