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
	<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<form v-on:submit.prevent="search">
				<div class="mui-input-row mui-search">
					<input type="search" class="mui-input-clear" placeholder="有友好/手机号" v-model="q" />
				</div>
			</form>
			<template v-if="users.length > 0">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell" v-for="user in users">
						<img class="mui-media-object mui-pull-left" :src="user.logo" />
						<div class="mui-media-body">
							{{user.name}}
							<p class="mui-ellipsis">{{user.sign}}</p>
						</div>
					</li>
				</ul>
			</template>
			<template v-else>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<img class="mui-media-object mui-pull-left" :src="logo" />
						<div class="mui-media-body">
							通讯录导入
							<p>添加或邀请通讯录中好友</p>
						</div>
					</li>
				</ul>
			</template>

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
					logo: '../images/1.png'
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
								console.log(JSON.stringify(result));
								self.users = self.users.concat(result.users);
								if (self.page * self.per_page > result.total_count) {
									mui("#refreshContainer").pullRefresh().endPullupToRefresh(true);
								} else {
									mui("#refreshContainer").pullRefresh().endPullupToRefresh(false);
								}
								self.page = self.page + 1;
							})
						})
					},
					search: function() {
						var self = this;
						self.users = [];
						console.log(this.q);
						mui("#refreshContainer").pullRefresh().endPullupToRefresh(true);
						this.loadMore();
//						you.authenGet("/users/find", {
//							q: this.q,
//							page: self.page,
//							per_page: self.per_page
//						}, function(result) {
//							console.log(JSON.stringify(result));
//							self.users = result.users;
//						})
					}
				}
			}
</script>
<style lang="sass">
	body {
		height: 100%;
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
</style>