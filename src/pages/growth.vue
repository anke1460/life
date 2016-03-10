<!--
	作者：zuosjob@gmail.com
	时间：2016-01-03
	描述：成长
-->
<template>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="news" @tap="news">
				<img :src="images[0].url" />
			</div>
			<div class=" mui-content-padded">

				<ul class="mui-table-view">
					<template v-for="item in items">
						<li class="mui-table-view-divider" v-show="$index != 0"></li>
						<li class="mui-table-view-cell wish">
							<div class="mui-slider-cell">
								<div class="wish_content" @click="go(item, $event)">
									<h6>
									<span class="mui-pull-left">许愿{{item.wish_day}}天</span>
									<span class="mui-pull-right">成就分值: {{item.score}}</span>
								</h6>
									<div class="oa-contact-cell mui-table">
										<div class="oa-contact-avatar mui-table-cell">
											<img :src="item.img_url" class="mui-media-object mui-pull-left" />
											<div class="mui-media-body">
												{{item.name}}
												<p> {{item.description}}</p>
												<p>
													<h5 class="mui-pull-left">完成进度：</h5>
													<div class="progress-bar orange shine">
														<span :style="{width: finishScale(item.finish_num, item.total_num) + '%'}"></span>
													</div>
													<span class="finished-text">{{item.finish_num}}/{{item.total_num}}</span>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
					</template>
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
				items: [],
				images: [{
					url: 'http://www.youyou.help/uploads/node_image/image/181/large___.jpg'
				}]
			}
		},
		ready: function() {
			var self = this;
			mui.init({
				swipeBack: false
			});
			mui.plusReady(function() {
				you.loading();
				this.load();
				window.addEventListener("reloadData", function() {
					self.load();
				} )
			}.bind(this))
		},
		methods: {
			go: function(item) {
				mui.openWindow({
					url: 'attainment/detail.html',
					id: 'attainment_detail',
					extras: {
						detail_classify: item.detail_classify,
						classify: item.classify
					}
				})
			},
			news: function() {
				mui.openWindow({
					url: 'news.html',
					id: 'news'
				})
			},
			finishScale: function(v, t) {
				return (v / t * 100).toFixed(1)
			},
			load: function() {
				you.authenGet("/aspiration", {}, function(result) {
					console.log(JSON.stringify(result))
					this.items = result.aspirations;
					you.endLoding();
				}.bind(this));
			}
		}
	}
</script>
<style lang="sass">
  .news {
  	  height: 150px;
  }
	.progress-bar {
		height: 10px;
		padding: 1px;
		border: 1px dotted #1FCC7C;
		width: 110px;
		float: left;
		position: relative;
		margin-top: 7px;
		span {
			display: inline-block;
			height: 100%;
			top: -1px;
			background-color: #777;
			-moz-box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;
			-webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;
			box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;
			-webkit-transition: width .4s ease-in-out;
			-moz-transition: width .4s ease-in-out;
			-ms-transition: width .4s ease-in-out;
			-o-transition: width .4s ease-in-out;
			transition: width .4s ease-in-out;
			position: absolute;
			background-color: #1FCC7C;
			background-image: -webkit-gradient(linear, left top, left bottom, from(#1FCC7C), to(#1FCC7C));
			background-image: -webkit-linear-gradient(top, #1FCC7C, #1FCC7C);
			background-image: linear-gradient(top, #1FCC7C, #1FCC7C);
		}
		span::after {
			content: '';
			opacity: 0;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: #fff;
			-moz-border-radius: 3px;
			-webkit-border-radius: 3px;
			border-radius: 3px;
			-webkit-animation: animate-shine 2s ease-out infinite;
			-moz-animation: animate-shine 2s ease-out infinite;
		}
	}
	
	@-webkit-keyframes animate-shine {
		0% {
			opacity: 0;
			width: 0;
		}
		50% {
			opacity: .5;
		}
		100% {
			opacity: 0;
			width: 95%;
		}
	}
	
	@-moz-keyframes animate-shine {
		0% {
			opacity: 0;
			width: 0;
		}
		50% {
			opacity: .5;
		}
		100% {
			opacity: 0;
			width: 95%;
		}
	}
	
	.finished-text {
		margin-left: 5px;
		float: left;
		font-size: 14px;
		color: #1FCC7C;
	}
	
	.wish {
		padding: 0px;
	}
</style>