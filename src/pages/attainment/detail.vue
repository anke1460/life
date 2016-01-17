<!--
	作者：zuosjob@gmail.com
	时间：2016-01-15
	描述：成就标记页面
-->
<template>
	<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" id="back"></a>
	<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="mui-content">
				<div id="slider" class="mui-slider">
					<div class="mui-slider-group">
						<div class="mui-slider-item" v-for="node in nodes">
							<a href="#">
								<img :src="'./../images/translate.png'" :style="{'background-image': ' url('+ node.imgs[0] +')'}" />
							</a>
							<div class="description-bar">
								<strong>{{node.name}}</strong>
								<span>成就分数：{{node.score}}</span>
								<p>{{node.name_en}}</p>
							</div>
						</div>
					</div>
					<span class="num">{{current_index}}/{{nodes.length}}</span>
				</div>
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell mui-collapse">
						<a class="mui-navigate-right" href="#">
				 	{{title}}<span id="add_wish" @tap.stop="addWish">心愿</span>
				</a>

						<ul class="mui-table-view mui-table-view-chevron">

						</ul>
					</li>
				</ul>
				<p id="attainment_tip">
					<strong>包含一下成就点</strong>
					<span id="change_view" @tap="change">点击切换文字</span>
				</p>
				<div v-show="isText" class="city-wraper">
					<span class="city-name" v-for="item in city" @tap="mark(item)" v-bind:class="{'selected': item.selected}">{{item.name}}</span>
				</div>
				<div v-show="!isText">
					<div id="map"></div>
				</div>
				
				<div id="infos">
					<div id="baner">
						<a class="active">推荐</a>
						<a>朋友</a>
						<a>我</a>
					</div>
					<div id="all" class="">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell mui-media" v-for="item in trends">
								<img class="mui-media-object mui-pull-left" :src="item.avatar">
								<div class="mui-media-body" style="margin: 0px;">
									<span class="user-name">
									{{item.name}}
								</span>
									<div class="info-content">{{item.content}}</div>
									<p>
										<img :src="img.img" v-for="img in item.imgs" class="thumb-img" />
									</p>
									<span class="time">1分钟前</span>
									<div class="mui-pull-right">
										<span class="mui-icon mui-icon-checkmarkempty"></span>
										<span class="mui-icon mui-icon-chatboxes" @tap="comment"></span>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="popover" class="mui-popover">
	  <h4 class="mui-text-center">成就操作</h4>
	  	<p class="mui-text-center">选择{{city_name}}的完成时间</p>
	  	<input id="selecte_date" type="hidden"/>
	  	<button class="mui-btn mui-btn-block">仅确认时间</button>
	  	<button class="mui-btn mui-btn-block">添加图文记录</button>
	  	<button class="mui-btn mui-btn-block">取消确认成就</button>
	</div>
