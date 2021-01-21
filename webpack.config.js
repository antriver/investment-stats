const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

/**
 * Webpack config for a development build.
 * Some settings are overridden in webpack.config.prod.js to make it a production ready build. (That's not currently
 * used and is in preparation for going full Webpack).
 */
const webpackConfig = {
    mode: 'development',

    devtool: 'cheap-module-source-map',

    entry: {
        app: './src/frontend/js/app.js',
    },

    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js',
    },

    resolve: {
        alias: {
            '@': path.join(__dirname, './src/'),
        },
        extensions: ['.js', '.json', '.vue'],
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        whitespace: 'preserve',
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                    },
                },
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.css$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: 'vue-style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: 'vue-style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/frontend/html/index.html',
        }),

        // Empty the output folder before building
        new CleanWebpackPlugin({
            verbose: true,
        }),

        new VueLoaderPlugin(),

        new CopyPlugin([
            { from: 'src/public', to: '' },
        ]),
    ],

    optimization: {
        moduleIds: 'named',
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                /**
                 * Any modules from node_modules will go into the 'vendor' chunk.
                 */
                vendor: {
                    chunks: 'all',
                    name: 'vendor',
                    priority: 20,
                    test: /[\\/](node_modules|bower_components)[\\/]/,
                },
                /**
                 * Any modules that are used by at least 2 initial chunks will go into the 'common' chunk.
                 * (Initial chunks are the entrypoints like kitchen or epos). This does not affect async chunks.
                 */
                common: {
                    chunks: 'initial',
                    minChunks: 2,
                    name: 'common',
                    priority: 10,
                },
            },
        },
        /**
         * Instead of including the bit that tell the code in the browser which output.js file contains which module
         * in every entry file, create a single "runtime.js" file that contains only this.
         * TODO: This file is quite small (when minified) and important so it is usually recommended to inline this file
         * (put its contents inside a <script> tag rather than loading it like <script src="runtime.js">).
         */
        runtimeChunk: 'single',
        minimize: false, // Set to true in webpack.config.prod.js
    },

};

webpackConfig.devServer = {
    contentBase: path.join(__dirname, '/public/'),
    host: '0.0.0.0',
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
};

module.exports = webpackConfig;
