var Vue = require("vue");
var add =  require("./add.vue");
Vue.filter('state', function (v) {
	console.log(v);
	if (v == 'request') {
		return  this.current_relation_name = '已请求';
	} else if (v=='accept') {
	 return this.current_relation_name ='好友';
	} else if (v=='backlist') {
		return this.current_relation_name ='已拉黑';
	} else {
		return this.current_relation_name ='添加好友';
	}
})
var app = new Vue(add);
