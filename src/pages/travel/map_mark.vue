<!--
	作者：zuosjob@gmail.com
	时间：2015-12-25
	描述：在地图上标记去过的地方
-->
<template>
	<tbar :title="title"></tbar>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="mui-content-padded">
				<div id="map">
				</div>
				<div class="mui-text-center">
				  进度 8/32	
				</div>
				<p class="mui-text-center tip">点击下面城市名来标记已去过</p>
				<span class="city-name" v-for="item in city" @tap="mark($index)" v-bind:class="{'selected': item.selected}">{{item.name}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	module.exports = {
		el: '#app',
		data: function() {
			return {
				echart: '',
				title: '',
				city: [{
					name: '北京',
					selected: false
				}, {
					name: '天津',
					selected: false
				}, {
					name: '上海',
					selected: false
				}, {
					name: '重庆',
					selected: false
				}, {
					name: '河北',
					selected: false
				}, {
					name: '河南',
					selected: false,
					value: 20
				}, {
					name: '云南',
					selected: false
				}, {
					name: '辽宁',
					selected: false
				}, {
					name: '黑龙江',
					selected: false
				}, {
					name: '湖南',
					selected: false
				}, {
					name: '安徽',
					selected: false
				}, {
					name: '山东',
					selected: false
				}, {
					name: '新疆',
					selected: false
				}, {
					name: '江苏',
					selected: false
				}, {
					name: '浙江',
					selected: false
				}, {
					name: '江西',
					selected: false
				}, {
					name: '湖北',
					selected: false,
					value: 400
				}, {
					name: '广西',
					selected: false
				}, {
					name: '甘肃',
					selected: false
				}, {
					name: '山西',
					selected: false
				}, {
					name: '内蒙古',
					selected: false
				}, {
					name: '陕西',
					selected: false
				}, {
					name: '吉林',
					selected: false
				}, {
					name: '福建',
					selected: false
				}, {
					name: '贵州',
					selected: false
				}, {
					name: '广东',
					selected: false
				}, {
					name: '青海',
					selected: false
				}, {
					name: '西藏',
					selected: false
				}, {
					name: '四川',
					selected: false
				}, {
					name: '宁夏',
					selected: false
				}, {
					name: '海南',
					selected: false
				}, {
					name: '台湾',
					selected: false
				}, {
					name: '香港',
					selected: false
				}, {
					name: '澳门',
					selected: false
				}]
			}
		},
		ready: function() {
			
			mui.ready(function() {
				mui.init();
				this.echart = echarts.init(document.getElementById('map'));
				mui.plusReady(function() {
					this.title = you.current_page.title;
					this.showMap();
				}.bind(this));
			}.bind(this))
			
		},
		components: {
			tbar: require("./../../components/header.vue")
		},
		methods: {
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
						mapType: 'china',
						mapLocation: {
							x: 'center',
							y: '20',
							width: '100%'
						},
						//					selectedMode: 'single',
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
				this.options.series[0].data[5].selected = true
				this.echart.setOption(this.options, true);
			},
			mark: function(index) {
				this.city[index].selected = true;
				this.echart.setOption(this.options, true);
				mui.openWindow({
					url: 'mark.html',
					id: 'mark',
					show: {
						aniShow: 'fade-in',
						duration: 300
					}
				})
			}
		}
	}
</script>
<style lang="sass">
	#map {
		height: 280px;
	}
	.tip {
		margin-top: 5px;
	}
	.city-name {
		display: inline-block;
		margin: 5px;
		color: #989898;
	}
	.city-name.selected {
		color: #1FCC7C;
	}
</style>