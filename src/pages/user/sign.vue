<!--
	作者：zuosjob@gmail.com
	时间：2015-12-28
	描述：我的签名
-->
<template>
	<header class="mui-bar mui-bar-nav header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">我的签名</h1>
		<button class="mui-btn mui-btn-link mui-btn-nav mui-pull-right" @tap="save">
			保存
		</button>
	</header>
	<div class="mui-content">
		<div class="mui-input-row" style="margin:15px;">
			<p id="text_tip">最多输入<span>{{size}}字符</span></p>
			<textarea name="" v-model="content" rows="5" id="content" maxlength="100" @keyup="input"></textarea>
		</div>
	</div>
</template>
<script>
  module.exports = {
  		el: '#app',
		data: {
			content: "",
			size: 100
		},
		ready: function() {
			mui.init();
			mui.plusReady(function() {
				this.content = you.current_page.value;
			}.bind(this));
		},
		methods: {
			input: function() {
				if (this.size > 1) {
					this.size = 100 - this.content.length;
				}
			},
			save: function() {
				you.authenPut("/users/info", {type: 'sign', value: this.content}, function(result) {
					mui.fire(plus.webview.getWebviewById("template").children()[0], "set_value", {
						name: this.content,
						id: 'sign'
					});
					you.current_page.close();
				}.bind(this))
			}
		}
  }
	
</script>