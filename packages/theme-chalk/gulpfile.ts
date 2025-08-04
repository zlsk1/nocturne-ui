import path from 'path'
import { Transform } from 'stream'
import { type TaskFunction, dest, parallel, series, src } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import postcss from 'postcss'
import cssnano from 'cssnano'
import { pkgOutput } from '@nocturne-ui/build-utils'
import chalk from 'chalk'
import consola from 'consola'
import type Vinly from 'vinyl'

const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(pkgOutput, 'theme-chalk')

/**
 * using `postcss` and `cssnano` to compress CSS
 * @returns
 */
function compressWithCssnano() {
  const processor = postcss([
    cssnano({
      preset: [
        'default',
        {
          // avoid color transform
          colormin: false,
          // avoid font transform
          minifyFontValues: false
        }
      ]
    })
  ])
  return new Transform({
    objectMode: true,
    transform(chunk, _encoding, callback) {
      const file = chunk as Vinly
      if (file.isNull()) {
        callback(null, file)
        return
      }
      if (file.isStream()) {
        callback(new Error('Streaming not supported'))
        return
      }
      const cssString = file.contents!.toString()
      processor.process(cssString, { from: file.path }).then((result) => {
        file.contents = Buffer.from(result.css)
        consola.success(
          `${chalk.cyan(file.basename)}: ${chalk.magenta(`${cssString.length / 1000} KB`)} -> ${chalk.blue(`${result.css.length / 1000} KB`)}`
        )
        callback(null, file)
      })
    }
  })
}

/**
 * compile theme-chalk scss & minify
 * not use sass.sync().on('error', sass.logError) to throw exception
 * @returns
 */
function buildThemeChalk() {
  const sass = gulpSass(dartSass)
  const noNPrefixFile = /(index|base|display)/
  return src(path.resolve(__dirname, 'src/*.scss'))
    .pipe(
      sass.sync({
        silenceDeprecations: ['legacy-js-api', 'mixed-decls', 'color-functions']
      })
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(compressWithCssnano())
    .pipe(
      rename(({ basename }) => {
        if (!noNPrefixFile.test(basename)) {
          basename = `n-${basename}`
        }
      })
    )
    .pipe(dest(distFolder))
}

/**
 * Build dark Css Vars
 * @returns
 */
function buildDarkCssVars() {
  const sass = gulpSass(dartSass)
  return src(path.resolve(__dirname, 'src/dark/css-vars.scss'))
    .pipe(
      sass.sync({
        silenceDeprecations: ['legacy-js-api', 'mixed-decls', 'color-functions']
      })
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(compressWithCssnano())
    .pipe(dest(`${distFolder}/dark`))
}

/**
 * copy from packages/theme-chalk/dist to dist/element-plus/theme-chalk
 */
export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

/**
 * copy source file to packages
 */

export function copyThemeChalkSource() {
  return src(path.resolve(__dirname, 'src/**')).pipe(
    dest(path.resolve(distBundle, 'src'))
  )
}

export const build: TaskFunction = parallel(
  copyThemeChalkSource,
  series(buildThemeChalk, buildDarkCssVars, copyThemeChalkBundle)
)

export default build
