import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import vue from '@vitejs/plugin-vue'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { parallel } from 'gulp'
import { pkgRoot, pkgOutput } from '../utils'
import { NAlias } from '../plugins/rollup-plugin-Nalias'
import alias from '@rollup/plugin-alias'
import scss from 'rollup-plugin-scss'
import {
  formatBundleFilename,
  withTaskName,
  writeBundles
} from '../utils'
import { target } from '../build-info'
import type { TaskFunction } from 'gulp'
import type { Plugin } from 'rollup'

async function buildFullEntry(minify: boolean) {
  const plugins: Plugin[] = [
    NAlias(),
    vue(),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts']
    }),
    commonjs(),
    esbuild({
      exclude: [],
      sourceMap: minify,
      target,
      loaders: {
        '.vue': 'ts'
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('production')
      },
      treeShaking: true,
      legalComments: 'eof'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    }),
    alias({
      entries: [
        { find: /^@\/(.*)/, replacement: path.resolve('../packages/$1') }
      ]
    }),
    scss()
  ]
  if (minify) {
    plugins.push(
      minifyPlugin({
        target,
        sourceMap: true
      })
    )
  }

  const bundle = await rollup({
    input: path.resolve(pkgRoot, 'index.ts'),
    plugins,
    external: ['vue', '@remixicon/vue'],
    treeshake: true
  })
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(
        pkgOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'js')
      ),
      exports: 'named',
      name: 'NocturneUI',
      globals: {
        vue: 'Vue',
        '@remixicon/vue': 'Remixicon'
      },
      sourcemap: minify
    },
    {
      format: 'esm',
      file: path.resolve(
        pkgOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'mjs')
      ),
      sourcemap: minify
    }
  ])
}

export const buildFull = (minify: boolean) => () => buildFullEntry(minify)

export const buildFullBundle: TaskFunction = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false))
)
