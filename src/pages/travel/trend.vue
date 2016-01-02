<template>
	<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" id="back"></a>
	<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div id="spot">
				<div id="slider" class="mui-slider">
					<div class="mui-slider-group mui-slider-loop">
						<template v-for="img in attraction.imgs">
							<template v-if="$index == 0">
								<div class="mui-slider-item mui-slider-item-duplicate">
									<a href="#"><img :src="img"></a>
								</div>
							</template>
							<template v-else>
								<div class="mui-slider-item">
									<a href="#"><img :src="img"></a>
								</div>
							</template>
						</template>
					</div>

					<div class="mui-slider-indicator">
						<div class="mui-indicator" v-for="img in attraction.imgs" :class="{'mui-active': $index == 0}"></div>
					</div>
				</div>
				<div id="address_desc">
					<span id="address">{{attraction.name}}</span>
					<span>成就分数： {{attraction.score}}分</span>
					<p>{{attraction.name_en}}</p>
				</div>
			</div>
			<div class="mui-content-padded">
				<p>{{attraction.description}}</p>
			</div>
			<ul class="mui-table-view mui-table-view-chevron" id="data_statistics">
				<li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right" href="#">有友数据---<span style="color: #8F8F94;font-size: 14px;">来自好友的评价信息</span></a>
					<ul class="mui-table-view mui-table-view-chevron">
						<li class="mui-table-view-cell" style="padding: 0px;">
							<table style="width: 100%;">
								<thead>
									<td>来源</td>
									<td>体验</td>
									<td>耗时</td>
									<td>花费</td>
									<td>时间</td>
								</thead>
								<tbody>
									<tr>
										<td>
											<img :src="../images/user-photo.png" class="u-avatar" />
											<span class="u-name mui-ellipsis">有友平均</span></td>
										<td>4.7</td>
										<td>3.5天</td>
										<td>1400</td>
										<td>2天</td>
									</tr>
									<tr>
										<td>
											<img :src="../images/user-photo.png" class="u-avatar" />
											<span class="u-name mui-ellipsis">angala baby</span></td>
										<td>4.7</td>
										<td>3.25天</td>
										<td>144400</td>
										<td>200天</td>
									</tr>
								</tbody>
							</table>
						</li>
					</ul>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<span class="mui-pull-left">成就完成情况</span>
					<span class="mui-pull-right">未完成0分</span>
				</li>
			</ul>
			<div class="wish_panel">
				<p>
					<span>去过</span>
					<a class="mui-btn mui-btn-success mui-btn-outlined btn"><i class="mui-icon mui-icon-compose"></i>评一下</a>
					<a class="mui-btn mui-btn-success mui-btn-outlined btn"><i class="mui-icon mui-icon-camera"></i>添加记录</a>
				</p>
				<p>
					<span>想去</span>
					<a class="mui-btn mui-btn-success mui-btn-outlined btn" @tap="addWish"><i class="mui-icon mui-icon-starhalf"></i>加入心愿清单成长</a>
				</p>
			</div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<div class="visited">
						<a href="" v-for="v in visited">
							<img :src="v.avatar" />
						</a>
						<span>等3位好友已经去过</span>
						<a class="mui-btn mui-btn-success mui-btn-outlined view">查看</a>
					</div>
					<div class="visited">
						<a href="" v-for="w in wanted">
							<img :src="w.avatar" />
						</a>
						<span>等3位好友想去</span>
						<a class="mui-btn mui-btn-success mui-btn-outlined view">查看</a>
					</div>
				</li>
			</ul>
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
		</div>
	</div>
	<!--<div id="wish" class="mui-popover">
		<div class="mui-content-padded">
			<h5 class="mui-text-left">部门名称</h5>
			<div class="mui-input-row">
				<input type="text" v-model="department_name">
			</div>
			<h5 class="mui-text-left">部门描述</h5>
			<div class="mui-input-row">
				<textarea rows="5" v-model="department_description"></textarea>
			</div>
		</div>
		<div class="mui-text-center bar">
			<a class="mui-btn mui-btn-primary" style="margin-right: 40px;" @tap="cancelEdit">取消</a>
			<a class="mui-btn mui-btn-positive" @tap="saveDepartment">确认</a>
		</div>
	</div>-->
</template>
<script>
	module.exports = {
		el: '#app',
		data: {
			title: '黄山印象',
			imgs: ['../images/yuantiao.jpg', '../images/yuantiao.jpg'],
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
			attraction: '',
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
		//		components: {
		//			friend: require("./friend.vue")
		//		},
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
							});
							mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
						}.bind(this)
					}
				}
			});
			mui.plusReady(function() {
				you.authenGet("/attractions/" + you.current_page.attraction_id, {}, function(result) {
					console.log(JSON.stringify(result))
					this.attraction = result.attraction;
				}.bind(this));
			}.bind(this))
		},
		methods: {
			detail: function() {
				you.loadWebUrl("trend_detail.html", "template", {
					title: '动态详情',
					target: 'trend_detail.html'
				});
			},
			addWish: function() {
				var options = {
					type: "date",
					beginYear: 2016
				};
				var picker = new mui.DtPicker(options);
				picker.show(function(rs) {
					console.log(rs.text);
					you.authenPost("/attractions/" + you.current_page.attraction_id + "/wish", {date: rs.text}, function() {
						you.alert("已添加到我的心愿清单");
						picker.dispose();
					});
				})
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
	
	.wish_panel {
		padding: 10px;
		span {
			color: #989898;
			vertical-align: middle;
		}
		.btn {
			vertical-align: middle;
			margin-left: 10px;
		}
		p {
			height: 50px;
			line-height: 50px;
		}
	}
	
	.visited {
		height: 50px;
		line-height: 50px;
		img {
			width: 30px;
		}
	}
	
	.view {
		vertical-align: middle;
	}
</style>