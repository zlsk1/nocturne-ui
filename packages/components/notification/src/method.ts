import { createVNode, isVNode, render } from 'vue'
import Notification from './notification.vue'
import { isElement, isString } from '@/utils'
import { notificationDefaultOptions, notificationType } from './notification'

import type {
  NotificationFn,
  NotificationType,
  closeHandler,
  MergeParamsNormalized,
  NotificationPlacements,
  NotificationOptions,
  NotificationProps
} from './notification'
import type { AppContext, VNode, ComponentInternalInstance } from 'vue'

type InstanceType = {
  id: string
  vnode: VNode
  handler: closeHandler
  vm: ComponentInternalInstance
  props: NotificationProps
}

const instances: Record<NotificationPlacements, InstanceType[]> = {
  'top-right': [],
  'top-left': [],
  'bottom-right': [],
  'bottom-left': []
}

const GAP = 16
let instaceCount = 1

const normalizedProps = (props: NotificationOptions) => {
  const params = isString(props) || isVNode(props) ? { content: props } : props
  const mergeParams = {
    ...notificationDefaultOptions,
    ...params
  }

  if (!mergeParams.appendTo) {
    mergeParams.appendTo = document.body
  }
  else if (isString(mergeParams.appendTo)) {
    let appendTo = document.querySelector<HTMLElement>(mergeParams.appendTo)

    if (!isElement(appendTo)) {
      console.warn('n-notification, appendTo must be a exist HTMLElement')
      appendTo = document.body
    }

    mergeParams.appendTo = appendTo
  }

  return mergeParams as MergeParamsNormalized
}

const createInstance = (props: MergeParamsNormalized, context?: AppContext | null) => {
  const id = `notification--${instaceCount++}`
  const container = document.createElement('div')
  const _close = props.onClose

  let offset = props.offset || 0
  const placement = props.placement || 'top-right'
  instances[placement].forEach(({ vm }) => {
    offset += (vm.exposed?.height.value || 0) + GAP
  })

  const options = {
    ...props,
    id,
    offset,
    onClose: () => {
      _close?.()
      closeNotification(id, placement)
    },
    onDestroy: () => {
      render(null, container)
    }
  }

  const vnode = createVNode(
    Notification,
    options,
    isVNode(props.content)
      ? { default: () => props.content }
      : null
  )

  vnode.appContext = context || notification._context || null
  render(vnode, container)
  props.appendTo.appendChild(container.firstElementChild!)

  const vm = vnode.component!

  const handler: closeHandler = {
    close: () => {
      vm.exposed!.visible.value = false
    }
  }

  const instance = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props
  }

  return instance
}

const notification: NotificationFn & Partial<NotificationType> & { _context?: AppContext | null } & { closeAll: () => void } = (props, context): closeHandler => {
  const normalized = normalizedProps(props)
  const instance = createInstance(normalized, context)
  instances[normalized.placement].push(instance)

  return instance.handler
}

notificationType.forEach(type => {
  notification[type] = (props: NotificationOptions, context?: AppContext | null) => {
    const normalized = normalizedProps(props)

    return notification({ ...normalized, type }, context)
  }
})

const closeNotification = (id: string, placement: NotificationPlacements) => {
  const _instance = instances[placement]
  const idx = _instance.findIndex(instace => instace.id === id)
  if (idx <= -1) return

  _instance[idx].handler.close()

  for (let i = idx + 1; i < _instance.length; i++) {
    if (placement.startsWith('top')) {
      _instance[i].vnode.component!.props.offset =
      Number.parseInt(_instance[i].vnode.el!.style.top, 10) - (_instance[i].vm.exposed?.height.value + GAP)
    }
    else if (placement.startsWith('bottom')) {
      _instance[i].vnode.component!.props.offset =
      Number.parseInt(_instance[i].vnode.el!.style.bottom, 10) - (_instance[i].vm.exposed?.height.value + GAP)
    }
  }

  _instance.splice(idx, 1)
}

notification.closeAll = () => {
  Object.keys(instances).forEach(placement => {
    instances[placement as keyof typeof instances].forEach(instance => instance.handler.close())
  })
}

notification._context = null

export default notification as NotificationType
