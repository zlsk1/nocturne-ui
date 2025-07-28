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
          <n-tooltip :content="showCode ? '收起代码' : '展开代码'">
            <n-icon size="16" class="opera">
              <RiCodeSFill v-if="!showCode" @click="handleShowCode" />
              <RiCodeSSlashFill v-else @click="handleShowCode" />
            </n-icon>
          </n-tooltip>
          <n-tooltip content="查看源码">
            <a :href="sourcePath" target="_blank">
              <n-icon size="16" class="opera">
                <RiGithubFill />
              </n-icon>
            </a>
          </n-tooltip>
          <n-tooltip content="在GitHub上编辑">
            <a :href="editPath" target="_blank">
              <n-icon size="16" class="opera">
                <RiEditFill />
              </n-icon>
            </a>
          </n-tooltip>
          <n-tooltip content="复制代码">
            <n-icon size="16" class="opera">
              <RiFileCopyFill @click="copyCode" />
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
            <RiArrowUpDoubleLine size="20" />
            <span>收起源代码</span>
          </div>
        </Transition>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
  RiArrowUpDoubleLine,
  RiCodeSFill,
  RiCodeSSlashFill,
  RiEditFill,
  RiFileCopyFill,
  RiGithubFill
} from '@remixicon/vue'
import { useClipboard } from '@vueuse/core'
import { NMessage } from 'nocturne-ui'

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

const sourcePath = computed(() => {
  return `https://github.com/zlsk1/nocturne-ui/tree/master/docs/demo/${props.src}.vue`
})

const editPath = computed(() => {
  return `https://github.com/zlsk1/nocturne-ui/edit/master/docs/demo/${props.src}.vue`
})

const handleShowCode = async () => {
  showCode.value = !showCode.value
}

const copyCode = async () => {
  if (!isSupported) {
    NMessage.error({
      offset: 55,
      message: '复制失败'
    })
  } else {
    await copy()
    NMessage.success({
      offset: 55,
      message: '复制成功'
    })
  }
}
</script>
