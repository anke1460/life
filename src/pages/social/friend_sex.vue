<!--
	作者：zuosjob@gmail.com
	时间：2016-03-06
	描述：好友总分
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">数量性别</h1>
	</header>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="up-score">
				<div id="graph_wraper">
					<p style="text-align: left;">俗话说“朋友多了路好走”，根据好友的数量，我们会按一下标准给予您一定的成就评分</p>
					<div id="graph"></div>
					<div class="score_relation">
						<div id="total_score">
							<div>{{item.friend_score}}</div>
							<div>好友</div>
						</div>
						<div id="sex_num">
							<div>10</div>
							<div>异性朋友</div>
						</div>
						<div id="rank">
							<div id="add_score">+{{item.attainment_score}}</div>
							<div>成就分数</div>
						</div>
						<div id="score_bottom">此项成就在好友中的排名: {{item.num}}</div>
					</div>

				</div>
			</div>

			<div class="split"></div>
			<div class="down-score">
				<div id="line"></div>
				
				<div id="v_line_1">
					<div id="tip_1">高鹏满座</div>
				  <div class="v-line-1"></div>
					<div class="level-1">
						<div>10</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-1">好友总分达到5000分 +</span>
					<div class="level-2">
						<div>20</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-2">好友总分达到20000分 +</span>
					<div class="level-3">
						<div>30</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-3">好友总分达50000分 +</span>
					<div id="self_score" class="{{level}}">
						<div class="score-text">
							<div class="score-value">我的好友总分{{item.score}}</div>
							<div class="score-time">评分时间：{{item.created_at}}</div>
						</div>
						<img :src="logo" />
					</div>
				</div>
				<div id="v_line_2">
				  <div id="tip_2">异性相吸</div>
				  <div class="v-line-2"></div>
					<div class="level-1">
						<div>10</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-1">好友总分达到5000分 +</span>
					<div class="level-2">
						<div>20</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-2">好友总分达到20000分 +</span>
					<div class="level-3">
						<div>30</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-3">好友总分达50000分 +</span>
				</div>
				<div id="self_sex_score" class="{{level}}">
					<img :src="logo" />
					<div class="score-text">
						<div class="score-value">我的好友总分{{item.score}}</div>
						<div class="score-time">评分时间：{{item.created_at}}</div>
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
				level: ''
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				self.logo = you.getStore("logo");
				you.authenGet("/socials/friend_score", {}, function(result) {
					self.item = result;
					if (self.item.friend_score < 5000) {
						self.level = 'level1';
					} else if (self.item.friend_score < 20000) {
						self.level = 'level2';
					} else if (self.item.friend_score < 50000) {
						self.level = 'level3';
					} else {
						self.level = 'level4';
					}
					var users = [];
					var data = [];
					mui.each(result.users, function(i, d) {
						users.push(d.name);
						data.push({
							value: d.score,
							name: d.name
						});
					});
					self.graph(users, data);
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					}, 150)
				})
			})
		},
		methods: {
			graph: function(titles, data) {
				var chart = echarts.init(document.getElementById('graph'));
				var option = {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					toolbox: {
						show: false
					},
					calculable: false,
					series: [{
						name: '好友',
						type: 'pie',
						radius: ['50%', '70%'],
						itemStyle: {
							normal: {
								label: {
									show: false
								},
								labelLine: {
									show: false
								}
							}
						},
						data: [{
							value: 335,
							name: '男性'
						}, {
							value: 310,
							name: '女性'
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
	
	#self_score {
		position: absolute;
		left: 50%;
		margin-left: -15px;
		img {
			width: 30px;
			float: right;
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
		left: 25%;
		bottom: 20px;
		width: 1px;
		background-color: #1FCC7C;
	}
	
	.v-line-2 {
		position: absolute;
		top: 10px;
		right: 25%;
		bottom: 20px;
		width: 1px;
		background-color: #1FCC7C;
	}
	
	#v_line_1 {
		position: relative;
		width: 50%;
		float: left;
		top: 20px;
		height: 500px;
		.level-1 {
			position: absolute;
			top: 100px;
			left: 50%;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #1FCC7C;
			margin-left: -30px;
			text-align: center;
			font-size: 12px;
			color: #fff;
		}
		.score-tip-1 {
			position: absolute;
			right: 50%;
			margin-right: 30px;
			font-size: 12px;
			top: 115px;
			color: #1FCC7C;
		}
		.level-2 {
			position: absolute;
			top: 245px;
			left: 50%;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #1FCC7C;
			margin-left: -30px;
			text-align: center;
			font-size: 12px;
			color: #fff;
		}
		.score-tip-2 {
			position: absolute;
			right: 50%;
			margin-right: 30px;
			font-size: 12px;
			top: 260px;
			color: #1FCC7C;
		}
		.level-3 {
			position: absolute;
			top: 395px;
			left: 50%;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #1FCC7C;
			margin-left: -30px;
			text-align: center;
			font-size: 12px;
			color: #fff;
		}
		.score-tip-3 {
			position: absolute;
			right: 50%;
			margin-right: 30px;
			font-size: 12px;
			top: 410px;
			color: #1FCC7C;
		}
	}
	
	#v_line_2 {
		position: relative;
		width: 50%;
		float: left;
		width: 50%;
		.level-1 {
			position: absolute;
			top: 100px;
			left: 50%;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #1FCC7C;
			margin-left: -30px;
			text-align: center;
			font-size: 12px;
			color: #fff;
		}
		.score-tip-1 {
			position: absolute;
			right: 50%;
			margin-right: 30px;
			font-size: 12px;
			top: 115px;
			color: #1FCC7C;
		}
		.level-2 {
			position: absolute;
			top: 245px;
			left: 50%;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #1FCC7C;
			margin-left: -30px;
			text-align: center;
			font-size: 12px;
			color: #fff;
		}
		.score-tip-2 {
			position: absolute;
			right: 50%;
			margin-right: 30px;
			font-size: 12px;
			top: 260px;
			color: #1FCC7C;
		}
		.level-3 {
			position: absolute;
			top: 395px;
			left: 50%;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #1FCC7C;
			margin-left: -30px;
			text-align: center;
			font-size: 12px;
			color: #fff;
		}
		.score-tip-3 {
			position: absolute;
			right: 50%;
			margin-right: 30px;
			font-size: 12px;
			top: 410px;
			color: #1FCC7C;
		}
	}
</style>