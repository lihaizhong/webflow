module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/recommended', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-var': ['error'],
    'vue/no-v-html': 'off',
    'vue/attributes-order': 'error',
    'vue/no-confusing-v-for-v-if': 'error',
    'vue/order-in-components': 'error',
    'vue/this-in-template': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
