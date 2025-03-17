import { messageTypes } from '@nocturne-ui/components/message'
import {
  definePropType,
  iconPropType,
  isClient,
  mutable
} from '@nocturne-ui/utils'
import type { NotificationPlacements } from './types'
import type { VNode } from 'vue'

export const notificationDefaultOptions = mutable({
  title: '',
  content: '',
  duration: 4000,
  type: 'info',
  zIndex: 0,
  placement: 'top-right',
  appendTo: isClient ? document.body : (undefined as never),
  id: '',
  offset: 16,
  onClose: undefined,
  customClass: '',
  customIcon: undefined,
  max: 3
} as const)

export const notificationType = [...messageTypes]

export const notificationProps = {
  title: {
    type: String,
    default: notificationDefaultOptions.title
  },
  content: {
    type: definePropType<string | VNode>([String, Object]),
    default: notificationDefaultOptions.content
  },
  duration: {
    type: Number,
    default: notificationDefaultOptions.duration
  },
  type: {
    type: String,
    values: notificationType,
    default: notificationDefaultOptions.type
  },
  zIndex: {
    type: Number,
    default: notificationDefaultOptions.zIndex
  },
  placement: {
    type: definePropType<NotificationPlacements>(String),
    default: notificationDefaultOptions.placement
  },
  appendTo: {
    type: definePropType<object | never>([Object, undefined]),
    default: notificationDefaultOptions.appendTo
  },
  id: {
    type: String,
    default: notificationDefaultOptions.id
  },
  offset: {
    type: Number,
    default: notificationDefaultOptions.offset
  },
  onClose: {
    type: definePropType<() => void>(Function),
    default: notificationDefaultOptions.onClose
  },
  customClass: {
    type: String,
    default: notificationDefaultOptions.customClass
  },
  customIcon: {
    type: iconPropType,
    default: notificationDefaultOptions.customIcon
  },
  max: {
    type: Number,
    default: notificationDefaultOptions.max
  }
} as const

export const notificationEmit = {
  destroy: () => true
}
