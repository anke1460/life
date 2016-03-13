var Vue = require("vue");
var message = require("./message.vue");
Vue.filter('time', function (value) {
	return you.timeAgo(new Date(value));
})
var app = new Vue(message);
