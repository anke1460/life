<!--
	作者：zuosjob@gmail.com
	时间：2016-03-12
	描述：攻略详情
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">{{item.title}}</h1>
	</header>
	<div class="mui-content mui-scroll-wrapper" id="content">
		<div class="mui-scroll">
				<div class="article">
					<div class="author">
						<img :src="item.logo" @tap="user(item.user_id)" />
						<div>
							{{item.name}}
							<h5>{{item.honor}}</h5>
						</div>
					</div>
					<div id="hr"></div>
					<div class="content">
						<h4>{{item.title}}</h4>
						<p>{{{item.content}}}</p>
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
				item: '',
				page: 1,
				per_page: 15
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				you.get("/system/" + you.current_page.n_id +"/strategy", {}, function(result) {
					self.item = result.strategy;
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					}, 100);
				})
			})
			mui("#content").on("tap", "a", function() {
				you.loadWebUrl(this.getAttribute("href"), "template", {title: ''});
			})
		},
		methods: {
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