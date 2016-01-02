<!--
	作者：zuosjob@gmail.com
	时间：2015-12-28
	描述：旅行评分
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title"></h1>
	</header>

	<div class="mui-content mui-row mui-scroll-wrapper scroll-wraper">
		<div class="mui-scroll">
			<div id="slider" class="mui-slider">
				<div class="mui-slider-group mui-slider-loop">
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#"><img :src="img"></a>
					</div>
					<div class="mui-slider-item">
						<a href="#"><img :src="img"></a>
					</div>
				</div>
				<div class="mui-slider-indicator">
					<div class="mui-indicator mui-active"></div>
					<div class="mui-indicator"></div>
				</div>
			</div>
			<div class="mui-col-xs-3 mui-pull-left">
				<div id="segmentedControls" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical">
					<a class="mui-control-item" href="#content{{$index}}" :class="{'mui-active': $index == 0}" v-for="classify in classifies">{{classify.name}}</a>
				</div>
			</div>
			<div id="segmentedControlContents" class="mui-col-xs-9 mui-pull-left">
				<div id="item1" class="mui-control-content mui-active">
					<div id="content{{$index}}" class="mui-control-content" :class="{'mui-active': $index == 0}" v-for="classify in classifies">

						<template v-if="classify.is_mark">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell" v-for="travel in classify.travels"  @tap="goMap(travel)">
									<a>
										<img class="mui-media-object mui-pull-left" :src="img" />
										<div class="mui-media-body">
											{{travel.name}}
											<p class="mui-ellipsis">
												{{travel.description}}
											</p>
											<p>1113333人完成</p>
										</div>
										<span class="tag">0/34</span>
									</a>
								</li>
							</ul>
						</template>
						<template v-else>
							<ul class="mui-table-view">
								<li class="mui-table-view-cell mui-collapse" v-for="travel in classify.travels">
									<a class="mui-navigate-right">
										<img class="mui-media-object mui-pull-left" :src="img" />
										<div class="mui-media-body">
											{{travel.name}}
											<p class="">
												{{travel.description}}
											</p>
											<p>1113333人完成</p>
										</div>
										<span class="tag">0/34</span>
									</a>
									<div class="mui-collapse-content">
										<button type="button" class="mui-btn" v-for="attraction in travel.attractions" @tap="goAttraction(attraction)">{{attraction.name}}</button>
									</div>
								</li>
							</ul>
						</template>

					</div>

				</div>
			</div>
		</div>
	</div>
</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				classifies: [],
				travels: [],
				title: '旅行评分',
				img: '../images/muwu.jpg'
			}
		},
		ready: function() {
			mui.init({
				swipeBack: true
			});
			mui.plusReady(function() {
				this.title =  plus.webview.currentWebview().title;
				you.loading();
				you.authenGet("/travels/classifies", {}, function(result) {
					console.log(JSON.stringify(result))
					this.classifies = result.classifies;
					you.endLoding();
				}.bind(this));
			}.bind(this));
			
		},
		methods: {
			goMap: function(travel) {
				mui.openWindow({
					url: 'map_mark.html',
					id: 'map_mark',
					extras: {
						title: travel.name
					}
				})
			},
			goAttraction: function(attraction) {
				mui.openWindow({
					url: 'scenic_spot.html',
					id: 'scenic_spot',
					extras: {
						attraction_id: attraction.id
					}
				})
			}
		}
	}
</script>