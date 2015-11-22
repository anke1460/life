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


(function() {
	var detailoption = {
		tooltip: {
			trigger: 'item'
		},
		toolbox: {
			show: false
		},
		series: [{
			tooltip: {
				show: false
			},
			name: '好友数',
			type: 'map',
			mapType: 'china',
			mapLocation: {
				x: 'left',
				y: '20',
				width: '100%',
				height: '50%'
			},
			selectedMode: 'single',
		  itemStyle:{
         emphasis:{label:{show:true}}
       },
			data: [{
				name: '北京',
				selected: false
			}, {
				name: '天津',
				selected: false
			}, {
				name: '上海',
				selected: false
			}, {
				name: '重庆',
				selected: false
			}, {
				name: '河北',
				selected: false
			}, {
				name: '河南',
				selected: true,
				value: 20
			}, {
				name: '云南',
				selected: false
			}, {
				name: '辽宁',
				selected: false
			}, {
				name: '黑龙江',
				selected: false
			}, {
				name: '湖南',
				selected: false
			}, {
				name: '安徽',
				selected: false
			}, {
				name: '山东',
				selected: false
			}, {
				name: '新疆',
				selected: false
			}, {
				name: '江苏',
				selected: false
			}, {
				name: '浙江',
				selected: false
			}, {
				name: '江西',
				selected: false
			}, {
				name: '湖北',
				selected: true,
				value: 400
			}, {
				name: '广西',
				selected: false
			}, {
				name: '甘肃',
				selected: false
			}, {
				name: '山西',
				selected: false
			}, {
				name: '内蒙古',
				selected: false
			}, {
				name: '陕西',
				selected: false
			}, {
				name: '吉林',
				selected: false
			}, {
				name: '福建',
				selected: false
			}, {
				name: '贵州',
				selected: false
			}, {
				name: '广东',
				selected: false
			}, {
				name: '青海',
				selected: false
			}, {
				name: '西藏',
				selected: false
			}, {
				name: '四川',
				selected: false
			}, {
				name: '宁夏',
				selected: false
			}, {
				name: '海南',
				selected: false
			}, {
				name: '台湾',
				selected: false
			}, {
				name: '香港',
				selected: false
			}, {
				name: '澳门',
				selected: false
			}]
		}],
		animation: false
	};
	var distribute = echarts.init(document.getElementById('distribute'));
	distribute.setOption(detailoption);

	var ecConfig = echarts.config;
	distribute.on(ecConfig.EVENT.MAP_SELECTED, function(param) {
		var selected = param.selected;
		var selectedProvince;
		var name;
		for (var i = 0, l = detailoption.series[0].data.length; i < l; i++) {
			name = detailoption.series[0].data[i].name;
			detailoption.series[0].data[i].selected = selected[name];
			if (selected[name]) {
				selectedProvince = name;
			}
		}
		if (typeof selectedProvince == 'undefined') {
			detailoption.series.splice(1);
			detailoption.legend = null;
			detailoption.dataRange = null;
			distribute.setOption(detailoption, true);
			return;
		}
		detailoption.series[1] = {
			name: '人数',
			type: 'map',
			mapType: selectedProvince,
			itemStyle: {
				normal: {
					label: {
						show: false
					}
				},
				emphasis: {
					label: {
						show: false
					}
				}
			},
			mapLocation: {
				x: 'center',
				y: '50%',
				height: '30%'
			},
			data: [{
					name: '仙桃市',
					value: Math.round(Math.random() * 1000)
				}, {
					name: '武汉市',
					value: Math.round(Math.random() * 1000)
				}, {
					name: '襄阳市',
					value: Math.round(Math.random() * 1000)
				}

			]
		};
		detailoption.legend = {
			x: 'right',
			data: ['好友分布图']
		};
		detailoption.dataRange = {
			orient: 'horizontal',
			x: 'right',
			min: 0,
			max: 1000,
//			color: ['orange', 'yellow'],
			text: ['大', '小'], // 文本，默认为数值文本
			splitNumber: 0
		};
		distribute.setOption(detailoption, true);
	})
})()

var constellation = echarts.init(document.getElementById('constellation'));
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
		start: 20,
		end: 80
			//		zoomLock: true
	},
	grid: {
		x: 30,
		x2: 30
	},
	legend: {
		data: ['男', '女']
	},
	dataRange: {
		min: 0,
		max: 80,
		calculable: true,
		orient: 'horizontal',
		y: 30,
		x: 'center',
		color: ['lightgreen', 'orange'],
		//		splitNumber: 4
	},
	xAxis: [{
		type: 'category',
		data: constellation_names
	}],
	yAxis: [{
		type: 'value'
	}],
	animation: false,
	series: [{
		name: '男',
		type: 'scatter',
		tooltip: {
			trigger: 'item',
			formatter: function(params) {
				return params.seriesName + '（' + params.value[0] + '）<br/>年龄 ' + params.value[1];
			},
			axisPointer: {
				show: true
			}
		},
		symbolSize: function(value) {
			return Math.round(value[2] / 10);
		},
		data: (function() {
			var d = [];
			var len = 0;
			var value;
			while (len++ < 200) {
				console.log(constellation_names[parseInt(Math.random() * 10)])
				var a = constellation_names[parseInt(Math.random() * 10)];
				d.push([
					a, (Math.random() * 80).toFixed(2) - 0, 40
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
				return params.seriesName + '（' + params.value[0] + '）<br/>年龄 ' + params.value[1];
			},
			axisPointer: {
				show: true
			}
		},
		symbolSize: function(value) {
			return Math.round(value[2] / 10);
		},
		data: (function() {
			var d = [];
			var len = 0;
			var value;
			while (len++ < 100) {
				d.push([
					constellation_names[parseInt(Math.random() * 10)], (Math.random() * 30).toFixed(2) - 0, 50
				]);
			}
			return d;
		})()
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