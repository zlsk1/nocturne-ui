<script setup>
import { ref, onMounted } from 'vue'
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

onMounted(() => {
  crerteInstance()
})

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
  visible.value = !visible.value
  setOptions()
  instance.update()
}

const hide = () => {
  visible.value = !visible.value
}

const click = () => {
  visible.value = !visible.value
  if (visible.value) {
    setOptions()
    instance.update()
  }
}

const onMouseEnter = isSameTriggerType(props.trigger, 'hover', show)

const onMouseLeave = isSameTriggerType(props.trigger, 'hover', hide)

const onClick = isSameTriggerType(props.trigger, 'click', click)

</script>

<template>
  <div
    :class="[
      'fr-tooltip',
      `fr-tooltip--${effect}`
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
    @focus="onFocus"
  >
    <div
      ref="referenceRef"
    >
      <slot></slot>
    </div>
    <transition name="fr-tooltip-transition">
      <div
        v-show="visible"
        ref="contentRef"
        class="fr-tooltip__content"
      >
        <span>{{ content }}</span>
        <span ref="arrowRef" class="fr-tooltip__arrow"></span>
      </div>
    </transition>
  </div>
</template>

<style>
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
