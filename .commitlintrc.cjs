// improve speed to loading ts-config
require('@esbuild-kit/cjs-loader')
const fg = require('fast-glob')

const findScope = (path) => fg.sync('*', { cwd: path, onlyDirectories: true })

const scopes = [
  ...findScope('packages'),
  'docs',
  'playground',
  'style',
  'color',
  'var',
  'ci',
  'types',
  'deps',
  'common'
]

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 100],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],

    'scope-enum': [2, 'always', scopes],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'release'
      ]
    ]
  }
}
