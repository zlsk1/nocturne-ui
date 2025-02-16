import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import esbuild from 'rollup-plugin-esbuild'
import fg from 'fast-glob'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import { rollup } from 'rollup'
import { parallel } from 'gulp'
import {
  excludeFiles,
  getExternal,
  nuRoot,
  pkgRoot,
  withTaskName,
  writeBundles
} from '../utils'
import { NAlias } from '../plugins/rollup-plugin-Nalias'
import { buildConfigEntries, target } from '../build-info'
import type { TaskFunction } from 'gulp'
import type { OutputOptions } from 'rollup'

const extensions = ['.mjs', '.js', '.ts', '.json']

export const buildMainModules = async () => {
  const input = excludeFiles(
    fg.sync(['**/*.{js,ts,vue}', '!**/style/(index|css).ts'], {
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
        target,
        loaders: {
          '.vue': 'ts'
        }
      }),
      alias({
        entries: [
          {
            find: /^@nocturne-ui\/(.*)$/,
            replacement: path.resolve('../packages/$1')
          }
        ]
      })
    ],
    external: getExternal(),
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
        preserveModulesRoot: nuRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
}

export const buildStyleModules = async () => {
  const files = await fg('**/style/*.ts', {
    cwd: path.resolve(pkgRoot, 'components'),
    absolute: true,
    onlyFiles: true
  })

  const bundle = await rollup({
    input: files,
    plugins: [
      NAlias(),
      esbuild({
        target
      })
    ]
  })

  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: path.resolve(config.output.path, 'components'),
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: nuRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
}

export const buildModules: TaskFunction = parallel(
  withTaskName('buildFullMinified', buildMainModules),
  withTaskName('buildFull', buildStyleModules)
)
