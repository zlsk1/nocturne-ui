<script lang="ts" setup>
import { tagProps, tagEmits } from './tag'

defineOptions({
  name: 'FrTag'
})

defineProps(tagProps)
const emit = defineEmits(tagEmits)

const handleClose = (e: Event) => emit('close', e)

const handleClick = (e: Event) => emit('click', e)
</script>

<template>
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
    :style="{backgroundColor: color}"
    @click="handleClick"
  >
    <span
      :class="[
        'fr-tag__content'
      ]"
    >
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
  <!-- <transition
    v-else
    name="fr-zoom-in-center"
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
      :style="{backgroundColor: color}"
      @click="handleClick"
    >
      <span
        :class="[
          'fr-tag__content'
        ]"
      >
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
  </transition> -->
</template>

<style lang="scss" scoped>
@import '@/theme-chalk/base.scss';
@import '@/theme-chalk/tag.scss';
</style>
