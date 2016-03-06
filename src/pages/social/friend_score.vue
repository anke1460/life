<!--
	作者：zuosjob@gmail.com
	时间：2016-03-06
	描述：好友总分
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">好友总分</h1>
	</header>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="up-score">
				<div id="graph_wraper">
					<p style="text-align: left;">好友总分代表您身边的潜在资源，根据好友总分高低，我们会按一下标准给予您一定的成就评分</p>
					<div id="graph"></div>
					<div class="score_relation">
						<div id="total_score">
							<div>{{item.friend_score}}</div>
							<div>好友总分</div>
						</div>
						<div id="rank">
							<div id="add_score">+{{item.attainment_score}}</div>
							<div>成就分数</div>
						</div>
						<div id="score_bottom">好友总分在好友中的排名: {{item.num}}</div>
					</div>

				</div>
			</div>

			<div class="split"></div>
			<div class="down-score">
				<div id="line"></div>
				<div id="tip">与友荣焉</div>
				<div id="v_line">
					<div id="level_1">
						<div>10</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-1">好友总分达到5000分 +</span>
					<div id="level_2">
						<div>20</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-2">好友总分达到20000分 +</span>
					<div id="level_3">
						<div>30</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-3">好友总分达50000分 +</span>
				</div>
				<div id="self_score" class="{{level}}">
					<img :src="logo" />
					<div class="score-text">
						<div class="score-value">我的好友总分{{item.score}}</div>
						<div class="score-time">评分时间：{{item.created_at}}</div>
					</div>
				</div>
				<div id="detail">查看详情</div>
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
						self.level = 'level-1';
					} else if (self.item.friend_score < 20000) {
						self.level = 'level-2';
					} else if(self.item.friend_score < 50000) {
						self.level = 'level-3';
					} else {
						self.level = 'level-4';
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
			document.getElementById("detail").addEventListener("tap", function() {
				mui.openWindow({
					url: '../rank.html',
					id: 'rank'
				})
			})
		},
		methods: {
			graph: function(titles, data) {
				var chart = echarts.init(document.getElementById('graph'));
				var option = {
					title: {
						text: '',
						show: false
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c}({d}%)"
					},
					legend: {
						show: false,
						x: 'center',
						y: 'bottom',
						data: titles
					},
					toolbox: {
						show: false
					},
					calculable: true,
					series: [{
						name: '好友总分',
						type: 'pie',
						radius: [30, 60],
						center: ['50%', 150],
						roseType: 'area',
						x: '50%',
						max: 40,
						sort: 'ascending',
						data: data
					}]
				};
				chart.setOption(option);
			}
		}
	}
</script>
<style lang="sass">
	#self_score {
		position: absolute;
		left: 50%;
		margin-left: -15px;
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
</style>