<!--
	作者：zuosjob@gmail.com
	时间：2016-01-15
	描述：成就标记页面
-->
<template>
	<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" id="back"></a>
	<div class="mui-content">
	    	<div id="slider" class="mui-slider">
					<div class="mui-slider-group mui-slider-loop">
						<template v-for="node in nodes">
							<template v-if="$index == 0">
								<div class="mui-slider-item mui-slider-item-duplicate">
									<a href="#"><img :src="node.imgs[0]"></a>
								</div>
							</template>
							<template v-else>
								<div class="mui-slider-item">
									<a href="#"><img :src="node.imgs[0]"></a>
								</div>
							</template>
						</template>
					</div>
				</div>
	</div>
</template>
<script>
	module.exports = {
		el: "#app",
		data: function() {
			return {
				nodes: ''
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				you.authenGet("/detail_classifies/" + you.current_page.detail_classify_id + "/nodes", {}, function(result) {
					console.log(JSON.stringify(result))
					self.nodes = result.nodes
				});
			})
			
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
			}
</style>
