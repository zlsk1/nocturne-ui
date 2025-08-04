import { execSync } from 'child_process'
import fg from 'fast-glob'

const gitStatus = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')

const subjectComplete = gitStatus
  .find((r) => ~r.indexOf('M  packages/components'))
  ?.replace(/\//g, '%%')
  ?.match(/packages%%components%%((\w|-)*)/)?.[1]

const scopeComplete = gitStatus
  .find((r) => ~r.indexOf('M  packages'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/packages%%((\w|-)*)/)?.[1]

const findScope = (path) => fg.sync('*', { cwd: path, onlyDirectories: true })

const scopes = [
  ...findScope('packages'),
  ...findScope('internal'),
  'docs',
  'playground',
  'style',
  'color',
  'var',
  'ci',
  'types',
  'deps',
  'common',
  'dev'
]

/** @type {import('cz-git').UserConfig} */
export default {
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
  },
  prompt: {
    defaultScope: scopeComplete,
    defaultSubject: subjectComplete && `[${subjectComplete}] `,
    customScopesAlign: !scopeComplete ? 'top' : 'bottom'
  }
}
