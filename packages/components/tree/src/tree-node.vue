<template>
  <div :class="[ns.b('node')]">
    <div>
      <n-checkbox />
    </div>
    <n-collapse-transition>
      <div>
        <n-tree-node />
      </div>
    </n-collapse-transition>
  </div>
</template>
<script lang="ts" setup>
import NCollapseTransition from '@nocturne-ui/components/collapse/src/collapse-transition.vue'
import NCheckbox from '@nocturne-ui/components/checkbox'
import { useNamespace } from '@nocturne-ui/composables'

defineOptions({
  name: 'NTreeNode'
})

const ns = useNamespace('tree')
</script>
