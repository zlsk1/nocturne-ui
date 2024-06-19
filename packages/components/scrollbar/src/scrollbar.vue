<template>
  <div
    ref="scrollbarRef"
    :class="[
      'fr-scrollbar',
      { 'is-enter': showBar,
        'is-leave': !showBar,
      }
    ]"
    @mouseenter="showBar = true"
    @mouseleave="showBar = false"
  >
    <div
      class="fr-scrollbar--content"
      :style="{ height: height + 'px' }"
      @scroll="handleScroll"
    >
      <div ref="viewRef">
        <slot></slot>
      </div>
    </div>
    <bar></bar>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import { scrollbarProps, scrollbarEmit } from './scrollbar'
import bar from './bar.vue'
import { SCROLLBAR_INJECTION_KEY } from './constants'

const props = defineProps(scrollbarProps)
const emit = defineEmits(scrollbarEmit)

const position = ref({
  top: 0,
  left: 0
})
const scrollbarRef = ref<HTMLDivElement>()
const showBar = ref(false)

const handleScroll = (e: any) => {
  position.value.top = e.target.scrollTop
  position.value.left = e.target.scrollLeft

  emit('scroll', e.target.scrollTop)
}

provide(SCROLLBAR_INJECTION_KEY, {
  position
})

defineExpose({
  handleScroll
})
</script>

<style scoped>
@import '@/theme-chalk/scrollbar.scss';
</style>
