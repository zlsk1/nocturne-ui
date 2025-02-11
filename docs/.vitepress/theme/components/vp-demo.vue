<template>
  <ClientOnly>
    <div class="demo-container">
      <p class="demo-description mb-4" v-html="decodeDescription" />
      <div class="demo-content">
        <div class="demo-component">
          <ClientOnly>
            <component :is="formatPathDemos[src]" v-if="formatPathDemos[src]" />
          </ClientOnly>
        </div>
        <div class="demo-operas">
          <n-tooltip content="展开代码">
            <n-icon size="16" class="opera">
              <codeView @click="handleShowCode" />
            </n-icon>
          </n-tooltip>
          <n-tooltip content="在playround中编辑">
            <n-icon size="16" class="opera">
              <Play />
            </n-icon>
          </n-tooltip>
          <n-tooltip content="在github上查看">
            <a :href="githubPath" target="_blank">
              <n-icon size="16" class="opera">
                <github />
              </n-icon>
            </a>
          </n-tooltip>
          <n-tooltip content="复制代码">
            <n-icon size="16" class="opera">
              <fileCopy @click="copyCode" />
            </n-icon>
          </n-tooltip>
        </div>
        <n-collapse-transition>
          <div v-show="showCode" class="demo-source-wrapper">
            <div class="demo-source" v-html="decoded" />
          </div>
        </n-collapse-transition>
        <Transition name="n-fade-in-linear">
          <div
            v-show="showCode"
            class="demo-source-close"
            @click="handleShowCode"
          >
            <Triangle size="20" />
            <span>收起源代码</span>
          </div>
        </Transition>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, ref } from 'vue'
import {
  RiSendPlaneFill as Play,
  RiArrowUpDoubleLine as Triangle,
  RiCodeView as codeView,
  RiFileCopyFill as fileCopy,
  RiGithubFill as github
} from '@remixicon/vue'
import { useClipboard } from '@vueuse/core'

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
  rawCodes: {
    type: String
  },
  description: {
    type: String,
    default: ''
  }
})

const showCode = ref(false)

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawCodes as string),
  read: false
})

const vm = getCurrentInstance()!

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

const githubPath = computed(() => {
  return `https://github.com/zlsk1/nocturne-ui/tree/master/docs/demo/${props.src}.vue`
})

const handleShowCode = async () => {
  showCode.value = !showCode.value
}

const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties

  if (!isSupported) {
    $message.error({
      offset: 55,
      message: '复制失败'
    })
  } else {
    await copy()
    $message.success({
      offset: 55,
      message: '复制成功'
    })
  }
}
</script>

<style scoped>
.n-fade-in-linear-enter-active,
.n-fade-in-linear-leave-active {
  opacity: 0;
}
</style>
