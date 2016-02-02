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
						</div>
					</div>
					<div class="description-bar">
						<strong>{{current_node.name}}</strong>
						<span>成就分数：{{current_node.score}}</span>
						<p>{{current_node.name_en}}</p>
					</div>
					<span class="num">{{current_index}}/{{nodes.length}}</span>
				</div>
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell mui-collapse">
						<a class="mui-navigate-right" href="#">
				 		{{title}}
				 		<span id="add_wish" @tap.stop="addWish">心愿</span>
						</a>
						<ul class="mui-table-view mui-table-view-chevron">
							<li class="">
								<div class="col">
									<span>含成就点</span>
									<span class="col-conent">{{detail_classify.nodes_count}}</span>
								</div>
								<div class="col">
									<span>组合总分</span>
									<span class="col-conent">{{detail_classify.max_score}}</span>
								</div>
								<div class="col">
									<span>封获头衔</span>
									<span class="col-conent">{{detail_classify.rank | '无'}}</span>
								</div>
								<div class="col">
									<span>我的总分</span>
									<span class="col-conent">{{detail_classify.current_score}}</span>
								</div>
							</li>
						</ul>
					</li>
				</ul>
				<p id="attainment_tip">
					<strong>包含以下成就点</strong>
					<span id="change_view" @tap="change">点击切换文字</span>
				</p>
				<div v-show="is_text" class="city-wraper">
					<span class="city-name" v-for="item in city" @tap="mark(item)" v-bind:class="{'selected': item.selected}">{{item.name}}</span>
				</div>
				<div v-show="!is_text">
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
										<img :src="img.thumb" v-for="img in item.photos" class="thumb-img" />
									</p>
									<span class="time">{{item.created_at | time}}</span>
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
		<h4 class="pop-title">成就操作<span id="close" @tap="close"></span></h4>
		<div class="content">
			<p class="mui-text-center">选择<strong>{{city_name}}</strong>的完成时间</p>
			<input id="selecte_date" type="hidden" v-model="haved_at" />
			<button class="mui-btn mui-btn-block" @tap="markHaved" v-show="!is_selected">仅确认时间</button>
			<button class="mui-btn mui-btn-block" @tap="addPhoto">{{ is_selected ? '继续添加图文记录' : '添加图文记录'}}</button>
			<button class="mui-btn mui-btn-block" v-show="is_selected && has_photo != true" @tap="cancelMark">取消</button>
		</div>
	</div>
