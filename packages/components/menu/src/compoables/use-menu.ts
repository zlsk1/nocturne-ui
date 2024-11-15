import { computed } from 'vue'

import type { ComponentInternalInstance } from 'vue'

const useMenu = (instance: ComponentInternalInstance) => {
  const parentMenu = computed(() => {
    let parent = instance.parent
    while (parent && !['NMenu', 'NSubMenu'].includes(parent.type.name!)) {
      parent = parent.parent
    }
    return parent!
  })

  return {
    parentMenu
  }
}

export default useMenu
