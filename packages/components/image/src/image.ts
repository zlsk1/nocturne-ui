import { definePropType } from '@nocturne-ui/utils'
import { avatarProps } from '@nocturne-ui/components/avatar'
import Image from './image.vue'
import type { ExtractPropTypes } from 'vue'

export const imageProps = {
  src: String,
  alt: String,
  width: {
    type: definePropType<string | number>([String, Number])
  },
  height: {
    type: definePropType<string | number>([String, Number])
  },
  fallback: String,
  preview: {
    type: Boolean,
    default: true
  },
  previewList: {
    type: definePropType<string[]>(Array),
    default: []
  },
  fit: avatarProps.fit,
  loading: {
    type: definePropType<'lazy' | 'eager'>(String),
    default: 'eager'
  },
  scrollContainer: {
    type: definePropType<string | HTMLElement>([String, Object])
  }
} as const

export const imageEmits = {
  error: (e: Event) => e instanceof Event,
  load: (e: Event) => e instanceof Event
}

export type ImageProps = ExtractPropTypes<typeof imageProps>
export type ImageEmits = typeof imageEmits
export type ImageInstace = InstanceType<typeof Image>
