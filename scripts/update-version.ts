import { writeProjectManifest } from '@nocturne-ui/build-utils'
import consola from 'consola'

const tagVersion = process.env.TAG_VERSION
const gitHead = process.env.GIT_HEAD

if (!tagVersion || !gitHead) {
  consola.error('make sure you have set the environment var')
}

;(function main() {
  writeProjectManifest('nocturne-ui', { version: tagVersion })
  writeProjectManifest('@nocturne-ui/theme-chalk', { version: tagVersion })
})()
