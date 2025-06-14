<template>
  <div class="mb-4">
    <n-radio-group v-model="position">
      <n-radio-button v-for="item in ['left', 'top']" :key="item" :value="item"
        >{{ item }}
      </n-radio-button>
    </n-radio-group>
  </div>
  <div>
    <n-tabs
      v-model="activeTab"
      :position="position"
      style="max-width: 1300px; max-height: 300px"
    >
      <n-tab-pane
        v-for="item in 30"
        :key="item"
        :label="`Tab-${item}`"
        :value="item"
      >
        {{ `Tab-${item}` }}
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeTab = ref(1)
const position = ref('top')
</script>
