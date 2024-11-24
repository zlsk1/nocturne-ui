import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import esbuild from 'rollup-plugin-esbuild'
import fg from 'fast-glob'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'

import { rollup } from 'rollup'
import { excludeFiles, pkgRoot, writeBundles } from '../utils'

import { NAlias } from '../plugins/rollup-plugin-Nalias'
import { buildConfigEntries } from '../build-info'

import type { OutputOptions } from 'rollup'

const extensions = ['.mjs', '.js', '.ts', '.json']

export const buildModules = async () => {
  const input = excludeFiles(
    fg.sync(['**/*.{js,ts,vue}', '!**/gulpfile.ts'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )
  const bundle = await rollup({
    input,
    plugins: [
      NAlias(),
      vue(),
      vueJsx(),
      nodeResolve({ extensions }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2021',
        loaders: {
          '.vue': 'ts'
        }
      }),
      alias({
        entries: [
          { find: /^@\/(.*)/, replacement: path.resolve('../packages/$1') }
        ]
      })
    ],
    external: [
      'vue',
      '@vue/shared',
      '@vueuse/core',
      '@popperjs/core',
      '@remixicon/vue',
      '@types/lodash',
      'async-validator',
      'lodash'
    ],
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
