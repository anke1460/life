var Vue= require("vue");
Vue.filter('time', function (value) {
	return you.timeAgo(new Date(value));
})
var TrendDetail = require("./trend_detail.vue");
var vm = new Vue(TrendDetail);
