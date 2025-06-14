<template>
  <div class="mb-4">
    <n-radio-group v-model="placement">
      <n-radio-button value="right">left to right</n-radio-button>
      <n-radio-button value="left">right to left</n-radio-button>
      <n-radio-button value="bottom">top to bottom</n-radio-button>
      <n-radio-button value="top">bottom to top</n-radio-button>
    </n-radio-group>
  </div>
  <n-space>
    <n-button type="primary" @click="drawer = true"> open </n-button>
    <n-button type="primary" @click="drawer2 = true"> with footer </n-button>
  </n-space>
  <n-drawer v-model="drawer" title="I am the title" :placement="placement">
    <span>Hi, there!</span>
  </n-drawer>
  <n-drawer v-model="drawer2" :placement="placement">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        <n-radio v-model="radio1" value="Option 1" size="large">
          Option 1
        </n-radio>
        <n-radio v-model="radio1" value="Option 2" size="large">
          Option 2
        </n-radio>
      </div>
    </template>
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const drawer = ref(false)
const drawer2 = ref(false)
const placement = ref('right')
const radio1 = ref('Option 1')
</script>
