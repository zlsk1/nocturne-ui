import notification from './notification.vue'
import { messageTypes } from '@/components/message'
import { definePropType, mutable, iconPropType, isClient } from '@/utils'

import type { AppContext, ExtractPropTypes, VNode } from 'vue'

export const notificationDefaultOptions = mutable({
  title: '',
  content: '',
  duration: 4000,
  type: 'info',
  zIndex: 2000,
  placement: 'top-right',
  appendTo: isClient() ? document.body : (undefined as never),
  id: '',
  offset: 16,
  onClose: undefined,
  customClass: '',
  customIcon: undefined,
  max: 3
} as const)

export type NotificationPlacements = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

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
    type: {},
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
}

export const notificationEmit = {
  destroy: () => true
}

export type NotificationInstance = InstanceType<typeof notification>
export type NotificationProps = ExtractPropTypes<typeof notificationProps>
export type NotificationEmit = typeof notificationEmit

export type closeHandler = {
  close: () => void
}

export type NotificationParams = Partial<Omit<NotificationProps, 'id'>>
export type WithoutType = Partial<Omit<NotificationParams, 'type'>>
export type NotificationOptions = WithoutType | NotificationParams['content']
export type MergeParams = Omit<NotificationProps, 'id'> | WithoutType
export type MergeParamsNormalized = MergeParams & { appendTo: HTMLElement, placement: NotificationPlacements }

export type NotificationTypeFn = (props: NotificationOptions, context?: AppContext | null) => closeHandler
export type NotificationFn = {
  (props: MergeParams, context?: AppContext | null): closeHandler
}

export interface NotificationType extends NotificationFn {
  info: NotificationTypeFn,
  success: NotificationTypeFn,
  error: NotificationTypeFn,
  warning: NotificationTypeFn,
}
