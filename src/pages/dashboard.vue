<!--
	作者：zuosjob@gmail.com
	时间：2016-01-09
	描述：首页
-->
<template>
	<div class="mui-content">
		<div class="mui-slider">
			<div class="mui-slider-group">
				<div class="mui-slider-item">
					<ul class="mui-table-view mui-grid-view mui-grid-9">
						<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in travel">
							<a href="#">
								<img :src="item.img" class="img" />
								<div class="mui-media-body">{{item.name}}</div>
							</a>
						</li>
					</ul>
					<div id="travel">
						<img :src="'images/title.png'" />
					</div>
				</div>
				<div class="mui-slider-item">
					<ul class="mui-table-view mui-grid-view mui-grid-9">
						<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in food">
							<a href="#">
								<img :src="item.img" class="img" />
								<div class="mui-media-body">{{item.name}}</div>
							</a>
						</li>
					</ul>
				</div>
				<div class="mui-slider-item">
					<ul class="mui-table-view mui-grid-view mui-grid-9">
						<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in social">
							<a href="#">
								<img :src="item.img" class="img" />
								<div class="mui-media-body">{{item.name}}</div>
							</a>
						</li>
					</ul>
				</div>
				<div class="mui-slider-item">
					<ul class="mui-table-view mui-grid-view mui-grid-9">
						<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in hobby">
							<a href="#">
								<img :src="item.img" class="img" />
								<div class="mui-media-body">{{item.name}}</div>
							</a>
						</li>
					</ul>
				</div>
				<div class="mui-slider-item">
					<ul class="mui-table-view mui-grid-view mui-grid-9">
						<li class="mui-table-view-cell mui-media mui-col-xs-4 col-2" v-for="item in skill">
							<a href="#">
								<img :src="item.img" class="img" />
								<div class="mui-media-body">{{item.name}}</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="mui-slider-indicator">
				<div class="mui-indicator mui-active"></div>
				<div class="mui-indicator"></div>
				<div class="mui-indicator"></div>
				<div class="mui-indicator"></div>
				<div class="mui-indicator"></div>
			</div>
		</div>
	</div>
</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				items: '',
				travel: [],
				hobby: [],
				social: [],
				skill: [],
				food: []
			}
		},
		ready: function() {
			mui.init();
			mui.plusReady(function() {
				you.authenGet("/classifies", {}, function(result) {
					console.log(JSON.stringify(result))
						//					this.items = result.classifies;
					mui.each(result.classifies, function(i, d) {
						this[d.alias].push(d);
						this[d.alias].push
					}.bind(this));
					this.travel.push({
						name: '更多',
						img: './images/1.png'
					})
				}.bind(this))
			}.bind(this));
		}
	}
</script>
<style lang="sass">
	.mui-slider-indicator .mui-active.mui-indicator {
		background: #1FCC7C;
	}
	
	#travel {
		text-align: center;
		img {
			width: 200px;
			height: 82px;
		}
	}
	
	.col-2 {
		width: 20%;
	}
	
	.mui-slider .mui-slider-group {
		margin-bottom: 30px;
	}
	
	.mui-slider .mui-slider-group .mui-slider-item img {
		width: 50px;
		border-radius: 25px;
		height: 50px;
	}
	
	.mui-grid-view.mui-grid-9 {
		background: #fff;
		.mui-table-view-cell {
			padding: 0px;
			border: none;
		}
	}
</style>