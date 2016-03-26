<template>
	<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<img class="mui-media-object mui-pull-left" :src="item.avatar" @tap="viewUser(item)">
					<span class="time">{{item.created_at | time}}</span>
					<div class="mui-media-body reply-content">
						{{item.name}}
						<div>{{item.content}}</div>
						<p>
							<img :src="img.img" width="100px" v-for="img in item.imgs" class="thumb-img" />
						</p>
					</div>
				</li>
			</ul>
			<ul class="mui-table-view" style="margin-top: 10px;">
				<li class="mui-table-view-cell mui-media">
					<div>
						<span>评论({{comment_total}})</span>
						<div class="up">
							<img class="avatar" :src="p.logo" v-for="p in praise" @tap="viewUser(p)">
							<span>赞 {{total_praise}}</span>
						</div>
					</div>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" @tap="reply(comment)" v-for="comment in comments">
					<img class="mui-media-object mui-pull-left" :src="comment.user_logo" @tap="commentUser(comment)">
					<span class="time">{{comment.created_at | time}}</span>
					<div class="mui-media-body reply-content">
						{{comment.user_name}}
						<div>
							<template v-if="comment.reply_user.length > 0">
								回复 
								<strong v-for="reply in comment.reply_user">
									{{reply[1]}}
									<!--{{comment.reply_user.length > 0 ? comment.reply_user[1] : ''}}-->
								</strong> 
							</template>
							
							{{comment.content}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div id="comment">
		<div class="comment-input">
			<textarea placeholder="说点什么" id="content" v-model="content"></textarea>
		</div>
		<button id="send" @tap="send">发送</button>
	</div>
</template>
<script>
	module.exports = {
		el: '#detail',
		data: function() {
			return {
				content: "",
				item: '',
				comments: [],
				comment_total: 0,
				total_praise: '',
				praise: '',
				page: 1,
				per_page: 20,
				reply_users: [],
				reply_content: []
			}
		},
		ready: function() {
			var self = this;
			mui.init({
				pullRefresh: {
					container: "#refreshContainer",
					up: {
						auto: true,
						contentrefresh: "上拉加载动态",
						contentnomore: '',
						callback: self.loadMsg
					}
				}
			});
			mui.plusReady(function() {
				this.item = you.current_page.item;
			}.bind(this))
		},
		methods: {
			loadMsg: function() {
				var self = this;
				mui.plusReady(function() {
					you.authenGet("/stories/" + you.current_page.item.id + "/comment", {page: self.page, per_page: self.per_page} ,function(result) {
						self.comment_total = result.total_count;
						self.comments = self.comments.concat(result.comments);
						self.praise = result.praise;
						self.total_praise = result.total_praise;
						if (self.page * self.per_page > result.total_count) {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(true);
						} else {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(false);
						}
						self.page = self.page + 1;
					})
				})
			},
			reply: function(item) {
				if (item.user_id != plus.storage.getItem("uid")) {
					//避免回复自己
					
					if (this.reply_users.indexOf(item.user_id) == -1) {
						this.content +=  "@" + item.user_name + "：";
					  this.reply_content.push("@" + item.user_name + "：");
					  this.reply_users.push(item.user_id);
					}
				} else {
					this.reply_content = [];
					this.content = "";
					this.reply_users = [];
				}
				
			},
			send: function() {
				var self = this;
				var content = self.content;
				mui.each(this.reply_content, function(i, d) {
					content = self.content.replace(d, "")
				})
				you.authenPost("/stories/" + you.current_page.item.id + "/comment", {content: content, reply_users: self.reply_users}, function(result) {
					self.comments.splice(0,0,result);
					self.content = "";
					self.comment_total += 1;
				})
			},
			viewUser: function(user) {
				mui.openWindow({
					url: 'user/index.html',
					id: 'user_index',
					extras: {
						user: {
							id: user.user_id
						}
					}
				})
			},
			commentUser: function(comment) {
				mui.openWindow({
					url: 'user/index.html',
					id: 'user_index',
					extras: {
						user: {
							id: comment.user_id
						}
					}
				})
			}
		}
	}
</script>
<style lang="sass">
	.mui-content>.mui-table-view:first-child {
		margin-top: 0px;
	}
	
	.up {
		float: right;
		font-size: 12px;
		.avatar {
			width: 30px;
			height: 30px;
			vertical-align: middle;
			margin-right: 4px;
		}
	}
	
	.thumb-img {
		margin: 3px;
	}
	
	.time {
		position: absolute;
		right: 10px;
		font-size: 12px;
	}
	
	.reply {
		position: relative;
		margin-top: 15px;
		background: #eee;
		padding: 10px 5px;
		color: #989898;
		.arrow {
			height: 20px;
			display: block;
			position: absolute;
			width: 20px;
			top: -20px;
			left: 15px;
			overflow: hidden;
			z-index: 2;
			&:before {
				position: absolute;
				top: 15px;
				left: 0px;
				width: 20px;
				height: 20px;
				content: ' ';
				background: #eee;
				-webkit-transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				transform: rotate(45deg);
				z-index: 0;
			}
		}
	}
	
	#comment {
		position: fixed;
		width: 100%;
		bottom: 0px;
		z-index: 999;
		left: 0px;
		padding: 0 5px;
		background: #fff;
		.comment-input {
			margin-right: 70px;
		}
		textarea {
			margin-bottom: 0px;
			height: 35px;
			line-height: 35px;
      padding: 0px 10px;
      font-size: 12px;
      color: #666;
		}
		#send {
			position: absolute;
			bottom: 5px;
			right: 10px;
		}
	}
	
	.reply-content {
		color: #444444;
		font-size: 14px;
		margin: 0px;
	}
</style>