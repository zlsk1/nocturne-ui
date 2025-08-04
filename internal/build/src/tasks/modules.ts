import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import esbuild from 'rollup-plugin-esbuild'
import fg from 'fast-glob'
import commonjs from '@rollup/plugin-commonjs'
import { rollup } from 'rollup'
import { parallel } from 'gulp'
import { excludeFiles, nuRoot, pkgRoot } from '@nocturne-ui/build-utils'
import { buildConfigEntries, target } from '../build-info'
import { getExternal, withTaskName, writeBundles } from '../utils'
import { NAlias } from '../'
import type { TaskFunction } from 'gulp'
import type { OutputOptions, Plugin } from 'rollup'

const extensions = ['.mjs', '.js', '.ts', '.json']

const plugins = [
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
  })
] as Plugin[]

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
    plugins,
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
    plugins,
    treeshake: false
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
