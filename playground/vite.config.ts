import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { pkgRoot } from '../build/utils'

const getPackageDependencies = () => {
  const manifest = require(pkgRoot)
  const { dependencies } = manifest
  return { dependencies } as unknown as string[]
}

const dependencies = getPackageDependencies()

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../packages')
    }
  },
  server: {
    port: 3024,
    host: true
  },
  optimizeDeps: {
    include: ['vue', ...dependencies]
  }
})
