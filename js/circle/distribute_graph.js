(function() {
	var detailoption = {
		tooltip: {
			trigger: 'item'
		},
		title: {
			show: true,
			x: 'center',
			text: '好友分布图'
		},
		toolbox: {
			show: false
		},
	  dataRange: {
			orient: 'horizontal',
			y: '20',
			x: 'center',
			show: false,
			min: 0,
			max: 1000,
			text: ['大', '小'],
			calculable : true
		},
		series: [{
			tooltip: {
				show: false
			},
			name: '好友分布',
			type: 'map',
			mapType: 'china',
			mapLocation: {
				x: 'center',
				y: '20',
				width: '100%',
				height: '50%'
			},
			selectedMode: 'single',
		  itemStyle:{
		    	normal:{label:{show:false}},
         emphasis:{label:{show:true}}
       },
			data: [{
				name: '北京',
				selected: false,
				value: 0
			}, {
				name: '天津',
				selected: false,
				value: 0
			}, {
				name: '上海',
				selected: false,
				value: 0
			}, {
				name: '重庆',
				selected: false,
				value: 0
			}, {
				name: '河北',
				selected: false,
				value: 0
			}, {
				name: '河南',
				selected: false,
				value: 20
			}, {
				name: '云南',
				selected: false,
				value: 0
			}, {
				name: '辽宁',
				selected: false,
				value: 0
			}, {
				name: '黑龙江',
				selected: false,
				value: 0
			}, {
				name: '湖南',
				selected: false,
				value: 0
			}, {
				name: '安徽',
				selected: false,
				value: 0
			}, {
				name: '山东',
				selected: false,
				value: 0
			}, {
				name: '新疆',
				selected: false,
				value: 0
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
				selected: false,
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
				selected: false,
				value: 0
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
		var province_option = you.clone(detailoption);// mui.clone(detailoption);
		
		for (var i = 0, l = province_option.series[0].data.length; i < l; i++) {
			name = province_option.series[0].data[i].name;
			province_option.series[0].data[i].selected = selected[name];
			if (selected[name]) {
				selectedProvince = name;
			}
		}
		province_option.title.text = selectedProvince,
//		if (typeof selectedProvince == 'undefined') {
//			province_option.series.splice(1);
//			province_option.legend = null;
////			province_option.dataRange = null;
//			distribute.setOption(province_option, true);
//			return;
//		}
		province_option.series[0] = {
			name: '',
			type: 'map',
			mapType: selectedProvince,
			itemStyle: {
				emphasis: {
					label: {
						show: true
					}
				}
			},
			mapLocation: {
				x: 'center',
				y: '50',
				width: '100%',
				height: '100%'
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
		province_option.dataRange = {
			orient: 'horizontal',
			show: false,
			x: 'center',
			y: '60%',
			min: 0,
			max: 1000,
			text: ['大', '小'],
			calculable : true
		};
		var province = echarts.init(document.getElementById('province'));
		console.log(JSON.stringify(province_option))
		province.setOption(province_option);
		mui("#province").popover('toggle');
	})
})()
