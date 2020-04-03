module.exports = {
  extends: ['standard', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect'
    }
  },
  env: {
    browser: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2],
    'no-unused-vars': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    // '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/interface-name-prefix': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    // 'no-console': 'error',
    'react/jsx-uses-vars': [2],
    'max-len': ['error', { code: 2250 }],
    'comma-dangle': ['error', 'always-multiline'],
    // semi: [2, 'always'],
    'arrow-parens': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'no-new-object': 'error',
    'no-array-constructor': 'error',
    'sort-imports': [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'react/prop-types': 0,
    'react/no-find-dom-node': 0,
    'react/no-children-prop': 0,
    'dot-notation': 0,
    'standard/no-callback-literal': 0,
    'no-multi-spaces': 0,
    'no-undef': 0,
    camelcase: 0,
    'lines-between-class-members': 0,
    'no-unneeded-ternary': 0,
  },
}

