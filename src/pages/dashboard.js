var Vue = require("vue");
Vue.filter('time', function (value) {
	console.log(value);
	console.log(you.timeAgo(new Date(value.replace(/-/g, "/"))));
   return you.timeAgo(new Date(value.replace(/-/g, "/")));
})
var dashboard = require("./dashboard.vue");
var app = new Vue(dashboard);
