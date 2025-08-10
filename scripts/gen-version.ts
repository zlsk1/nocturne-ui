import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import { nuRoot } from '@nocturne-ui/build-utils'
import pkg from '../packages/nocturne-ui/package.json'

function getVersion() {
  const tagVer = process.env.TAG_VERSION
  if (tagVer) {
    return tagVer.startsWith('v') ? tagVer.slice(1) : tagVer
  } else {
    return pkg.version
  }
}

;(function genVersion() {
  const version = getVersion()

  writeFile(
    resolve(nuRoot, 'version.ts'),
    `export const version = '${version}'\n`
  )
})()
