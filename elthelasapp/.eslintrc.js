// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    'allowImportExportEverywhere': true
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/strongly-recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    //'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'babel'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'vue/html-self-closing': 'off',
    "vue/max-attributes-per-line": ["error", {
      "singleline": 3,
      "multiline": {
        "max": 2,
        "allowFirstLine": true
      }
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    'semi': [1, 'always'],
    'quotes': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0
  }
};
