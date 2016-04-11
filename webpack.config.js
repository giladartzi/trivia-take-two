var webpack = require('webpack');

var plugins = [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
}

module.exports = {
    entry: {
        app: './src/www/index.js',
        vendor: ['react', 'react-redux', 'react-dom', 'react-tap-event-plugin', 'material-ui', 'lodash']
    },
    output: {
        path: './public/',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        contentBase: './public/',
        port: 3000,
        historyApiFallback: true
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: plugins
};