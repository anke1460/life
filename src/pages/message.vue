<!--
	作者：zuosjob@gmail.com
	时间：2016-02-25
	描述：通讯录首页
-->
<template>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media" @tap="open('address_book.html')">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" :src="img1">
						<div class="sys">
							好友
						</div>
						<i :class="{'msg-dot': friend_msg}"></i>
					</a>
				</li>
			</ul>
			<div class="mui-table-view-divider">
			</div>
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media" @tap="open('concern.html')">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" :src="img2">
						<div class="sys">
							关注
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media" @tap="open('fans.html')">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" :src="img3">
						<div class="sys">
							粉丝
						</div>
						<i :class="{'msg-dot': fans_msg}"></i>
					</a>
				</li>
			</ul>
			<div class="mui-table-view-divider">
			</div>
			<ul class="mui-table-view mui-table-view-chevron" id="message">
				<li class="mui-table-view-cell mui-media" @tap="open('zhi.html')">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" :src="img4">
						<div class="sys">
							知趣官方
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell msg mui-disabled" v-for="message in messages" @tap="detail(message, $event)">
					<div class="mui-slider-right mui-disabled">
						<a class="mui-btn mui-btn-red" @tap="del(message, $event)">删除</a>
					</div>
					<div class="mui-slider-handle">
						<img class="mui-media-object mui-pull-left" :src="message.logo">
						<div class="mui-media-body">
							{{message.name}}
							<p class="mui-ellipsis">{{message.content}}</p>
						</div>
						<span class="time-ago">{{message.created_at | time}}</span>
					</div>
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
				img1: 'images/haoyou.png',
				img2: 'images/concern.png',
				img3: 'images/fans.png',
				img4: 'images/zhi.png',
				messages: '',
				friend_msg: false,
				fans_msg: false
			}
		},
		ready: function() {
			mui.init({swipeBack: false});
			var self = this;
			mui.plusReady(function() {
				self.load();
				setTimeout(function() {
					mui(".mui-scroll-wrapper").scroll();
				}, 200)
				
				window.addEventListener("add_friend", function() {
					self.friend_msg = true;
				})
				window.addEventListener("add_fans", function() {
					self.fans_msg = true;
				})
			})
			window.addEventListener("reloadData", function() {
				self.load();
			})
		},
		methods: {
			load: function() {
				var self = this;
				you.authenGet("/messages", {}, function(result) {
					self.messages = result.messages;
				})
			},
			open: function(url) {
				if (url == 'address_book.html') {
				  this.friend_msg = false;
				}
				if (url == 'fans.html') {
				  this.fans_msg = false;
				}
				mui.openWindow({
					url: url,
					id: url
				});
			},
			detail: function(message, el) {
				if (el.target.tagName == "A") {
					return true;
				}
				var url = message.msg_type == 'request_friend' ? 'new_friends.html' : 'chat.html';
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						message: message
					}
				});
			},
			del: function(message, el) {
				var self = this;
				var li = el.target.parentNode.parentNode;
				mui.confirm('确认删除？', '提示', ['确认', '取消'], function(e) {
					if (e.index == 0) {
						you.authenDelete("/messages/" + message.id, {}, function(result) {
							you.removeItem(self.messages, message);
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