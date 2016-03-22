<!--
	作者：zuosjob@gmail.com
	时间：2016-03-12
	描述：攻略
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">成长记</h1>
	</header>
	<div class="mui-content mui-scroll-wrapper" id="content">
		<div class="mui-scroll">
			<div class="article-wraper">
				<div class="article" v-for="item in items">
					<div class="author">
						<img :src="item.logo" @tap='user(item.user_id)'/>
						<div>
							{{item.name}}
							<h5>{{item.honor}}</h5>
						</div>
					</div>
					<div class="content" @tap="detail(item)">
						<div class="show-img" :style="item.img"></div>
						<h4 class="article-title">{{item.title}}</h4>
						<p>{{{item.content}}}</p>
					</div>
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
				items: [],
				page: 1,
				per_page: 15
			}
		},
		ready: function() {
			var self = this;
			mui.init({
				pullRefresh: {
					container: '#content',
					up: {
						auto: true,
						callback: this.pullUp
					}
				}
			});
		},
		methods: {
			pullUp: function(result) {
				mui.plusReady(function() {
					you.get("/system/strategies", {page: this.page} , function(result) {
						this.items = this.items.concat(result.strategies);
						if (this.page * this.per_page > result.total_count) {
							mui("#content").pullRefresh().endPullupToRefresh(true);
						} else {
							mui("#content").pullRefresh().endPullupToRefresh(false);
						}
						this.page = this.page + 1;
					}.bind(this))
				}.bind(this))
			},
			detail: function(item) {
				mui.openWindow({
					url: 'news_detail.html',
					id: 'news_detail',
					extras: {
						n_id: item.id
					}
				})
			},
			user: function(id) {
				mui.openWindow({
					url: 'user/index.html',
					id: 'user_index',
					extras: {
						user: {
							id: id
						}
					}
				})
			}
		}
	}
</script>