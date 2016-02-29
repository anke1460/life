var Vue = require("vue");
var medal = require("./medal.vue");
Vue.filter('to_photo', function(v) {
	if (v > 30) {
		return 'images/silver.png';
	} else if (v > 10) {
		return 'images/copper.png';
	} else {
		return 'images/gold.png';
	}
});
var app = new Vue(medal);