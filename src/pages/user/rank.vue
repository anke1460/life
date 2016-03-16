<!--
	作者：zuosjob@gmail.com
	时间：2015-12-28
	描述：我的头衔
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">我的头衔</h1>
	</header>
	<div class="mui-content">
		<p class="mui-text-center" style="margin:20px 0px;">您当前头衔是
			<strong>{{current_rank}}</strong>
		</p>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in items" @tap="change(item)">
				<a>
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						{{item.name}}
						<p class='mui-ellipsis'>{{item.detail_classify}}</p>
					</div>
				</a>
			</li>
			
		</ul>
	</div>
</template>
<script>
  module.exports = {
  		el: '#app',
		data: {
			current_rank: "",
			items: ''
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
     		you.authenGet("/medals/my", {}, function(result) {
     			self.items = result.medals;
     			self.current_rank = result.current_medal;
     		})
     	})
		},
		methods: {
			change: function(item) {
				var self = this;
				you.authenPut("/medals/" + item.id + "/change", {}, function() {
					self.current_rank = item.name;
					mui.fire(plus.webview.getWebviewById("template").children()[0], "change_rank", {rank: item.name})
					mui.toast("已成功更换头衔");
				})
			}
		}
  }
	
</script>