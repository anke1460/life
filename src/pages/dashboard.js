var Vue = require("vue");
Vue.filter('time', function (value) {
   return you.timeAgo(new Date(value));
})
var dashboard = require("./dashboard.vue");
var app = new Vue(dashboard);
