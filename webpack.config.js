var vue = require('vue-loader'),
	webpack = require('webpack'),
	ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: {
		"user_trend": 				   	["./src/pages/travel/trend.js"],
		"trend_detail": 				  ["./src/pages/travel/trend_detail.js"],
		"travel_index": 				  ["./src/pages/travel/index.js"],
		"map_mark":						  ["./src/pages/travel/map_mark.js"],
		"user_info":					   	["./src/pages/user/info.js"],
		"user_sign":						  ["./src/pages/user/sign.js"],
		"address_book": 			   	["./src/pages/address_book.js"],
		"pk":									  ["./src/pages/pk.js"],
		"growth":							  ["./src/pages/growth.js"],
		"wish_detail":				    	["./src/pages/wish/detail.js"],
		"dashboard":             ["./src/pages/dashboard.js"],
		"attainment_list":       ["./src/pages/attainment/list.js"],
		"attainment_detail":     ["./src/pages/attainment/detail.js"],
		"attainment_mark_photo": ["./src/pages/attainment/mark_photo.js"],
		"add_user":							["./src/pages/user/add.js"],
		"rank":                  ["./src/pages/rank.js"],
		"vs.js":                 ["./src/pages/vs.js"],
		"user_index":            ["./src/pages/user/index.js"],
		"user_trend":            ["./src/pages/user/trend.js"],
		"message":               ["./src/pages/message.js"],
		"new_friends":           ["./src/pages/new_friends.js"],
		"concern":               ["./src/pages/concern.js"],
		"fans":                  ["./src/pages/fans.js"],
		"preview_score":         ["./src/pages/user/preview_score.js"],
		"medal":                 ["./src/pages/medal.js"],
		"system_msg":            ["./src/pages/system_msg.js"],
		"social_friend_score":   ["./src/pages/social/friend_score.js"],
		"social_friend_sex":     ["./src/pages/social/friend_sex.js"],
		"social_distribute":     ["./src/pages/social/friend_distribute.js"],
		"social_constellation":  ["./src/pages/social/age_constellation.js"],
		"social_crossing":       ["./src/pages/social/crossing.js"],
		"detail":                ["./src/pages/detail.js"],
		"news":                  ["./src/pages/news.js"],
		"news_detail":           ["./src/pages/news_detail.js"],
		"friend_list":           ["./src/pages/friend_list.js"],
		"user_rank":             ["./src/pages/user/rank.js"],
		"advert":                ["./src/pages/advert.js"],
		"advert_detail":         ["./src/pages/advert_detail.js"],
		"address_list":          ["./src/pages/user/address_list.js"],
		"contacts":              ["./src/pages/user/contacts.js"]
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