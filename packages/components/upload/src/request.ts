import type {
  UploadProgressEvent,
  UploadRequestError,
  UploadRequestOption
} from './types'

function getError(option: UploadRequestOption, xhr: XMLHttpRequest) {
  const msg = `cannot ${option.method} ${option.action} ${xhr.status}'`
  const err = new Error(msg) as UploadRequestError
  err.status = xhr.status
  err.method = option.method
  err.url = option.action
  return err
}

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export default function request(options: UploadRequestOption) {
  const {
    method,
    action,
    withCredentials,
    headers,
    data,
    file,
    filename,
    onError,
    onProgress,
    onSuccess
  } = options

  const xhr = new XMLHttpRequest()

  if (onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e: UploadProgressEvent) {
      if (e.total! > 0) {
        e.percent = (e.loaded! / e.total!) * 100
      }
      onProgress(e)
    }
  }

  const formData = new FormData()

  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key]
      // support key-value array data
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item)
        })
        return
      }

      formData.append(key, value as string | Blob)
    })
  }

  if (file instanceof Blob) {
    formData.append(filename, file, (file as any).name)
  } else {
    formData.append(filename, file)
  }

  xhr.onerror = function error(e) {
    options.onError?.(e)
  }

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError?.(getError(options, xhr), getBody(xhr))
    }

    return onSuccess?.(getBody(xhr), xhr)
  }

  xhr.open(method, action, true)

  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  const _headers = headers || {}

  if (_headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  }

  Object.keys(_headers).forEach((h) => {
    if (_headers[h] !== null) {
      xhr.setRequestHeader(h, _headers[h])
    }
  })

  xhr.send(formData)

  return {
    abort() {
      xhr.abort()
    }
  }
}
