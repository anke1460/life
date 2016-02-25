var Vue = require("vue");
var new_friends = require("./new_friends.vue");
Vue.filter('state', function (v) {
	if (v == 0) {
		return  this.current_relation_name = '已请求';
	} else if (v == 1) {
	 return this.current_relation_name ='好友';
	} else if (v== 2) {
		return this.current_relation_name ='已拉黑';
	} else {
		return this.current_relation_name ='已拒绝';
	}
})
var app = new Vue(new_friends);
