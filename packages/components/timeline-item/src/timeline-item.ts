import type { ExtractPropTypes } from 'vue'
import timelineItem from './timeline-item.vue'

export const timelineItemProps = {
  timestamp: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', ''],
    default: ''
  },
  hollow: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  hideTimestamp: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String,
    values: ['bottom', 'top'],
    default: 'bottom'
  },
  size: {
    type: String,
    values: ['normal', 'large'],
    default: 'normal'
  },
  color: {
    type: String,
    default: ''
  },
  icon: String
} as const

export type TimelineItemProps = ExtractPropTypes<typeof timelineItemProps>
export type TimelineItemInstance = InstanceType<typeof timelineItem>
