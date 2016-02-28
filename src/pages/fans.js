var Vue = require("vue");
var fans = require("./fans.vue");
Vue.filter('time', function (value) {
   return you.timeAgo(new Date(value));
})
var app = new Vue(fans);