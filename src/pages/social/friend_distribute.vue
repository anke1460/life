<!--
	作者：zuosjob@gmail.com
	时间：2016-03-07
	描述：好友分布
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">好友分布</h1>
	</header>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="up-score">
				<div id="graph_wraper">
					<p style="text-align: left;">海内存知己，天涯若比邻，根据好友分布，我们会按一下标准给予您一定的成就评分</p>
					<div id="graph"></div>
					<div class="score_relation">
						<div id="total_score">
							<div>{{item.distribute.length}}</div>
							<div>地理分布</div>
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
				<div id="tip">天下谁人不识君</div>
				<div id="v_line">
					<div id="level_1">
						<div>10</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-1">好友分布在10个省市 +</span>
					<div id="level_2">
						<div>20</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-2">好友分布在20个省市 +</span>
					<div id="level_3">
						<div>30</div>
						<div>成就分</div>
					</div>
					<span class="score-tip-3">好友分布在30个省市 +</span>
				</div>
				<div id="self_score" class="{{level}}">
					<img :src="logo" />
					<div class="score-text">
						<div class="score-value">我的好友分布{{item.distribute.length}}个省市</div>
						<div class="score-time">评分时间：{{item.created_at}}</div>
					</div>
				</div>
				<div id="detail" @tap="detail">查看详情</div>
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
				you.authenGet("/socials/friend_distribute", {}, function(result) {
					self.item = result;
					if (self.item.distribute.length < 10) {
						self.level = 'level-1';
					} else if (self.item.distribute.length < 20) {
						self.level = 'level-2';
					} else if(self.item.distribute.length < 30) {
						self.level = 'level-3';
					} else {
						self.level = 'level-4';
					}
					var city = [];
					mui.each(self.item.distribute, function(i, d) {
						city.push({name: you.getCity(d) , selected: true});
					})
					self.graph(city);
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					}, 150)
				})
			})
		},
		methods: {
			detail: function() {
				mui.openWindow({
					url: 'detail_distribute.html',
					id: 'detail_distribute'
				})
			},
			graph: function(city) {
				var chart = echarts.init(document.getElementById('graph'));
				var option = {
					tooltip: {
						trigger: 'item',
						show: false,
						formatter: '{b}'
					},
					series: [{
						name: '中国',
						type: 'map',
						mapType: 'china',
						mapLocation: {
							x: 'center',
							y: '20',
							width: '100%'
						},
						hoverable: false,
						itemStyle: {
							normal: {
								label: {
									show: false
								}
							},
							emphasis: {
								label: {
									show: true
								}
							}
						},
						data: city
					}]
				};
				chart.setOption(option);
			}
		}
	}
</script>
<style lang="sass">
  #score_bottom span {
		color: #1FCC7C;
	}
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