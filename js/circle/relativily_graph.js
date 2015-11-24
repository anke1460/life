var complementary = echarts.init(document.getElementById('graph'));
var complementary_option = {
	title: {
		show: false
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