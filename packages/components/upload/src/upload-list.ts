import { iconPropType, isObject, isUndefined } from '@nocturne-ui/utils'
import { pick } from 'lodash'
import { UploadFile } from './types'
import { uploadProps } from './upload'

export const uploadListProps = {
  ...pick(uploadProps, ['fileList', 'listType', 'previewFile', 'disabled']),
  /**
   * @default DeleteOutlined
   */
  removeIcon: {
    type: iconPropType
  }
} as const

export const uploadListEmits = {
  preview: (file: UploadFile, e?: Event) =>
    e instanceof Event || isUndefined(e) || isObject(file),
  remove: (file: UploadFile) => isObject(file)
}
