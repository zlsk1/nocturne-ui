import { createVNode, isVNode, render, shallowReactive } from 'vue'
import { consoleWarn, isElement, isString } from '@nocturne-ui/utils'
import Notification from './notification.vue'
import { notificationDefaultOptions, notificationType } from './props'

import type {
  MergeParamsNormalized,
  NotificationFn,
  NotificationOptions,
  NotificationPlacements,
  NotificationType,
  NotifyInstanceType,
  closeHandler
} from './types'
import type { AppContext } from 'vue'

const instances: Record<NotificationPlacements, NotifyInstanceType[]> =
  shallowReactive({
    'top-right': [],
    'top-left': [],
    'bottom-right': [],
    'bottom-left': []
  })

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
  } else if (isString(mergeParams.appendTo)) {
    let appendTo = document.querySelector<HTMLElement>(mergeParams.appendTo)

    if (!isElement(appendTo)) {
      consoleWarn(
        'n-notification',
        `appendTo element not found: ${mergeParams.appendTo}`
      )
      appendTo = document.body
    }

    mergeParams.appendTo = appendTo
  }

  return mergeParams as MergeParamsNormalized
}

const createInstance = (
  props: MergeParamsNormalized,
  context?: AppContext | null
) => {
  const id = `notification--${instaceCount++}`
  const container = document.createElement('div')
  const userClose = props.onClose

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
      closeNotification(id, placement)
      userClose?.()
    },
    onDestroy: () => {
      render(null, container)
    }
  }

  const vnode = createVNode(
    Notification,
    options,
    isVNode(props.content) ? { default: () => props.content } : null
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

const notification: NotificationFn &
  Partial<NotificationType> & { _context?: AppContext | null } & {
    closeAll: () => void
  } = (props, context): closeHandler => {
  const normalized = normalizedProps(props)
  const instance = createInstance(normalized, context)
  instances[normalized.placement].push(instance)

  return instance.handler
}

notificationType.forEach((type) => {
  notification[type] = (
    props: NotificationOptions,
    context?: AppContext | null
  ) => {
    const normalized = normalizedProps(props)

    return notification({ ...normalized, type }, context)
  }
})

const closeNotification = (id: string, placement: NotificationPlacements) => {
  const instance = instances[placement]
  const idx = instance.findIndex((ins) => ins.id === id)
  if (idx <= -1) return

  instance[idx].handler.close()

  const direction = placement.startsWith('top') ? 'top' : 'bottom'
  for (let i = idx + 1; i < instance.length; i++) {
    instance[i].vm!.props.offset =
      Number.parseInt(instance[i].vnode.el!.style[direction], 10) -
      (instance[i].vm.exposed?.height.value + GAP)
  }

  instance.splice(idx, 1)
}

notification.closeAll = () => {
  Object.keys(instances).forEach((placement) => {
    instances[placement as NotificationPlacements].forEach((instance) =>
      instance.handler.close()
    )
  })
}

notification._context = null

export default notification as NotificationType
