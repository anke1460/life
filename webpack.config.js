var vue = require('vue-loader'),
	webpack = require('webpack'),
	ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: {
		"sign":	['./src/pages/user/sign.js']
		},
	output: {
		path: './build',
		filename: '[name].min.js'
	},
	module: {
		loaders: [{
				test: /\.vue$/,
				loader: 'vue'
			}
		]
	}
}

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins = [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin()
	]
} else {
	module.exports.devtool = 'source-map';
		module.exports.plugins = [
			new webpack.DefinePlugin({
		    'process.env.NODE_ENV': '"development"'
	   	}),
		  new webpack.HotModuleReplacementPlugin()
		]
}