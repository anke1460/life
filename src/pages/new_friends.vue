<!--
	作者：zuosjob@gmail.com
	时间：2015-12-23
	描述：通讯录列表
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">新朋友</h1>
		<a id="menu" class="mui-pull-right" @tap="addUser"></a>
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
				<li class="mui-table-view-cell" v-for="user in users">
					<img class="mui-media-object mui-pull-left" :src="user.logo" />
					<div class="mui-media-body">
						{{user.name}}
						<p class="mui-ellipsis">{{user.sign}}</p>
						<span class="add-user" @tap="add(user)">{{user.current_relation | state}}</span>
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
				you.authenGet("/users/new_friends", {}, function(result) {
					you.endLoding();
					self.users = result.users;
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					},150)
					you.endLoding();
				}.bind(this))
			
			}.bind(this))
		},
		methods: {
			addUser: function() {
				mui.openWindow({
					url: 'user/add_user.html',
					id: 'add_user'
				})
			},
			submit: function() {
				console.log('submit');
				you.loading();
				you.authenGet("/users/new_friends", {}, function(result) {
					you.endLoding();
					self.users = result.users;
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					},150)
					you.endLoding();
				}.bind(this))
			}
		}
	}
</script>
<style lang="sass">
  .add-user {
		position: absolute;
		right: 20px;
		top: 20px;
		font-size: 14px;
		color: #666
	}
	.search-bg {
		padding: 10px 10px 0px;
		background: #e6e8e3;
		input {
			background-color: #FFFFFF;
		}
	}
</style>