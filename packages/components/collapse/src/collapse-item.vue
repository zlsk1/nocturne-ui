<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { RiArrowRightWideLine as ArrowRight } from '@remixicon/vue'
import NCollapseTransition from './collapse-transition.vue'
import { collapseItemProps } from './collapse-item'
import { COLLAPSE_INJECTION_KEY } from '@/components/collapse/src/constants'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NCollapseItem'
})

const { activelist, changeEvent } = inject(COLLAPSE_INJECTION_KEY, undefined)!

const props = defineProps(collapseItemProps)

const ns = useNamespace('collapse-item')

const contentRef = ref<HTMLElement>()

const itemCls = computed(() => [ns.b(), ns.is('disabled', props.disabled)])
const isActive = computed(() => {
  return activelist.value.includes(props.name as never)
})

const showContent = () => {
  if (props.disabled) return
  changeEvent(props.name as string)
}
</script>

<template>
  <div :class="itemCls">
    <div :class="ns.e('title')" @click="showContent">
      <h3 v-if="title">
        {{ title }}
      </h3>
      <slot v-else name="title" />
      <ArrowRight
        size="16"
        :class="[ns.e('icon'), ns.is('rotate', isActive)]"
      />
    </div>
    <n-collapse-transition>
      <div v-show="isActive" :class="ns.e('wrap')">
        <div ref="contentRef" :class="ns.e('content')">
          <slot />
        </div>
      </div>
    </n-collapse-transition>
  </div>
</template>
