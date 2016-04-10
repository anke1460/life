<!--
	作者：zuosjob@gmail.com
	时间：2016-01-09
	描述：首页
-->
<template>
	<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="mui-slider">
				<div class="mui-slider-group mui-slider-loop">
					<div class="mui-slider-item mui-slider-item-duplicate">
						<ul class="mui-table-view mui-grid-view mui-grid-9">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in skill">
								<a>
									<img :src="item.img" class="img" />
									<div class="mui-media-body">{{item.name}}</div>
								</a>
							</li>
						</ul>
					</div>
					<div class="mui-slider-item">
						<ul class="mui-table-view mui-grid-view mui-grid-9">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in travel" @tap="goAttainment(item)">
								<a>
									<img :src="item.img" class="img" />
									<div class="mui-media-body">{{item.name}}</div>
								</a>
							</li>
						</ul>
					</div>
					<div class="mui-slider-item">
						<ul class="mui-table-view mui-grid-view mui-grid-9">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in food" @tap="goAttainment(item)">
								<a>
									<img :src="item.img" class="img" />
									<div class="mui-media-body">{{item.name}}</div>
								</a>
							</li>
						</ul>
					</div>
					<div class="mui-slider-item">
						<ul class="mui-table-view mui-grid-view mui-grid-9">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in hobby" @tap="goAttainment(item)">
								<a>
									<img :src="item.img" class="img" />
									<div class="mui-media-body">{{item.name}}</div>
								</a>
							</li>
						</ul>
					</div>
					<div class="mui-slider-item">
						<ul class="mui-table-view mui-grid-view mui-grid-9">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in skill" @tap="goAttainment(item)">
								<a>
									<img :src="item.img" class="img" />
									<div class="mui-media-body">{{item.name}}</div>
								</a>
							</li>
						</ul>
					</div>
					<div class="mui-slider-item">
						<ul class="mui-table-view mui-grid-view mui-grid-9">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in social" @tap="goAttainment(item)">
								<a>
									<img :src="item.img" class="img" />
									<div class="mui-media-body">{{item.name}}</div>
								</a>
							</li>
						</ul>
					</div>
					<div class="mui-slider-item mui-slider-item-duplicate">
						<div class="mui-slider-item">
							<ul class="mui-table-view mui-grid-view mui-grid-9">
								<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in travel" @tap="goAttainment(item)">
									<a>
										<img :src="item.img" class="img" />
										<div class="mui-media-body">{{item.name}}</div>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="graph-wraper">
					<div class="class-bg" @tap="share">
						<div id="c_score">{{current_score}}</div>
					</div>
					<div class="score-bg" @tap="share">
						<div id="c_rank">{{current_rank}}</div>
					</div>
					<p class="score-text"><span class="c-g">{{classify_name}}成绩</span><span class="h-g">好友排名</span></p>
				</div>
				<div class="mui-slider-indicator">
					<div class="mui-indicator mui-active"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
				</div>
			</div>
			<div id="advert_baner" :style="advert_img" @tap="goAdvert">
				<!--<p class="new-title">{{advert.title}}</p>-->
			</div>
			<div id="three_module">
				<div class="mui-col-xs-4 mui-pull-left ">
					<img :src="'images/rank.png'" @tap="go('rank.html')" />
				</div>
				<div class="mui-col-xs-4 mui-pull-left vs">
					<img :src="'images/vs.png'" @tap="go('pk.html')" />
				</div>
				<div class="mui-col-xs-4 mui-pull-right" @tap="go('user/add_user.html')">
					<img :src="'images/find_friend.png'" style="float: right;" />
				</div>
			</div>
			<div id="infos">
				<div id="baner">
					<a @tap="load('default')" :class="{'active':current_active == 'default'}" id="recommand">推荐<i class="latest-spot" style="display: none;"></i></a>
					<a @tap="load('concern')" :class="{'active':current_active == 'concern'}">关注</a>
					<a @tap="load('friend')" :class="{'active':current_active == 'friend'}">朋友</a>
					<a @tap="load('self')" :class="{'active':current_active == 'self'}">我</a>
				</div>
				<div id="all" class="">
					<ul class="table-view">
						<li class="table-view-cell" v-for="item in trends">
							<img class="mui-media-object mui-pull-left" :src="item.avatar" @tap="viewUser(item)">
							<div class="mui-media-body" style="margin: 0px;" @tap="detailTrend(item, $event)">
								<span class="user-name">
									{{item.name}}
								</span>
								<i class="tag-img"></i>
								<span class="tag-name">{{item.classify}}.{{item.detail_classify}}</span>
								<div class="info-content">{{item.content}}</div>
								<p>
									<img :src="img.thumb" v-for="img in item.photos" class="thumb-img" @tap="viewPhoto(item.photos)" />
								</p>
								<span class="time">{{item.created_at | time}}</span>
								<div class="mui-pull-right">
									<span class="mui-icon praise" @tap="praise(item, $event)" :class="{'is_praise': item.is_praise}"></span>
									<span class="mui-icon note" @tap="comment(item)"></span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="overlay" id="overlay"></div>
	<div id="shard_menu" class="mui-popover">
		<ul class="mui-table-view" id="menu_list">
			<li class="mui-table-view-cell" @tap="showShard('travel')">
				<a>分享旅行</a>
			</li>
			<li class="mui-table-view-cell" @tap="showShard('food')">
				<a>分享美食</a>
			</li>
			<li class="mui-table-view-cell" @tap="showShard('social')">
				<a>分享社交</a>
			</li>
		</ul>
	</div>
