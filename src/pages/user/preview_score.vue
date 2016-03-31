<!--
	作者：zuosjob@gmail.com
	时间：2016-01-25
	描述：添加好友
-->
<template>
	<header class="mui-bar mui-bar-nav header">
	   <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
	   <h1 class="mui-title">评分总览</h1>
	   <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @tap="rule">规则</button>
	</header>
	<div id="refreshContainer" class="mui-scroll-wrapper mui-content">
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
				    	     <span class="score-value">{{user_score[category.alias + '_score_v']}}%</span>
				    	     <span class="score-num">{{user_score[category.alias + "_score_"]}}</span>
		    	    	  </div>
		    	    	</li>
	    	    </ul>
	    	  </div>
	    	</div>
	    	<div id="score_bg">
	    	  <div id="logo_bg">
	    	  	  <img :src="user_logo"/>
	    	  </div>
	    	  <div id="v_bg"></div>
	    	  <div id="score_value">{{user.score}}分</div>
	    	  <p id="score_date">知趣：{{time_range[0]}} -- {{time_range[1]}}</p>
	    	</div>
	    	<div class="record" v-for="record in recordes">
	    	  <div class="list-bg"></div>
	    	  <img :src="record.score_type_id | to_photo" />
	    	  <p>
	    	  	 <span>{{record.score_type}}</span>
	    	   <span>{{record.node}}</span>
	    	  </p>
	    	  <span class="recored-score">{{record.other_type | to_text}} {{record.score > 0 ? '+' + record.score : record.score}}分</span>
	    	  <span class="recored-date">{{record.created_at}}</span>
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
				page: 1,
				per_page: 20,
				user_score: {
					travel_score: 0,
					food_score: 0,
					social_score: 0,
					skill_score: 0,
					hobby_score: 0,
					travel_score_: 0,
					food_score_: 0,
					social_score_: 0,
					skill_score_: 0,
					hobby_score_: 0,
					travel_score_v: 0,
					food_score_v: 0,
					social_score_v: 0,
					skill_score_v: 0,
					hobby_score_v: 0
				},
				user_logo: '../images/skill.png',
				time_range: '',
				recordes: []
			}
		},
		watch: {
			categories: function(v) {
				var self = this;
				mui.each(v, function(i, s) {
					if (self.user[s.alias + "_score"] == 0) {
						self.user_score[s.alias + "_score"] = 0;
					} else {
						self.user_score[s.alias + "_score_"] = s.score;
						self.user_score[s.alias + "_score_v"] = (self.user[s.alias + "_score"] / s.score * 100).toFixed(2);
						self.user_score[s.alias + "_score"] = parseInt(self.user[s.alias + "_score"] / s.score * 100);
					}
					
				})
			}
		},
		ready: function() {
			var self = this;
			mui.init({
				pullRefresh: {
					container: "#refreshContainer",
					up: {
						auto: true,
						contentrefresh: "上拉加载更多",
						contentnomore: '已加载完',
						callback: self.load
					}
				}
			});
			mui.plusReady(function() {
				self.user_logo = you.getStore("logo");
				you.authenGet("/users/score", {}, function(result) {
					self.user = result.user;
					self.categories = result.categories;
					var score = {};
					mui.each(self.categories, function(i, d) {
						score[d.alias] = d.score;
					})
					self.generateGraph(score);
				})
				
			})
		},
		methods: {
			generateGraph: function(value) {
				var self = this;
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
							max: value.travel
						}, {
							text: '美食',
							max: value.food
						}, {
							text: '社交',
							max: value.social
						}, {
							text: '技能',
							max: value.skill
						}, {
							text: '爱好',
							max: value.hobby
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
			},
			load: function(params) {
				var self = this;
				mui.plusReady(function() {
					you.authenGet("/users/score_recordes", {page: self.page}, function(result) {
						console.log(JSON.stringify(result));
						self.recordes = self.recordes.concat(result.recordes);
						self.time_range = result.time_range;
						if (self.page * self.per_page > result.total_count) {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(true);
						} else {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(false);
						}
						self.page = self.page + 1;
						you.endLoding();
					})
				})
			},
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
  #score_bg {
  	 background-color: #f7f7f7;
  	 height: 95px;
  	 position: relative;
  }
  
  #logo_bg {
  	  width: 60px;
    height: 60px;
    position: absolute;
    left: 12px;
    top: 18px;
    background-color: #ddd;
    border-radius: 50%;
    img {
	    width: 45px;
	    height: 45px;
	    border-radius: 50%;
	    position: absolute;
	    left: 8px;
	    top: 7px;
    }
  }
  #score_value {
  	  position: absolute;
    left: 84px;
    top: 29px;
    color: #333;
    font-size: 25px;
  }
  
  #score_date {
   	position: absolute;
    left: 84px;
    top: 60px;
    font-size: 12px;
    color: #999;
  }
  
  #v_bg {
  	  height: 18px;
    width: 10px;
    position: absolute;
    top: 78px;
    bottom: 0px;
    left: 37px;
    background: #ddd;
  }
  
  .record {
  	  height: 55px;
    border-top: 1px solid #ddd;
    position: relative;
    .list-bg {
    	  width: 10px;
	    height: 100%;
	    position: absolute;
	    left: 37px;
	    background-color: #ddd;
    }
    img {
	    	width: 36px;
	    border-radius: 50%;
	    position: absolute;
	    left: 24px;
	    top: 10px;
    }
    p {
    	  position: absolute;
	    top: 18px;
	    left: 68px;
    }
    .recored-score {
    	  position: absolute;
	    right: 10px;
	    top: 10px;
	    color: #333;
	    font-size: 14px;
    }
    .recored-date {
    	  position: absolute;
	    right: 10px;
	    bottom: 2px;
	    font-size: 12px;
    }
  }
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