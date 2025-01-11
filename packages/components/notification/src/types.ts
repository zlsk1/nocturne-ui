import notification from './notification.vue'
import { notificationEmit, notificationProps } from './props'
import type {
  AppContext,
  ComponentInternalInstance,
  ExtractPropTypes,
  VNode
} from 'vue'

export type NotifyInstanceType = {
  id: string
  vnode: VNode
  handler: closeHandler
  vm: ComponentInternalInstance
  props: NotificationProps
}

export type NotificationPlacements =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'

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
export type MergeParamsNormalized = MergeParams & {
  appendTo: HTMLElement
  placement: NotificationPlacements
}

export type NotificationTypeFn = (
  props: NotificationOptions,
  context?: AppContext | null
) => closeHandler
export type NotificationFn = {
  (props: MergeParams, context?: AppContext | null): closeHandler
}

export interface NotificationType extends NotificationFn {
  info: NotificationTypeFn
  success: NotificationTypeFn
  error: NotificationTypeFn
  warning: NotificationTypeFn
}
