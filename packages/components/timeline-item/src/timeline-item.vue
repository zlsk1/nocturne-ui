<script lang="ts" setup>
import { timelineItemProps } from './timeline-item'

defineOptions({
  name: 'FrTimelineItem'
})

defineProps(timelineItemProps)
</script>

<template>
  <li
    :class="[
      'fr-timeline-item',
      {
        'fr-timeline-item__center': center
      }
    ]"
  >
    <div class="fr-timeline-item__tail"></div>

    <div
      :class="[
        'fr-timeline-item__dot',
        'fr-timeline-item__dot--normal',
        type ? 'fr-timeline-item__dot--' + type : '',
        size ? 'fr-timeline-item__dot--' + size : '',
        {
          'is-hollow': hollow
        }
      ]"
      :style="{backgroundColor: color}"
    >
      <fr-icon v-if="icon" :icon="icon"></fr-icon>
    </div>
    <div
      :class="[
        'fr-timeline-item__wrap'
      ]"
    >
      <div
        v-if="!hideTimestamp && placement === 'top'"
        :class="[
          'fr-timeline-item__timestamp',
          'is-top'
        ]"
      >
        {{ timestamp }}
      </div>
      <div class="fr-timeline-itme__content">
        <slot></slot>
      </div>
      <div
        v-if="!hideTimestamp && placement === 'bottom'"
        :class="[
          'fr-timeline-item__timestamp',
          'is-bottom'
        ]"
      >
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>

<style>
@use '@/theme-chalk/timeline-item.scss';
</style>
