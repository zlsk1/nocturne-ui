import path from 'path'
import { writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postcss from 'postcss'
import scss from 'rollup-plugin-scss'
import vue from '@vitejs/plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import { simple as walk } from 'acorn-walk'
import alias from '@rollup/plugin-alias'
import fg from 'fast-glob'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'

const input = fg.sync('**/*.{js,ts,vue}', {
  cwd: path.resolve('../packages'),
  absolute: true,
  onlyFiles: true
}).filter(path => !path.includes('node_modules'))

export default [
  {
    input,
    output: [
      {
        dir: '../dist/es',
        format: 'es',
        preserveModules: true,
        entryFilesName: '[name].mjs',
        sourcemap: true
      },
      {
        dir: '../dist/lib',
        name: 'FreedomUI',
        format: 'cjs',
        globals: { vue: 'Vue' },
        preserveModules: true,
        entryFilesName: '[name].js',
        sourcemap: true
      }
    ],
    external: ['vue', '@vue/shared', '@vueuse/core', '@popperjs/core'],
    plugins: [
      vue(),
      nodeResolve({ extensions: ['.mjs', '.js', '.ts', '.json'] }),
      esbuild({
        sourceMap: true,
        target: 'es2018',
        loaders: {
          '.vue': 'ts'
        }
      }),
      scss({
        output: (styles, styleNodes) => {
          console.log(styles)
          return Promise.all([
            postcss([autoprefixer]).process(styles, { from: './theme-chalk/index.scss' }),
            postcss([autoprefixer, cssnano({
              preset: 'default',
              postcssZindex: false,
              reduceIdents: false
            })]).process(styles, { from: './theme-chalk/index.scss' })
          ]).then(result => {
          })
        }
      })
      // alias({
      //   entries: [
      //     { find: /^@/, replacement: path.resolve('../packages') }
      //   ]
      // })
    ]
  },
  {
    input: './index.ts',
    output: {
      format: 'umd',
      file: '../dist/dist/index.full.js',
      name: 'FreedomUI',
      globals: {
        vue: 'Vue'
      },
      exports: 'named'
    },
    external: ['vue'],
    plugins: [
      vue(),
      nodeResolve({ extensions: ['.mjs', '.js', '.ts', '.json'] }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2018',
        loaders: {
          '.vue': 'ts'
        }
      }),
      alias({
        entries: [
          { find: /^@\/(.*)/, replacement: path.resolve('../packages/$1') }
        ]
      }),
      replace(({
        'process.env.NODE_ENV': '"production"',
        preventAssignment: true
      })),
      scss()
    ]
  }
  // {
  //   input: './theme-chalk/index.scss',
  //   plugins: [
  //     scss({
  //       output: (styles, styleNodes) => {
  //         return Promise.all([
  //           postcss([autoprefixer, cssnano({
  //             preset: 'default',
  //             postcssZindex: false,
  //             reduceIdents: false
  //           })]).process(styles, { from: './theme-chalk/index.scss' })
  //         ]).then(result => {
  //           writeFile(path.resolve('../dist/dist/index.css'), result[0].css, 'utf8')
  //         })
  //       }
  //     })
  //   ]
  // }
]