</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				nodes: [],
				title: '',
				is_selected: false,
				is_text: false,
				haved_at: new Date().Format("yyyy-MM-dd"),
				echart: '',
				trends: [],
				city_name: '',
				current_index: 1,
				current_item: '',
				city: [],
				current_node: '',
				has_photo: false,
				map_type: '',
				detail_classify: ''
			}
		},
		watch: {
			is_selected: function(v) {
				if (v) {
					mui(".mbsc-mobiscroll")[0].style.display = "none";
				} else {
					mui(".mbsc-mobiscroll")[0].style.display = "";
				}
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
				self.detail_classify = you.current_page.detail_classify;
				self.title = self.detail_classify.name;
				self.loadData();
				self.echart = echarts.init(document.getElementById('map'));
				self.map_type = self.detail_classify.map_name != '' ? self.detail_classify.map_name : 'china';
				if (self.detail_classify.map_name != '') {
					console.log('map name', self.detail_classify.map_name);
					echarts.util.mapData.params.params[self.detail_classify.map_name] = {
						getGeoJson: function(callback) {
							you.get('/map/' + self.detail_classify.id, {}, callback);
						}
					}
				}
			});
			document.querySelector('.mui-slider').addEventListener('slide', function(event) {
				self.current_index = event.detail.slideNumber + 1;
				self.current_node = self.nodes[event.detail.slideNumber];
			});
			window.addEventListener("reloadData", function() {
				self.loadData();
				self.trends = [];
				self.page = 1;
				self.loadMsg();
			})
		},
		methods: {
			loadMsg: function() {
				var self = this;
				mui.plusReady(function() {
					you.authenGet("/detail_classifies/" + you.current_page.detail_classify.id + "/trend", {}, function(result) {
						console.log(JSON.stringify(result));
						self.trends = self.trends.concat(result.stories);
						if (self.page * self.per_page > result.total_count) {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(true);
						} else {
							mui("#refreshContainer").pullRefresh().endPullupToRefresh(false);
						}
						self.page = self.page + 1;
					})
				})
			},
			loadData: function() {
				var self = this;
				you.authenGet("/detail_classifies/" + you.current_page.detail_classify.id + "/nodes", {}, function(result) {
					self.nodes = result.nodes;
					console.log(JSON.stringify(result));
					var city = [];
					mui.each(result.nodes, function(i, d) {
						city.push({
							name: d.name,
							id: d.id,
							selected: d.selected,
							has_photo: d.has_photo
						});
					})
					self.city = city;
					setTimeout(function() {
						mui('.mui-slider').slider();
					}, 100);
					self.showMap();
				});
			},
			addPhoto: function() {
				mui('.mui-popover').popover('toggle');
				mui.openWindow({
					url: 'mark_photo.html',
					id: 'mark_photo',
					extras: {
						node_id: this.current_item.id,
						title: this.current_item.name,
						detail_classify_id: you.current_page.detail_classify.id
					}
				})
			},
			markHaved: function() {
				var self = this;
				you.loading();
				you.authenPost("/nodes/" + this.current_item.id + "/mark", {
						haved_at: document.getElementById("selecte_date").value,
						detail_classify_id: you.current_page.detail_classify.id
					},
					function(result) {
						self.current_item.selected = true;
						mui('.mui-popover').popover('toggle');
						you.endLoding();
						mui.fire(you.webview("attainment_list"), "reloadData");
					},
					function(xhr) {
						mui.toast(JSON.parse(xhr.responseText).error);
						mui('.mui-popover').popover('toggle');
					});
			},
			cancelMark: function() {
				var self = this;
				you.loading();
				you.authenDelete("/nodes/" + this.current_item.id + "/mark", {}, function() {
					self.current_item.selected = false;
					mui('.mui-popover').popover('toggle');
					mui.fire(you.webview("attainment_list"), "reloadData");
					you.endLoding();
				}, function(xhr) {
					mui.toast(JSON.parse(xhr.responseText).error);
					mui('.mui-popover').popover('toggle');
				});
			},
			addWish: function() {
				var options = {
					type: "date",
					beginYear: (new Date).getFullYear()
				};
				var picker = new mui.DtPicker(options);
				picker.show(function(rs) {
					you.authenPost("/detail_classifies/" + you.current_page.detail_classify.id + "/aspiration", {
						date: rs.text
					}, function(result) {
						console.log(JSON.stringify(result));
						you.alert("已添加到我的心愿清单");
						picker.dispose();
					})
				})
				console.log("addd");
			},
			change: function() {
				this.is_text = !this.is_text;
				this.showMap();
			},
			mark: function(item) {
				this.city_name = item.name;
				this.current_item = item;
				this.is_selected = item.selected;
				this.has_photo = item.has_photo;
				mui('.mui-popover').popover('toggle');
			},
			close: function() {
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
						mapType: this.map_type,
						mapLocation: {
							x: 'center',
							y: '20',
							width: '100%'
						},
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
				console.log('c333', JSON.stringify(this.city));
				this.echart.setOption(this.options);
				//				this.echart.setOption(this.options, true);
			},
			comment: function() {
				console.log('comment')
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
	
	.col {
		float: left;
		width: 50%;
		padding: 5px 5px;
		font-size: 14px;
		.col-content {
			mmargin-left: 5px;
		}
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
		.content {
			padding: 15px;
		}
		.pop-title {
			margin: 0px;
			height: 40px;
			line-height: 40px;
			background: #1FCC7C;
			color: #fff;
			text-align: center;
		}
		strong {
			color: #1FCC7C;
		}
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
	
	#close {
		position: absolute;
		right: 0px;
		width: 40px;
		height: 40px;
	}
</style>