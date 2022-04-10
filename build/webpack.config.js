const fs = require('fs');
const path = require('path');
const WebpackPluginEventHooks = require('event-hooks-webpack-plugin');

const DIR_SRC = path.resolve('./src');
const DIR_DIST = path.resolve('./dist');

/**
 *
 * @typedef {import("webpack").Configuration} Configuration
 * @type {Configuration}
 */
module.exports = {
    mode: 'production',

    context: DIR_SRC,

    entry: './index.js',

    output: {
        path: DIR_DIST,
        filename: 'index.min.js',
        libraryTarget: 'commonjs2',
        environment: {
            arrowFunction: false,
            const: false,
            destructuring: false,
            forOf: false,
            module: false,
            optionalChaining: false,
            templateLiteral: false
        }
    },

    devtool: 'source-map',

    node: {
        __filename: true,
        __dirname: true
    },

    resolve: {
        alias: {
            '@': DIR_SRC
        },
        extensions: ['.ts', '.js'],
        modules: ['node_modules', '*']
    },

    target: ['node'],

    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: false,
                                    targets: {
                                        ie: '6'
                                    },
                                    modules: false
                                }
                            ],
                            '@babel/typescript'
                        ],
                        sourceType: 'unambiguous'
                    }
                },
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new WebpackPluginEventHooks({
            afterEmit: () => {
                fs.copyFileSync(
                    path.join(DIR_DIST, './index.min.js'),
                    path.join(DIR_SRC, '../sample/libs/wxmini-canvas.min.js')
                );
            }
        })
    ]
};
