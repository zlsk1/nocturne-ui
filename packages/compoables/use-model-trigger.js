import { computed, getCurrentInstance, onMounted, watch } from 'vue'

const _prop = {
  type: false,
  default: null
}
const _event = (val) => {}

export const createModelToggleComposable = (name) => {
  const updateEventKey = `update:${name}`
  const updateEventKeyRaw = `onUpdate:${name}`
  const useModelToggleEmits = [updateEventKey]

  const useModelToggleProps = {
    [name]: _prop,
    [updateEventKeyRaw]: _event
  }

  const useModelToggle = ({
    indicator,
    toggleReason,
    shouldHideWhenRouteChanges,
    shouldProceed,
    onShow,
    onHide
  }) => {
    const instance = getCurrentInstance()
    const { emit } = instance
    const props = instance.props
    const hasUpdateHandler = computed(() =>
      typeof (props[updateEventKeyRaw]) === 'function'
    )
    // when it matches the default value we say this is absent
    // though this could be mistakenly passed from the user but we need to rule out that
    // condition
    const isModelBindingAbsent = computed(() => props[name] === null)

    const doShow = (event) => {
      if (indicator.value === true) {
        return
      }

      indicator.value = true
      if (toggleReason) {
        toggleReason.value = event
      }
      if (typeof (onShow) === 'function') {
        onShow(event)
      }
    }

    const doHide = (event) => {
      if (indicator.value === false) {
        return
      }

      indicator.value = false
      if (toggleReason) {
        toggleReason.value = event
      }
      if (typeof (onHide) === 'function') {
        onHide(event)
      }
    }

    const show = (event) => {
      if (
        props.disabled === true ||
        (typeof (shouldProceed) === 'function' && !shouldProceed())
      ) { return }

      const shouldEmit = hasUpdateHandler.value

      if (shouldEmit) {
        emit(updateEventKey, true)
      }

      if (isModelBindingAbsent.value || !shouldEmit) {
        doShow(event)
      }
    }

    const hide = (event) => {
      if (props.disabled === true) return

      const shouldEmit = hasUpdateHandler.value

      if (shouldEmit) {
        emit(updateEventKey, false)
      }

      if (isModelBindingAbsent.value || !shouldEmit) {
        doHide(event)
      }
    }

    const onChange = (val) => {
      if (typeof (val) !== 'boolean') return
      if (props.disabled && val) {
        if (hasUpdateHandler.value) {
          emit(updateEventKey, false)
        }
      } else if (indicator.value !== val) {
        if (val) {
          doShow()
        } else {
          doHide()
        }
      }
    }

    const toggle = () => {
      if (indicator.value) {
        hide()
      } else {
        show()
      }
    }

    watch(() => props[name], onChange)

    if (
      shouldHideWhenRouteChanges &&
      instance.appContext.config.globalProperties.$route !== undefined
    ) {
      watch(
        () => ({ ...(instance.proxy).$route }),
        () => {
          if (shouldHideWhenRouteChanges.value && indicator.value) {
            hide()
          }
        }
      )
    }

    onMounted(() => {
      onChange(props[name])
    })

    return {
      hide,
      show,
      toggle,
      hasUpdateHandler
    }
  }

  return {
    useModelToggle,
    useModelToggleProps,
    useModelToggleEmits
  }
}

const { useModelToggle, useModelToggleProps, useModelToggleEmits } =
  createModelToggleComposable('modelValue')

export { useModelToggle, useModelToggleEmits, useModelToggleProps }
