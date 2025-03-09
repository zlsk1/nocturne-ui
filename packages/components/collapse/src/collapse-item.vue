<script lang="ts" setup>
import { computed, inject } from 'vue'
import { RiArrowRightWideLine as ArrowRight } from '@remixicon/vue'
import { COLLAPSE_INJECTION_KEY } from '@nocturne-ui/components/collapse/src/constants'
import { useNamespace } from '@nocturne-ui/composables'
import NCollapseTransition from '@nocturne-ui/components/collapse-transition'
import { collapseItemProps } from './collapse-item'

defineOptions({
  name: 'NCollapseItem'
})

const { activelist, changeEvent, onUpdate } = inject(
  COLLAPSE_INJECTION_KEY,
  undefined
)!

const props = defineProps(collapseItemProps)

const ns = useNamespace('collapse-item')

const itemCls = computed(() => [ns.b(), ns.is('disabled', props.disabled)])
const isActive = computed(() => {
  return activelist.value.includes(props.name as never)
})

const showContent = () => {
  if (props.disabled) return
  changeEvent(props.name || undefined)
  onUpdate(activelist.value)
}
</script>

<template>
  <div :class="itemCls">
    <div :class="ns.e('title')" @click="showContent">
      <div v-if="title">
        {{ title }}
      </div>
      <slot v-else name="title" />
      <ArrowRight
        size="16"
        :class="[ns.e('icon'), ns.is('rotate', isActive)]"
      />
    </div>
    <n-collapse-transition>
      <div v-show="isActive" :class="ns.e('wrap')">
        <div :class="ns.e('content')">
          <slot />
        </div>
      </div>
    </n-collapse-transition>
  </div>
</template>
