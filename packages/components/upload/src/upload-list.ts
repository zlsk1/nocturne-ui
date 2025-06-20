import { iconPropType, isObject, isUndefined } from '@nocturne-ui/utils'
import { RiDeleteBin7Line } from '@remixicon/vue'
import { pick } from 'lodash'
import { UploadFile } from './types'
import { uploadProps } from './upload'

export const uploadListProps = {
  ...pick(uploadProps, ['fileList', 'listType', 'previewFile', 'disabled']),
  removeIcon: {
    type: iconPropType,
    default: RiDeleteBin7Line
  }
} as const

export const uploadListEmits = {
  preview: (file: UploadFile, e?: Event) =>
    e instanceof Event || isUndefined(e) || isObject(file),
  remove: (file: UploadFile) => isObject(file)
}