</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				nodes: [],
				title: '',
				isText: false,
				echart: '',
				trends: [],
				city_name: '',
				current_index: 1,
				city: [{
					name: '北京',
					selected: false
				}, {
					name: '天津',
					selected: false
				}, {
					name: '上海',
					selected: false
				}, {
					name: '重庆',
					selected: false
				}, {
					name: '河北',
					selected: false
				}, {
					name: '河南',
					selected: false,
					value: 20
				}, {
					name: '云南',
					selected: false
				}, {
					name: '辽宁',
					selected: false
				}, {
					name: '黑龙江',
					selected: false
				}, {
					name: '湖南',
					selected: false
				}, {
					name: '安徽',
					selected: false
				}, {
					name: '山东',
					selected: false
				}, {
					name: '新疆',
					selected: false
				}, {
					name: '江苏',
					selected: false
				}, {
					name: '浙江',
					selected: false
				}, {
					name: '江西',
					selected: false
				}, {
					name: '湖北',
					selected: false,
					value: 400
				}, {
					name: '广西',
					selected: false
				}, {
					name: '甘肃',
					selected: false
				}, {
					name: '山西',
					selected: false
				}, {
					name: '内蒙古',
					selected: false
				}, {
					name: '陕西',
					selected: false
				}, {
					name: '吉林',
					selected: false
				}, {
					name: '福建',
					selected: false
				}, {
					name: '贵州',
					selected: false
				}, {
					name: '广东',
					selected: false
				}, {
					name: '青海',
					selected: false
				}, {
					name: '西藏',
					selected: false
				}, {
					name: '四川',
					selected: false
				}, {
					name: '宁夏',
					selected: false
				}, {
					name: '海南',
					selected: false
				}, {
					name: '台湾',
					selected: false
				}, {
					name: '香港',
					selected: false
				}, {
					name: '澳门',
					selected: false
				}]
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
						callback: function() {
							this.trends = this.trends.concat({
								avatar: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg',
								name: '刘德华',
								content: '五岳归来不看山，黄山归来不看岳，绝对的经典，一年四个样',
								imgs: [{
									img: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg'
								}, {
									img: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg'
								}, {
									img: 'http://dcloudio.github.io/mui/assets/img/cbd.jpg'
								}]
							});
							mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
						}.bind(this)
					}
				}
			});
			this.echart = echarts.init(document.getElementById('map'));
			mui.plusReady(function() {
				self.title = you.current_page.detail_classify_name;
				console.log(JSON.stringify(you.current_page));
				you.authenGet("/detail_classifies/" + you.current_page.detail_classify_id + "/nodes", {}, function(result) {
					console.log(JSON.stringify(result))
					self.nodes = result.nodes;
					setTimeout(function() {
						mui('.mui-slider').slider();
					}, 100);
				});
			});
			document.querySelector('.mui-slider').addEventListener('slide', function(event) {
				self.current_index = event.detail.slideNumber + 1;
			});
			this.showMap();
		},
		methods: {
			addWish: function() {
				console.log("addd");
				
			},
			change: function() {
				this.isText = !this.isText;
			},
			mark: function(item) {
				this.city_name = item.name;
				mui('.mui-popover').popover('toggle');
			},
			showMap: function() {
				this.options = {
					tooltip: {
						trigger: 'item',
						show: false,
						formatter: '{b}'
					},
					series: [{
						name: '中国',
						type: 'map',
						mapType: 'china',
						mapLocation: {
							x: 'center',
							y: '20',
							width: '100%'
						},
						//					selectedMode: 'single',
						hoverable: false,
						itemStyle: {
							normal: {
								label: {
									show: false
								}
							},
							emphasis: {
								label: {
									show: true
								}
							}
						},
						data: this.city
					}]
				};
				this.echart.setOption(this.options);
				this.options.series[0].data[5].selected = true
				this.echart.setOption(this.options, true);
			}
		}
	}
</script>
<style lang="sass">
	#back {
		position: absolute;
		left: 10px;
		color: #444;
		z-index: 2;
		top: 5px;
	}
	
	#baner {
		margin-top: 10px;
		border-top: 1px solid #F3F3F3;
		border-bottom: 1px solid #F3F3F3;
		padding: 10px;
		a {
			margin: 0 10px;
			&.active {
				color: #1FCC7C;
			}
		}
	}
	
	#add_wish {
		float: right;
	}
	
	#slider {
		height: 200px;
		.mui-slider-item {
			height: 200px;
		}
	}
	
	#attainment_tip {
		padding: 10px;
		strong {
			color: #444;
			font-size: 16px
		}
	}
	
	.description-bar {
		position: absolute;
		color: #fff;
		bottom: 0px;
		width: 100%;
		height: 50px;
		padding-left: 15px;
		background-color: rgba(0, 0, 0, 0.7);
		p {
			color: #fff;
		}
	}
	
	#popover {
		width: 280px;
		height: 340;
		top: 50%;
		margin-top: -170px;
		left: 50%;
		margin-left: -140px;
		padding: 15px;
	}
	
	.mui-btn {
		padding: 5px;
		background: #1FCC7C;
		color: #fff;
	}
	
	.city-wraper {
		overflow: hidden;
		padding: 10px;
	}
	
	.city-name {
		display: block;
		color: #989898;
		font-size: 14px;
		float: left;
		margin: 0px;
		text-align: center;
		width: 20%;
	}
	.city-name.selected {
		color: #1FCC7C;
	}
	
	#change_view {
		float: right;
    margin-right: 15px;
    font-size: 12px;
	}
	
	.num {
		position: absolute;
		right: 10px;
		bottom: 10px;
		color: #fff
	}
	
	#map {
		height: 220px;
	}
	
	#selecte_date {
		height: 50px;
	}
	
	img.thumb-img {
		margin-right: 5px;
		width: 100px;
	}
</style>