<script lang="ts" setup>
import { ref, inject, computed } from 'vue'
import { collapseItemProps } from './collapse-item'
import { COLLAPSE_INJECTION_KEY } from '@/components/collapse/src/constants'
import FrCollapseTransition from '../../collapse-transition/collapse-transition.vue'
import { RiArrowRightWideLine as ArrowRight } from '@remixicon/vue'

defineOptions({
  name: 'FrCollapseItem'
})

const { activelist, changeEvent } = inject(COLLAPSE_INJECTION_KEY, undefined)!

const props = defineProps(collapseItemProps)

const contentRef = ref<HTMLElement>()

const isActive = computed(() => {
  return activelist.value.includes(props.name as never)
})

const showContent = () => {
  if (props.disabled) return
  changeEvent(props.name as string)
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
      <ArrowRight
        size="16"
        class-name="fr-collapse-item__icon"
        :class="isActive ? 'is-rotate' : ''"
      ></ArrowRight>
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

<style lang="scss" scoped>
@use '@/theme-chalk/collapse-item.scss';
</style>
