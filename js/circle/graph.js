mui.init({
	swipeBack: true
});
mui.ready(function() {
	loadScore();
});

function loadScore() {
	var score = echarts.init(document.getElementById('score'));
	var option = {
		title: {
			show: true,
			x: 'center',
			text: '好友圈价值'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: []
		},
		toolbox: {
			show: false
		},
		calculable: true,
		polar: [{
			indicator: [{
				text: '朋友圈总分',
				max: 100
			}, {
				text: '互补与同趣',
				max: 100
			}, {
				text: '数量及分布',
				max: 100
			}, {
				text: '好友亲密度',
				max: 100
			}, {
				text: '好友与性别',
				max: 100
			}],
			radius: 60
		}],
		series: [{
			name: '',
			type: 'radar',
			itemStyle: {
				normal: {
					areaStyle: {
						type: 'default'
					}
				}
			},
			data: [{
				value: [97, 42, 88, 94, 90, 86],
				name: ''
			}]
		}]
	};
	score.setOption(option);
}

var ecConfig = echarts.config,
	zrEvent = zrender.tool.event;
var curIndx = 0;
var mapType = [
	'china',
	// 23个省
	'广东', '青海', '四川', '海南', '陕西',
	'甘肃', '云南', '湖南', '湖北', '黑龙江',
	'贵州', '山东', '江西', '河南', '河北',
	'山西', '安徽', '福建', '浙江', '江苏',
	'吉林', '辽宁', '台湾',
	// 5个自治区
	'新疆', '广西', '宁夏', '内蒙古', '西藏',
	// 4个直辖市
	'北京', '天津', '上海', '重庆',
	// 2个特别行政区
	'香港', '澳门'
];

var distribute = echarts.init(document.getElementById('distribute'));


var distribute_option = {
	title: {
		text: '全国34个省市自治区',
		subtext: '（点击切换）'
	},
	tooltip: {
		show: false
			//	        trigger: 'item'
			//	        formatter: '点击进入该省<br/>{b}'
	},
	legend: {
		orient: 'vertical',
		x: 'right',
		data: ['好友分布']
	},
	dataRange: {
		min: 0,
		max: 1000,
		color: ['orange', 'yellow'],
		calculable: true
	},
	series: [{
		name: '好友分布',
		type: 'map',
		mapType: 'china',
		selectedMode: 'single',
		itemStyle: {
			normal: {
				label: {
					show: true
				}
			},
			emphasis: {
				label: {
					show: true
				}
			}
		},
		data: [{
			name: '重庆市',
			value: Math.round(Math.random() * 1000)
		}, {
			name: '北京市',
			value: Math.round(Math.random() * 1000)
		}, {
			name: '天津市',
			value: Math.round(Math.random() * 1000)
		}, {
			name: '上海市',
			value: Math.round(Math.random() * 1000)
		}, {
			name: '香港',
			value: Math.round(Math.random() * 1000)
		}, {
			name: '五指山市',
			value: Math.round(Math.random() * 1000)
		}]
	}]
};
distribute.setOption(distribute_option);

distribute.on(ecConfig.EVENT.MAP_SELECTED, function(param) {
	var len = mapType.length;
	var mt = mapType[curIndx % len];
	if (mt == 'china') {
		var selected = param.selected;
		for (var i in selected) {
			if (selected[i]) {
				mt = i;
				while (len--) {
					if (mapType[len] == mt) {
						curIndx = len;
					}
				}
				break;
			}
		}
		//	  distribute_option.tooltip.formatter = '滚轮切换省份或点击返回全国<br/>{b}';
	} else {
		curIndx = 0;
		mt = 'china';
		//	 distribute_option.tooltip.formatter = '滚轮切换或点击进入该省<br/>{b}';
	}
	distribute_option.series[0].mapType = mt;
	//	 distribute_option.title.subtext = mt + ' （滚轮或点击切换）';
	distribute.setOption(distribute_option, true);
});

var constellation = echarts.init(document.getElementById('constellation'));
var constellation_option = {
	tooltip: {
		trigger: 'axis',
		showDelay: 0,
		axisPointer: {
			show: true,
			type: 'cross',
			lineStyle: {
				type: 'dashed',
				width: 1
			}
		}
	},
	legend: {
		data: []
	},
	toolbox: {
		show: false
	},
	xAxis: [{
		type: 'category',
		data: ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'],
		name: '星座'
	}],
	yAxis: [{
		//		type: 'category',
		type: 'value',
		//		data: ["55-90","36-55","26-35","16-25", "0-15", "0", "0-15", "16-25", "26-35", "36-55", "55-90"],
		name: '年龄',
		splitNumber: 10,
		min: -80,
		max: 80,
		scale: true
	}],
	series: [{
		name: '年龄',
		type: 'scatter',
		large: true,
		data: [
			[2, 20],
			[4, 50],
			[20, 4]
		]
	}]
};

constellation.setOption(constellation_option);

var complementary = echarts.init(document.getElementById('complementary'));
var complementary_option = {
	title: {
		text: '互补与同趣',
		x: 'center'
	},
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	legend: {
		show: false,
		data: []
	},
	toolbox: {
		show: false
	},
	calculable: true,
	series: [{
		name: '互补与同趣',
		type: 'pie',
		radius: '45%',
		center: ['50%', '50%'],
		data: [{
			value: 335,
			name: '空间'
		}, {
			value: 310,
			name: '互补'
		}, {
			value: 30,
			name: '同趣'
		}]
	}]
};

complementary.setOption(complementary_option);