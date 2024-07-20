<script lang="ts" setup>
import { timelineItemProps } from './timeline-item'

defineOptions({
  name: 'NTimelineItem'
})

defineProps(timelineItemProps)
</script>

<template>
  <li
    :class="[
      'n-timeline-item',
      {
        'n-timeline-item__center': center
      }
    ]"
  >
    <div class="n-timeline-item__tail"></div>

    <div
      :class="[
        'n-timeline-item__dot',
        'n-timeline-item__dot--normal',
        type ? 'n-timeline-item__dot--' + type : '',
        size ? 'n-timeline-item__dot--' + size : '',
        {
          'is-hollow': hollow
        }
      ]"
      :style="{backgroundColor: color}"
    >
      <n-icon v-if="icon" :icon="icon"></n-icon>
    </div>
    <div
      :class="[
        'n-timeline-item__wrap'
      ]"
    >
      <div
        v-if="!hideTimestamp && placement === 'top'"
        :class="[
          'n-timeline-item__timestamp',
          'is-top'
        ]"
      >
        {{ timestamp }}
      </div>
      <div class="n-timeline-itme__content">
        <slot></slot>
      </div>
      <div
        v-if="!hideTimestamp && placement === 'bottom'"
        :class="[
          'n-timeline-item__timestamp',
          'is-bottom'
        ]"
      >
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>

<style>
@use '@/theme-chalk/src/timeline-item.scss';
</style>
