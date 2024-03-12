import FrMessage from './message.vue'
import { h, render } from 'vue'
import { instances } from './instance'

let instaceCount = 1
const defaultOptions = {
  type: 'info',
  message: '',
  duration: 3000,
  showClose: false,
  offset: 16,
  appendTo: 'body',
  id: ''
}

const normalizeOptions = (params) => {
  const options = !params ? { message: params } : params
  let appendTo
  const normalized = {
    ...defaultOptions,
    ...options
  }

  if (!normalized.appendTo) {
    normalized.appendTo = document.body
  } else if (normalized.appendTo) {
    try {
      appendTo = document.querySelector(normalized.appendTo)
    } catch {
      console.warn(
        'FrMessage',
        'the appendTo option is not an HTMLElement. Falling back to document.body.'
      )
      appendTo = document.body
    }
    normalized.appendTo = appendTo
  }
  return normalized
}

const closeMessage = (instance) => {
  const idx = instances.indexOf(instance)
  if (idx === -1) return

  instances.splice(idx, 1)
  const { handler } = instance
  handler.close()
}

const createMessage = ({ appendTo, ...options }, context) => {
  const id = `message_${instaceCount++}` // 实例id
  const userOnClose = options.onClose // 实例的关闭方法
  const container = document.createElement('div')
  const props = {
    ...options,
    id,
    onClose: () => {
      userOnClose?.()
      closeMessage(instance)
    },

    onDestroy: () => {
      render(null, container)
    }
  }
  const vnode = h(
    FrMessage,
    props,
    {
      default: typeof (props.message) === 'function'
        ? props.message
        : () => props.message
    }
  )
  vnode.appContext = context

  render(vnode, container)
  appendTo.appendChild(container.firstElementChild)

  const vm = vnode.component

  const handler = {
    close: () => {
      vm.exposed.visible.value = false
    }
  }

  const instance = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component).props
  }

  return instance
}

const message = (options = {}, context) => {
  const normalized = normalizeOptions(options)

  if (normalized.grouping && instances.length) {
    const instance = instances.find(
      ({ vnode: vm }) => vm.props?.message === normalized.message
    )
    if (instance) {
      instance.props.repeatNum += 1
      instance.props.type = normalized.type
      return instance.handler
    }
  }

  const instance = createMessage(normalized, context)
  instances.push(instance)
  return instance.handler
}

['success', 'warning', 'info', 'error'].forEach((type) => {
  message[type] = (options = {}, appContext) => {
    const normalized = normalizeOptions(options)
    return message({ ...normalized, type }, appContext)
  }
})

export function closeAll (type) {
  for (const instance of instances) {
    if (!type || type === instance.props.type) {
      instance.handler.close()
    }
  }
}

message.closeAll = closeAll
message._context = null

export default message
