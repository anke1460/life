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
			show: false
		},
		grid: {
			y: 0,
			borderWidth: 0
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			y: 'top',
			show: false,
			data: []
		},
		toolbox: {
			show: false
		},
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
			radius: 100
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
