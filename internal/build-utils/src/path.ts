import { resolve } from 'path'

export const projRoot = resolve(__dirname, '../../../')
export const distRoot = resolve(projRoot, 'dist')
/** /packages */
export const pkgRoot = resolve(projRoot, 'packages')
/** /dist/nocturne-ui */
export const pkgOutput = resolve(distRoot, 'nocturne-ui')
export const buildRoot = resolve(pkgRoot, 'internal/build')
export const nuRoot = resolve(pkgRoot, 'nocturne-ui')
export const nuPackage = resolve(pkgRoot, 'nocturne-ui/package.json')
