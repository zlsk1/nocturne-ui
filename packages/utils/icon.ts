import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled
} from '@ant-design/icons-vue'
import { definePropType } from '@nocturne-ui/utils'
import type { Component } from 'vue'

export const iconPropType = definePropType<string | Component>([
  String,
  Object,
  Function
])

export const typeIcons = {
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled
}
