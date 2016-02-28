<!--
	作者：zuosjob@gmail.com
	时间：2016-01-09
	描述：首页
-->
<template>
	<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="mui-slider">
				<div class="mui-slider-group">
					<div class="mui-slider-item">
						<ul class="mui-table-view mui-grid-view mui-grid-9">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in travel" @tap="goAttainment(item)">
								<a href="#">
									<img :src="item.img" class="img" />
									<div class="mui-media-body">{{item.name}}</div>
								</a>
							</li>
						</ul>
						<div id="travel">
							<img :src="'images/title.png'" />
						</div>
					</div>
					<div class="mui-slider-item">
						<ul class="mui-table-view mui-grid-view mui-grid-9">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in food" @tap="goAttainment(item)">
								<a href="#">
									<img :src="item.img" class="img" />
									<div class="mui-media-body">{{item.name}}</div>
								</a>
							</li>
						</ul>
					</div>
					<div class="mui-slider-item">
						<ul class="mui-table-view mui-grid-view mui-grid-9">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in social">
								<a href="#">
									<img :src="item.img" class="img" />
									<div class="mui-media-body">{{item.name}}</div>
								</a>
							</li>
						</ul>
					</div>
					<div class="mui-slider-item">
						<ul class="mui-table-view mui-grid-view mui-grid-9">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in hobby">
								<a>
									<img :src="item.img" class="img" />
									<div class="mui-media-body">{{item.name}}</div>
								</a>
							</li>
						</ul>
					</div>
					<div class="mui-slider-item">
						<ul class="mui-table-view mui-grid-view mui-grid-9">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in skill">
								<a>
									<img :src="item.img" class="img" />
									<div class="mui-media-body">{{item.name}}</div>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="mui-slider-indicator">
					<div class="mui-indicator mui-active"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
				</div>
			</div>
			<div id="advert-wraper">
				<img :src="'images/advert.png'" />
			</div>
			<div id="three_module">
				<div class="mui-col-xs-4 mui-pull-left">
					<img :src="'images/rank.png'" @tap="go('rank.html')"/>
				</div>
				<div class="mui-col-xs-4 mui-pull-left">
					<img :src="'images/vs.png'" @tap="go('pk.html')" />
				</div>
				<div class="mui-col-xs-4 mui-pull-left" @tap="go('user/add_user.html')">
					<img :src="'images/find_friend.png'" />
				</div>
			</div>
			<div id="infos">
				<div id="baner">
					<a @tap="load('default')" :class="{'active':current_active == 'default'}">推荐</a>
					<a @tap="load('friend')" :class="{'active':current_active == 'friend'}">朋友</a>
					<a @tap="load('concern')" :class="{'active':current_active == 'concern'}">关注</a>
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
									<img :src="img.thumb" v-for="img in item.photos" class="thumb-img" @tap="viewPhoto(item.photos)"/>
								</p>
								<span class="time">{{item.created_at | time}}</span>
								<div class="mui-pull-right">
									<span class="mui-icon praise" @tap="praise(item)" v-show="item.user_id != uid"></span>
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
</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				items: '',
				travel: [],
				hobby: [],
				social: [],
				skill: [],
				food: [],
				trends: [],
				page: 1,
				per_page: 20,
				current_active: 'default',
				uid: ''
			}
		},
		ready: function() {
			var self = this;
			mui.init({
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
				self.uid = you.getStore("uid");
				you.authenGet("/classifies", {}, function(result) {
					mui.each(result.classifies, function(i, d) {
						this[d.alias].push(d);
					}.bind(this));
					mui.each(["travel", "food", "hobby", "social", "skill"], function(i, d) {
						this[d].splice(9, this[d].length - 9);
						this[d].push({
							name: '更多',
							img: './images/1.png'
						});
					}.bind(this))
				}.bind(this))
			}.bind(this));
			
			window.addEventListener("reloadData", function() {
				self.page = 1;
				self.trends = [];
				self.loadMsg();
			})
		},
		methods: {
			load: function(type) {
				this.page = 1;
				this.trends = [];
				this.loadMsg(type);
				this.current_active = type;
			},
			loadMsg: function(type) {
				var self = this;
				var type = type || 'default';
				mui.plusReady(function() {
					you.authenGet("/stories", {type: type, page: self.page, per_page: self.per_page} ,function(result) {
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
				if (e.target.className.includes("mui-icon") == false) {
				  mui.openWindow({
						url: 'comment.html',
						id: 'comment',
						extras: {
							item: item
						}
					})
				}
			},
			praise: function(item) {
				you.authenPost("/stories/" + item.id + "/praise", {}, function(result) {
					console.log(JSON.stringify(result));
				})
			},
			goAttainment: function(item) {
				mui.openWindow({
					url: "attainment/list.html",
					id: "attainment_list",
					extras: {
						classify: item.id,
						title: item.name
					}
				});
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
		div {
			text-align: center;
		}
		img {
			max-width: 100px;
		}
	}
	
	#baner {
		margin-top: 10px;
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
			height: 1px;
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

</style>