const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                },
            },
            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader',
            },
        ],
    },
    resolve: {
        modules: [
            path.resolve('./src/framework'),
            path.resolve('./node_modules'),
        ],
    },
    stats: {
        colors: true,
    },
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
};
