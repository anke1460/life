<template>
	<header class="mui-bar mui-bar-nav header">
	    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
	    <h1 class="mui-title"></h1>
	</header>
	<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<img class="mui-media-object mui-pull-left" :src="item.avatar">
					<span class="time">1分钟前</span>
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
						<span>评论(1)</span>
						<div class="up">
							<img class="avatar" :src="item.avatar" height="30px">
							<img class="avatar" :src="item.avatar" height="30px">
							<span>赞 2</span>
						</div>
					</div>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" @tap="comment(item)" v-for="comment in comments">
					<img class="mui-media-object mui-pull-left" :src="comment.user_logo">
					<span class="time">{{comment.created_at | time}}</span>
					<div class="mui-media-body reply-content">
						{{comment.user_name}}
						<div>回复 <strong>leaf</strong> {{comment.content}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div id="comment">
		<div class="comment-input">
			<textarea placeholder="说点什么" id="content" v-model="content" value="{{content}}"></textarea>
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
				comments: ''
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
					you.authenGet("/stories/" + you.current_page.item.id + "/comment", {} ,function(result) {
						console.log(JSON.stringify(result));
						self.comments = self.comments.concat(result.comments);
						if (self.page * self.per_page > result.total_count) {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(true);
						} else {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(false);
						}
						self.page = self.page + 1;
					})
				})
			},
			comment: function(item) {
				this.content =  "@" + item.name + "：";
			},
			send: function() {
				this.content = "";
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
		bottom: 5px;
		z-index: 999;
		left: 5px;
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