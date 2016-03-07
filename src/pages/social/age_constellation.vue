<!--
	作者：zuosjob@gmail.com
	时间：2016-03-06
	描述：好友总分
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">年龄星座</h1>
	</header>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="up-score">
				<div id="graph_wraper">
					<p style="text-align: left;">不同年龄段的朋友，有着不同的智慧。根据您好友的年龄分布，我们会按一下标准给予您一定的成就评分</p>
					<div id="graph"></div>
					<div class="score_relation">
						<div id="total_score">
							<div>{{item.ages}}</div>
							<div>年龄段</div>
						</div>
						<div id="sex_num">
							<div>{{item.constellations}}</div>
							<div>星座</div>
						</div>
						<div id="rank">
							<div id="add_score">+{{item.attainment_score}}</div>
							<div>成就分数</div>
						</div>
						<div id="score_bottom">此项成就在好友中的排名: <span>{{item.num}}</span></div>
					</div>

				</div>
			</div>

			<div class="split"></div>
			<div class="down-score">
				<div id="line"></div>

				<div id="v_line_1">
					<div id="tip_1">老少皆宜</div>
					<div class="v-line-1"></div>
					<div class="level-1">
						<div>10</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-1">好友年龄段分布3个 +</span>
					<div class="level-2">
						<div>20</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-2">好友年龄段分布4个 +</span>
					<div class="level-3">
						<div>30</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-3">好友年龄段分布5个 +</span>
					<div id="self_score" class="{{level}}">
						<img :src="logo" />
						<div class="score-text">
							<div class="score-value">好友年龄段{{item.ages}}个</div>
							<div class="score-time">评分时间：{{item.created_at}}</div>
						</div>
					</div>
				</div>
				<div id="v_line_2">
					<div id="tip_2">星座聚会</div>
					<div class="v-line-2"></div>
					<div class="level-1">
						<div>10</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-1">+好友分布在8个星座</span>
					<div class="level-2">
						<div>20</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-2">+好友分布在10个星座</span>
					<div class="level-3">
						<div>30</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-3">+好友分布在12个星座</span>
					<div id="self_sex_score" class="{{level}}">
						<img :src="logo" />
						<div class="score-text">
							<div class="score-value">好友分布{{item.constellations}}个星座</div>
							<div class="score-time">评分时间：{{item.created_at}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				item: '',
				logo: '',
				level: '',
				sex_level: ''
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				self.logo = you.getStore("logo");
				you.authenGet("/socials/friend_constellation", {}, function(result) {
					self.item = result;
					if (self.item.ages < 3) {
						self.level = 'level1';
					} else if (self.item.ages < 4) {
						self.level = 'level2';
					} else if (self.item.ages < 5) {
						self.level = 'level3';
					} else {
						self.level = 'level4';
					}
					if (self.item.constellations < 8) {
						self.sex_level = 'level1';
					} else if (5) {
						self.sex_level = 'level2';
					} else if (self.item.constellations < 10) {
						self.sex_level = 'level3';
					} else {
						self.sex_level = 'level4';
					}
					self.graph(self.item.distribute);
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					}, 150)
				})
			})
		},
		methods: {
			graph: function(data) {
				var chart = echarts.init(document.getElementById('graph'));
				var constellation_names = ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'];
				var option = {
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
						show: false
					},
					grid: {
						x: 40,
						x2: 30,
						y: 40
					},
					legend: {
						data: []
					},
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
								return ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'][parseInt(v / 30)];
							}
						}
					}],
					series: [{
						name: '',
						type: 'scatter',
						tooltip: {
							trigger: 'item',
							formatter: function(params) {
								return '<div class="mui-pull-left">' + params.value[3] + '' + constellation_names[parseInt(params.value[1] / 30)] + '）<br/>' + params.value[0] + "岁" + "</div>";
							},
							axisPointer: {
								show: false
							}
						},
						symbolSize: function(value) {
							return 8;
						},
						data: data
					}]
				};
				chart.setOption(option);
			}
		}
	}
