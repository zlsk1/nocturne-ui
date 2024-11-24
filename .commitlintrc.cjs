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
        'feat', // 增加新的特征、功能
        'fix', // 修复bug
        'perf', // 提高性能的代码更改
        'style', // 不影响代码含义的修改，比如空格、格式化、缺失的分号等
        'docs', // 对文档进行了修改
        'test', // 增加确实的测试或者矫正已存在的测试
        'refactor', // 既不是修复bug也不是添加特征的代码重构
        'build', // 对构建系统或者外部依赖项进行了修改
        'ci', // 对CI配置文件或脚本进行了修改
        'chore', // 非功能性变更或对代码库进行的一般维护工作
        'revert', // 回滚操作, this revert commit hash ...
        'release' // 发布
      ]
    ]
  }
}
