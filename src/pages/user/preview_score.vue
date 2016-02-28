<!--
	作者：zuosjob@gmail.com
	时间：2016-01-25
	描述：添加好友
-->
<template>
	<header class="mui-bar mui-bar-nav header">
	   <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
	   <h1 class="mui-title">评分总览</h1>
	   <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @tap="rule">评分规则</button>
	</header>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="graph">
				<div id="graph">
					<div id="radar_graph">
					</div>
					<div id="total_score">{{user.score}}</div>
					<span style="position: absolute;top:5px;left:152px;"><img  class="class-icon" :src="logo1" />旅行</span>
					<span style="position: absolute;top:58px;left:95px;"><img  class="class-icon" :src="logo2" />美食</span>
					<span style="position: absolute;top:140px;left:120px;"><img  class="class-icon" :src="logo3" />社交</span>
					<span style="position: absolute;top:140px;left:180px;"><img  class="class-icon" :src="logo4" />技能</span>
					<span style="position: absolute;top:58px;left:210px;"><img  class="class-icon" :src="logo5" />爱好</span>
				</div>
			</div>
	    	<div class="score-list">
	    	  <div class="score-content">
	    	    <ul>
		    	    	<li v-for="category in categories">
		    	    	  <span>{{category.name}}</span>
		    	    	  <div class="score-graph">
		    	    	  		<div class="score-bg">
					    	    	<div class="score-bg-left"></div>
					    	    <div class="score-bg-body"></div>
					    	    <div class="score-bg-right"></div>
				    	    </div>
				    	    <div class="score" v-show="user[category.alias + '_score'] !=0">
				    	    	  <div class="score-left"></div>
					    	    <div class="score-body" :style="{width: user_score[category.alias + '_score'] + 'px'}"></div>
					    	    <div class="score-right"></div>
				    	    </div>
				    	     <span class="score-value">{{user[category.alias + "_score"]}}</span>
		    	    	  </div>
		    	    	</li>
		    	    	
	    	    </ul>
	    	    
	    	    
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
				logo1: '../images/travel.png',
				logo2: '../images/food.png',
				logo3: '../images/social.png',
				logo4: '../images/skill.png',
				logo5: '../images/hobby.png',
				categories: '',
				user_score: {
					travel_score: 0,
					food_score: 0,
					social_score: 0,
					skill_score: 0,
					hobby_score: 0
				}
			}
		},
		watch: {
			categories: function(v) {
				var self = this;
				mui.each(v, function(i, s) {
					if (self.user[s.alias + "_score"] == 0) {
						self.user_score[s.alias + "_score"] = 0;
					} else {
						self.user_score[s.alias + "_score"] = parseInt(self.user[s.alias + "_score"] / s.score * 100);
					}
					
				})
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				you.authenGet("/users/score", {}, function(result) {
					self.user = result.user;
					self.categories = result.categories;
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
							text: '旅行',
							max: 10000
						}, {
							text: '美食',
							max: 10000
						}, {
							text: '社交',
							max: 10000
						}, {
							text: '技能',
							max: 10000
						}, {
							text: '爱好',
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
							value: [self.user.travel_score,self.user.food_score, self.user.social_core, self.user.skill_score, self.user.hobby_score],
							name: ''
						}]
					}]
				};
				score.setOption(option);
			})
		},
		methods: {
			rule: function() {
				mui.openWindow({
					url: '../score_rule.html',
					id: 'score_rule'
				})
			}
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
	
	#total_score {
		position: absolute;
		top: 70px;
		left: 50%;
		width: 50px;
		text-align: center;
		margin-left: -25px;
		color: red;
	}
	.score-list {
		background: #fff;
		margin-top: 10px;
	}
	.score-content {
		width: 180px;
		margin: 0 auto;
		color: #666;
		height: 180px;
		padding-top: 1px;
		font-size: 14px;
		ul {
			list-style-type: none;
			margin: 0px;
   	 	padding: 0px;
			li {
				position: relative;
				margin-top: 12px;
			}
		}
	}
</style>