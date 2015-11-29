var constellation = echarts.init(document.getElementById('graph'));
var constellation_names = ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'];
var constellation_option = {
	title: {
		show: false
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			show: true,
			type: 'cross',
			lineStyle: {
				type: 'dashed',
				width: 1
			}
		}
	},
	toolbox: {
		show: false
	},
	dataZoom: {
		show: true,
		start: 0,
		end: 100,
		showDetail: false
	},
	grid: {
		x: 40,
		x2: 30,
		y: 40
	},
	legend: {
		data: ['男', '女']
	},
//	dataRange: {
//		min: 0,
//		max: 60,
//		calculable: true,
//		orient: 'horizontal',
//		y: 30,
//		x: 'center'
////		color: ['lightgreen', 'orange']
//		//		splitNumber: 4
//	},
	xAxis: [{
		type: 'value',
		name: '年龄',
		min: 0,
		max: 60
	}],
	yAxis: [{
		type: 'value',
		name: '星座',
		min: 0,
		max: 365,
		splitNumber: 12,
		axisLabel: {
			formatter: function(v) {
				return ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'][parseInt(v/30)];
			}
		}
	}],
//	animation: false,
	series: [{
		name: '男',
		type: 'scatter',
		tooltip: {
			trigger: 'item',
			formatter: function(params) {
				return '<img style="width:50px" src="http://youyou.dev/assets/qq.png" class="mui-pull-left"/><div class="mui-pull-left"><span>sdfd</span>' + params.seriesName + '（' + constellation_names[parseInt(params.value[1]/30)] + '）<br/>' + params.value[0] + "岁"+"</div>";
			},
			axisPointer: {
				show: true
			}
		},
		symbolSize: function(value) {
			return 8;
		},
		data: (function() {
			var d = [];
			var len = 0;
			var value;
			while (len++ < 50) {
				var a = parseInt(Math.random() * 60) //constellation_names[parseInt(Math.random() * 10)];
				d.push([
					a, (Math.random() * 365).toFixed(2) - 0, 30
				]);
			}
			return d;
		})()
	}, {
		name: '女',
		type: 'scatter',
		tooltip: {
			trigger: 'item',
			formatter: function(params) {
				return params.seriesName + '（' + constellation_names[parseInt(params.value[1]/30)] + '）<br/>' + params.value[0] + "岁";
			},
			axisPointer: {
				show: true
			}
		},
		symbolSize: function(value) {
			return 8;
		},
		data: (function() {
			var d = [];
			var len = 0;
			var value;
			while (len++ < 50) {
				d.push([
					parseInt(Math.random() * 60), (Math.random() * 365).toFixed(2) - 0, 20
				]);
			}
			return d;
		})()
	}]
};
constellation.setOption(constellation_option);