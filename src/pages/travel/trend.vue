<template>
	<friend :visited="visited" :wanted="wanted"></friend>
	<div id="segmentedControl" class="mui-segmented-control">
		<a class="mui-control-item mui-active" href="#all">全部动态</a>
		<a class="mui-control-item" href="#friend">朋友们	</a>
		<a class="mui-control-item" href="#onlyme">只看我</a>
	</div>
	<div id="treads">{{title}}</div>
	<div class="mui-content-padded">
		<div id="all" class="mui-control-content mui-active">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in items">
					<img class="mui-media-object mui-pull-left" :src="item.avatar">
					<div class="mui-media-body" style="margin: 0px;">
						{{item.name}}
						<div>{{item.content}}</div>
						<p>
							<img :src="img.img" width="100px" v-for="img in item.imgs" class="thumb-img" />
						</p>
						<span class="time">1分钟前</span>
						<div class="mui-pull-right">
							<span class="mui-icon mui-icon-redo"></span>
							<span class="mui-icon mui-icon-checkmarkempty"></span>
							<span class="mui-icon mui-icon-chatboxes" @tap="detail"></span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	module.exports = {
		el: '#trend',
		data: {
			title: '黄山印象',
			visited: [{
				avatar: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg',
			}, {
				avatar: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg',
			}],
			wanted: [{
				avatar: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg',
			}, {
				avatar: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg',
			}],
			items: [{
				avatar: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg',
				name: '刘德华',
				content: '五岳归来不看山，黄山归来不看岳，绝对的经典，一年四个样',
				imgs: [{
					img: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg'
				}, {
					img: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg'
				}]
			}, {
				avatar: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg',
				name: '刘德华',
				content: '五岳归来不看山，黄山归来不看岳，绝对的经典，一年四个样',
				imgs: [{
					img: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg'
				}, {
					img: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg'
				}]
			}, {
				avatar: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg',
				name: '刘德华',
				content: '五岳归来不看山，黄山归来不看岳，绝对的经典，一年四个样',
				imgs: [{
					img: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg'
				}, {
					img: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg'
				}]
			}]
		},
		components: {
			friend: require("./friend.vue")
		},
		ready: function() {
				mui.init({
				pullRefresh: {
					container: "#refreshContainer", 
					up: {
						contentrefresh: "上拉加载动态",
						contentnomore: '',
						callback: function() {
							console.log("3333")
							this.items = this.items.concat({
								avatar: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg',
								name: '刘德华',
								content: '五岳归来不看山，黄山归来不看岳，绝对的经典，一年四个样',
								imgs: [{
									img: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg'
								}, {
									img: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg'
								}]
							})	;
							mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
					}.bind(this)
					}
				}
			});
		},
		methods: {
			detail: function() {
				you.loadWebUrl("trend_detail.html", "template", {
					title: '动态详情',
					target: 'trend_detail.html'
				});
		}
	}
}
</script>
<style lang="sass">
	.thumb-img {
		margin: 3px;
	}
	
	.mui-segmented-control {
		border-color: #1FCC7C;
		.mui-control-item.mui-active {
			background-color: #1FCC7C;
		}
		.mui-control-item {
			color: #1FCC7C;
			border-color: #1FCC7C;
			border-left: 1px solid #1FCC7C;
		}
	}
</style>