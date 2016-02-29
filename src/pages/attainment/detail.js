var Vue = require("vue");
Vue.filter('time', function (value) {
   return you.timeAgo(new Date);
})
var detail = require("./detail.vue");
var app = new Vue(detail);

$(function () {
    $('#selecte_date').mobiscroll().date({
        theme: 'mobiscroll',
        height: 30,
        maxDate: new Date,
        dateOrder: 'yymmdd',
        display: 'inline',
        endYear: new Date().getFullYear()
    });

});