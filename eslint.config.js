import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginBaseui from 'eslint-plugin-baseui';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginTypeScript from '@typescript-eslint/eslint-plugin';
import parserTypeScript from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript,
      prettier: pluginPrettier,
      baseui: pluginBaseui,
      react: pluginReact,
    },
    env: {
      node: true,
    },
    rules: {
      ...pluginTypeScript.configs.recommended.rules,
      'prettier/prettier': 'error',
      'baseui/deprecated-theme-api': 'warn',
      'baseui/deprecated-component-api': 'warn',
      'baseui/no-deep-imports': 'warn',
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      prettier: pluginPrettier,
      baseui: pluginBaseui,
      react: pluginReact,
    },
    rules: {
      'prettier/prettier': 'error',
      'baseui/deprecated-theme-api': 'warn',
      'baseui/deprecated-component-api': 'warn',
      'baseui/no-deep-imports': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
