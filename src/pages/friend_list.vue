<!--
	作者：zuosjob@gmail.com
	时间：2016-01-13
	描述：详情页面
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">好友列表</h1>
	</header>
	<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" @tap="select(user)">
					<a>
						<img class="mui-media-object mui-pull-left" :src="user.logo" track-by="$index"/>
						<div class="name">{{user.name}}</div>
						<div class="select">选择</div>
					</a>
				</li>
				<li class="mui-table-view-cell" v-for="item in items" @tap="select(item)">
					<a>
						<img class="mui-media-object mui-pull-left" :src="item.logo" track-by="$index"/>
						<div class="name">{{item.name}}</div>
						<div class="select">选择</div>
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
				user: ''
			}
		},
		ready: function() {
			var self = this;
			mui.plusReady(function() {
				you.authenGet("/users/vs_list", {}, function(result) {
					self.user = result.user;
					self.items = result.friends;
				})
			});
		},
		methods: {
			select: function(item) {
				mui.fire(you.webview("pk.html"), "select", {item: item, num: you.current_page.num});
				you.current_page.close();
			}
		}
	}
</script>
<style lang="sass">
	
	.select {
		position: absolute;
		right: 20px;
		top: 25px;
		color: #989898
	}
	
</style>