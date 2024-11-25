import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import glob from 'fast-glob'
import { dependencies } from '../packages/package.json'
import { projRoot } from '../build/utils'
import './init'

export default defineConfig(async () => {
  let packageDeps = Object.keys(dependencies)
  packageDeps = packageDeps.filter((dep: string) => !dep.startsWith('@types/'))
  const optimizeDeps = await glob('dayjs/(locale|plugin)/*.js', {
    cwd: path.resolve(projRoot, 'node_modules')
  })

  return {
    plugins: [vue(), vueJsx(), Unocss()],
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
      include: ['vue', ...packageDeps, ...optimizeDeps]
    }
  }
})
