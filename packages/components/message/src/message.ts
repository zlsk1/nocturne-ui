import { definePropType, mutable } from '@/utils'
import { isClient } from '@vueuse/core'
import type { AppContext, ExtractPropTypes, VNode } from 'vue'
import type { Mutable } from '@/utils'
import type MessageConstructor from './message.vue'

export const messageTypes = ['success', 'info', 'warning', 'error'] as const

export type messageType = typeof messageTypes[number]

export interface MessageConfigContext {
  max?: number
}

export const messageDefaults = mutable({
  customClass: '',
  // center: false,
  // dangerouslyUseHTMLString: false,
  duration: 3000,
  icon: undefined,
  id: '',
  message: '',
  onClose: undefined,
  showClose: false,
  type: 'info',
  // plain: false,
  offset: 16,
  // zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? document.body : (undefined as never)
} as const)

export const messageProps = {
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type
  },
  message: {
    type: definePropType<string | VNode |(() => VNode)>([
      String,
      Object,
      Function
    ]),
    default: messageDefaults.message
  },
  duration: {
    type: Number,
    default: messageDefaults.duration
  },
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose
  },
  offset: {
    type: Number,
    default: messageDefaults.offset
  },
  appendTo: {
    type: definePropType<string | HTMLElement>([String, HTMLElement]),
    default: messageDefaults.appendTo
  },
  onClose: {
    type: definePropType<() => void>(Function),
    default: messageDefaults.onClose
  },
  id: {
    type: String,
    default: messageDefaults.id
  },
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping
  },
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum
  },
  customClass: {
    type: String,
    default: messageDefaults.customClass
  }
} as const

export const messageEmits = {
  destroy: () => true
}

export type MessageInstace = InstanceType<typeof MessageConstructor>
export type MessageProps = ExtractPropTypes<typeof messageProps>
export type MessageEmits = typeof messageEmits

export type MessageOptions = Partial<
  Mutable<
    Omit<MessageProps, 'id'> & {
      appendTo?: HTMLElement | string
    }
  >
>
export type MessageParams = MessageOptions | MessageOptions['message']
export type MessageParamsNormalized = Omit<MessageProps, 'id'> & {
  /**
   * @description set the root element for the message, default to `document.body`
   */
  appendTo: HTMLElement
}
export type MessageOptionsWithType = Omit<MessageOptions, 'type'>
export type MessageParamsWithType =
  | MessageOptionsWithType
  | MessageOptions['message']

export interface MessageHandler {
  /**
   * @description close the Message
   */
  close: () => void
}

export type MessageFn = {
  (options?: MessageParams, appContext?: null | AppContext): MessageHandler
  closeAll(type?: messageType): void
}
export type MessageTypedFn = (
  options?: MessageParamsWithType,
  appContext?: null | AppContext
) => MessageHandler

// 实例方法 例如调用success已经表明type=success 所以MessageTypedFn中的options不需要type
export interface Message extends MessageFn {
  success: MessageTypedFn
  warning: MessageTypedFn
  info: MessageTypedFn
  error: MessageTypedFn
}
