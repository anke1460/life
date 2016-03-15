var Vue = require("vue");
var medal = require("./medal.vue");
Vue.filter('to_photo', function(v) {
	if (v > 10 || v == 0) {
		return 'images/silver.png';
	} else if (v > 5) {
		return 'images/copper.png';
	} else {
		return 'images/gold.png';
	}
});
var app = new Vue(medal);