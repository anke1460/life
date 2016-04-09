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
					<div class="mui-slider-group mui-slider-loop">
						 <div class="mui-slider-item mui-slider-item-duplicate">
						 	<a>
								<img :src="'./../images/translate.png'" :style="{'background-image': ' url('+ detail_classify.node_imgs[detail_classify.node_imgs.length-1] +')'}" class="bg-img" />
							</a>
						 </div>
						<div class="mui-slider-item" v-for="node in detail_classify.node_imgs">
							<a>
								<img :src="'./../images/translate.png'" :style="{'background-image': ' url('+ node +')'}" class="bg-img" />
							</a>
						</div>
						<div class="mui-slider-item mui-slider-item-duplicate">
						 	<a>
								<img :src="'./../images/translate.png'" :style="{'background-image': ' url('+ detail_classify.node_imgs[0] +')'}" class="bg-img" />
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
						<a class="mui-navigate-right group-cos">
				 		{{title}} {{finish_counts}}
				 		<span id="add_wish" @tap.stop="addWish" class="{{wish_img}}"></span>
						</a>
						<ul class="mui-table-view mui-table-view-chevron">
							<li class="group-content">
								<div class="score-cal">
									<div class="col">
										<span>含成就点:</span>
										<span class="col-conent">{{detail_classify.nodes_count}}</span>
									</div>
									<div class="col">
										<span>组合总分:</span>
										<span class="col-conent">{{detail_classify.max_score}}</span>
									</div>
									<div class="col">
										<span>封获头衔:</span>
										<span class="col-conent">{{detail_classify.rank || '无'}}</span>
									</div>
									<div class="col">
										<span>我的总分:</span>
										<span class="col-conent">{{detail_classify.current_score}}</span>
									</div>
								</div>
								<div class="user-photo">
									<img :src="f" v-for="f in finished.user" track-by="$index"/>
									{{ finished.count > 0 ? '等' : '暂无' }} 人完成
									<a @tap="detail('finish')">查看</a>
								</div>
								<div class="user-photo">
									<img :src="s" v-for="s in aspiration.user" track-by="$index"/>
									{{ aspiration.count > 0 ? '等' : '暂无' }} 人加入心愿
									<a @tap="detail('wish')">查看</a>
								</div>
							</li>
						</ul>
					</li>
				</ul>
				<p id="attainment_tip">
					<strong>点击以下成就点确认完成</strong>
					<span id="change_view" @tap="change" v-show="classify.is_mark">{{is_text ? '点击切换地图' : '点击切换文字'}}</span>
				</p>
				<div v-show="is_text" class="city-wraper">
					<span class="city-name" v-for="item in city" @tap="mark(item)" v-bind:class="{'selected': item.selected}">{{item.name}}</span>
				</div>
				<div v-show="!is_text">
					<div id="map"></div>
				</div>

				<div id="infos">
					<div id="baner">
						<a @tap="load('default')" :class="{'active':current_active == 'default'}">推荐</a>
						<a @tap="load('concern')" :class="{'active':current_active == 'concern'}">关注</a>
						<a @tap="load('friend')" :class="{'active':current_active == 'friend'}">朋友</a>
						<a @tap="load('self')" :class="{'active':current_active == 'self'}">我</a>
					</div>
					<div id="all">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell mui-media" v-for="item in trends">
								<img class="mui-media-object mui-pull-left" :src="item.avatar" @tap="viewUser(item)">
								<div class="mui-media-body" style="margin: 0px;" @tap="detailTrend(item, $event)">
									<span class="user-name">
										{{item.name}}
									</span>
									<div class="info-content">{{item.content}}</div>
									<p>
										<img :src="img.thumb" v-for="img in item.photos" class="thumb-img" @tap="viewPhoto(item.photos)" />
									</p>
									<span class="time">{{item.created_at | time}}</span>
									<div class="mui-pull-right">
										<span class="mui-icon praise" @tap="praise(item, $event)" :class="{'is_praise': item.is_praise}"></span>
								   	<span class="mui-icon note" @tap="comment(item)"></span>
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
			<button class="mui-btn mui-btn-block" v-show="is_selected && has_photo != true" @tap="cancelMark">删除记录</button>
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
				wish_img: '',
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
				detail_classify: {
					is_aspiration: true,
					marks_count: 0
				},
				classify: {
					is_mark: false
				},
				page: 1,
				per_page: 20,
				aspiration: '',
				aspiration_id: '',
				finished: '',
				current_active: 'default',
				finish_counts: ''
			}
		},
		watch: {
			is_selected: function(v) {
				if (v) {
					mui(".mbsc-mobiscroll")[0].style.display = "none";
				} else {
					mui(".mbsc-mobiscroll")[0].style.display = "";
				}
			},
			'detail_classify.marks_count': function() {
				this.finish_counts = this.detail_classify.marks_count + '/' + this.detail_classify.nodes_count;
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
						contentnomore: '没有数据',
						callback: self.loadMsg('default')
					}
				}
			});
			mui.plusReady(function() {
				self.detail_classify = you.current_page.detail_classify;
				self.finish_counts = self.detail_classify.marks_count + '/' + self.detail_classify.nodes_count;
				self.aspiration_id = you.current_page.aspiration_id;
				self.classify = you.current_page.classify;
				self.title = self.detail_classify.name;
				self.wish_img = 'is_spiration-' + (self.detail_classify.is_aspiration ? 2 : 1);
				self.loadData();
				if (self.classify.is_mark) {
					self.echart = echarts.init(document.getElementById('map'), 'green');
					self.map_type = self.detail_classify.map_name != '' ? self.detail_classify.map_name : 'china';
					if (self.detail_classify.map_name != '') {
						echarts.util.mapData.params.params[self.detail_classify.map_name] = {
							getGeoJson: function(callback) {
								you.get('/map/' + self.detail_classify.id, {}, callback);
							}
						}
					}
				} else {
					self.is_text = true;
				}
				
				you.authenGet("/detail_classifies/" + self.detail_classify.id +"/joined_user", {}, function(result) {
					self.finished = result.finished;
					self.aspiration = result.aspiration;
					plus.nativeUI.closeWaiting();
   				mui.currentWebview.show();
				})
         
			});
			document.querySelector('.mui-slider').addEventListener('slide', function(event) {
				self.current_index = event.detail.slideNumber + 1;
				self.current_node = self.nodes[event.detail.slideNumber];
			});
			window.addEventListener("reloadData", function() {
				self.loadData();
				self.trends = [];
				self.page = 1;
				self.loadMsg('default');
			})
		},
		methods: {
			load: function(type) {
				this.page = 1;
				this.trends = [];
				this.loadMsg(type);
				this.current_active = type;
			},
			loadMsg: function(type) {
				if (this.page == 1) {
					// fix 初始化滚动问题
//					mui('#refreshContainer').pullRefresh().scrollTo(0, 0, 100);
				}
				var self = this;
				mui.plusReady(function() {
					you.authenGet("/detail_classifies/" + you.current_page.detail_classify.id + "/trend", {type: type}, function(result) {
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
					self.current_node = self.nodes[0];
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
						self.detail_classify.marks_count += 1;
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
				plus.nativeUI.confirm("删除记录会减去相应成就分数", function(e) {
					if (e.index == 0) {
						you.loading();
						you.authenDelete("/nodes/" + this.current_item.id + "/mark", {}, function() {
							self.current_item.selected = false;
							mui('.mui-popover').popover('toggle');
							mui.fire(you.webview("attainment_list"), "reloadData");
							self.detail_classify.marks_count -= 1;
							you.endLoding();
						}, function(xhr) {
							mui.toast(JSON.parse(xhr.responseText).error);
							mui('.mui-popover').popover('toggle');
						});
					} else {
						mui('.mui-popover').popover('toggle');
					}
				 }.bind(this), "提示", ["删除", "取消"]);
				
			},
			addWish: function() {
				var self = this;
				if (self.detail_classify.is_aspiration) {
					plus.nativeUI.confirm("确定取消该心愿吗?", function(e) {
						if (e.index == 0) {
							var id = self.aspiration_id ? self.aspiration_id : you.current_page.detail_classify.aspiration_id;
							you.authenDelete("/aspiration/" + id, {}, function() {
								self.detail_classify.is_aspiration = false;
								self.wish_img = 'is_spiration-' + (self.detail_classify.is_aspiration ? 2 : 1)
								mui.toast("已取消");
								mui.fire(plus.webview.getWebviewById("growth.html"), "reset");
								mui.fire(you.webview("attainment_list"), "reloadData");
							})
						}
					})
					
				} else {
					you.authenPost("/detail_classifies/" + you.current_page.detail_classify.id + "/aspiration", {}, function(result) {
						mui.toast("已添加到我的心愿清单");
						self.detail_classify.is_aspiration = true;
						self.wish_img = 'is_spiration-' + (self.detail_classify.is_aspiration ? 2 : 1)
						self.aspiration_id = result.id;
						mui.fire(plus.webview.getWebviewById("growth.html"), "reset");
						mui.fire(you.webview("attainment_list"), "reloadData");
					})
				}
				
				
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
				if (this.classify.is_mark != true) {
					return true;
				}
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
				this.echart.setOption(this.options);
			},
			detailTrend: function(item, e) {
				if (e.target.className.includes("mui-icon") == false && e.target.className.includes("thumb-img") == false && e.target.className.includes("mui-pull-right") == false) {
				  mui.openWindow({
						url: '../comment.html',
						id: 'comment',
						extras: {
							item: item
						}
					})
				}
			},
			comment: function(item) {
				mui.openWindow({
					url: '../comment.html',
					id: 'comment',
					extras: {
						item: item
					}
				})
			},
			praise: function(item) {
				you.authenPost("/stories/" + item.id + "/praise", {}, function(result) {
					console.log(JSON.stringify(result));
					if (result.ok == 1) {
						item.is_praise = false;
					} else if (result.ok == 2) {
						item.is_praise = true;
					}
				})
			},
			detail: function(type) {
				//查看详情
				mui.openWindow({
					url: '../detail.html',
					id: 'detail',
					extras: {
						title:  this.title + (type == 'finish' ? "完成情况" : '心愿名单'),
						request_url: type == 'finish' ? '/detail_classifies/'+ you.current_page.detail_classify.id +'/finished_user' : '/detail_classifies/' + you.current_page.detail_classify.id +'/wished_user'
					}
				})
			},
			viewPhoto: function(photos) {
				mui.openWindow({
					url: '../preview.html',
					id: 'preview',
					extras: {
						photos: photos
					},
					show: {
						aniShow: 'fade-in'
					}
				})
			},
			viewUser: function(item) {
				mui.openWindow({
					url: "../user/index.html",
					id: 'user_index',
					extras: {
						user: {
							id: item.user_id
						}
					}
				})
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
		padding-top: 22px;
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
		position: absolute;
	  right: 45px;
	}
	
	#slider {
		height: 200px;
		.mui-slider-item {
			height: 200px;
		}
	}
	
	#attainment_tip {
		padding: 10px;
		margin-top: 10px;
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
		/*background-color: rgba(0, 0, 0, 0.7);*/
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
		border-color: #1fcc7c;
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
		width: auto;
		margin-right: 15px;
		margin-top: 4px;
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
		top: 5px;
		width: 30px;
		height: 30px;
		right: 5px
	}
	
	.bg-img {
		background-repeat: no-repeat;
		background-size: 100%
	}
	
	.group-cos {
		height: 59px;
		padding-top: 20px !important;
		background-color: #F7F7F7;
	}
	
	.mui-table-view:before, .mui-table-view:after, .mui-table-view.mui-table-view-chevron :before {
		height: 0px;
	}
	
	a.mui-navigate-right.group-cos {
		padding-bottom: 1px;
	}
	.group-content {
		background-color: #F7F7F7;
		overflow: hidden;
		color: #999;
		padding: 0 15px;
		img {
			width: 24px;
			vertical-align: bottom;
			margin-right: 2px;
		}
		.user-photo {
			font-size: 14px;
			margin-top: 5px;
			margin-bottom: 5px;
		}
	}
	.mui-table-view.mui-table-view-chevron :before { 
	  position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 0px !important;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
	}
	
	
	.score-cal {
		overflow: hidden;
	}
	
	.mui-table-view-cell.mui-collapse>.mui-navigate-right:after, .mui-table-view-cell.mui-collapse>.mui-push-right:after, .mui-table-view-cell.mui-collapse.mui-active>.mui-navigate-right:after, .mui-table-view-cell.mui-collapse.mui-active>.mui-push-right:after {
		color: #1FCC7C;
	}
</style>