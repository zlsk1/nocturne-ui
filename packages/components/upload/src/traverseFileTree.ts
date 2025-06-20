import type { VcFile } from './types'

interface InternalDataTransferItem extends DataTransferItem {
  isFile: boolean
  file: (cd: (file: VcFile & { webkitRelativePath?: string }) => void) => void
  createReader: () => any
  fullPath: string
  isDirectory: boolean
  name: string
  path: string
}

function loopFiles(
  item: InternalDataTransferItem,
  callback: (entries: InternalDataTransferItem[]) => void
) {
  const dirReader = item.createReader()
  let fileList: InternalDataTransferItem[] = []

  function sequence() {
    dirReader.readEntries((entries: InternalDataTransferItem[]) => {
      const entryList = Array.prototype.slice.apply(entries)
      fileList = fileList.concat(entryList)

      // Check if all the file has been viewed
      const isFinished = !entryList.length

      if (isFinished) {
        callback(fileList)
      } else {
        sequence()
      }
    })
  }

  sequence()
}

const traverseFileTree = (
  files: InternalDataTransferItem[],
  callback: (files: File[]) => void,
  isAccepted: (file: VcFile) => boolean
) => {
  const _traverseFileTree = (item: InternalDataTransferItem, path?: string) => {
    item.path = path || ''
    if (item.isFile) {
      item.file((file) => {
        if (isAccepted(file)) {
          // https://github.com/ant-design/ant-design/issues/16426
          if (item.fullPath && !file.webkitRelativePath) {
            Object.defineProperties(file, {
              webkitRelativePath: {
                writable: true
              }
            })
            ;(file as any).webkitRelativePath = item.fullPath.replace(/^\//, '')
            Object.defineProperties(file, {
              webkitRelativePath: {
                writable: false
              }
            })
          }
          callback([file])
        }
      })
    } else if (item.isDirectory) {
      loopFiles(item, (entries: InternalDataTransferItem[]) => {
        entries.forEach((entryItem) => {
          _traverseFileTree(entryItem, `${path}${item.name}/`)
        })
      })
    }
  }
  files.forEach((file) => {
    _traverseFileTree(file.webkitGetAsEntry() as any)
  })
}

export default traverseFileTree
