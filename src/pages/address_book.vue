<!--
	作者：zuosjob@gmail.com
	时间：2015-12-23
	描述：通讯录列表
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">好友</h1>
		<a id="menu" class="mui-pull-right" @tap="addUser"></a>
	</header>
	<div class="mui-content">
		<div id='list' class="mui-indexed-list">
			<div class="mui-indexed-list-search mui-input-row mui-search" style="display: none;">
				<input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
			</div>
			<div class="mui-sys-panel">
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell mui-media" @tap="newFriends">
						<a class="mui-navigate-right">
							<img class="mui-media-object mui-pull-left" :src="qu">
							<div class="sys">
								新的朋友
							</div>
							<i :class="{'msg-dot': msg_dot}"></i>
						</a>
					</li>
				</ul>
				<div class="mui-table-view-divider"></div>
			</div>

			<div class="mui-indexed-list-bar">
				<a v-for="i in indexs">{{i}}</a>
			</div>
			<div class="mui-indexed-list-alert"></div>
			<div class="mui-indexed-list-inner">
				<div class="mui-indexed-list-empty-alert">没有数据</div>
				<ul class="mui-table-view">
					<template v-for="item in items">
						<li data-group="{{item.name}}" class="mui-table-view-divider mui-indexed-list-group">{{item.name}}</li>
						<li data-value="{{group.pinyin}}" data-tags="{{group.pinyin}}" class="mui-table-view-cell mui-indexed-list-item mui-media  mui-disabled" @tap="user(group, $event)" v-for="group in item.groups">
							<div class="mui-slider-right mui-disabled">
								<a class="mui-btn mui-btn-red" @tap="del(item.groups, group, $event)">删除</a>
							</div>
							<div class="mui-slider-handle">
								<img class="mui-media-object mui-pull-left" :src="group.logo">
								<div class="mui-media-body">
									{{group.name}}
									<span class="honor-name">{{group.honor_nam}}</span>
									<p class="mui-ellipsis">知趣分：{{group.score}}</p>
								</div>
								<span class="rank">知趣排行: <strong>{{group.rank_num}}</strong></span>
							</div>
						</li>
					</template>
				</ul>
				<h5 class="mui-text-center total"> {{total}} 位好友</h5>
			</div>
		</div>

	</div>
</template>
<script>
	module.exports = {
		el: '#app',
		data: function() {
			return {
				qu: 'images/qu.png',
				items: [],
				indexs: [],
				total: 0,
				msg_dot: false
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				var uid = plus.storage.getItem("uid");
				if (plus.storage.getItem(uid +"_request_new_friend")) {
					self.msg_dot = true;
				}
				you.authenGet("/users/friend", {}, function(result) {
					you.endLoding();
					var friends = [];
					var title = [];
					mui.each(result.friends, function(i, n) {
						if (title.indexOf(n.pin) == -1) {
							title.push(n.pin);
							var p = {
								name: n.pin
							};
							p.groups = [n];
							friends.push(p)
						} else {
							mui.each(friends, function(s, d) {
								if (d.name == n.pin) {
									d.groups.push(n)
								}
							})
						}
					})
					this.indexs = title.sort();
					friends.sort(function(a, b) {
						return a.name > b.name
					})
					this.items = friends;
					this.total = friends.length;
					setTimeout(function() {
						var header = document.querySelector('header.mui-bar');
						var list = mui("#list")[0];
						list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
						window.indexedList = new mui.IndexedList(list);
					}, 100)
				}.bind(this))
			
			}.bind(this))
		},
		methods: {
			del: function(group, item, el) {
				var self = this;
				var li = el.target.parentNode.parentNode;
				mui.confirm('确认删除？', '提示', ['确认', '取消'], function(e) {
					if (e.index == 0) {
						you.authenDelete("/users/" + item.id + "/friend", {}, function(result) {
							you.removeItem(group, item);
						  self.total -= 1;
						})
					} else {
						setTimeout(function() {
							mui.swipeoutClose(li);
						}, 0);
					}
			 });
			},
			addUser: function() {
				mui.openWindow({
					url: 'user/add_user.html',
					id: 'add_user'
				})
			},
			user: function(user, el) {
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
			newFriends: function() {
				var uid = plus.storage.getItem("uid");
				plus.storage.removeItem(uid +"_request_new_friend")
				this.msg_dot = false;
				mui.openWindow({
					url: 'new_friends.html',
					id: 'new_friends'
				})
			}
		}
	}
</script>
<style lang="sass">
	.total {
		margin-top: 10px;
	}
	
	.mui-indexed-list-bar {
		height: auto;
	}
	.honor-name {
		font-size: 12px;
		color: #999
	}
	
	.rank {
		position: absolute;
		right: 40px;
		top: 20px;
		color: #8F8F94;
		font-size: 14px;
	}
	
	.sys {
		margin-top: 12px;
	}
</style>