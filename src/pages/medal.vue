<!--
	作者：zuosjob@gmail.com
	时间：2016-02-29
	描述：勋章墙
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">勋章墙</h1>
		<button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @tap="rule">规则</button>
	</header>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="mui-content-padded">
				<ul class="mui-table-view" v-for="item in items">
					<li class="mui-table-view-cell" @tap="go(item)">
						<div class="mui-slider-cell">
							<div class="wish_content" @click="go(item, $event)">
								<h6 :class="{'geted': item.finished_at != ''}">
									<span class="mui-pull-left">获得时间:{{item.finished_at == '' ? '暂无获得' : item.finished_at}}</span>
									<span class="mui-pull-right"> {{item.finished_rate}}%用户获得</span>
								</h6>
								<div class="oa-contact-cell mui-table">
									<div class="oa-contact-avatar mui-table-cell">
										<img :src="item.total_score | to_photo" class="mui-media-object mui-pull-left" />
										<div class="mui-media-body">
											{{item.name}}
											<p> {{item.detail_classify_name}}</p>
											<p>
												<h5 class="mui-pull-left">
													<span v-for="p in item.finished_people.users">{{p.name}}</span>
													{{item.finished_people.user_count == 0 ? '' :  '等' + item.finished_people.user_count + '人获得'}}
												</h5>
												<span class="score-text">分数:{{item.total_score}}</span>
											</p>
										</div>
									</div>
								</div>
							</div>
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
				items: ''
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				you.authenGet("/medals", {}, function(result) {
					var first = [], sec = [], total = [];
					mui.each(result.medals, function(i, d) {
						if (d.finished_at != "") {
							first.push(d)
						} else {
							sec.push(d);
						}
					})
					total = total.concat(first.sort(self.compare('total_score')));
					total = total.concat(sec.sort(self.compare('total_score')));
					self.items = total;
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					}, 150)
				})
			})
		},
		methods: {
			go: function(item) {
				mui.openWindow({
					url: 'attainment/detail.html',
					id: 'attainment_detail',
					extras: {
						classify: item.classify,
						detail_classify: item.detail_classify
					},
					show:{
			      autoShow:false
			    }
				})
			},
			rule: function() {
				mui.openWindow({
					url: 'medal_rule.html',
					id: 'medal_rule'
				})
			},
			compare: function(propertyName) {
				return function(object1, object2) {
					var value1 = object1[propertyName];
					var value2 = object2[propertyName];
					if (value2 < value1) {
						return 1;
					} else if (value2 > value1) {
						return -1;
					} else {
						return 0;
					}
				}
			}
		}
	}
</script>
<style lang="sass">
	.mui-slider-cell h6 {
		display: table;
		width: 100%;
		background: #e7e7e7;
		margin: 0px;
		padding: 6px 15px;
		font-size: 16px;
		color: #666;
		&.geted {
			background: #1FCC7C;
			color: #fff;
		}
	}
	
	li.mui-table-view-cell {
		padding: 0px;
	}
	
	ul.mui-table-view {
		margin-bottom: 10px;
	}
	
	.score-text {
		position: absolute;
		right: 10px;
		top: 10px;
		color: #666
	}
	
	.oa-contact-avatar.mui-table-cell {
		padding: 10px;
	}
</style>