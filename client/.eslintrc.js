module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: 'babel-eslint',
  },
  rules: {
    "no-console": 0,
    "no-debugger": 1,
    "arrow-parens": 0,
    "arrow-body-style": 0,
  },
};