</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				items: '',
				advert: '',
				advert_img: '',
				travel: [],
				hobby: [],
				social: [],
				skill: [],
				food: [],
				trends: [],
				page: 1,
				per_page: 20,
				current_active: 'default',
				uid: '',
				user_score: '',
				current_score: '',
				current_rank: '',
				loadedPage: false,
				classify_name: '旅游',
				friends_count: 0,
				title: '',
				current_type: 'travel',
				advert_id: ''
			}
		},
		ready: function() {
			var self = this;
			mui.init({
				swipeBack: false,
				pullRefresh: {
					container: "#refreshContainer",
					up: {
						auto: true,
						contentrefresh: "上拉加载动态",
						contentnomore: '没有更多动态',
						callback: self.loadMsg
					}
				}
			});
			mui.plusReady(function() {
				document.querySelector('.mui-slider').addEventListener('slide', function(event) {
					self.current_score = self.user_score[["travel", "food", "hobby", "skill", "social"][event.detail.slideNumber] + "_score"];
					if (self.friends_count == 0) {
						self.current_rank = "N/A";
					} else {
						self.current_rank = self.user_score[["travel", "food", "hobby", "skill", "social"][event.detail.slideNumber] + "_num"];
					}
					self.classify_name = ["旅行", "美食", "爱好", "技能", "社交"][event.detail.slideNumber];
					self.current_type = ["travel", "food", "hobby", "skill", "social"][event.detail.slideNumber];
					if (plus.webview.getWebviewById("shard")) {
						plus.webview.getWebviewById("shard").hide();
					}
					var options = { 
						useEasing: true,
						 useGrouping: true
					};
					var c_score = new CountUp("c_score", 0, self.current_score, 0, 0, options);
					c_score.start();
					if (self.friends_count != 0) {
						var c_rank = new CountUp("c_rank", 100, self.current_rank, 0, 0, options);
						c_rank.start();
					}
				})
				self.uid = you.getStore("uid");
				self.loadClassify();
			}.bind(this));
			window.addEventListener("reloadData", function() {
				self.page = 1;
//				self.trends = [];
//				self.loadMsg();
				self.loadClassify();
				self.current_active = "default";
			})
			window.addEventListener("addMsg", function(e) {
				mui(".latest-spot")[0].style.display = "";
//				if (document.getElementById("recommand").className == 'active') {
//					self.trends.splice(0,0, e.detail.data);
//				}
			});
			window.addEventListener("showMenu", function() {
				mui("#shard_menu").popover('toggle');
			})
		},
		methods: {
			share: function() {
				if ( ["travel", "food", "social"].indexOf(this.current_type ) == -1) {
					return true;
				}
				you.setStore("type", ["travel", "food", "social"][this.current_type]);
				var height = document.body.clientHeight - 60;
				mui.openWindow({
					url: 'shard.html',
					id: 'shard',
					styles: {
						top: height,
						bottom: 0
					},
					show: {
						aniShow: 'slide-in-bottom'
					}
				})
			},
			showShard: function(type) {
				mui("#shard_menu").popover('toggle');
				you.setStore("type", type);
				var height = document.body.clientHeight - 60;
				mui.openWindow({
					url: 'shard.html',
					id: 'shard',
					styles: {
						top: height,
						bottom: 0
					},
					show: {
						aniShow: 'slide-in-bottom'
					}
				})
			},
			goAdvert: function() {
				mui.openWindow({
					url: 'advert_detail.html',
					id: 'advert_detail',
					extras: {
						n_id: this.advert_id
					}
				})
			},
			load: function(type) {
				this.page = 1;
				this.trends = [];
				this.loadMsg(type);
				this.current_active = type;
			},
			loadMsg: function(type) {
				var self = this;
				var type = type || 'default';
				if (type == 'default') {
					mui(".latest-spot")[0].style.display = 'none';
				}
				mui.plusReady(function() {
					you.authenGet("/stories", {
						type: type,
						page: self.page,
						per_page: self.per_page
					}, function(result) {
						self.trends = self.trends.concat(result.stories);
						if (self.page * self.per_page > result.total_count) {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(true);
						} else {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(false);
						}
						self.page = self.page + 1;
					})
				})
			},
			loadClassify: function() {
				var self = this;
				you.authenGet("/classifies", {}, function(result) {
					self.advert = result.advert;
					self.advert_img = {
						backgroundImage: "url(" + result.advert.img + ")"
					};
					self.advert_id = result.advert.id;
					self.user_score = result.user_score;
					self.friends_count = result.friends;
					self.current_score = self.user_score.travel_score;
					if (self.friends_count == 0) {
						self.current_rank = "N/A";
					} else {
						self.current_rank = self.user_score.travel_num;
					}
					if (!self.loadedPage) {
						mui.each(result.classifies, function(i, d) {
							this[d.category_alias].push(d);
						}.bind(this));
						mui.each(["travel", "food", "hobby", "social", "skill"], function(i, d) {
							this[d].splice(10, this[d].length - 10);
						}.bind(this))
					}
					self.loadedPage = true;
//					setTimeout(function() {
//						mui("#refreshContainer").pullRefresh().scrollTo(0, 0, 100);
//					}, 300)
				}.bind(this))
			},
			comment: function(item) {
				mui.openWindow({
					url: 'comment.html',
					id: 'comment',
					extras: {
						item: item
					}
				})
			},
			detailTrend: function(item, e) {
				if (e.target.className.includes("mui-icon") == false && e.target.className.includes("thumb-img") == false && e.target.className.includes("mui-pull-right") == false) {
					mui.openWindow({
						url: 'comment.html',
						id: 'comment',
						extras: {
							item: item
						}
					})
				}
			},
			praise: function(item, e) {
				you.authenPost("/stories/" + item.id + "/praise", {}, function(result) {
					//					e.target.classList.add("animated");
					//					e.target.classList.add("fadeInDown");
					if (result.ok == 1) {
						item.is_praise = false;
					} else if (result.ok == 2) {
						item.is_praise = true;
					}
				})
			},
			goAttainment: function(item) {
				if (item.category_alias == 'social') {
					mui.openWindow({
						url: "social/" + item.alias + ".html",
						id: item.alias,
						extras: {
							classify_id: item.id,
							title: item.name
						}
					});
				} else {
					mui.openWindow({
						url: "attainment/list.html",
						id: "attainment_list",
						extras: {
							classify: item.id,
							title: item.name
						}
					});
				}
			},
			go: function(html) {
				mui.openWindow({
					url: html,
					id: html
				})
			},
			viewUser: function(item) {
				mui.openWindow({
					url: "user/index.html",
					id: 'user_index',
					extras: {
						user: {
							id: item.user_id
						}
					}
				})
			},
			viewPhoto: function(photos) {
				mui.openWindow({
					url: 'preview.html',
					id: 'preview',
					extras: {
						photos: photos
					},
					show: {
						aniShow: 'fade-in'
					}
				})
			}
		}
	}
