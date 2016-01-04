var vue = require('vue-loader'),
	webpack = require('webpack'),
	ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: {
		"user_trend": 					["./src/pages/travel/trend.js"],
		"trend_detail": 				["./src/pages/travel/trend_detail.js"],
		"travel_index": 				["./src/pages/travel/index.js"],
		"map_mark":						["./src/pages/travel/map_mark.js"],
		"user_info":						["./src/pages/user/info.js"],
		"user_sign":						["./src/pages/user/sign.js"],
		"address_book": 				["./src/pages/address_book.js"],
		"pk":									["./src/pages/pk.js"],
		"growth":							["./src/pages/growth.js"],
		"wish_detail":					["./src/pages/wish/detail.js"]
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
	},
	vue: {
		loaders: {
			html: 'vue-html?-removeRedundantAttributes'
		}
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