<!--
	作者：zuosjob@gmail.com
	时间：2016-02-29
	描述：勋章墙
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">勋章墙</h1>
	</header>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="mui-content-padded">
				<ul class="mui-table-view" v-for="item in items">
					<li class="mui-table-view-cell">
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
											<p> {{item.detail_classify}}</p>
											<p>
												<h5 class="mui-pull-left">
													<span v-for="p in item.finished_people.users">{{p.name}}</span>
													{{item.finished_people.user_count == 0 ? '' : item.finished_people.user_count + '等'}}人获得
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
					self.items = result.medals;
					setTimeout(function() {
						mui(".mui-scroll-wrapper").scroll();
					}, 150)
				})
			})
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