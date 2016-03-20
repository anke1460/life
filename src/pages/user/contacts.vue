<!--
	作者：zuosjob@gmail.com
	时间：2016-01-13
	描述：详情页面
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">通讯录朋友</h1>
	</header>
	<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" v-for="item in items">
					<a>
						<img class="mui-media-object mui-pull-left" :src="item.logo" track-by="$index"/>
						<div class="name">{{item.name}}</div>
						<div class="select" @tap="select(item)">{{item.state == '1' ? '添加' : ''}}</div>
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
				items: []
			}
		},
		ready: function() {
			var self = this;
			mui.plusReady(function() {
				you.authenGet("/system/contacts", {}, function(result_data) {
					self.is_up = false;
					you.endLoding();
					self.items = result_data.contacts;
					setTimeout(function() {
						mui('.mui-scroll-wrapper').scroll();
					},100);
				})
			});
		},
		methods: {
			select: function(item) {
				if (item.state == '1') {
					you.authenPost("/users/" + item.member_id + "/add_friend", {}, function(result) {
						mui.toast("已发送好友请求");
						item.state == '4';
					})
				}
			}
		}
	}
</script>
<style lang="sass">
	.start {
		width: 100%;
	}
	.add {
		padding: 50px 10px;
	}
	.select {
		position: absolute;
		right: 20px;
		top: 25px;
		color: #989898
	}
	
</style>