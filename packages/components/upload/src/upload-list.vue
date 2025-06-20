<template>
  <div :class="ns.b('list')">
    <TransitionGroup
      tag="div"
      name="fade-in-linear"
      :class="ns.bem('list', 'item', 'container')"
    >
      <div
        v-for="file in mergedItems"
        :key="file.uid"
        :class="[
          ns.be('list', 'item'),
          ns.bem('list', 'item', listType),
          ns.is('error', file.status === 'error')
        ]"
      >
        <slot
          name="list"
          :file="file"
          :file-list="fileList"
          :actions="{
            remove: () => {
              $emit('remove', file)
            },
            preview: () => {
              $emit('preview', file)
            }
          }"
        >
          <n-tooltip
            :disabled="file.status !== 'error'"
            effect="dark"
            placement="top"
          >
            <template #default>
              <div>
                <n-icon v-if="listType === 'text'" size="14">
                  <RiLoader5Line
                    v-if="file.status === 'uploading'"
                    :class="ns.bem('list', 'item', 'loader')"
                  />
                  <RiLink v-else />
                </n-icon>
                <a
                  v-else-if="listType === 'picture'"
                  key="view"
                  :class="ns.bem('list', 'item', 'thumbnail')"
                  :title="file.name"
                  :href="file.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <n-icon v-if="file.status === 'uploading'" size="30">
                    <RiLoader5Line :class="ns.bem('list', 'item', 'loader')" />
                  </n-icon>
                  <img
                    v-else
                    :src="file.thumbUrl || file.url"
                    :alt="file.name"
                    :class="ns.bem('list', 'item', 'image')"
                    :crossorigin="file.crossOrigin"
                  />
                </a>
                <a
                  v-if="file.url || file.thumbUrl"
                  key="view"
                  :class="ns.bem('list', 'item', 'name')"
                  target="_blank"
                  rel="noopener noreferrer"
                  :title="file.name"
                  :href="file.url || file.thumbUrl"
                  @click="(e: Event) => $emit('preview', file, e)"
                >
                  {{ file.name }}
                </a>
                <span
                  v-else
                  :class="ns.bem('list', 'item', 'name')"
                  :title="file.name"
                  @click="(e: Event) => $emit('preview', file, e)"
                >
                  {{ file.name }}
                </span>
                <n-icon
                  v-if="!disabled"
                  size="14"
                  :class="ns.bem('list', 'item', 'remove')"
                  :title="t('noc.upload.removeFile')"
                  @click="$emit('remove', file)"
                >
                  <component :is="removeIcon" />
                </n-icon>
                <div
                  v-if="file.percent"
                  :class="ns.bem('list', 'item', 'progress')"
                >
                  <n-progress :percentage="file.percent" />
                </div>
              </div>
            </template>
            <template #content>
              <span>
                {{
                  file.response && isString(file.response)
                    ? file.response
                    : file.error?.statusText ||
                      file.error?.message ||
                      t('noc.upload.uploadError')
                }}
              </span>
            </template>
          </n-tooltip>
        </slot>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef, triggerRef, watch, watchEffect } from 'vue'
import { useLocale, useNamespace } from '@nocturne-ui/composables'
import { RiLink, RiLoader5Line } from '@remixicon/vue'
import NIcon from '@nocturne-ui/components/icon'
import NTooltip from '@nocturne-ui/components/tooltip'
import { isString, isUndefined } from '@nocturne-ui/utils'
import NProgress from '@nocturne-ui/components/progress'
import { uploadListEmits, uploadListProps } from './upload-list'
import { previewImage } from './util'
import type { InternalUploadFile, UploadFile } from './types'

const ns = useNamespace('upload')
const { t } = useLocale()

const props = defineProps(uploadListProps)
defineEmits(uploadListEmits)

const mergedItems = shallowRef<UploadFile[]>([])

watch(
  () => props.fileList,
  (val = []) => {
    mergedItems.value = val.slice()
  },
  {
    immediate: true,
    deep: true
  }
)

watchEffect(() => {
  if (props.listType !== 'picture') {
    return
  }
  let hasUpdate = false
  ;(props.fileList || []).forEach((file: InternalUploadFile, index) => {
    if (
      isUndefined(document) ||
      isUndefined(window) ||
      !(window as any).FileReader ||
      !(window as any).File ||
      !(
        file.originFileObj instanceof File ||
        (file.originFileObj as Blob) instanceof Blob
      ) ||
      file.thumbUrl !== undefined
    ) {
      return
    }
    file.thumbUrl = ''
    const mergedPreviewFile = props.previewFile || previewImage
    mergedPreviewFile(file.originFileObj as File).then(
      (previewDataUrl: string) => {
        // Need append '' to avoid dead loop
        const thumbUrl = previewDataUrl || ''
        if (thumbUrl !== file.thumbUrl) {
          mergedItems.value[index].thumbUrl = thumbUrl
          hasUpdate = true
        }
      }
    )
  })
  if (hasUpdate) {
    triggerRef(mergedItems)
  }
})
</script>
