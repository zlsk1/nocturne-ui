import { copyFile, mkdir } from 'fs/promises'
import { resolve } from 'path'
import { defineConfig } from 'tsup'

const distRoot = resolve('./dist')

const createdir = async () => {
  await mkdir(distRoot, { recursive: true })
}
createdir()

const copyPackage = async () => {
  await copyFile(resolve('./package.json'), resolve(distRoot, 'package.json'))
}

export default defineConfig({
  entry: {
    index: 'src/NocturneUIResolver.ts'
  },
  outDir: resolve(distRoot),
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: false,
  onSuccess() {
    return copyPackage()
  }
})
