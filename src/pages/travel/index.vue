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

		<div class="mui-content mui-row mui-fullscreen">
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
			<div class="mui-col-xs-3">
				<div id="segmentedControls" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical">
					<a class="mui-control-item" href="#content{{$index}}" :class="{'mui-active': $index == 0}" v-for="classify in classifies">{{classify.name}}</a>
				</div>
			</div>
			<div id="segmentedControlContents" class="mui-col-xs-9" style="">
				<div id="item1" class="mui-control-content mui-active">
					<div id="content1" class="mui-control-content" :class="{'mui-active': $index == 0}" v-for="travel in travels">
						<ul class="mui-table-view" @tap="go(travel)">
							<li class="mui-table-view-cell">
								<a>
									<img class="mui-media-object mui-pull-left" :src="../images/1.png" />
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
					</div>
					<div id="content2" class="mui-control-content">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell mui-collapse">
								<a class="mui-navigate-right">
									<img class="mui-media-object mui-pull-left" :src="../images/1.png" />
									<div class="mui-media-body">
										中国十大风景名胜
										<p class="">
											去过1985年中国旅游报评选出十大风景名胜
										</p>
										<p>1113333人完成</p>
									</div>
									<span class="tag">0/34</span>
								</a>
							 <div class="mui-collapse-content">
							 	<button type="button" class="mui-btn">万里长城</button>
							 	<button type="button" class="mui-btn">安徽黄山</button>
							 	<button type="button" class="mui-btn">桂林山水</button>
							 	<button type="button" class="mui-btn">长江三峡</button>
							 	<button type="button" class="mui-btn">杭州西湖</button>
							 	<button type="button" class="mui-btn">日月潭</button>
							 	<button type="button" class="mui-btn">北京故宫</button>
							 	<button type="button" class="mui-btn">承德避暑山庄</button>
							 	<button type="button" class="mui-btn">苏州园林</button>
							 	<button type="button" class="mui-btn">秦岭兵马俑</button>
							 </div>
							</li>
						</ul>
					</div>
					<div id="content3" class="mui-control-content">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell">24432</li>
						</ul>
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
				you.authenGet("/travels/classifies", {}, function(result) {
					console.log(JSON.stringify(result))
					this.classifies = result;
				}.bind(this));
			}.bind(this));
			
		}
	}
</script>