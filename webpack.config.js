var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
		'babel-polyfill',
		'./static/js/index.jsx'
	],
	output: {
		filename: 'bundle.js',
		publicPath: '/',
		path: path.resolve(__dirname, 'static/dist')
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
	],
	module: {
		loaders: [
            {
                test: [/\.js?$/, /\.jsx?$/],
                exclude: /node_modules/,
                loader: ['babel-loader'],
            },
            {
        		test: /\.css$/,
        		use: ['style-loader', 'css-loader']
      		}
		]
	},
	watch: true
}