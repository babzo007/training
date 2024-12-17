import js from '@eslint/js';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: 'readonly',
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      eqeqeq: 'error',
      strict: ['error', 'global'],
      curly: 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],
      'comma-dangle': ['error', 'never'],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-underscore-dangle': 0,
    },
  },
];
