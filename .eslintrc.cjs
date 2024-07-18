module.exports = {
  root: true,
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/max-attributes-per-line': [2, {
      'singleline': {
        'max': 2
      },
      'multiline': {
        'max': 1
      }
    }],
    'vue/multi-word-component-names': [0, {}],
    'vue/html-self-closing': [2, { // 不自动闭合单个标签
      'html': {
        'void': 'never',
        'normal': 'never',
        'component': 'never'
      },
      'svg': 'always'
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-multiple/template/root': 'off',
    'arrow-spacing': [2, { 'before': true, 'after': true }],
    'block-spacing': [2, 'always'],
    'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }], // 对象字面量中键和:中的间隔
    'keyword-spacing': [2, { 'before': true, 'after': true }], // 关键字间隔
    'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }], // 条件表达式格式
    'accessor-pairs': 2, // getter和setter需同时出现
    'camelcase': [2, { 'properties': 'always' }],
    'comma-dangle': [2, 'never'], // 禁止使用尾随逗号
    'comma-spacing': [2, { 'before': false, 'after': true }],
    'comma-style': [2, 'last'], // 逗号放在行前或行后
    'constructor-super': 2,
    'dot-location': [2, 'property'], // .与属性同一行
    'eol-last': 2, // 非空文件末尾至少有一个换行符
    'eqeqeq': [2, 'always', { 'null': 'ignore' }],
    'handle-callback-err': [2, '^(err|error)$'], // 处理回调错误
    'indent': [2, 2, { // 缩进
      'SwitchCase': 1, // switch语句子块的case
      'VariableDeclarator': 'first' // 变量声明
    }],
    'new-cap': [2, { 'newIsCap': true, 'capIsNew': false }], // 构造函数以大写字母开头
    'new-parens': 2, // 调用不带参数的构造函数时强制禁止使用括号
    'one-var': [2, { 'initialized': 'never' }], // 每个作用域内需要对已初始化变量进行一次变量声明
    'operator-linebreak': [2, 'after', { 'overrides': { '?': 'before', ':': 'before' }}], // 强制操作符使用一致的换行样式
    'padded-blocks': [2, 'never'],
    'quotes': [2, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }], // 尽量使用单引号
    'semi': [2, 'never'], // 语句后添加分号
    'semi-spacing': [2, { 'before': false, 'after': true }], // 分号间隔
    'space-before-blocks': [2, 'always'], // 块前间距
    'space-before-function-paren': [2, 'never'], // 函数左侧括号前间距
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2, // 运算符空格
    'space-unary-ops': [2, { 'words': true, 'nonwords': false }], // 强制在一元运算符之前或之后使用一致的空格
    'spaced-comment': [2, 'always', { 'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] }],
    'template-curly-spacing': [2, 'never'], // 模板字符串始末是否有空格
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'],
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [2, 'always', { objectsInObjects: false }],
    'array-bracket-spacing': [2, 'never'],
    'no-array-constructor': 2, // 禁止Array构造函数
    'no-class-assign': 2, // 不允许重新分配类成员
    'no-cond-assign': 2, // 禁止在条件表达式中使用赋值表达式
    'no-const-assign': 2, // 不允许重新分配const变量
    'no-control-regex': 2, // 禁止在正则表达式中使用控制字符
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, { 'allowLoop': false, 'allowSwitch': false }],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [2, { 'max': 1 }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, { 'defaultAssignment': false }],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [1, { 'vars': 'all', 'args': 'none' }],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,

    'vue/jsx-uses-vars': 2
  }
}
