<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@/composables'
import { timelineItemProps } from './timeline-item'

defineOptions({
  name: 'NTimelineItem'
})

const props = defineProps(timelineItemProps)

const ns = useNamespace('timeline-item')

const itemCls = computed(() => [ns.b(), { [ns.e('center')]: props.center }])

const dotCls = computed(() => [
  ns.e('dot'),
  ns.em('dot', 'normal'),
  ns.em('dot', props.type),
  ns.em('dot', props.size),
  ns.is('hollow', props.hollow)
])
</script>

<template>
  <li :class="itemCls">
    <div :class="ns.is('tail')" />

    <div :class="dotCls" :style="{ backgroundColor: color }">
      <n-icon v-if="icon" :icon="icon" />
    </div>
    <div :class="ns.e('wrap')">
      <div
        v-if="!hideTimestamp && placement === 'top'"
        :class="[ns.e('timestamp'), ns.is('top')]"
      >
        {{ timestamp }}
      </div>
      <div :class="ns.e('content')">
        <slot />
      </div>
      <div
        v-if="!hideTimestamp && placement === 'bottom'"
        :class="[ns.e('timestamp'), ns.is('bottom')]"
      >
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>
