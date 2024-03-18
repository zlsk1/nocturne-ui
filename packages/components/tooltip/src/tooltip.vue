<script setup>
import { ref, nextTick } from 'vue'
import { tooltipProps } from './index'
import { createPopper } from '@popperjs/core'
import { isSameTriggerType } from './utils'

defineOptions({
  name: 'FrTooltip'
})

const props = defineProps(tooltipProps)

const referenceRef = ref()
const contentRef = ref()
const arrowRef = ref()
const visible = ref(false)

let instance

const crerteInstance = () => {
  instance = createPopper(referenceRef.value, contentRef.value, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 12]
        }
      },
      {
        name: 'arrow',
        options: {
          element: arrowRef.value,
          padding: 0
        }
      }
    ]
  })
  setOptions()
}

const setOptions = () => {
  instance.setOptions({
    placement: props.placement
  })
}

const show = () => {
  visible.value = true
  nextTick(() => {
    crerteInstance()
    instance.update()
  })
}

const hide = () => {
  visible.value = !visible.value
}

const click = (e) => {
  if (!contentRef.value.contains(e.target)) hide()
  if (visible.value) {
    crerteInstance()
  }
}

const onMouseEnter = isSameTriggerType(props.trigger, 'hover', show)

const onMouseLeave = isSameTriggerType(props.trigger, 'hover', hide)

const onClick = isSameTriggerType(props.trigger, 'click', click)

const onClickOutside = isSameTriggerType(props.trigger, 'click', click)

</script>

<template>
  <div
    :class="[
      'fr-tooltip',
      `fr-tooltip--${effect}`
    ]"
  >
    <div
      ref="referenceRef"
      v-click-outside="onClickOutside"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="onClick"
    >
      <slot></slot>
    </div>
    <teleport to="body">
      <transition name="fr-tooltip-transition">
        <div
          v-if="visible"
          ref="contentRef"
          class="fr-tooltip__content"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
        >
          <span>{{ content }}</span>
          <span ref="arrowRef" class="fr-tooltip__arrow"></span>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<style scoped>
@import '@/theme-chalk/tooltip.scss';
.fr-tooltip-transition-enter-active,
.fr-tooltip-transition-leave-active {
  transition: opacity 0.5s ease;
}

.fr-tooltip-transition-enter-from,
.fr-tooltip-transition-leave-to {
  opacity: 0;
}
</style>
