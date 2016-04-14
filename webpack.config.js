var webpack = require('webpack');

var plugins = [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
    plugins.push(new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }));
    plugins.push(new webpack.DefinePlugin({ 'process.env.REST_API_HOST': 'window.location.protocol + "//" + window.location.hostname + "/"' }));
    plugins.push(new webpack.DefinePlugin({ 'process.env.WS_HOST': '"wss://" + window.location.hostname + "/"' }));
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
    devtool: 'source-map',
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
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: plugins
};