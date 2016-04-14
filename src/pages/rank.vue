<!--
	作者：zuosjob@gmail.com
	时间：2016-02-10
	描述：排行榜
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<a id="shard" @tap="shard"></a>
		<h1 class="mui-title">排行榜</h1>
	</header>
	<div class="mui-content">
			<table id="table_sort">
				<tr>
					<td @tap="filter('#category')" id="cls"><span>{{classify}}</span><span class="mui-icon mui-icon-arrowdown"></span>
					</td>
					<td @tap="filter('#scope')" id="scoped"><span>{{scope}}</span><span class="mui-icon mui-icon-arrowdown"></span>
					</td>
				</tr>
			</table>
			<ul class="sub-menu menu-item mui-hidden" id="category">
				<li @tap="category('clear', '全部')">全部</li>
				<li @tap="category('travel', '旅行')">旅行</li>
				<li @tap="category('food', '美食')">美食</li>
				<li @tap="category('social', '社交')">社交</li>
				<li @tap="category('hobby', '爱好')">爱好</li>
				<li @tap="category('skill', '技能')">技能</li>
			</ul>
			<ul class="sub-menu mui-hidden scope-item" id="scope">
				<li @tap="scoped('clear', '全部')">全部</li>
				<li @tap="scoped('', '好友')">好友</li>
			</ul>
			<div id="refreshContainer" class="mui-scroll-wrapper">
			<div class="mui-scroll">
			<ul class="mui-table-view" id="users">
				<li class="mui-table-view-cell" v-for="user in users">
					<img class="mui-media-object mui-pull-left" :src="user.logo">
					<div class="mui-media-body">
						{{user.name}}
						<p class="mui-ellipsis user-score">{{user.score}}分</p>
						<span class="user-num">{{user.num}}</span>
					</div>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li v-for="item in items" class="mui-table-view-cell">
					<img class="mui-media-object mui-pull-left logo" :src="item.logo" @tap="viewUser(item)">
					<div class="rank-wraper">
						{{item.name}}
						<span class="score">{{item.score}}分</span>
						<template v-if="item.num <= 3">
							<span class="num-img n{{item.num}}"></span>
						</template>
						<template v-else>
							<span class="num">{{item.num}}</span>
						</template>
					</div>
				</li>
			</ul>
			</div>
		</div>
	</div>
</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				mark: '',
				items: [],
				page: 1,
				per_page: 20,
				users: [{score:10, name: 23, num:15}],
				params: {},
				classify: '分类',
				scope: '范围'
			}
		},
		ready: function() {
			var self = this;
			mui.init({
				pullRefresh: {
					container: "#refreshContainer",
					up: {
						auto: true,
						contentrefresh: "上拉加载更多",
						contentnomore: '已加载完',
						callback: self.load({page: self.page})
					}
				}
			});
		},
		methods: {
			category: function(type, name) {
				mui("#category")[0].classList.add("mui-hidden");
				mui("#scope")[0].classList.add("mui-hidden");
				this.page = 1;
				this.owner = [];
				this.items = [];
				if (type == 'clear') {
					delete this.params['classify'];
					mui('#cls')[0].classList.remove('selected');
					this.classify = '分类';
				} else {
					mui('#cls')[0].classList.add('selected');
					this.classify = name;
					this.params['classify'] = type;
				}
				you.loading();
				this.load(this.params);
			},
			scoped: function(type, name) {
				mui("#category")[0].classList.add("mui-hidden");
				mui("#scope")[0].classList.add("mui-hidden");
				this.page = 1;
				this.owner = [];
				this.items = [];
				if (type == 'clear') {
					mui('#scoped')[0].classList.remove('selected');
					delete this.params['scope'];
					this.scope = '范围';
				} else {
					mui('#scoped')[0].classList.add('selected');
					this.params['scope'] = true;
					this.scope = name;
				}
				you.loading();
				this.load(this.params);
			},
			load: function(params) {
				var self = this;
				mui.plusReady(function() {
					you.authenGet("/users/rank", params, function(result) {
						self.users = result.user;
						self.items = self.items.concat(result.rank);
						if (self.page * self.per_page > result.total_count) {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(true);
						} else {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(false);
						}
						self.page = self.page + 1;
						you.endLoding();
					})
				})
			},
			filter: function(el) {
				if (mui(el)[0].classList.contains("mui-hidden")) {
					if (el == '#scope') {
						mui("#category")[0].classList.add("mui-hidden");
					} else {
						mui("#scope")[0].classList.add("mui-hidden");
					}
					mui(el)[0].classList.remove("mui-hidden");
				} else {
					mui(el)[0].classList.add("mui-hidden");
				}
			},
			viewUser: function(user) {
				mui.openWindow({
					url: 'user/index.html',
					id: "user_index",
					extras: {
						user: {
							id: user.id
						}
					}
				})
			},
			shard: function() {
				var height = document.body.clientHeight - 174;
				mui.openWindow({
					url: 'shard_rank.html',
					id: 'shard_rank',
					styles: {
						top: height,
						bottom: 0
					},
					show: {
						aniShow: 'slide-in-bottom'
					}
				})
			}
		}
	}
</script>
<style lang="sass">
  #users {
  	  margin-bottom: 5px;
  }
  #refreshContainer {
  		top: 100px;
  }
	.sub-menu {
		margin: 0px;
		padding: 0px;
		list-style-type: none;
		position: absolute;
		width: 100%;
		z-index: 3;
		top: 58px;
		background: #fff;
		li {
			padding: 10px;
			border-bottom: 1px #eee solid;
			font-size: 16px;
		}
	}
	
	table {
		height: 40px;
		line-height: 40px;
		width: 100%;
		position: fixed;
		top: 64px;
		z-index: 2;
		background: #fff;
		border-bottom: 1px #eee solid;
		font-size: 18px;
		text-align: center;
		.mui-icon-arrowdown {
			color: #A0A0A0;
			font-size: 14px;
		}
	}
	
	table td.selected span {
		color: #1FCC7C;
	}
	
	.user-score {
		position: absolute;
		right: 15px;
		top: 20px
	}
	
	.mui-table-view .logo {
		height: 30px;
	}
	
	.rank-wraper {
		height: 30px;
		line-height: 30px;
	}
	
	.user-num {
		position: absolute;
		bottom: 5px;
		left: 100px;
		color: #1FCC7C;
	}
	
	.num {
		float: right;
	}
	
	.score {
		right: 40px;
		position: absolute
	}
	
	.mui-table-view-cell {
		color: #8f8f94;
		font-size: 14px;
	}
	
	.num-img {
	  width: 15px;
		height: 30px;
		float: right;
		background-size: contain;
		background-repeat: no-repeat;
		position: absolute;
		right: 15px;
		top: 15px
	}
</style>