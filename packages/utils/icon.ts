import {
  RiCloseCircleFill as Error,
  RiInformationFill as Info,
  RiCheckboxCircleFill as Success,
  RiErrorWarningFill as Warning
} from '@remixicon/vue'
import type { Component } from 'vue'
import { definePropType } from '@/utils'

export const iconPropType = definePropType<string | Component>([
  String,
  Object,
  Function
])

export const typeIcons = {
  info: Info,
  error: Error,
  success: Success,
  warning: Warning
}
