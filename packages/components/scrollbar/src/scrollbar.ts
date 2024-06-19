import type { ExtractPropTypes } from 'vue'
import scrollbar from './scrollbar.vue'

export const scrollbarProps = {
  height: [String, Number],
  always: {
    type: Boolean,
    default: false
  }
}

export const scrollbarEmit = {
  scroll: (e: Event) => e instanceof Event
}

export type Scrollbar = InstanceType<typeof scrollbar>
export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
export type ScrollbarEmit = typeof scrollbarEmit
