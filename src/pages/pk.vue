<!--
	作者：zuosjob@gmail.com
	时间：2015-12-23
	描述：与好友比一比
-->
<template>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="pk">
				<div class="list" style="width: 40%;">
					<img :src="user_1.logo" class="logo" @tap="selectUser(1)"/>
					<div>{{user_1.name}}</div>
					<p>
						{{score_1.state}}
					</p>
				</div>
				<div class="list" style="width: 20%;position: relative;">
					<div class="vs"></div>
					<span id="ptitle" @tap="begin" :class="{'select': user_1.id && user_2.id}">开始对比</span>
				</div>
				<div class="list" style="width: 40%;">
					<img :src="user_2.logo" class="logo" @tap="selectUser(2)"/>
					<div>{{user_2.name}}</div>
					<p>
						{{score_2.state}}
					</p>
				</div>
			</div>
			<div class="mui-table-view" id="vs_wraper">
				<div class="mui-table-view-cell">
					<div class="score" id="t_1">{{score_1.travel_score}}</div>
					<div class="vs-classify">
						<img :src="travel" />
						<p>旅游</p>
					</div>
					<div class="score" id="d_1">{{score_2.travel_score}}</div>
				</div>
				<div class="mui-table-view-cell">
					<div class="score" id="t_2">{{score_1.food_score}}</div>
					<div class="vs-classify">
						<img :src="food" />
						<p>美食</p>
					</div>
					<div class="score" id="d_2">{{score_2.food_score}}</div>
				</div>
				<div class="mui-table-view-cell">
					<div class="score" id="t_3">{{score_1.hobby_score}}</div>
					<div class="vs-classify">
						<img :src="hobby" />
						<p>爱好</p>
					</div>
					<div class="score" id="d_3">{{score_2.hobby_score}}</div>
				</div>
				<div class="mui-table-view-cell">
					<div class="score" id="t_4">{{score_1.skill_score}}</div>
					<div class="vs-classify">
						<img :src="skill" />
						<p>技能</p>
					</div>
					<div class="score" id="d_4">{{score_2.skill_score}}</div>
				</div>
				<div class="mui-table-view-cell">
					<div class="score" id="t_5">{{score_1.social_score}}</div>
					<div class="vs-classify">
						<img :src="social" />
						<p>社交</p>
					</div>
					<div class="score" id="d_5">{{score_2.social_score}}</div>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	module.exports = {
		el: '#app',
		data: function() {
			return {
				travel: 'images/travel.png',
				food: 'images/food.png',
				hobby: 'images/hobby.png',
				skill: 'images/skill.png',
				social: 'images/social.png',
				user_1: {
					logo: 'images/pk_add.png'
				},
				user_2: {
					logo: 'images/pk_add.png'
				},
				score_1: {state: ""},
				score_2: {state: ""}
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui(".mui-scroll-wrapper").scroll();
			window.addEventListener("select", function(e) {
				if (self.user_1.id == e.detail.item.id || self.user_2.id == e.detail.item.id ) {
					mui.toast("请选择另外一方pk");
					return true;
				}
				if (e.detail.num == 1) {
					self.user_1 = e.detail.item;
				} else {
					self.user_2 = e.detail.item;
				}
			})
		},
		methods: {
			selectUser: function(num) {
				mui.openWindow({
					url: 'friend_list.html',
					id: 'friend_list',
					extras: {
						num: num
					}
				})
			},
			begin: function() {
				if (this.user_1.id && this.user_2.id) {
					you.authenGet("/users/pk", {users: [this.user_1.id, this.user_2.id]}, function(result) {
						["travel_score", "food_score", "hobby_score", "skill_score", "social_score"].forEach(function(d, i) {
						  var a = new CountUp("t_" + (i+1), 0, result.score_1[d], 0, 0);
						  a.start();
						  var c = new CountUp("d_" + (i+1), 0, result.score_2[d], 0, 0);
						  if (d=='social_score') {
						  	  c.start(function() {
								 	if (result.state == "=") {
										this.score_1.state = "平局";
										this.score_2.state = "平局";
									} else if (result.state == true) {
										this.score_1.state = "胜";
										this.score_2.state = "败";
									} else {
										this.score_1.state = "败";
										this.score_2.state = "胜";
									}
							  	}.bind(this))
						  } else {
						   	c.start();
						  }
						}.bind(this))
						
					}.bind(this))
				}
			}
		}
	}
</script>
<style lang="sass">
	#vs_wraper {
		text-align: center;
	}
	
	.score {
		width: 35%;
		float: left;
		height: 60px;
		line-height: 60px;
	}
	
	.vs-classify {
		float: left;
		width: 30%;
		img {
			width: 40px;
			border-radius: 50%;
		}
	}
	
	.logo,
	.add {
		width: 70px;
		height: 70px;
		border-radius: 50%;
	}
	
	#ptitle {
		font-size: 16px;
		display: block;
		height: 30px;
		line-height: 30px;
		color: #989898;
		position: absolute;
		bottom: 10px;
	}
	#ptitle.select {
		color: #1FCC7C;
	}
	
	.pk {
		margin-top: 20px;
		overflow: hidden;
		.list {
			float: left;
			text-align: center;
			color: #1FCC7C;
			height: 125px;
		}
		p {
			height: 30px;
			font-size: 20px;
			line-height: 30px;
			margin-bottom: 0px;
		}
	}
	
	.vs {
		height: 70px;
		font-size: 24px;
		background-size: cover;
	}
</style>