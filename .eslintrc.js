module.exports = {
  env: {
    browser: true,
    es2021: true,
    jquery: true
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'prefer-const': 'error',
    'no-var': 'error'
  }
};
