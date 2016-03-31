<!--
	作者：zuosjob@gmail.com
	时间：2015-12-23
	描述：关注页面
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">关注</h1>
	</header>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="search-bg">
				<form @submit.prevent="submit">
					<div class="mui-input-row mui-search">
						<input type="search" v-model="search" class="mui-input-clear" placeholder="搜索" />
					</div>
				</form>
			</div>
			<ul class="mui-table-view" v-show="users.length > 0">
				<li class="mui-table-view-cell mui-disabled" v-for="user in users" @tap="go(user, $event)">
					<div class="mui-slider-right mui-disabled">
						<a class="mui-btn mui-btn-red" @tap="del(user, $event)">删除</a>
					</div>
					<div class="mui-slider-handle">
						<img class="mui-media-object mui-pull-left" :src="user.logo" />
						<div class="mui-media-body">
							{{user.name}}
							<p class="mui-ellipsis">{{user.sign}}</p>
							<span class="time-ago">{{user.time_at | time }}</span>
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
				users: '',
				search: ''
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				you.loading();
				you.authenGet("/users/concern", {}, function(result) {
					you.endLoding();
					self.users = result.users;
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					}, 150)
					you.endLoding();
				}.bind(this))
				mui(".mui-search").on("tap", ".mui-icon-clear", function(e) {
					this.search = '';
					this.submit();
					mui(".search-bg input")[0].blur();
				}.bind(this));
			}.bind(this))
		},
		methods: {
			submit: function() {
				var self = this;
				you.loading();
				you.authenGet("/users/concern", {
					q: this.search
				}, function(result) {
					you.endLoding();
					self.users = result.users;
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					}, 150)
					you.endLoding();
				}.bind(this))
			},
			go: function(user, el) {
				if (el.target.tagName == "A") {
					return true;
				}
				mui.openWindow({
					url: 'user/index.html',
					id: 'user_index',
					extras: {
						user: user
					}
				})
			},
			del: function(user, el) {
				var self = this;
				var li = el.target.parentNode.parentNode;
				mui.confirm('确认删除？', '提示', ['确认', '取消'], function(e) {
					if (e.index == 0) {
						you.authenDelete("/users/" + user.id + "/concern", {}, function(result) {
							you.removeItem(self.users, user);
						})
					} else {
						setTimeout(function() {
							mui.swipeoutClose(li);
						}, 0);
					}
				});
			}
		}
	}
</script>
<style lang="sass">
	.search-bg {
		padding: 10px 10px 0px;
		background: #e6e8e3;
		input {
			background-color: #FFFFFF;
		}
	}
	
	.time-ago {
		position: absolute;
		right: 10px;
		top: 0px;
		color: #989898;
		font-size: 14px;
	}
</style>