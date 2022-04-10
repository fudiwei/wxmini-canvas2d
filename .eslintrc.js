module.exports = {
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
    env: {
        es6: true,
        browser: true,
        node: true,
        commonjs: true,
        amd: true
    },
    globals: {
        wx: true
    },
    parserOptions: {
        ecmaVersion: 6
    },
    rules: {
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/triple-slash-reference': 'off'
    }
};
