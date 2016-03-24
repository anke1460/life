<!--
	作者：zuosjob@gmail.com
	时间：2016-01-13
	描述：详情页面
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">{{title}}</h1>
	</header>
	<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" v-for="item in items" @tap="user(item)">
					<a>
						<img class="mui-media-object mui-pull-left" :src="item.logo" track-by="$index"/>
						<div class="name">{{item.name}}</div>
						<span class="state">{{item.state}}</span>
						<span class="time">{{item.created_at}}</span>
					</a>
				</li>
			</ul>
		</div>
	</div>

</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				items: [],
				title: '',
				page: 1,
				per_page: 20
			}
		},
		ready: function() {
			var self = this;
			mui.init({
				pullRefresh: {
					container: "#refreshContainer",
					up: {
						contentrefresh: "上拉加载更多",
						contentnomore: '无更多数据',
						auto: true,
						callback: function() {
							mui.plusReady(function() {
								you.authenGet(you.current_page.request_url, {
									page: self.page,
									per_page: self.per_page
								}, function(result) {
									self.items = self.items.concat(result.users);
									if (self.page * self.per_page > result.total_count) {
										mui("#refreshContainer").pullRefresh().endPullupToRefresh(true);
									} else {
										mui("#refreshContainer").pullRefresh().endPullupToRefresh(false);
									}
									self.page = self.page + 1;
								})
							})
						}
					}
				}
			});
			mui.plusReady(function() {
				self.title = you.current_page.title;
			});
		},
		methods: {
			user: function(item) {
				mui.openWindow({
					url: 'user/index.html',
					id: 'user_index',
					extras: {
						user: {
							id: item.id
						}
					}
				})
			}
		}
	}
</script>
<style lang="sass">
	.mui-slider {
		height: 140px;
		img {
			background-size: cover;
		}
	}
	
	.time {
		position: absolute;
		top: 5px;
		right: 10px;
		color: #888;
		font-size: 14px;
	}
	
	.name {
		line-height: 42px;
	}
	
	.state {
		position: absolute;
		bottom: 10px;
		right: 10px;
		font-size: 14px;
		color: #888
	}
	
</style>