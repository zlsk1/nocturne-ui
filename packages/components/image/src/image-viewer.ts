import { definePropType, isBoolean } from '@nocturne-ui/utils'
import ImageViewer from './image-viewer.vue'
import type { ExtractPropTypes } from 'vue'

export const imageViewerProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  previewList: {
    type: definePropType<string[]>(Array),
    default: []
  },
  index: {
    type: Number,
    default: 0
  },
  clickMaskToClose: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number
  },
  mask: {
    type: Boolean,
    default: true
  },
  maskClass: {
    type: String
  },
  teleport: {
    type: Boolean,
    default: false
  }
} as const

export const imageViewerEmit = {
  'update:modelValue': (visible: boolean) => isBoolean(visible)
}

export type ImageViewerProps = ExtractPropTypes<typeof imageViewerProps>
export type ImageViewerEmit = typeof imageViewerEmit
export type ImageViewerInstance = InstanceType<typeof ImageViewer>
