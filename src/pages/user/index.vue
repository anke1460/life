<!--
	作者：zuosjob@gmail.com
	时间：2016-02-17
	描述：用户主页
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">详细资料</h1>
		<a class="mui-pull-right" @tap="more" v-if="!is_self"><span id="menu"></span></a>
	</header>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<a>
						<img class="mui-media-object mui-pull-left logo" :src="user.logo" />
						<div class="mui-media-body">
							{{user.name}}
							<span class="sex" :class="{'man': user.sex=='男', 'female': user.sex=='女'}"></span>
							<p>头衔：{{user.honor_name}}</p>
						</div>
					</a>
				</li>
			</ul>
			<div id="u_info">
				<div class="u-item">
					<span>{{user.follows}}</span>
					<p>关注</p>
				</div>
				<div class="u-item">
					<span>{{user.fans}}</span>
					<p>粉丝</p>
				</div>
			</div>
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
			<div id="trend">
			  <ul class="mui-table-view">
				  	<li class="mui-table-view-cell">
				  	  <label>地区</label>
				  	  {{area}}
				  	</li>
				  	<li class="mui-table-view-cell trend-wraper" @tap="trend">
				  	  <label>动态</label>
				  	  <img :src="user.photo" v-if="user.photo != ''"/>
				  	  <div class="content mui-ellipsis">{{user.trend}}</div>
				  	</li>
			  </ul>
			</div>
			<div id="send" style="display: none;">
				<div id="send_btn" @tap="sendMsg(user)">发消息</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				area: '',
				is_self: false,
				user: {
					follows: 0,
					fans: 0,
					is_friend: false,
					is_concerned: false,
					logo: '../images/translate.png'
				},
				logo1: '../images/travel.png',
				logo2: '../images/food.png',
				logo3: '../images/social.png',
				logo4: '../images/skill.png',
				logo5: '../images/hobby.png',
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				mui("mui-scroll-wrapper").scroll();
				self.user = you.current_page.user;
				self.is_self = (plus.storage.getItem("uid") == self.user.id);
				if (!self.is_self) {
					mui("#send")[0].style.display = "";
				}
				you.authenGet("/users/"+ self.user.id + "/relation", {}, function(result) {
					self.user = result;
					if (self.user.residence_id) {
						self.area = you.getCity(self.user.residence_id	);
					}
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
			sendMsg: function(user) {
				mui.openWindow({
					url: '../chat.html',
					id: 'chat',
					extras: {
						user: user
					}
				})
			},
			trend: function() {
				mui.openWindow({
					url: 'trend.html',
					id: 'trend',
					extras: {
						user: {
						  id:	this.user.id,
						  name: this.user.name,
						  honor_nam: this.user.honor_nam
						}
					}
				})
			},
			cancelFriend: function() {
				var self = this;
				you.authenDelete("/users/" + this.user.id + "/friend", {}, function(result) {
					self.user.is_friend = false;
				})
			},
			cancelConcern: function() {
				var self = this;
				you.authenDelete("/users/" + this.user.id + "/concern", {}, function(result) {
					self.user.is_concerned = false;
				})
			},
			sendRequest: function() {
				you.authenPost("/users/" + this.user.id + "/add_friend", {}, function(result) {
				})
			},
			concern: function() {
				var self = this;
				if (this.user.is_concerned == false) {
					you.authenPost("/users/"+ this.user.id + "/concern", {}, function(result) {
						self.user.is_concerned = true;
					})
				}
			},
			more: function() {
				var self = this;
				var actionstyle = {
					title: "更多",
					cancel:"取消",
					buttons:  [{
					 title: "设置备注"
				  }, {
					 title: "推荐给朋友"
				  }, {
					 title: self.user.is_concerned ? "取消关注" : "关注动态"
				  }, {
					 title: self.user.is_friend ? "删除好友" : '添加好友'
				  }]
				};
				plus.nativeUI.actionSheet(actionstyle, function(e) {
					console.log(e.index);
					if (e.index == 3) {
						if (self.user.is_concerned) {
							console.log('ccen');
							self.cancelConcern();
						} else {
							self.concern();
						}
					} else if (e.index == 4) {
						if (self.user.is_friend) {
							self.cancelFriend();
						} else {
							self.sendRequest();
						}
					}
				}.bind(this));
			}
		}
	}
</script>
<style lang="sass">
  .graph {
  	  width: 100%;
  	  background: #fff;
  }
  .logo {
  	  border-radius: 50%;
  }
  #add_user {
  	  margin-left: 50px;
  }
	.class-icon {
		width: 20px;
		display: block;
	}
	
	.sex {
		width: 15px;
		height: 15px;
		display: inline-block;
		background-size: cover;
	}
	.trend-wraper {
    line-height: 50px;
		img {
			width: 50px;
   		margin: 2px;
   		float: left;
		}
		.content {
			line-height: 50px;
			font-size: 14px;
		}
	}
	#u_info {
		overflow: hidden;
		text-align: center;
		background: #fff;
		padding-top: 5px;
		p {
			padding-bottom: 0px;
			margin-bottom: 0px;
		}
		.u-item {
			float: left;
			width: 50%;
		}
	}
	#trend {
		margin-top: 10px;
		color: #8F8F94;
		label {
			width: 60px;
			display: block;
			float: left;
		}
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
	#send {
		overflow: hidden;
    text-align: center;
    width: 100%;
    margin-top: 10px;
    color: #fff;
    font-size: 14px;
	}
	
	#send_btn {
		margin: 0 auto;
		line-height: 40px;
		height: 40px;
		background: #1FCC7C;
		width: 90%;
		border-radius: 10px;
		font-size: 20px
	}
</style>