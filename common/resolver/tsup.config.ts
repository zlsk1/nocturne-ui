import { defineConfig } from 'tsup'
import { copyFile, mkdir } from 'fs/promises'
import { resolve } from 'path'

const distRoot = resolve('nocturne-ui/resolver')

const createdir = async() => {
  await mkdir(distRoot, { recursive: true })
}
createdir()

const copyPackage = async() => {
  await copyFile(resolve('./package.json'), resolve(distRoot, 'package.json'))
}

export default defineConfig({
  entry: {
    index: 'src/NocturneUIResolver.ts'
  },
  outDir: resolve(distRoot, 'dist'),
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: false,
  onSuccess() {
    return copyPackage()
  }
})