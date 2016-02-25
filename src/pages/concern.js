var Vue = require("vue");
var concern = require("./concern.vue");
Vue.filter('time', function (value) {
   return you.timeAgo(new Date(value.replace(/-/g, "/")));
})
var app = new Vue(concern);