import { definePropType, isArray, isUndefined } from '@nocturne-ui/utils'
import { isObject } from 'lodash'
import Upload from './upload.vue'
import type {
  Action,
  ListType,
  PreviewFileHandler,
  UploadChangeParam,
  UploadFile
} from './types'
import type { ExtractPropTypes } from 'vue'

export const uploadProps = {
  action: {
    type: definePropType<Action>([String, Function]),
    required: true
  },
  drop: {
    type: Boolean,
    default: true
  },
  withCredentials: {
    type: Boolean,
    default: false
  },
  method: {
    type: String,
    default: 'post'
  },
  name: {
    type: String,
    default: 'file'
  },
  headers: {
    type: Object
  },
  customRequest: {
    type: Function
  },
  fileList: {
    type: definePropType<UploadFile[]>(Array)
  },
  onRemove: {
    type: definePropType<
      (file: UploadFile) => boolean | Promise<void | boolean> | void
    >(Function)
  },
  beforeUpload: {
    type: definePropType<
      (file: UploadFile, fileList: UploadFile[]) => boolean | Promise<boolean>
    >(Function)
  },
  data: {
    type: definePropType<
      | Record<string, unknown>
      | ((file: UploadFile) => Promise<Record<string, unknown>>)
    >([Object, Function])
  },
  directory: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  accept: {
    type: String,
    default: ''
  },
  listType: {
    type: definePropType<ListType>(String),
    default: 'text'
  },
  previewFile: {
    type: definePropType<PreviewFileHandler>(Function)
  },
  showUploadList: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export const uploadEmits = {
  drop: (e: DragEvent) => e instanceof DragEvent,
  change: (changeInfo: UploadChangeParam) => isObject(changeInfo),
  'update:fileList': (fileList: UploadFile[]) => isArray(fileList),
  reject: (fileList: UploadFile[]) => isArray(fileList),
  preview: (file: UploadFile, e?: Event) =>
    e instanceof Event || isUndefined(e) || isObject(file)
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadEmits = typeof uploadEmits
export type UploadInstance = InstanceType<typeof Upload>
