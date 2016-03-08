<!--
	作者：zuosjob@gmail.com
	时间：2016-03-07
	描述：互补同趣
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">互补同趣</h1>
	</header>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="up-score">
				<div id="graph_wraper">
					<p style="text-align: left;">它山之石可以攻玉，朋友有即是我有。根据您和您好友涉猎的兴趣范围，我们会按一下标准给予您一定的成就评分</p>
					<div id="graph"></div>
					<div class="score_relation">
						<div id="total_score">
							<div>{{item.friends_count}}</div>
							<div>好友</div>
						</div>
						<div id="sex_num">
							<div>{{item.opposite_sex}}</div>
							<div>异性朋友</div>
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
					<div id="tip_1">良师益友</div>
					<div class="v-line-1"></div>
					<div class="level-1">
						<div>10</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-1">我和好友共同完成60%成就组合 +</span>
					<div class="level-2">
						<div>20</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-2">我和好友共同完成70%成就组合 +</span>
					<div class="level-3">
						<div>30</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-3">我和好友共同完成80%成就组合 +</span>
					<div id="self_score" class="{{level}}">
						<img :src="logo" />
						<div class="score-text">
							<div class="score-value">共同完成{{item.total_finished}}%</div>
							<div class="score-time">评分时间：{{item.created_at}}</div>
						</div>
					</div>
				</div>
				<div id="v_line_2">
					<div id="tip_2">默契伙伴</div>
					<div class="v-line-2"></div>
					<div class="level-1">
						<div>10</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-1">+有5位好友和我完成10个相同组合</span>
					<div class="level-2">
						<div>20</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-2">+有10位好友和我完成10个相同组合</span>
					<div class="level-3">
						<div>30</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-3">+有15位好友和我完成10个相同组合</span>
					<div id="self_sex_score" class="{{level}}">
						<img :src="logo" />
						<div class="score-text">
							<div class="score-value">{{item.friends}}位默契伙伴</div>
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
				you.authenGet("/socials/crossing", {}, function(result) {
					self.item = result;
					if (self.item.total_finished < 60) {
						self.level = 'level1';
					} else if (self.item.total_finished < 70) {
						self.level = 'level2';
					} else if (self.item.total_finished < 80) {
						self.level = 'level3';
					} else {
						self.level = 'level4';
					}
					if (self.item.friends < 5) {
						self.sex_level = 'level1';
					} else if (5) {
						self.sex_level = 'level2';
					} else if (self.item.friends < 10) {
						self.sex_level = 'level3';
					} else {
						self.sex_level = 'level4';
					}
					self.graph(self.item);
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					}, 150)
				})
			})
		},
		methods: {
			graph: function(item) {
				var chart = echarts.init(document.getElementById('graph'));
				var option = {
					title: {
						show: false
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						show: false
					},
					toolbox: {
						show: false
					},
					calculable: true,
					series: [{
						name: '',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: [{
							value: 335,
							name: '好友拥有的'
						}, {
							value: 310,
							name: '我拥有的'
						}, {
							value: 234,
							name: '同趣'
						}, {
							value: 135,
							name: '都不具有的'
						}]
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