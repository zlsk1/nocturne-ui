import { definePropType } from '@nocturne-ui/utils'
import Watermark from './watermark.vue'
import type { ExtractPropTypes } from 'vue'

export interface WatermarkFont {
  color: CanvasFillStrokeStyles['fillStyle']
  fontSize: number
  fontWeight: 'normal' | 'light' | 'weight' | number
  fontFamily: string
  fontStyle: 'none' | 'normal' | 'italic' | 'oblique'
  textAlign: CanvasTextAlign
}

export const defaultFont = {
  color: '',
  fontSize: 16,
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontStyle: 'normal',
  textAlign: 'center'
}

export const watermarkProps = {
  content: {
    type: String,
    default: 'Watermark'
  },
  rotate: {
    type: Number,
    default: -22
  },
  spacing: {
    type: definePropType<[number, number]>(Array),
    default: [100, 100]
  },
  offset: {
    type: definePropType<[number, number]>(Array)
  },
  font: {
    type: definePropType<Partial<WatermarkFont>>(Object)
  },
  opacity: {
    type: Number,
    default: 1
  },
  zIndex: {
    type: Number,
    default: 10
  },
  width: {
    type: Number,
    default: 120
  },
  height: {
    type: Number,
    default: 64
  },
  image: String
} as const

export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>
export type WatermarkInstance = InstanceType<typeof Watermark>
