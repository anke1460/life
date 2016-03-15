<!--
	作者：zuosjob@gmail.com
	时间：2016-01-13
	描述：成就列表页面
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">{{title}}</h1>
	</header>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="mui-slider">
				<div class="mui-slider-group">
					<div class="mui-slider-item" v-for="image in images">
						<img :src="image.image_url" class="img" />
					</div>
				</div>
				<div class="mui-slider-indicator">
					<div class="mui-indicator" v-for="image in images" :class="{'mui-active': $index == 0}"></div>
				</div>
			</div>
			<div class="description">
				{{classify.description}}
			</div>
			<div class="title-bar">
				评分规则
			</div>
			<div class="tip">
				<div class="mui-col-xs-3 mui-pull-left">
					<p>自我标记</p>
					<span>100%</span>
				</div>
				<div class="mui-col-xs-3 mui-pull-left">
					<p>图片认证</p>
					<span>60%</span>
				</div>
				<div class="mui-col-xs-3 mui-pull-left">
					<p class="no-open">好友确认</p>
					<span>20%</span>
				</div>
				<div class="mui-col-xs-3 mui-pull-left">
					<p class="no-open">定位认证</p>
					<span>尚未开通</span>
				</div>
				<h5>完成组合内所有组合点+20%</h5>
			</div>
			<div class="title-bar">
				包含成就组合
			</div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" v-for="detail_classify in detail_classifies" @tap="goDetail(detail_classify)">
					<a>
						<img class="mui-media-object mui-pull-left" :src="detail_classify.img_url" />
						<div class="mui-media-body">
							{{detail_classify.name}}
							<p class="mui-ellipsis">
								{{detail_classify.description}}
							</p>
							<p>{{detail_classify.attainments_count}}人完成</p>
						</div>
						<span class="tag">{{detail_classify.marks_count}}/{{detail_classify.nodes_count}}</span>
						<img :src="'../images/finished.png'" class="finished" v-show="detail_classify.is_finished"/>
					</a>
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
				images: [],
				title: '',
				classify: '',
				detail_classifies: []
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				self.title = you.current_page.title;
				you.loading();
				self.loadData();
			});
			window.addEventListener("reloadData", function(e) {
				self.loadData();
			})
		},
		methods: {
			loadData: function() {
				var self = this;
				you.authenGet("/classifies/" + you.current_page.classify, {}, function(result) {
					self.images = result.imgs;
					self.classify = result.classify;
					self.detail_classifies = result.detail_classifies;
					you.endLoding();
					setTimeout(function() {
						mui('.mui-slider').slider();
					}, 100);
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					},150)
				});
			},
			goDetail: function(detail_classify) {
				mui.openWindow({
					url: 'detail.html',
					id: 'attainment_detail',
					extras: {
						classify: this.classify,
						detail_classify: detail_classify
					}
				})
			}
		}
	}
</script>
<style lang="sass">
	.mui-slider {
		height: 140px;
		img {
			background-size: cover;
		}
	}
	
	.tag {
		position: absolute;
		top: 5px;
		right: 10px;
		color: #888;
		font-size: 14px;
	}
	
	.description {
		margin: 10px;
		font-size: 14px;
		color: #444;
		height: 80px;
		overflow: hidden;
	}
	
	.title-bar {
		text-align: center;
		height: 30px;
		font-size: 12px;
		line-height: 30px;
		color: #333;
		border-top: 1px solid #CCCCCC;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.tip {
		text-align: center;
		margin: 10px 0px;
		overflow: hidden;
		p {
			color: #1FCC7C;
			margin: 0px;
			&.no-open {
				color: #333;
			}
		}
		span {
			color: #333;
			font-size: 14px;
		}
	}
</style>