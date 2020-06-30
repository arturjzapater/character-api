module.exports = {
    env: {
        commonjs: true,
        es6: true,
        mocha: true,
        node: true,
    },
    extends: 'eslint:recommended',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        'array-bracket-spacing': [ 'error', 'always', {
            objectsInArrays: false,
        }],
        'comma-dangle': [ 'warn', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
        }],
        'no-console': 'error',
        'no-unused-vars': [ 'error', {
            args: 'after-used',
            'argsIgnorePattern': '^_',
        }],
        'object-curly-spacing': [ 'error', 'always' ],
        'semi': [ 'error', 'never' ],
    },
}