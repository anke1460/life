var Vue = require("vue");
var preview_score =  require("./preview_score.vue");
Vue.filter("to_photo", function(v) {
	return "../images/record_" + v + ".png";
})

Vue.filter("to_text", function(v) {
	var content = "";
	switch (v) {
		case '组合完成':
		  content = '组合完成';
		  break;
		case '取消组合完成':
		  content = '取消组合';
		  break;
	}
	return content;
})
var app = new Vue(preview_score);
