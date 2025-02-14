import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { parallel } from 'gulp'
import alias from '@rollup/plugin-alias'
import fg from 'fast-glob'
import {
  camelCase,
  formatBundleFilename,
  pkgOutput,
  pkgRoot,
  upperFirst,
  withTaskName,
  writeBundles
} from '../utils'
import { NAlias } from '../plugins/rollup-plugin-Nalias'
import { target } from '../build-info'
import type { TaskFunction } from 'gulp'
import type { Plugin } from 'rollup'

async function buildFullEntry(minify: boolean) {
  const plugins: Plugin[] = [
    NAlias(),
    vue(),
    vueJsx(),
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
    })
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

export const buildLocale = async (minify: boolean) => {
  const files = fg.sync(['**/*.ts'], {
    cwd: path.resolve(pkgRoot, 'locale'),
    absolute: true
  })

  return Promise.all(
    files.map(async (file) => {
      const filename = path.basename(file, '.ts')
      const name = upperFirst(camelCase(filename))

      const bundle = await rollup({
        input: file,
        plugins: [
          esbuild({
            sourceMap: minify,
            target,
            minify
          })
        ]
      })

      await writeBundles(bundle, [
        {
          format: 'umd',
          dir: path.resolve(pkgOutput, 'dist/locale'),
          name: `locale${name}`,
          exports: 'auto',
          sourcemap: minify,
          entryFileNames: minify ? '[name].min.js' : '[name].js'
        },
        {
          format: 'esm',
          dir: path.resolve(pkgOutput, 'dist/locale'),
          sourcemap: minify,
          entryFileNames: minify ? '[name].min.mjs' : '[name].mjs'
        }
      ])
    })
  )
}

export const buildFull = (minify: boolean) => () =>
  Promise.all([buildFullEntry(minify), buildLocale(minify)])

export const buildFullBundle: TaskFunction = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false))
)
