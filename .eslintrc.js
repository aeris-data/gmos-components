module.exports = {
    root: true,
    extends: [
      'plugin:vue/recommended',
      "plugin:prettier/recommended"
       
    ],
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 2018
    },
    plugins: [
      'vue',
      "prettier"
    ],
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      jest: true,
      node: true
    },
    rules: {
      'no-console': 0,
      'no-undef': 0,
      'semi': [2, 'always'],
      'space-before-function-paren': 0,
      'object-property-newline': 0,
      'vue/order-in-components': 0,
      "vue/max-attributes-per-line": [2, {
        "singleline": 10,
        "multiline": {
          "max": 10,
          "allowFirstLine": true
        }
      }],
      "vue/html-indent": ["error", 3, {
        "attribute": 1,
        "closeBracket": 0,
        "ignores": []
      }],
      "vue/name-property-casing": ["error", "kebab-case"],
      "prettier/prettier": "error"
      }
  }