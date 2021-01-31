module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 2021
  },
  ignorePatterns: [
    'dist/*',
    'scripts/*'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'quote-props': 'off',
    'semi': 'off',
    'dot-notation': 'off',
    'camelcase': 'off',
    'no-prototype-builtins': 0,
    'object-curly-spacing': 0,
    'no-case-declarations': 0,
    'no-useless-constructor': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-empty-function': 0,
  }
}
