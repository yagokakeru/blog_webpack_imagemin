const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = merge(common(), {
    mode: 'production',
    plugins: [
        new FileManagerPlugin({
            events: {
                onStart: {
                    copy: [
                        {
                            source: path.resolve(__dirname, 'dist/images/*'),
                            destination: path.resolve(__dirname, 'src/images/'),
                        },
                    ],
                },
            }
        })
    ]
});