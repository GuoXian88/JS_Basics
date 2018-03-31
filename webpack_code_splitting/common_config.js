const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-module.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Code Splitting'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // Specify the common bundle's name.
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};


/*
index.bundle.js  665 bytes       0  [emitted]         index
another.bundle.js  537 bytes       1  [emitted]         another
common.bundle.js     547 kB       2  [emitted]  [big]  common

*/
//动态加载lodash  babel-plugin-syntax-dynamic-import
function getComponent() {
    return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
        var element = document.createElement('div');

        element.innerHTML = _.join(['Hello', 'webpack'], ' ');

        return element;

    }).catch(error => 'An error occurred while loading the component');
}

getComponent().then(component => {
    document.body.appendChild(component);
})
