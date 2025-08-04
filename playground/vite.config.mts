import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import glob from 'fast-glob'
import { nuRoot, pkgRoot, projRoot } from '@nocturne-ui/build-utils'
import { dependencies } from '../packages/nocturne-ui/package.json'
import './init'
import type { Plugin, UserConfig } from 'vite'

export default defineConfig(async () => {
  let packageDeps = Object.keys(dependencies)
  packageDeps = packageDeps.filter((dep: string) => !dep.startsWith('@types/'))
  const optimizeDeps = await glob('dayjs/(locale|plugin)/*.js', {
    cwd: path.resolve(projRoot, 'node_modules')
  })

  return {
    plugins: [Vue() as Plugin, VueJsx(), Unocss()],
    resolve: {
      alias: [
        {
          find: /^nocturne-ui(\/(es|lib))?$/,
          replacement: path.resolve(nuRoot, 'index.ts')
        },
        {
          find: /^@nocturne-ui\/(es|lib)\/(.*)$/,
          replacement: `${pkgRoot}/$2`
        }
      ]
    },
    server: {
      port: 3024,
      host: true
    },
    optimizeDeps: {
      include: ['vue', ...packageDeps, ...optimizeDeps]
    }
  } as UserConfig
})
