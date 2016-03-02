var Vue = require("vue");
var preview_score =  require("./preview_score.vue");
Vue.filter("to_photo", function(v) {
	return "../images/record_" + v + ".png";
})
var app = new Vue(preview_score);