</script>
<style lang="sass">
	html,
	body,
	.mui-content {
		height: 100%;
		background: #fff;
	}
	
	#advert_baner {
		height: 70px;
		width: 100%;
		background-size: cover;
		position: relative;
	}
	
	.new-title {
		position: absolute;
		bottom: 0px;
		left: 0px;
		right: 0px;
		padding: 0 5px;
		background: #000;
		opacity: 0.5;
		margin-bottom: 0px;
		height: 30px;
		line-height: 30px;
		color: #fff;
	}
	
	.mui-slider-indicator .mui-active.mui-indicator {
		background: #1FCC7C;
	}
	
	#advert-wraper img {
		width: 100%;
	}
	
	.thumb-img img {
		margin-right: 5px;
	}
	
	#three_module {
		overflow: hidden;
		margin-top: 5px;
		padding: 0 5px;
		img {
			max-width: 100px;
		}
	}
	
	#baner {
		margin-top: 2px;
		border-top: 1px solid #F3F3F3;
		border-bottom: 1px solid #F3F3F3;
		padding: 10px;
		a {
			margin: 0 10px;
			&.active {
				color: #1FCC7C;
			}
		}
	}
	
	#travel {
		text-align: center;
		img {
			width: 200px;
			height: 82px;
		}
	}
	
	.vs {
		text-align: center;
	}
	
	.col-2 {
		width: 20%;
	}
	
	.mui-slider .mui-slider-group {
		margin-bottom: 20px;
	}
	
	.mui-slider .mui-slider-group .mui-slider-item img {
		width: 50px;
		border-radius: 25px;
		height: 50px;
	}
	
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
		color: #999;
		font-size: 12px;
		margin-top: 0px;
	}
	
	.mui-grid-view.mui-grid-9 .mui-table-view-cell>a:not(.mui-btn) {
		padding-bottom: 0px;
	}
	
	.mui-grid-view.mui-grid-9 {
		background: #fff;
		.mui-table-view-cell {
			padding: 0px;
			border: none;
		}
	}
	
	.mui-slider-indicator .mui-indicator {
		box-shadow: none;
	}
	
	.tag-name {
		color: #989898;
		font-size: 12px
	}
	
	.table-view {
		position: relative;
		margin-top: 0;
		margin-bottom: 0;
		padding-left: 0;
		list-style: none;
		background-color: #fff;
		.mui-media-object.mui-pull-left {
			margin-right: 10px;
		}
		.mui-media-object {
			line-height: 42px;
			max-width: 42px;
			height: 42px;
		}
		.mui-media-body {
			overflow: hidden;
		}
		&:before {
			position: absolute;
			right: 0;
			left: 0;
			content: '';
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
			background-color: #c8c7cc;
			top: -1px;
			&:after {
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;
				height: 1px;
				content: '';
				-webkit-transform: scaleY(.5);
				transform: scaleY(.5);
				background-color: #c8c7cc
			}
		}
		.table-view-cell {
			overflow: hidden;
			position: relative;
			overflow: hidden;
			padding: 11px 15px;
			&:after {
				position: absolute;
				right: 0;
				bottom: 0;
				left: 15px;
				height: 1px;
				content: '';
				-webkit-transform: scaleY(.5);
				transform: scaleY(.5);
				background-color: #c8c7cc;
			}
		}
	}
	
	.graph-wraper {
		text-align: center;
		height: 80px;
		position: relative;
		width: 150px;
		margin: 0 auto;
	}
	
	.score-text {
		position: absolute;
		bottom: 0px;
		margin: 0px;
		font-size: 12px;
		.c-g {
			margin-left: 12px;
		}
		.h-g {
			margin-left: 30px;
		}
	}
	
	.mui-grid-view.mui-grid-9 {
		border: none;
	}
	
	#shard_menu {
		display: block;
		border-radius: 0px;
		right: 0px;
		width: 120px;
	}
</style>