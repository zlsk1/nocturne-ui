<template>
  <div class="mb-4">
    <n-radio-group v-model="position">
      <n-radio-button
        v-for="item in ['right', 'left', 'top', 'bottom']"
        :key="item"
        :value="item"
        >{{ item }}
      </n-radio-button>
    </n-radio-group>
  </div>
  <div>
    <n-tabs v-model="activeTab" :position="position">
      <n-tab-pane
        v-for="item in 4"
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
