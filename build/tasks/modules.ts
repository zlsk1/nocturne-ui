import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import fg from 'fast-glob'
import commonjs from '@rollup/plugin-commonjs'
import { NAlias } from '../plugins/rollup-plugin-Nalias'
import scss from 'rollup-plugin-scss'
import alias from '@rollup/plugin-alias'

import {
  excludeFiles,

  pkgRoot
} from '../utils'

import { rollup } from 'rollup'
import { writeBundles } from '../utils'
import { buildConfigEntries } from '../build-info'

import type { OutputOptions } from 'rollup'

const extensions = ['.mjs', '.js', '.ts', '.json']

export const buildModules = async() => {
  const input = excludeFiles(fg.sync(['**/*.{js,ts,vue}', '!**/gulpfile.ts'], {
    cwd: pkgRoot,
    absolute: true,
    onlyFiles: true
  }))
  const bundle = await rollup({
    input,
    plugins: [
      NAlias(),
      vue(),
      nodeResolve({ extensions }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2021',
        loaders: {
          '.vue': 'ts'
        }
      }),
      scss(),
      alias({
        entries: [
          { find: /^@\/(.*)/, replacement: path.resolve('../packages/$1') }
        ]
      })
    ],
    external: ['vue', '@vue/shared', '@vueuse/core', '@popperjs/core', '@remixicon/vue'],
    treeshake: false
  })

  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: pkgRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
}
