<!--
	作者：zuosjob@gmail.com
	时间：2016-01-13
	描述：成就列表页面
-->
<template>
	<header class="mui-bar mui-bar-nav header">
	    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
	    <h1 class="mui-title">{{title}}</h1>
	</header>
	<div class="mui-content">
		<div class="mui-slider">
			<div class="mui-slider-group">
				<div class="mui-slider-item" v-for="image in images">
					<img :src="image.image_url" class="img" />
				</div>
			</div>
			<div class="mui-slider-indicator">
				<div class="mui-indicator" v-for="image in images" :class="{'mui-active': $index == 0}"></div>
			</div>
		</div>
		<div class="description">
			{{classify.description}}
		</div>
	</div>

</template>
<script>
  module.exports = {
  	  el: "#app",
  	  data: function() {
  	  	  return {
  	  	  	  images: [],
  	  	  	  title: '',
  	  	  	  classify: ''
  	  	  }
  	  },
  	  ready: function() {
  	  	  var self = this;
  	  	  mui.init();
  	  	  mui.plusReady(function() {
  	  	  	  self.title = you.current_page.title;
  	  	  	  you.authenGet("/classifies/"+ you.current_page.classify, {}, function(result) {
  	  	  	  	 console.log(JSON.stringify(result));
  	  	  	  	 self.images = result.imgs;
  	  	  	  	 self.classify = result.classify;
  	  	  	  })
  	  	  })
  	  },
  	  methods: {
  	  	
  	  }
  }
</script>
<style>

</style>