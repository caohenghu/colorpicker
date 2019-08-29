module.exports = {
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true
    },
    extends: ['eslint:recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: [
        // 'html'
    ],
    rules: {
        // indent: [
        //     'error',
        //     4,
        //     {
        //         SwitchCase: 1
        //     }
        // ],
        // 'linebreak-style': ['error', 'unix'],
        // quotes: ['error', 'single'],
        // semi: ['error', 'never']
        // 'object-curly-spacing': ['error', 'always']
    }
}
