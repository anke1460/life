<!--
	作者：zuosjob@gmail.com
	时间：2016-01-03
	描述：成长
-->
<template>
	<div class="mui-content">
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

</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				items: []
			}
		},
		//		computed: {
		//			finished: function() {
		//				var data = [];
		//				for (var i in this.items) {
		//					data.push((this.items[i].finished_num / this.items[i].goal_num * 100).toFixed(1));
		//				}
		//				console.log(JSON.stringify(data))
		//				return data;
		//			}
		//		},
		ready: function() {
			mui.init({
				swipeBack: false
			});
			mui.plusReady(function() {
				you.loading();
				this.load();
			}.bind(this))
		},
		methods: {
			//			go: function(item, e) {
			//				if (!e.target.classList.contains("mui-switch-handle")) {
			//				  var wish_id = item.id;
			//					plus.storage.setItem("wish_id", wish_id.toString());
			//					you.loadWebUrl("wish/wish_detail.html", "template", {
			//						title: item.name,
			//						target: "wish/wish_detail.html",
			//						aniShow: 'slide-in-right'
			//					});
			//				}
			//			},
			go: function(item) {
				mui.openWindow({
					url: 'attainment/detail.html',
					id: 'attainment_detail',
					extras: {
						detail_classify: item.detail_classify
					}
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
					setTimeout(function() {
						mui('.mui-content .mui-switch')['switch']();
					}, 200)
				}.bind(this));
			}
		}
	}
</script>
<style lang="sass">
	.progress-bar {
		background-color: #1FCC7C;
		font: 13px 'trebuchet MS', Arial, Helvetica;
		height: 14px;
		padding: 1px;
		width: 110px;
		float: left;
		margin-top: 5px;
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
			position: relative;
			background-color: #fecf23;
			background-image: -webkit-gradient(linear, left top, left bottom, from(#fecf23), to(#fd9215));
			background-image: -webkit-linear-gradient(top, #fecf23, #fd9215);
			background-image: -moz-linear-gradient(top, #fecf23, #fd9215);
			background-image: -ms-linear-gradient(top, #fecf23, #fd9215);
			background-image: -o-linear-gradient(top, #fecf23, #fd9215);
			background-image: linear-gradient(top, #fecf23, #fd9215);
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