</script>
<style lang="sass">
	#total_score,
	#rank,
	#sex_num {
		float: left;
		width: 100px;
		font-size: 14px;
	}
	
	.level1 {
		top: 50px;
	}
	
	.level2 {
		top: 180px;
	}
	
	.level3 {
		top: 330px;
	}
	
	.leve4 {
		top: 440px;
	}
	
	#self_score {
		position: absolute;
		right: 30%;
		margin-right: -10px;
		width: 150px;
		font-size: 12px;
		color: #1FCC7C;
		text-align: right;
		.score-text {
			float: right;
			margin-right: 4px;
		}
		img {
			width: 20px;
			float: right;
			border-radius: 50%;
		}
		&.level-1 {
			top: 40px;
		}
		&.level-2 {
			top: 180px;
		}
		&.level-3 {
			top: 320px;
		}
		&.level-4 {
			top: 460px;
		}
	}
	
	.v-line-1 {
		position: absolute;
		top: 10px;
		right: 30%;
		bottom: 20px;
		width: 1px;
		background-color: #1FCC7C;
	}
	
	.v-line-2 {
		position: absolute;
		top: 10px;
		left: 30%;
		bottom: 20px;
		width: 1px;
		background-color: #1FCC7C;
	}
	
	#v_line_1 {
		position: relative;
		width: 50%;
		float: left;
		height: 550px;
		.level-1 {
			position: absolute;
			top: 100px;
			left: 70%;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #1FCC7C;
			margin-left: -25px;
			text-align: center;
			font-size: 11px;
			color: #fff;
		}
		.score-tip-1 {
			position: absolute;
			right: 30%;
			margin-right: 28px;
			font-size: 11px;
			top: 115px;
			color: #1FCC7C;
			text-align: right;
		}
		.level-2 {
			position: absolute;
			top: 245px;
			left: 70%;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #1FCC7C;
			margin-left: -25px;
			text-align: center;
			font-size: 12px;
			color: #fff;
		}
		.score-tip-2 {
			position: absolute;
			right: 30%;
			margin-right: 28px;
			font-size: 11px;
			top: 260px;
			color: #1FCC7C;
			text-align: right;
		}
		.level-3 {
			position: absolute;
			top: 395px;
			left: 70%;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #1FCC7C;
			margin-left: -25px;
			text-align: center;
			font-size: 12px;
			color: #fff;
		}
		.score-tip-3 {
			position: absolute;
			right: 30%;
			margin-right: 28px;
			font-size: 11px;
			top: 410px;
			color: #1FCC7C;
			text-align: right;
		}
		.score-time {
			font-size: 9px;
		}
	}
	
	#v_line_2 {
		position: relative;
		width: 50%;
		float: left;
		height: 550px;
		.level-1 {
			position: absolute;
			top: 100px;
			left: 30%;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #1FCC7C;
			margin-left: -25px;
			text-align: center;
			font-size: 12px;
			color: #fff;
		}
		.score-tip-1 {
			position: absolute;
			left: 30%;
			margin-left: 25px;
			font-size: 11px;
			top: 115px;
			color: #1FCC7C;
		}
		.level-2 {
			position: absolute;
			top: 245px;
			left: 30%;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #1FCC7C;
			margin-left: -25px;
			text-align: center;
			font-size: 12px;
			color: #fff;
		}
		.score-tip-2 {
			position: absolute;
			left: 30%;
			margin-left: 25px;
			font-size: 11px;
			top: 260px;
			color: #1FCC7C;
		}
		.level-3 {
			position: absolute;
			top: 395px;
			left: 30%;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #1FCC7C;
			margin-left: -25px;
			text-align: center;
			font-size: 12px;
			color: #fff;
		}
		.score-tip-3 {
			position: absolute;
			left: 30%;
			margin-left: 25px;
			font-size: 11px;
			top: 410px;
			color: #1FCC7C;
		}
	}
	
	#self_sex_score {
		position: absolute;
		left: 30%;
		margin-left: -10px;
		font-size: 12px;
		color: #1FCC7C;
		img {
			width: 20px;
			border-radius: 50%;
			float: left;
		}
		.score-text {
			float: left;
		}
		.score-time {
			font-size: 9px
		}
	}
	
	#score_bottom span {
		color: #1FCC7C;
	}
</style>