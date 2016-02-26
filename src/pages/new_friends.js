var Vue = require("vue");
var new_friends = require("./new_friends.vue");
Vue.filter('state', function (v) {
	if (v == 1) {
		return  this.current_relation_name = '已请求';
	} else if (v == 2) {
	 return this.current_relation_name ='接受';
	} else if (v == 3) {
		return this.current_relation_name ='已接受';
	} else if (v == 4) {
		return this.current_relation_name ='已添加';
	}
})
var app = new Vue(new_friends);
