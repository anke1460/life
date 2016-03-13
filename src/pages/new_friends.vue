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
			<ul class="mui-table-view" v-show="users.length > 0" id="list">
				<li class="mui-table-view-cell mui-disabled" v-for="user in users" data-id="{{user.request_id}}">
					<div class="mui-slider-right mui-disabled">
						<a class="mui-btn mui-btn-red">删除</a>
					</div>
					<div class="mui-slider-handle">
						<img class="mui-media-object mui-pull-left" :src="user.logo" @tap="viewUser(user)"/>
						<div class="mui-media-body">
							{{user.name}}
							<p class="mui-ellipsis">{{user.sign}}</p>
							<span class="add-user" @tap="add(user)" :class="{'accept': user.status == 2}">{{user.status | state}}</span>
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
				you.authenGet("/users/new_friends", {}, function(result) {
					you.endLoding();
					self.users = result.users;
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					},150)
					you.endLoding();
				}.bind(this))
			
			}.bind(this));
			mui('#list').on('tap', '.mui-btn', function(event) {
				var elem = this;
				var li = elem.parentNode.parentNode;
				mui.confirm('确认删除该条记录？', '提示', ['确认', '取消'], function(e) {
					if (e.index == 0) {
						you.authenDelete("/users/" + li.dataset.id + "/request", {}, function(result) {
							li.parentNode.removeChild(li);
						})
					} else {
						setTimeout(function() {
							mui.swipeoutClose(li);
						}, 0);
					}
				});
			});
		},
		methods: {
			addUser: function() {
				mui.openWindow({
					url: 'user/add_user.html',
					id: 'add_user'
				})
			},
			submit: function() {
				you.loading();
				you.authenGet("/users/new_friends", {}, function(result) {
					you.endLoding();
					self.users = result.users;
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					},150)
					you.endLoding();
				}.bind(this))
			},
			add: function(user) {
				if (user.status == 2) {
					you.authenPost("/users/" + user.request_id + "/accept", {}, function(resullt) {
						user.status = 3;
					})
				}
			},
			viewUser: function(user) {
				mui.openWindow({
					url: 'user/index.html',
					id: 'user_index',
					extras: {
						user: user
					}
				})
			}
		}
	}
</script>
<style lang="sass">
  .add-user {
		position: absolute;
		right: 20px;
		top: 10px;
		font-size: 14px;
		color: #666;
		&.accept {
			background-color: #1FCC7C;
			padding: 4px 8px;
			border-radius: 4px;
			color: #fff;
		}
	}
	
	.search-bg {
		padding: 10px 10px 0px;
		background: #e6e8e3;
		input {
			background-color: #FFFFFF;
		}
	}
	
	p.mui-ellipsis {
		padding-right: 60px;
	}
</style>