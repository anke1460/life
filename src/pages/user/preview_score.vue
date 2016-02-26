<!--
	作者：zuosjob@gmail.com
	时间：2016-01-25
	描述：添加好友
-->
<template>
	<header class="mui-bar mui-bar-nav header">
	   <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
	   <h1 class="mui-title">评分总览</h1>
	</header>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="graph">
				<div id="graph">
					<div id="radar_graph">
					</div>
					<div id="total_score">{{user.score}}</div>
					<span style="position: absolute;top:5px;left:152px;"><img  class="class-icon" :src="logo1" />爱好</span>
					<span style="position: absolute;top:58px;left:95px;"><img  class="class-icon" :src="logo2" />社交</span>
					<span style="position: absolute;top:140px;left:120px;"><img  class="class-icon" :src="logo3" />旅行</span>
					<span style="position: absolute;top:140px;left:180px;"><img  class="class-icon" :src="logo4" />技能</span>
					<span style="position: absolute;top:58px;left:210px;"><img  class="class-icon" :src="logo5" />美食</span>
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
				user: {},
				logo1: '../images/hobby.png',
				logo2: '../images/social.png',
				logo3: '../images/travel.png',
				logo4: '../images/skill.png',
				logo5: '../images/food.png',
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				you.authenGet("/users/"+ you.getStore("uid") + "/relation", {}, function(result) {
					self.user = result;
				})
				var score = echarts.init(document.getElementById('radar_graph'));
				var option = {
					title: {
						show: true
					},
					tooltip: {
						show: false
					},
					legend: {
						show: false,
						data: ['']
					},
					toolbox: {
						show: false
					},
					calculable: true,
					polar: [{
						name: false,
						indicator: [{
							text: '爱好',
							max: 10000
						}, {
							text: '社交',
							max: 10000
						}, {
							text: '旅行',
							max: 10000
						}, {
							text: '技能',
							max: 10000
						}, {
							text: '美食',
							max: 10000
						}],
						radius: 45
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
							value: [self.user.hobby_score, self.user.social_core, self.user.travel_score, self.user.skill_score, self.user.food_score],
							name: ''
						}]
					}]
				};
				score.setOption(option);
			})
		},
		methods: {
			
		}
	}
</script>
<style lang="sass">
	body {
		height: 100%;
	}
	.graph {
  	  width: 100%;
  	  background: #fff;
  }
  .class-icon {
		width: 20px;
		display: block;
	}
	#graph {
		background: #fff;
		position: relative;
		font-size: 9px;
		width: 320px;
		margin: 0 auto;
		#radar_graph {
			margin-top: 10px;
			padding-top: 12px;
			width: 100%;
			height: 180px;
		}
	}
</style>