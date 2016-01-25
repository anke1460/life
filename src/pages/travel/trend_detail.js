var Vue= require("vue");
Vue.filter('time', function (value) {
	if (value) {
		return you.timeAgo(new Date(value.replace(/-/g, "/")));
	} else {
		return '';
	}
   
})
var TrendDetail = require("./trend_detail.vue");
var vm = new Vue(TrendDetail);
