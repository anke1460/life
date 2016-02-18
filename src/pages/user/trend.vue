<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">{{user.name}}的动态</h1>
	</header>
	<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in items">
					<a>
						<img class="mui-media-object mui-pull-left logo" :src="item.avatar" />
						<div class="mui-media-body">
							{{item.name}}
							<p>头衔{{user.honor_nam}}</p>
						</div>
					</a>
					<div class="mui-media-body" style="margin: 0px;">
						<div>{{item.content}}</div>
						<p>
							<img :src="img.thumb" width="100px" v-for="img in item.imgs" class="thumb-img" />
						</p>
						<span class="time">{{item.created_at | time}}</span>
						<div class="mui-pull-right">
							<span class="mui-icon mui-icon-redo"></span>
							<span class="mui-icon mui-icon-checkmarkempty"></span>
							<span class="mui-icon mui-icon-chatboxes" @tap="detail"></span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	module.exports = {
		el: '#app',
		data: function() {
			return {
				items: [],
				page: 1,
				per_page: 20,
				user: {}
			}
		},
		ready: function() {
			var self = this;
			mui.init({
				pullRefresh: {
					container: "#refreshContainer",
					up: {
						contentrefresh: "上拉加载动态",
						contentnomore: '无更多动态',
						auto: true,
						callback: function() {
							mui.plusReady(function() {
								you.authenGet("/users/" + self.user.id + "/stories", {
									page: self.page,
									per_page: self.per_page
								}, function(result) {
									self.items = self.items.concat(result.stories);
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
				self.user = you.current_page.user;
			})
		},
		methods: {}
	}
</script>
<style lang="sass">
	.thumb-img {
		margin: 3px;
	}
	
	.time {
		position: absolute;
		right: 10px;
		top: 10px
	}

</style>