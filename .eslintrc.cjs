module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/typescript/recommended',
    'prettier',
    'plugin:storybook/recommended'
  ],
  parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 'latest',
      sourceType: 'module',
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.json'],
      extraFileExtensions: ['.vue'],
      ignorePatterns: ['.eslintrc.cjs']
  },
  plugins: ['no-relative-import-paths', 'vue', '@typescript-eslint', 'prettier', 'unused-imports'],
  rules: {
      'vue/multi-word-component-names': 'off',
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/v-for-delimiter-style': ['error', 'in'],
      radix: ['error', 'always'],
      curly: 1,
      '@typescript-eslint/explicit-function-return-type': [2],
      '@typescript-eslint/no-explicit-any': [2],
      '@typescript-eslint/prefer-ts-expect-error': [2],
      '@typescript-eslint/ban-ts-comment': [0],
      'ordered-imports': [0],
      'object-literal-sort-keys': [0],
      'new-parens': 1,
      'no-bitwise': 1,
      'no-cond-assign': 1,
      'no-trailing-spaces': 0,
      'eol-last': 1,
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'no-var': 2,
      'prettier/prettier': 'warn',
      'no-void': ['error', { allowAsStatement: true }],
      'no-relative-import-paths/no-relative-import-paths': [
          'warn',
          { allowSameFolder: true, rootDir: 'src', prefix: '@' }
      ],
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
          'error',
          { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
      ]
  }
};