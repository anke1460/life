<!--
	作者：zuosjob@gmail.com
	时间：2016-01-25
	描述：添加好友
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">添加好友</h1>
	</header>
	<div class="mui-content">
		<div class="search-wraper">
			<form v-on:submit.prevent="search">
				<div class="mui-input-row mui-search">
					<input type="search" class="mui-input-clear" placeholder="知趣号/手机号" v-model="q" />
				</div>
			</form>
			<h5 class="mui-text-center">我的知趣号{{sys_no}}</h5>
		</div>
		<div id="refreshContainer" class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul class="mui-table-view" v-show="users.length > 0">
					<li class="mui-table-view-cell" v-for="user in users">
						<img class="mui-media-object mui-pull-left" :src="user.logo" />
						<div class="mui-media-body">
							{{user.name}}
							<p class="mui-ellipsis">{{user.sign}}</p>
							<span class="add-user" @tap="add(user)">{{user.current_relation | state}}</span>
						</div>
					</li>
				</ul>
				<ul class="mui-table-view" v-show="!findUser">
					<li class="mui-table-view-cell">
						<img class="mui-media-object mui-pull-left" :src="logo" />
						<div class="mui-media-body">
							通讯录导入
							<p>添加或邀请通讯录中好友</p>
						</div>
					</li>
				</ul>
				<h5 class="no-tip" v-show="findUser && users.length == 0 && loaded">没有该用户</h5>
	
			</div>
	
		</div>
	</div>
</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				q: '',
				users: [],
				page: 1,
				per_page: 20,
				logo: '../images/addressbox.png',
				findUser: false,
				current_relation_name: '',
				loaded: false,
				sys_no: ''
			}
		},
		ready: function() {
			var self = this;
			mui.init({
				pullRefresh: {
					container: "#refreshContainer",
					up: {
						contentrefresh: "上拉加载更多",
						contentnomore: '',
						callback: self.loadMore
					}
				}
			});
			mui(".mui-search").on("tap", ".mui-icon-clear", function(e) {
				self.users = [];
				self.findUser = false;
			});
			mui.plusReady(function() {
				self.sys_no = you.getStore("sys_no");
			})
		},
		methods: {
			loadMore: function() {
				var self = this;
				you.loading();
				mui.plusReady(function() {
					you.authenGet("/users/find", {
						q: self.q,
						page: self.page,
						per_page: self.per_page
					}, function(result) {
						you.endLoding();
						self.users = self.users.concat(result.users);
						self.findUser = true;
						if (self.page * self.per_page > result.total_count) {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(true);
						} else {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(false);
						}
						self.page = self.page + 1;
						self.loaded = true;
					})
				})
			},
			search: function() {
				var self = this;
				self.users = [];
				self.page = 1;
				mui("#refreshContainer").pullRefresh().endPullupToRefresh(true);
				this.loaded = false;
				this.loadMore();
			},
			add: function(user) {
				if (user.current_relation == null) {
					you.authenPost("/users/"+ user.id + "/add_friend", {}, function(result) {
						user.current_relation = 0;
					})
				}
			}
		}
	}
</script>
<style lang="sass">
	body {
		height: 100%;
	}
	
	.add-user {
		position: absolute;
		right: 20px;
		top: 20px;
		font-size: 14px;
		color: #666
	}
	
	.mui-input-row.mui-search .mui-icon-clear {
		top: 12px;
	}
	
	.mui-search:before {
		margin-top: -10px;
	}
	
	.mui-search {
		margin-bottom: 10px;
		padding-top: 5px;
		&:after {
			content: '';
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			height: 1px;
			transform: scaleY(.5);
			background-color: #c8c7cc;
		}
	}
	
	.mui-search input[type=search] {
		background: none;
		border-radius: 0px;
		height: 40px;
		line-height: 34px;
		margin-bottom: 0px;
	}
	
	.mui-search .mui-placeholder {
		height: 40px;
		line-height: 40px;
	}
	
	.no-tip {
		text-align: center;
    margin-top: 30px;
	}
	
	#refreshContainer {
		padding-top: 150px;
	}
	
	.search-wraper {
		position: relative;
		z-index: 2;
	}
</style>