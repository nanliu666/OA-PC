module.exports = {
  globals: {
    _: 'readonly'
  },
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  rules: {
    'no-console': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-prototype-builtins': 'off',
    semi: [2, 'never'],
    quotes: ['error', 'single'],
    'max-len': [
      1,
      {
        code: 120
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
