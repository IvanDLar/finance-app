module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: ['./tsconfig.json'],
    },
    plugins: [
        'react',
        'baseui',
        'prettier',
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'baseui/deprecated-theme-api': 'warn',
        'baseui/deprecated-component-api': 'warn',
        'baseui/no-deep-imports': 'warn',
        'prettier/prettier': 'error',
    },
};
