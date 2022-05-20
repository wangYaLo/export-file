const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs'); //将cjs转化为es
const json = require('rollup-plugin-json')
module.exports = [
    {
        input: './src/core/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'es'
            }
        ],
        plugins: [
            resolve(),
            commonjs(),
            json()
        ]
    }
]