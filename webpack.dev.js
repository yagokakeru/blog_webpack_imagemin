const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = merge(common(), {
    mode: 'development',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/images'),
                to: path.resolve(__dirname, 'dist/images')
            }]
        }),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        ['mozjpeg', { quality: 75 }],
                        ['pngquant', { quality: [0.75, 0.75] }],
                    ],
                },
            },
            generator: [
                {
                    type: 'asset',
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                        plugins: [
                            ['webp', { quality: 75 }],
                        ]
                    },
                },
            ],
        }),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: path.resolve(__dirname, 'dist/images/*.webp'),
                            destination: path.resolve(__dirname, 'src/images/'),
                        },
                    ],
                },
            }
        }),
    ]
});