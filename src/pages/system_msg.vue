<!--
	作者：zuosjob@gmail.com
	时间：2016-03-04
	描述：系统消息
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">消息</h1>
	</header>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<img class="mui-media-object mui-pull-left" :src="logo">
					<div class="mui-media-body">
						{{{item.content}}}
					</div>
					<p class="time">{{item.created_at}}</p>
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
				item: '',
				logo: 'images/zhi.png'
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				you.get("/system/msg", {}, function(result) {
					console.log(JSON.stringify(result));
					self.item = result;
				})
			})
		}
	}
</script>
<style lang="sass">
  .time {
  	  padding-left: 50px;
  }
</style>>