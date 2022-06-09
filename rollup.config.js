const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs'); //将cjs转化为es
const json = require('rollup-plugin-json');
const rollupTypescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser')
module.exports = [
    {
        input: './src/core/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'es',
                exports: 'default'
            }
        ],
        plugins: [
            resolve(),
            commonjs(),
            json(),
            rollupTypescript(),
            terser()
        ]
    }
]