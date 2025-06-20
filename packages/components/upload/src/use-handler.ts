import { getCurrentInstance } from 'vue'
import { useForm } from '@nocturne-ui/components/form'
import { file2Obj, getFileItem, removeFileItem, updateFileList } from './util'
import type { UploadEmits, UploadProps } from './upload'
import type {
  OnBatchStart,
  UploadChangeParam,
  UploadFile,
  UploadProgressEvent,
  VcFile
} from './types'
import type { SetupContext } from 'vue'

export const useHandler = (props: UploadProps, reqs: Record<string, any>) => {
  const { formItem } = useForm()

  const instance = getCurrentInstance()!
  const emit = instance.emit as SetupContext<UploadEmits>['emit']

  const onChange = (
    file: UploadFile,
    changedFileList: UploadFile[],
    event?: UploadProgressEvent
  ) => {
    const cloneList = [...changedFileList]

    const changeInfo: UploadChangeParam<UploadFile> = {
      file: file as UploadFile,
      fileList: cloneList
    }

    if (event) {
      changeInfo.event = event
    }

    emit('change', changeInfo)
    emit('update:fileList', changeInfo.fileList)
    formItem?.validate('change')
  }

  const onSuccess = (response: any, file: VcFile | undefined, xhr: any) => {
    if (!file) return
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
    } catch {}

    // removed
    if (!getFileItem(file, props.fileList || [])) {
      return
    }

    const targetItem = file2Obj(file)
    targetItem.status = 'done'
    targetItem.percent = 100
    targetItem.response = response
    targetItem.xhr = xhr

    const nextFileList = updateFileList(targetItem, props.fileList || [])

    onChange(targetItem, nextFileList)
  }

  const onProgress = (e: UploadProgressEvent, file?: VcFile) => {
    if (!file) return
    // removed
    if (!getFileItem(file, props.fileList || [])) {
      return
    }

    const targetItem = file2Obj(file)
    targetItem.status = 'uploading'
    targetItem.percent = e.percent

    const nextFileList = updateFileList(targetItem, props.fileList || [])

    onChange(targetItem, nextFileList, e)
  }

  const onError = (error: Error, response: any, file?: VcFile) => {
    if (!file) return
    // removed
    if (!getFileItem(file, props.fileList || [])) {
      return
    }

    const targetItem = file2Obj(file)
    targetItem.error = error
    targetItem.response = response
    targetItem.status = 'error'

    const nextFileList = updateFileList(targetItem, props.fileList || [])

    onChange(targetItem, nextFileList)
  }

  const handleRemove = (file: UploadFile) => {
    let currentFile: UploadFile
    const mergedRemove = props.onRemove
    Promise.resolve(
      typeof mergedRemove === 'function' ? mergedRemove(file) : mergedRemove
    ).then((ret) => {
      // Prevent removing file
      if (ret === false) {
        return
      }

      const removedFileList = removeFileItem(file, props.fileList || [])

      if (removedFileList) {
        currentFile = { ...file, status: 'removed' }
        props.fileList?.forEach((item) => {
          const matchKey = currentFile.uid !== undefined ? 'uid' : 'name'
          if (
            item[matchKey] === currentFile[matchKey] &&
            !Object.isFrozen(item)
          ) {
            item.status = 'removed'
          }
        })
        abort(currentFile)

        onChange(currentFile, removedFileList)
      }
    })
  }

  const onBatchStart: OnBatchStart = (batchFileInfoList) => {
    const filteredFileInfoList = batchFileInfoList.filter(Boolean)

    // Nothing to do since no file need upload
    if (!filteredFileInfoList.length) {
      return
    }

    const objectFileList = filteredFileInfoList.map((info) =>
      file2Obj(info.file as VcFile)
    )

    // Concat new files with prev files
    let newFileList = [...(props.fileList || [])]

    objectFileList.forEach((fileObj) => {
      // Replace file if exist
      newFileList = updateFileList(fileObj, newFileList)
    })

    objectFileList.forEach((fileObj, index) => {
      // Repeat trigger `onChange` event for compatible
      let triggerFileObj: UploadFile = fileObj

      if (!filteredFileInfoList[index].parsedFile) {
        // `beforeUpload` return false
        const { originFileObj } = fileObj
        let clone

        try {
          clone = new File([originFileObj], originFileObj.name, {
            type: originFileObj.type
          }) as any as UploadFile
        } catch {
          clone = new Blob([originFileObj], {
            type: originFileObj.type
          }) as any as UploadFile
          clone.name = originFileObj.name
          clone.lastModifiedDate = new Date()
          clone.lastModified = Date.now()
        }

        clone.uid = fileObj.uid
        triggerFileObj = clone
      } else {
        // Inject `uploading` status
        fileObj.status = 'uploading'
      }

      onChange(triggerFileObj, newFileList)
    })
  }

  const abort = (file?: any) => {
    if (file) {
      const uid = file.uid ? file.uid : file
      if (reqs[uid] && reqs[uid].abort) {
        reqs[uid].abort()
      }
      delete reqs[uid]
    } else {
      Object.keys(reqs).forEach((uid) => {
        if (reqs[uid] && reqs[uid].abort) {
          reqs[uid].abort()
        }
        delete reqs[uid]
      })
    }
  }

  return {
    onSuccess,
    onProgress,
    onError,
    handleRemove,
    onBatchStart,
    abort
  }
}
