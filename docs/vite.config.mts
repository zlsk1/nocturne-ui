import path from 'path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import glob from 'fast-glob'
import Inspect from 'vite-plugin-inspect'
import mkcert from 'vite-plugin-mkcert'
import { loadEnv } from 'vitepress'
import { projRoot } from '../build/utils'
import { autoImportDemo } from './.vitepress/plugins/demo-import'

const { dependencies: deps } = await import(
  '../packages/nocturne-ui/package.json'
)
const { dependencies: docsDeps } = await import('./package.json')

const optimizeDeps = [
  ...new Set([...Object.keys(deps), ...Object.keys(docsDeps)])
].filter((dep) => !dep.startsWith('@types/'))

optimizeDeps.push(
  ...(await glob('dayjs/(locale|plugin)/*.js', {
    cwd: path.resolve(projRoot, 'node_modules')
  }))
)

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    resolve: {
      alias: [
        { find: /^@docs\/(.+)/, replacement: path.resolve(__dirname, '$1') }
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api']
        }
      }
    },
    server: {
      host: true
    },
    plugins: [
      autoImportDemo(),
      UnoCSS(),
      Inspect(),
      env.HTTPS ? mkcert() : undefined
    ],
    optimizeDeps: {
      include: ['vue', ...optimizeDeps]
    }
  }
})
