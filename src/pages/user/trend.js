var Vue = require('vue');
var trend = require("./trend.vue");
Vue.filter('time', function (value) {
   return you.timeAgo(new Date(value.replace(/-/g, "/")));
})
var app = new Vue(trend);
