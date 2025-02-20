import { computed } from 'vue'

import type { ComponentInternalInstance, ComputedRef } from 'vue'

const useMenu = (
  instance: ComponentInternalInstance,
  index: ComputedRef<string>
) => {
  const indexPath = computed(() => {
    const paths = [index.value]
    let parent = instance.parent!
    while (parent && parent.type.name !== 'NMenu') {
      if (parent.props.index) {
        paths.unshift(parent.props.index as string)
      }
      parent = parent.parent!
    }
    return paths
  })

  const parentMenu = computed(() => {
    let parent = instance.parent
    while (parent && !['NMenu', 'NSubMenu'].includes(parent.type.name!)) {
      parent = parent.parent
    }
    return parent!
  })

  return {
    parentMenu,
    indexPath
  }
}

export default useMenu
