import type { ImgHTMLAttributes } from 'vue'

export type BeforeUploadFileType = File | Blob | boolean | string

export type Action = string | ((file: VcFile) => string | Promise<string>)

export interface UploadProgressEvent extends Partial<ProgressEvent> {
  percent?: number
}

export type UploadRequestMethod =
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'post'
  | 'put'
  | 'patch'

export type UploadRequestHeader = Record<string, string>

export interface UploadRequestError extends Error {
  status?: number
  method?: UploadRequestMethod
  url?: string
}

export interface UploadRequestOption<T = any> {
  onProgress?: (event: UploadProgressEvent) => void
  onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void
  onSuccess?: (body: T, xhr?: XMLHttpRequest) => void
  data?: Record<string, unknown>
  filename: string
  file: Exclude<BeforeUploadFileType, File | boolean> | VcFile
  withCredentials?: boolean
  action: string
  headers?: UploadRequestHeader
  method: UploadRequestMethod
}

export type UploadFileStatus =
  | 'error'
  | 'success'
  | 'uploading'
  | 'done'
  | 'removed'

export interface UploadFile<T = any> {
  uid: string
  size?: number
  name: string
  fileName?: string
  lastModified?: number
  lastModifiedDate?: Date
  url?: string
  status?: UploadFileStatus
  percent?: number
  thumbUrl?: string
  crossOrigin?: ImgHTMLAttributes['crossorigin']
  response?: T
  error?: any
  linkProps?: any
  type?: string
  xhr?: T
  preview?: string
  originFileObj?: VcFile
}

export interface InternalUploadFile<T = any> extends UploadFile<T> {
  originFileObj: VcFile
}

export interface VcFile extends File {
  uid: string
}

export interface UploadChangeParam<T = UploadFile> {
  file: T
  fileList: T[]
  event?: UploadProgressEvent
}

export type OnBatchStart = (
  fileList: {
    file: VcFile
    parsedFile: VcFile | undefined
  }[]
) => void

export type ListType = 'picture' | 'text'

export type PreviewFileHandler = (file: File | Blob) => Promise<string>
