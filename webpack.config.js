const path = require('path');

const SpritesmithPlugin = require('webpack-spritesmith');

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
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'sass-loader',
                }],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
          },
        ],
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./dist'),
            path.resolve('./node_modules'),
            path.resolve('./src/spritesmith-generated'),
        ],
    },
    stats: {
        colors: true,
    },
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'dist/sprites'),
                glob: '*.png',
            },
            target: {
                image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
                css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.scss'),
            },
            apiOptions: {
                cssImageRef: '~sprite.png',
            },
        }),
    ],
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
};
