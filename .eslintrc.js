module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'baseui',
        'prettier',
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'baseui/deprecated-theme-api': "warn",
        'baseui/deprecated-component-api': "warn",
        'baseui/no-deep-imports': "warn",
        'prettier/prettier': "error",
    },
};
