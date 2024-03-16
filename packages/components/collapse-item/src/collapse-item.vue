<script setup>
import { ref, inject, computed } from 'vue'
import { collapseItemProps } from './index'
import FrCollapseTransition from '../../collapse-transition/collapse-transition.vue'

defineOptions({
  name: 'FrCollapseItem'
})

const collapse = inject('collapse')

const props = defineProps(collapseItemProps)

const contentRef = ref()

const isActive = computed(() => {
  return collapse.activelist.value.includes(props.name)
})

const showContent = () => {
  if (props.disabled) return
  collapse.changeEvent(props.name)
}
</script>

<template>
  <div
    :class="[
      'fr-collapse-item',
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div class="fr-collapse-item__title" @click="showContent">
      <h3 v-if="title">
        {{ title }}
      </h3>
      <slot v-else name="title"></slot>
      <fr-icon
        icon="arrow-right"
        :class-name="[
          'fr-collapse-item__icon',
          isActive ? 'is-rotate' : ''
        ]"
      ></fr-icon>
    </div>
    <fr-collapse-transition>
      <div
        v-show="isActive"
        class="fr-collapse-item__wrap"
      >
        <div
          ref="contentRef"
          class="fr-collapse-item__content"
        >
          <slot></slot>
        </div>
      </div>
    </fr-collapse-transition>
  </div>
</template>

<style>
@import '@/theme-chalk/collapse-item.scss';
</style>
