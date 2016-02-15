<!--
	作者：zuosjob@gmail.com
	时间：2015-12-23
	描述：通讯录列表
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">通讯录</h1>
		<a id="menu" class="mui-pull-right" @tap="add_user"></a>
	</header>
	<div class="mui-content">
		<div id='list' class="mui-indexed-list">
			<div class="mui-indexed-list-search mui-input-row mui-search">
				<input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
			</div>
			<div class="mui-sys-panel">
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell mui-media">
						<a class="mui-navigate-right">
							<img class="mui-media-object mui-pull-left" :src="images/1.png">
							<div class="sys">
								有友
							</div>
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
						<li data-value="{{group.short_pinyin}}" data-tags="{{group.pinyin}}" class="mui-table-view-cell mui-indexed-list-item mui-media" v-for="group in item.groups">
							<img class="mui-media-object mui-pull-left" :src="group.logo">
							<div class="mui-media-body">
								{{group.name}}
								<p class="mui-ellipsis">有友分：{{group.score}}</p>
							</div>
							<span class="rank">有友排行: <strong>{{group.rank}}</strong></span>
						</li>
					</template>
				</ul>
				<h5 class="mui-text-center total"> {{total}} 位有友</h5>
			</div>
		</div>

	</div>
</template>
<script>
	module.exports = {
		el: '#app',
		data: function() {
			return {
				items: [],
				total: 0,
				indexs: ['A', 'B', 'C']
			}
		},
		ready: function() {
			this.items = [{
				name: 'A',
				groups: [{
					name: '小芳',
					short_pinyin: 'AS',
					pinyin: 'AS',
					logo: 'images/1.png',
					score: '100',
					rank: '2'
				}, {
					name: '小芳',
					short_pinyin: 'AS',
					pinyin: 'AS',
					logo: 'images/1.png',
					score: '100',
					rank: '2'
				}, {
					name: '小芳',
					short_pinyin: 'AS',
					pinyin: 'AS',
					logo: 'images/1.png',
					score: '100',
					rank: '2'
				}, {
					name: '小芳',
					short_pinyin: 'AS',
					pinyin: 'AS',
					logo: 'images/1.png',
					score: '100',
					rank: '2'
				}, {
					name: '小芳',
					short_pinyin: 'AS',
					pinyin: 'AS',
					logo: 'images/1.png',
					score: '100',
					rank: '2'
				}]
			}, {
				name: 'B',
				groups: [{
					name: '小芳',
					short_pinyin: 'AS',
					pinyin: 'AS',
					logo: 'images/1.png',
					score: '100',
					rank: '2'
				}, {
					name: '小芳',
					short_pinyin: 'AS',
					pinyin: 'AS',
					logo: 'images/1.png',
					score: '100',
					rank: '2'
				}, {
					name: '小芳',
					short_pinyin: 'AS',
					pinyin: 'AS',
					logo: 'images/1.png',
					score: '100',
					rank: '2'
				}, {
					name: '小芳',
					short_pinyin: 'AS',
					pinyin: 'AS',
					logo: 'images/1.png',
					score: '100',
					rank: '2'
				}, {
					name: '小芳',
					short_pinyin: 'AS',
					pinyin: 'AS',
					logo: 'images/1.png',
					score: '100',
					rank: '2'
				}]
			}];
			this.total = 98;
			mui.init();
			mui.ready(function() {
				var header = document.querySelector('header.mui-bar');
				var list = mui("#list")[0];
				list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
				window.indexedList = new mui.IndexedList(list);
			}.bind(this))
		},
		methods: {
			add_user: function() {
				mui.openWindow({
					url: 'user/address_book.html',
					id: 'address_book'
				});
			}
		}
	}
</script>
<style lang="sass">
	.total {
		margin-top: 10px;
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