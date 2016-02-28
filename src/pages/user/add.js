var Vue = require("vue");
var add =  require("./add.vue");
Vue.filter('state', function (v) {
	if (v == 0) {
		return  this.current_relation_name = '已请求';
	} else if (v == 1) {
	 return this.current_relation_name ='已是好友';
	} else if (v == 2) {
		return this.current_relation_name ='已拉黑';
	} else {
		return this.current_relation_name ='添加';
	}
})
var app = new Vue(add);
