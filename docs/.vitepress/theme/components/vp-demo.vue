<template>
  <div class="demo-container">
    <p v-html="decodeDescription" class="demo-description mb-4"></p>
    <div class="demo-content">
      <div class="demo-component">
        <ClientOnly>
          <component :is="formatPathDemos[src]" v-if="formatPathDemos[src]"></component>
        </ClientOnly>
      </div>
      <div class="demo-operas">
        <n-tooltip
          content="展开代码"
          :show-arrow="false"
        >
          <codeView
            size="16"
            class="opera"
            @click="handleShowCode"
          ></codeView>
        </n-tooltip>
        <n-tooltip content="在playround中编辑" :show-arrow="false">
          <Play size="16" class="opera"></Play>
        </n-tooltip>
        <n-tooltip content="在github上编辑" :show-arrow="false">
          <github size="16" class="opera"></github>
        </n-tooltip>
        <n-tooltip content="复制代码" :show-arrow="false">
          <fileCopy size="16" class="opera"></fileCopy>
        </n-tooltip>
      </div>
      <n-collapse-transition>
        <div class="demo-source-wrapper" v-show="showCode">
          <div v-html="decoded" class="demo-source language-vue"></div>
        </div>
      </n-collapse-transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
  RiCodeView as codeView,
  RiFileCopyFill as fileCopy,
  RiGithubFill as github,
  RiSendPlaneFill as Play
} from '@remixicon/vue';

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  demos: {
    type: Object,
    default: () => ({})
  },
  codes: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})

const showCode = ref(false)

const decoded = computed(() => {
  return decodeURIComponent(props.codes)
})

const decodeDescription = computed(() => {
  return decodeURIComponent(props.description)
})

const formatPathDemos = computed(() => {
  const demos = {}

  Object.keys(props.demos).forEach((key) => {
    demos[key.replace('/demo/', '').replace('.vue', '')] = props.demos[key]
  })
  return demos
})

const handleShowCode = () => {
  showCode.value = !showCode.value
}
</script>