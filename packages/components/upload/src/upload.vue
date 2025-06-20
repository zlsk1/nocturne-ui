<template>
  <div ref="containerRef" :class="ns.b()">
    <div
      :class="[
        ns.m('wrapper'),
        drop && ns.m('drop'),
        dragState === 'dragover' && ns.m('drop--hover')
      ]"
      @click="handleClick"
      @drop="onDrop"
      @dragover="onDrop"
      @dragleave="onDrop"
    >
      <input
        ref="inputRef"
        type="file"
        :multiple="multiple"
        :accept="accept"
        :name="name"
        :directory="directory ? 'directory' : undefined"
        :webkitdirectory="directory ? 'webkitdirectory' : undefined"
        :class="ns.e('input')"
        @change="onChange"
      />
      <slot />
    </div>
    <n-upload-list
      v-if="showUploadList"
      :file-list="fileList"
      :list-type="listType"
      :preview-file="previewFile"
      :disabled="actualDisabled"
      @preview="(file, e) => $emit('preview', file, e)"
      @remove="(file) => handleRemove(file)"
    >
      <template #list="{ actions, file, fileList }">
        <slot
          name="list"
          :actions="actions"
          :file="file"
          :file-list="fileList"
        />
      </template>
    </n-upload-list>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { partition } from 'lodash'
import { isFunction, isObject, isString } from '@nocturne-ui/utils'
import { useFormItem } from '@nocturne-ui/components/form'
import { uploadEmits, uploadProps } from './upload'
import defaultRequest from './request'
import { useHandler } from './use-handler'
import getUid from './uid'
import traverseFileTree from './traverseFileTree'
import attrAccept from './attr-accept'
import NUploadList from './upload-list.vue'
import type {
  BeforeUploadFileType,
  UploadProgressEvent,
  UploadRequestError,
  VcFile
} from './types'

interface ParsedFileInfo {
  origin: VcFile
  action: string
  data?: Record<string, unknown>
  parsedFile?: VcFile
}

defineOptions({
  name: 'NUpload'
})

const props = defineProps(uploadProps)
const emit = defineEmits(uploadEmits)

const ns = useNamespace('upload')
const { formItemDisabled } = useFormItem()

const reqs: any = {}
let isMounted = false

const inputRef = ref<HTMLInputElement>()
const containerRef = ref<HTMLDivElement>()

const dragState = ref('drop')
const uid = ref(getUid())

const actualDisabled = computed(() => formItemDisabled.value || props.disabled)

const { onSuccess, onError, onProgress, onBatchStart, abort, handleRemove } =
  useHandler(props, reqs)

const handleClick = () => {
  if (!inputRef.value || actualDisabled.value) return

  inputRef.value.click()
}

const mergedBeforeUpload = async (file: VcFile, fileListArgs: VcFile[]) => {
  const { beforeUpload } = props

  let parsedFile: VcFile | Blob | string = file
  if (beforeUpload) {
    const result = await beforeUpload(file, fileListArgs)

    if (result === false) {
      return false
    }

    if (typeof result === 'object' && result) {
      parsedFile = result as File
    }
  }

  return parsedFile as File
}

/**
 * Process file before upload. When all the file is ready, we start upload.
 */
const processFile = async (
  file: VcFile,
  fileList: VcFile[]
): Promise<ParsedFileInfo> => {
  let transformedFile: BeforeUploadFileType | void = file
  if (mergedBeforeUpload) {
    try {
      transformedFile = await mergedBeforeUpload(file, fileList)
    } catch {
      // Rejection will also trade as false
      transformedFile = false
    }
    if (transformedFile === false) {
      return {
        origin: file,
        parsedFile: undefined,
        action: '',
        data: undefined
      }
    }
  }

  // Get latest action
  const { action } = props
  let mergedAction: string
  if (isFunction(action)) {
    mergedAction = await action(file)
  } else {
    mergedAction = action
  }

  // Get latest data
  const { data } = props
  let mergedData: Record<string, unknown> | undefined
  if (isFunction(data)) {
    mergedData = await data(file)
  } else {
    mergedData = data
  }

  const parsedData =
    // string type is from legacy `transformFile`.
    // Not sure if this will work since no related test case works with it
    (isObject(transformedFile) || isString(transformedFile)) && transformedFile
      ? transformedFile
      : file

  let parsedFile: File
  if (parsedData instanceof File) {
    parsedFile = parsedData
  } else {
    parsedFile = new File([parsedData], file.name, { type: file.type })
  }

  const mergedParsedFile: VcFile = parsedFile as VcFile
  mergedParsedFile.uid = file.uid

  return {
    origin: file,
    data: mergedData,
    parsedFile: mergedParsedFile,
    action: mergedAction
  }
}

const post = ({ data, origin, action, parsedFile }: ParsedFileInfo) => {
  if (!isMounted) {
    return
  }

  const { customRequest, name, headers, withCredentials, method } = props

  const { uid } = origin
  const request = customRequest || defaultRequest

  const requestOption = {
    action,
    filename: name,
    data,
    file: parsedFile,
    headers,
    withCredentials,
    method: method || 'post',
    onProgress: (e: UploadProgressEvent) => {
      onProgress?.(e, parsedFile)
    },
    onSuccess: (ret: any, xhr: XMLHttpRequest) => {
      onSuccess?.(ret, parsedFile, xhr)

      delete reqs[uid]
    },
    onError: (err: UploadRequestError, ret: any) => {
      onError?.(err, ret, parsedFile)

      delete reqs[uid]
    }
  }

  reqs[uid] = request(requestOption)
}

const uploadFiles = (files: File[]) => {
  const originFiles = [...files] as VcFile[]
  const postFiles = originFiles.map((file: VcFile & { uid?: string }) => {
    file.uid = getUid()
    return processFile(file, originFiles)
  })

  // Batch upload files
  Promise.all(postFiles).then((fileList) => {
    onBatchStart?.(
      fileList.map(({ origin, parsedFile }) => ({ file: origin, parsedFile }))
    )

    fileList
      .filter((file) => file.parsedFile !== null)
      .forEach((file) => {
        post(file)
      })
  })
}

const onDrop = (e: DragEvent) => {
  const { multiple, directory, accept } = props

  if (actualDisabled.value) return

  e.preventDefault()
  dragState.value = e.type

  if (e.type === 'drop') {
    emit('drop', e)
  }
  if (e.type === 'dragover') {
    return
  }

  if (directory) {
    traverseFileTree(
      Array.prototype.slice.call(e.dataTransfer?.items),
      uploadFiles,
      (_file: VcFile) => attrAccept(_file, accept)
    )
  } else {
    const files: [VcFile[], VcFile[]] = partition(
      Array.prototype.slice.call(e.dataTransfer?.files),
      (file: VcFile) => attrAccept(file, accept)
    )
    let successFiles = files[0]
    const errorFiles = files[1]
    if (multiple === false) {
      successFiles = successFiles.slice(0, 1)
    }

    uploadFiles(successFiles)
    if (errorFiles.length) emit('reject', errorFiles)
  }
}

const reset = () => {
  uid.value = getUid()
}

const onChange = (e: Event) => {
  const { accept, directory } = props
  const { files } = e.target as any
  const acceptedFiles = [...files].filter(
    (file: VcFile) => !directory || attrAccept(file, accept)
  )
  uploadFiles(acceptedFiles)
  reset()
}

onMounted(() => {
  isMounted = true
})

onBeforeUnmount(() => {
  isMounted = false
  abort()
})

defineExpose({
  onBatchStart,
  onSuccess,
  onProgress,
  onError,
  abort
})
</script>
